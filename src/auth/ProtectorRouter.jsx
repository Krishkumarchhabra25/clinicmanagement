// src/auth/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    return token ? <Outlet /> : <Navigate to="/login" replace />;
  
};

export default ProtectedRoute;