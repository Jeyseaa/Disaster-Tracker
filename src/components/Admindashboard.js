import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { database } from '../firebase'; // Import database object from Firebase
import "../styles/admindashboard.css";

const Admindashboard = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  let unsubscribeFirestore; // Declare unsubscribeFirestore variable outside of useEffect

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
        const firestore = getFirestore(); // Get Firestore instance
        const usersCollection = collection(firestore, 'users'); // Reference to 'users' collection
        unsubscribeFirestore = onSnapshot(usersCollection, snapshot => {
          const usersData = [];
          snapshot.forEach(doc => {
            usersData.push({ id: doc.id, ...doc.data() });
          });
          setUsers(usersData);
        });
      } else {
        setAuthenticated(false);
        navigate('/admin-login'); // Redirect to admin login if not authenticated
      }
    });

    return () => {
      unsubscribe();
      if (unsubscribeFirestore) { // Check if unsubscribeFirestore is defined before calling it
        unsubscribeFirestore(); // Unsubscribe from Firestore listener
      }
    };
  }, [navigate]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/'); // Redirect to homepage after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleApprove = async (userId) => {
    const firestore = getFirestore();
    const userRef = doc(firestore, 'users', userId);
    try {
      await updateDoc(userRef, {
        approved: true
      });
      console.log('User approved in Firestore');
      // Update the user's approval status in the Realtime Database
      database.ref('users/' + userId).update({
        approved: true
      }).then(() => {
        console.log('User approved in Realtime Database');
      }).catch(error => {
        console.error('Error approving user in Realtime Database:', error);
      });
    } catch (error) {
      console.error('Error approving user in Firestore:', error);
    }
  };

  const handleEdit = (userId) => {
    // Handle edit logic here
    console.log('Editing user with ID:', userId);
  };

  const handleDelete = async (userId) => {
    const firestore = getFirestore();
    const userRef = doc(firestore, 'users', userId);
    try {
      await deleteDoc(userRef);
      console.log('User deleted from Firestore');
      // Also delete user from Realtime Database if needed
    } catch (error) {
      console.error('Error deleting user from Firestore:', error);
    }
  };

  return (
    <div>
      {authenticated && (
        <div className="sidebar">
          {/* Sidebar content */}
          <div className="sidebar-header">
            <img className="profile-img" src="https://scontent.fmnl30-1.fna.fbcdn.net/v/t1.15752-9/434199910_1077982733462085_7343354962094345715_n.jpg?_nc_cat=103&amp;ccb=1-7&amp;_nc_sid=5f2048&amp;_nc_ohc=Qiz917JKKNYAb4P32Ly&amp;_nc_ht=scontent.fmnl30-1.fna&amp;oh=03_AdXgSn-eAW3Xv7xRf-fOIyUw9qReugZdkTs6OjCzK3pr0Q&amp;oe=6635C4E9" alt="Profile"/>
            <h2>Dashboard</h2>
          </div>
          <div className="sidebar-menu">
            <a href="#" className="active"><i className="fas fa-user"></i> Users</a>
            <a href="#"><i className="fas fa-cube"></i> Products</a>
            <a href="#"><i className="fas fa-cog"></i> Settings</a>
            <button onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
          </div>
        </div>
      )}
  
      {authenticated && (
        <div className="content">
          {/* Content header and search bar */}
          <div className="content-header">
            <h1>User Management</h1>
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button className="search-button">Search</button>
            </div>
          </div>
          {/* Rest of the content */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Barangay</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.barangay}</td>
                  <td>
                    <div className="password-field">
                      <input type="password" value={user.password} readOnly />
                      {/* No handleShowPassword function defined */}
                    </div>
                  </td>
                  <td className="actions">
                    <button className="edit-button" onClick={() => handleEdit(user.id)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                    {!user.approved && (
                      <button className="approve-button" onClick={() => handleApprove(user.id)}>Approve</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admindashboard;
