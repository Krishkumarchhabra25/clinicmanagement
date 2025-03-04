import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const CHANGE_PASSWORD_AFTER_LOGIN_URL = "/admin/change-support-password";

export const changePasswordAfterLoginApi = createAsyncThunk(
  "auth/changeSupportPasswordAfterLogin",
  async ({ email, newPassword }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axiosInstance.post(
        CHANGE_PASSWORD_AFTER_LOGIN_URL,
        { email, newPassword },
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to change password");
    }
  }
);

const supportPasswordSlice = createSlice({
  name: "changeSupportPassword",
  initialState: {
    loading: false,
    success: false,
    error: null
  },
  reducers: {
    resetSupportPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordAfterLoginApi.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(changePasswordAfterLoginApi.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePasswordAfterLoginApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetSupportPasswordState } = supportPasswordSlice.actions;
export default supportPasswordSlice.reducer;