import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const PrivateRoute = ({ element, ...props }) => {
  // Check if the user is authenticated, in this case, check if the token exists
  const isAuthenticated = Cookies.get('token');

  if (!isAuthenticated) {
    // Redirect to the SignIn page if not authenticated
    return <Navigate to="/SignIn" />;
  }

  // Render the component if authenticated
  return <Route {...props} element={element()} />;
};

export default PrivateRoute;
