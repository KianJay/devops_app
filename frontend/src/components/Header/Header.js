import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

function Header(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const capitalize = (s) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    let title = capitalize(location.pathname.substring(1, location.pathname.length));
    if (location.pathname === '/') {
        title = 'Welcome';
    }

    function renderLogout() {
        if (location.pathname === '/home') {
            return (
                <div className="ml-auto">
                    <button className="btn btn-danger logout-btn" onClick={() => handleLogout()}>Logout</button>
                </div>
            );
        }
    }

    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-dark bg-primary fancy-header">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">
                        <img src="/path-to-logo.png" alt="Logo" className="logo" />
                    </a>
                </div>
                <div className="navbar-title">
                    <span className="h3">{props.title || title}</span>
                </div>
                <div className="navbar-nav">
                    <a className="nav-link" href="/about">About</a>
                    <a className="nav-link" href="/contact">Contact</a>
                    {renderLogout()}
                </div>
            </div>
        </nav>
    );
}

export default Header;
