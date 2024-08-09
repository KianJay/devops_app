import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import './LoginForm.css';

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      "email": state.email,
      "password": state.password,
    };
    axios.post(`${API_BASE_URL}/user/login`, payload)
      .then(function (response) {
        if (response.status === 200) {
          localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
          setState(prevState => ({
            ...prevState,
            successMessage: 'Login successful. Redirecting to home page..'
          }));
          redirectToHome();
          props.showError(null);
        } else {
          props.showError("Invalid credentials");
        }
      })
      .catch(function (error) {
        console.log(error);
        props.showError("Invalid credentials");
      });
  };

  const redirectToHome = () => {
    navigate('/home');
  };

  const redirectToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form">
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmitClick}>
          Login
        </button>
      </form>
      {state.successMessage && (
        <div className="success-message">{state.successMessage}</div>
      )}
      <button className="register-button" onClick={redirectToRegister}>
        Register
      </button>
    </div>
  );
}

export default LoginForm;