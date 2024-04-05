import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/admin-login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to Admin Dashboard!</h1>
      {/* You can add any content or components you want to display on the dashboard */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
