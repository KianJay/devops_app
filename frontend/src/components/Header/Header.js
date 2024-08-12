import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import Navbar from '../Navbar/Navbar'; // Import Navbar

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
            <Navbar /> {/* Add Navbar inside Header */}

                <div className="navbar-nav">
                    {renderLogout()}
                </div>
            </div>
        </nav>
    );
}

export default Header;
