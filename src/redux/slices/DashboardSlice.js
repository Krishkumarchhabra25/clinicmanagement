import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Async thunk to fetch patient stats
export const fetchDashboardStats = createAsyncThunk(
  "patients/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("http://localhost:4000/patient/stats");
      return response.data.data; // Extract data object
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalPatients: 0,
    todaysPatients: 0,
    genderPercentages: { male: 0, female: 0, other: 0 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPatients = action.payload.totalPatients;
        state.todaysPatients = action.payload.todaysPatients;
        state.genderPercentages = action.payload.genderPercentages;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default DashboardSlice.reducer;
