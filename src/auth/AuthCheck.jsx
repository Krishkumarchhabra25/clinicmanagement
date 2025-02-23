import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { setAdminDetails, setAuthenticated } from "../redux/slices/authSlice";
import useAuth from "../hooks/useAuth";

const AuthCheck = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { token, loading, admin } = useAuth();

  useEffect(() => {
    if (loading) return; // Don't update state while still loading

    if (token && admin) {
      dispatch(setAuthenticated(true));
      console.log('camee.............',admin);
      dispatch(setAdminDetails({admin,token}));
    } else {
      dispatch(setAuthenticated(false));
    }
  }, [dispatch, token, admin, loading]); // Include `loading` in dependencies

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthCheck;
