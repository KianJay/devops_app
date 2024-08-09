import React from 'react';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/apiConstants';

function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN_NAME);

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
}

export default PrivateRoute;