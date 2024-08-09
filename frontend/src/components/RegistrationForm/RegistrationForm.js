import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiConstants';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css'; // Import the new CSS file

function RegistrationForm(props) {
    const [state, setState] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        if (state.password === state.confirmPassword) {
            const payload = {
                "userName": state.userName,
                "email": state.email,
                "password": state.password,
            };
            axios.post(API_BASE_URL + '/user/register', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            successMessage: 'Registration successful. Redirecting to login page..'
                        }));
                        redirectToLogin();
                        props.showError(null);
                    } else {
                        props.showError("Some error occurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            props.showError('Passwords do not match');
        }
    };

    const redirectToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="registration-container">
            <h2 className="registration-title">Register</h2>
            <form className="registration-form">
                <input
                    type="text"
                    id="userName"
                    placeholder="Username"
                    value={state.userName}
                    onChange={handleChange}
                />
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
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={state.confirmPassword}
                    onChange={handleChange}
                />
                <button type="submit" onClick={handleSubmitClick}>
                    Register
                </button>
            </form>
            {state.successMessage && (
                <div className="success-message">{state.successMessage}</div>
            )}
        </div>
    );
}

export default RegistrationForm;