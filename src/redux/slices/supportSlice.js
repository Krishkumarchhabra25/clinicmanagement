// src/features/supportSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSupportProfile, updateSupportPermissions } from '../../api/SupportApi/supportApi';

const initialState = {
    profile: null,
    loading: false,
    error: null,
  };
  
  // Thunk to fetch the support profile
  export const fetchSupportProfile = createAsyncThunk(
    'support/fetchSupportProfile',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getSupportProfile();
        return data; // data.data contains the profile
      } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch support profile");
      }
    }
  );
  
  // Thunk to update support permissions
  export const updateSupportPermissionsThunk = createAsyncThunk(
    'support/updateSupportPermissions',
    async (permissionsData, { rejectWithValue }) => {
      try {
        const data = await updateSupportPermissions(permissionsData);
        return data; // data.data contains the updated permissions
      } catch (error) {
        return rejectWithValue(error.message || "Failed to update support permissions");
      }
    }
  );
  
  const supportSlice = createSlice({
    name: 'support',
    initialState,
    reducers: {
      // You may add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
      builder
        // fetchSupportProfile cases
        .addCase(fetchSupportProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSupportProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.profile = action.payload.data; // store the support profile details
        })
        .addCase(fetchSupportProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // updateSupportPermissionsThunk cases
        .addCase(updateSupportPermissionsThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateSupportPermissionsThunk.fulfilled, (state, action) => {
          state.loading = false;
          if (state.profile) {
            state.profile.permissions = action.payload.data;
          }
        })
        .addCase(updateSupportPermissionsThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default supportSlice.reducer;