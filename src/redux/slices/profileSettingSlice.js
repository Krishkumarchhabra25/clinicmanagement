// src/redux/adminProfileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAdminProfile, updatePersonalInfo } from '../../api/ProfileSettingApi/profileSettingApi';

// Async thunk for fetching the full admin profile
export const getAdminProfile = createAsyncThunk(
  'adminProfile/getAdminProfile',
  async (_, thunkAPI) => {
    try {
      const profile = await fetchAdminProfile();
      return profile;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating only the personal info
export const updatePersonalInfoThunk = createAsyncThunk(
  'adminProfile/updatePersonalInfo',
  async (personalInfoData, thunkAPI) => {
    try {
      const updatedInfo = await updatePersonalInfo(personalInfoData);
      return updatedInfo;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle GET profile
      .addCase(getAdminProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle update of personal info
      .addCase(updatePersonalInfoThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePersonalInfoThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update only the personalInfo section of the profile
        if (state.profile) {
          state.profile.personalInfo = action.payload;
        }
      })
      .addCase(updatePersonalInfoThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default adminProfileSlice.reducer;
