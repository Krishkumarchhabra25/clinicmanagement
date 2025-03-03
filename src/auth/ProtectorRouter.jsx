import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import * as routesKey from '../constants/routes';
import { useEffect, useState } from 'react';

const RequireAuth = ({ children }) => {
    const { token, admin, loading } = useAuth();
  
    if (loading) {
      return <div>Loading session...</div>;
    }
  
    // Basic client-side check
    const isAuthenticated = !!token && !!admin;
    
    return isAuthenticated ? children : <Navigate to={routesKey.ADMINLOGIN} replace />;
  };
  
  export default RequireAuth;