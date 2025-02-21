import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosInstance, { setAuthToken } from "../../api/axiosInstance";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/admin/login-admin", credentials);
      if (response.data.success) {
        const token = response.data.token;
        const admin = response.data.admin; // The returned user details

        // Store token in cookies for persistence
        Cookies.set("token", token, { expires: 7 });
        setAuthToken(token); // Set axios authorization header for subsequent requests

        return { token, admin, message: response.data.message };
      } else {
        return rejectWithValue(response.data.message || "Login Failed");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token") || null,
    admin: null, // Store admin/support user details here
    isAuthenticated: !!Cookies.get("token"),
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.admin = null;
      state.message = null;
      Cookies.remove("token");
    },
    setAuthenticated: (state, action) => {
      if (state.isAuthenticated !== action.payload) {
        state.isAuthenticated = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.admin = action.payload.admin;
        state.isAuthenticated = !!action.payload.token;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
