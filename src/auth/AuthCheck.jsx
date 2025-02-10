import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { setAuthenticated } from "../redux/slices/authSlice";
import { useEffect } from "react";

const AuthCheck = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const token = Cookies.get("token");

  useEffect(() => {
   
    if (token && !isAuthenticated) {
      dispatch(setAuthenticated(true));
    }
  }, [token, isAuthenticated, dispatch]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthCheck;
