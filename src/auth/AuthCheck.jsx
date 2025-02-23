import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { setAuthenticated } from "../redux/slices/authSlice";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const AuthCheck = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const {token , loading} = useAuth()
  if(loading ) return <div> Loading...</div>
  console.log("tokennn" , token)

/*   useEffect(() => {
    const token = Cookies.get("token"); // Fetch token inside useEffect
   // console.log("Token:", token);

    if (token) {
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setAuthenticated(false));
    }
  }, [dispatch]); // Only dispatch should be in dependencies */

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthCheck;
