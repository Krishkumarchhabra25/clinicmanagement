import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { setAuthToken } from "../../api/axiosInstance";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/admin/login-admin", credentials);
      if (response.data.success) {
        const token = response.data.token;
        const admin = response.data.admin;
        console.log('API login successful');

        setAuthToken(token);
        return { token, admin, message: response.data.message };
      } else {
        return rejectWithValue(response.data.message || "Login Failed");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    admin: null,
    isAuthenticated: false,
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
      // Cookie removal is now handled in AuthContext
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAdminDetails: (state, action) => {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
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

export const { logoutUser, setAuthenticated, setAdminDetails } = authSlice.actions;
export default authSlice.reducer;
