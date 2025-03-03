import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import * as routesKey from '../constants/routes';

const PublicRoute = ({ children }) => {
  const { token, admin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return token && admin ? <Navigate to={routesKey.DASHBOARD} replace /> : children;
};

export default PublicRoute;