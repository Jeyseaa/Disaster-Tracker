import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getDatabase, ref, update } from 'firebase/database';
import { database } from '../firebase'; // Import database object from Firebase

import axios from 'axios'; // Import Axios for HTTP requests
import "../styles/admindashboard.css";

const Admindashboard = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  let unsubscribeFirestore;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
        const firestore = getFirestore();
        const usersCollection = collection(firestore, 'users');
        unsubscribeFirestore = onSnapshot(usersCollection, snapshot => {
          const usersData = [];
          snapshot.forEach(doc => {
            usersData.push({ id: doc.id, ...doc.data() });
          });
          setUsers(usersData);
        });
      } else {
        setAuthenticated(false);
        navigate('/admin-login');
      }
    });

    return () => {
      unsubscribe();
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, [navigate]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleApprove = async (userId, userEmail) => {
    const firestore = getFirestore();
    const userRef = doc(firestore, 'users', userId);
    try {
      // Update Firestore
      await updateDoc(userRef, { approved: true });
      console.log('User approved in Firestore');
  
      // Update Realtime Database
      const db = getDatabase();
      const userDbRef = ref(db, 'users/' + userId);
      await update(userDbRef, { approved: true });
      console.log('User approved in Realtime Database');
  
      // Update Authentication
      const auth = getAuth();
      await auth.updateUser(userId, {
        displayName: userEmail, // Assuming user's email can be used as displayName
        disabled: false, // Enable the user
      });
      console.log('User approved in Authentication');
  
      // Send email to the user upon approval
      sendSignupSuccessfulEmail(userEmail);
  
      console.log('Approval process completed successfully');
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };
  
  const sendSignupSuccessfulEmail = async (userEmail) => {
    try {
      await axios.post('/api/send-email', { userEmail });
      console.log('Signup Successful email sent to user');
    } catch (error) {
      console.error('Error sending Signup Successful email:', error);
    }
  };

  const handleEdit = (userId) => {
    console.log('Editing user with ID:', userId);
  };

  const handleDelete = async (userId) => {
    const firestore = getFirestore();
    const userRef = doc(firestore, 'users', userId);
    try {
      await deleteDoc(userRef);
      console.log('User deleted from Firestore');
    } catch (error) {
      console.error('Error deleting user from Firestore:', error);
    }
  };

  return (
    <div>
      {authenticated && (
        <div className="sidebar">
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
          <div className="content-header">
            <h1>User Management</h1>
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button className="search-button">Search</button>
            </div>
          </div>
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
                    </div>
                  </td>
                  <td className="actions">
                    <button className="edit-button" onClick={() => handleEdit(user.id)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                    {!user.approved && (
                      <button className="approve-button" onClick={() => handleApprove(user.id, user.email)}>Approve</button>
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
