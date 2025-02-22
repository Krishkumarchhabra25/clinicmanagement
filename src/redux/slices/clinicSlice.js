import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddAddressInfoOfClinic, AddBasicInfoOfClinic, getAllClinicData, updateAddressInfoClinic, updateBasicInfoClinic } from "../../api/ClinicApi/ClinicApi";

export const addBasicInfo = createAsyncThunk(
    'clinic/addBasicInfo',
    async (basicInfoData, { rejectWithValue }) => {
      try {
        const response = await AddBasicInfoOfClinic(basicInfoData);
        return response; // response contains { success, message, data }
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  // Async thunk to update basic clinic info
  export const updateBasicInfo = createAsyncThunk(
    'clinic/updateBasicInfo',
    async (updateBasicInfoData, { rejectWithValue }) => {
      try {
        const response = await updateBasicInfoClinic(updateBasicInfoData);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  // Async thunk to add address info
  export const addAddress = createAsyncThunk(
    'clinic/addAddress',
    async (addressInfoData, { rejectWithValue }) => {
      try {
        const response = await AddAddressInfoOfClinic(addressInfoData);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  // Async thunk to update address info
  export const updateAddress = createAsyncThunk(
    'clinic/updateAddress',
    async (updateAddressInfoData, { rejectWithValue }) => {
      try {
        const response = await updateAddressInfoClinic(updateAddressInfoData);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  // Async thunk to get all clinic details (basic info and address)
  export const getClinicDetails = createAsyncThunk(
    'clinic/getClinicDetails',
    async (_, { rejectWithValue }) => {
      try {
        const response = await getAllClinicData();
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  const initialState = {
    basicInfo: {},
    address: {},
    loading: false,
    error: null,
    message: '',
  };
  
  const clinicSlice = createSlice({
    name: 'clinic',
    initialState,
    reducers: {
      // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
      builder
        // addBasicInfo cases
        .addCase(addBasicInfo.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addBasicInfo.fulfilled, (state, action) => {
          state.loading = false;
          state.basicInfo = action.payload.data;
          state.message = action.payload.message;
        })
        .addCase(addBasicInfo.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        })
  
        // updateBasicInfo cases
        .addCase(updateBasicInfo.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateBasicInfo.fulfilled, (state, action) => {
          state.loading = false;
          state.basicInfo = action.payload.data;
          state.message = action.payload.message;
        })
        .addCase(updateBasicInfo.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        })
  
        // addAddress cases
        .addCase(addAddress.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addAddress.fulfilled, (state, action) => {
          state.loading = false;
          state.address = action.payload.data;
          state.message = action.payload.message;
        })
        .addCase(addAddress.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        })
  
        // updateAddress cases
        .addCase(updateAddress.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateAddress.fulfilled, (state, action) => {
          state.loading = false;
          state.address = action.payload.data;
          state.message = action.payload.message;
        })
        .addCase(updateAddress.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        })
  
        // getClinicDetails cases
        .addCase(getClinicDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getClinicDetails.fulfilled, (state, action) => {
          state.loading = false;
          // Assuming the response data structure is:
          // { success: true, data: { basicInfo: { ... }, address: { ... } } }
          state.basicInfo = action.payload.data.basicInfo;
          state.address = action.payload.data.address;
        })
        .addCase(getClinicDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        });
    },
  });
  
  export default clinicSlice.reducer;