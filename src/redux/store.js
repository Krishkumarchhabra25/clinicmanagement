import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import patinetsReducer from "./slices/patinetSlice"

export const store = configureStore({
    reducer:{
        auth:authReducer,
        patients: patinetsReducer
    }
})