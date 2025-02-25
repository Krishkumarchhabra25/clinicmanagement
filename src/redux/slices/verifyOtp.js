import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/otp/verify-otp", { email, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to verify OTP");
    }
  }
);

const verifyOtpSlice = createSlice({
  name: "verifyOtp",
  initialState: {
    verifying: false,
    verified: false,
    message: null,
    error: null,
  },
  reducers: {
    resetVerification: (state) => {
      state.verified = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.verifying = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.verifying = false;
        state.verified = true;
        state.message = action.payload.message;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifying = false;
        state.error = action.payload;
      });
  },
});

export const { resetVerification } = verifyOtpSlice.actions;
export default verifyOtpSlice.reducer;