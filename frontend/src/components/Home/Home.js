import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/user/me`, { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
      .then(function (response) {
        if (response.status !== 200) {
          redirectToLogin();
        }
      })
      .catch(function (error) {
        redirectToLogin();
      });
  }, []);

  function redirectToLogin() {
    navigate('/login');
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to the Home Page</h1>
        <p>Your one-stop solution for all your needs.</p>
      </div>
      <div className="home-content">
        <p>Explore our features and services.</p>
        <button className="btn btn-primary" onClick={redirectToLogin}>Go to Login</button>
      </div>
    </div>
  );
}

export default Home;