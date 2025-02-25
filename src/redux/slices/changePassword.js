import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";

// API URL (Replace with your actual backend URL)
const API_URL = "/admin/change-password-before-login";

// Async Thunk for Changing Password
export const changePasswordBeforeLogin = createAsyncThunk(
  "auth/changePasswordBeforeLogin",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_URL, passwordData);
      toast.success("Password changed successfully! Redirecting to login...");
      return response.data; // Return API response if successful
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Redux Slice
const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetChangePasswordState: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordBeforeLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordBeforeLogin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePasswordBeforeLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions & Reducer
export const { resetChangePasswordState } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
