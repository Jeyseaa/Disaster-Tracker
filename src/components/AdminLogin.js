import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import "../styles/adminlogin.css";

const StyledAdminLogin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: url("https://scontent.fmnl30-2.fna.fbcdn.net/v/t1.15752-9/434209485_941953163856622_1585636951373590587_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHQr1Y3xT2eOH7D7boXo82TpWR2d0enEL6lZHZ3R6cQvpKx5EoCTyixCWJ-SMxS_wl-CIyt9LBQzlQuMFqE1Qt6&_nc_ohc=q6akhQjtB_gAX8oiof0&_nc_ht=scontent.fmnl30-2.fna&oh=03_AdTcBY70uTR6SEc7MKsm7W-zMF50J1ws4fdpwEOVdi-KuA&oe=66332ADD") no-repeat center;
    background-size: cover;
`;

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin-dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    try {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.uid === 'Wruc9pH0VlMJYbTO4D8bpUhzn8L2') {
            setIsAuthenticated(true);
            navigate('/admin-dashboard');
          } else {
            setIsAuthenticated(false);
            setError('You are not authorized to access the admin dashboard.');
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };
  
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  return (
    <StyledAdminLogin>
      {isAuthenticated ? null : (
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
              <div className="account-wall">
                <img className="profile-img" src="https://scontent.fmnl30-1.fna.fbcdn.net/v/t1.15752-9/434199910_1077982733462085_7343354962094345715_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Qiz917JKKNYAb4P32Ly&_nc_ht=scontent.fmnl30-1.fna&oh=03_AdXgSn-eAW3Xv7xRf-fOIyUw9qReugZdkTs6OjCzK3pr0Q&oe=6635C4E9" alt="Profile" />
                <form className="form-signin" onSubmit={handleLoginSubmit}>
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="form-control custom-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="form-group row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="remember-me" />
                        <label className="form-check-label" htmlFor="remember-me">Remember Me</label>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 text-right">
                      <a href="#forgot" className="forgot-link">Forgot Password</a>
                    </div>
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  <button type="submit" className="btn btn-lg btn-saffron btn-block">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </StyledAdminLogin>
  );
}

export default AdminLogin;
