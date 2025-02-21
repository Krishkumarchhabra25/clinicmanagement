import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import patientsReducer from "./slices/patinetSlice"; // Ensure this path is correcti
import availabilitySlice from "./slices/availabilitySlice";
import profileSettingSlice from  "./slices/profileSettingSlice"
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
    availability:availabilitySlice,
    profile: profileSettingSlice
  },
   preloadedState, 
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});
