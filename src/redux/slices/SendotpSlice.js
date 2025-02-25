import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/otp/send-otp", { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to send OTP");
    }
  }
);

const authSlice = createSlice({
  name: "sendotp",
  initialState: {
    otpSent: false,
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    resetOtpState: (state) => {
      state.otpSent = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.message = action.payload.message;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOtpState } = authSlice.actions;
export default authSlice.reducer;