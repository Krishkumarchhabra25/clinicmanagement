import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import patientsReducer from "./slices/patinetSlice"; // Ensure this path is correct
import Cookies from "js-cookie";

const preloadedState = {
    auth: {
      token: Cookies.get("token") || null,
      isAuthenticated: !!Cookies.get("token"),
    },
  };

  
export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer,
  },
   preloadedState, 
});
