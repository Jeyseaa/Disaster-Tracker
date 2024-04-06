import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import "../styles/admindashboard.css";

const Admindashboard = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        navigate('/admin-login'); // Redirect to admin login if not authenticated
      }
    });

    return unsubscribe;
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
          <div className="table-container">
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
                <tr>
                  <td>1</td>
                  <td>John Carl</td>
                  <td>johncarl@gmail.com</td>
                  <td>09123456789</td>
                  <td>Barangay Name</td>
                  <td>*********</td>
                  <td>
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                    <button className="approve-button">Approve</button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admindashboard;
