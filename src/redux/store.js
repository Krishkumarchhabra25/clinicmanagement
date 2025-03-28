import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import patientsReducer from "./slices/patinetSlice"; // Ensure this path is correcti
import availabilitySlice from "./slices/availabilitySlice";
import profileSettingSlice from  "./slices/profileSettingSlice"
import ClinicUserSlice from "./slices/clinicSlice"
import SupportSlice from "./slices/supportSlice"
import SendOtpSlice from "./slices/SendotpSlice"
import VerifyOtpSlice from "./slices/verifyOtp"
import ChangePassword from "./slices/changePassword"
import DashboardSlice from "./slices/DashboardSlice"
import ChnageSupportSlice from "./slices/chnageSupportSlice"
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
    profile: profileSettingSlice,
    clinic:ClinicUserSlice,
    support:SupportSlice,
    sendotp:SendOtpSlice,
    verifyOtp:VerifyOtpSlice,
    changePassword:ChangePassword,
    dashboard:DashboardSlice,
    changeSupportPassword:ChnageSupportSlice
  },
   preloadedState, 
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});
