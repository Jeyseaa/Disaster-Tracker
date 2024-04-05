import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Loginpage from './components/Loginpage';
import AdminLogin from './components/AdminLogin';
import Admindashboard from './components/Admindashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/login" element={<Loginpage />} />
          <Route exact path="/admin-login" element={<AdminLogin />} />
          <Route exact path="/admin-dashboard" element={<Admindashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
