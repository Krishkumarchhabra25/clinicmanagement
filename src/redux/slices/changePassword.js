import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import Cookie from "js-cookie"; // Import js-cookie

// API URLs
const CHANGE_PASSWORD_BEFORE_LOGIN_URL = "/admin/change-password-before-login";
const CHANGE_PASSWORD_AFTER_LOGIN_URL = "/admin/change-password-after-login";

// Async Thunk for Changing Password Before Login
export const changePasswordBeforeLogin = createAsyncThunk(
  "auth/changePasswordBeforeLogin",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(CHANGE_PASSWORD_BEFORE_LOGIN_URL, passwordData);
      toast.success("Password changed successfully! Redirecting to login...");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async Thunk for Changing Password After Login
export const changePasswordAfterLogin = createAsyncThunk(
  "auth/changePasswordAfterLogin",
  async ({ currentPassword, newPassword }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axiosInstance.post(
        CHANGE_PASSWORD_AFTER_LOGIN_URL,
        { currentPassword, newPassword },
        config
      );

      // ✅ Remove Cookies
      Cookie.remove("token", { path: "/" });
      Cookie.remove("admin", { path: "/" });

      // ✅ Remove LocalStorage Items
      localStorage.removeItem("admin");
      localStorage.removeItem("name");
      localStorage.removeItem("permissions");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to change password");
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
      // Before Login
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
      })

      // After Login
      .addCase(changePasswordAfterLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordAfterLogin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePasswordAfterLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions & Reducer
export const { resetChangePasswordState } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
