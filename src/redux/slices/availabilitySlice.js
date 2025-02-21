import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAvailability, updateAvailability } from "../../api/AvailabilityApi/availabilityApi";

// Async Thunks
export const fetchAvailability = createAsyncThunk("availability/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const data = await getAllAvailability();
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateAvailabilityStatus = createAsyncThunk(
  "availability/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const data = await updateAvailability(id, updatedData);
      return data.updatedAvailability;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const availabilitySlice = createSlice({
  name: "availability",
  initialState: {
    schedule: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload;
      })
      .addCase(fetchAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAvailabilityStatus.fulfilled, (state, action) => {
        const index = state.schedule.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.schedule[index] = action.payload;
        }
      });
  },
});

export default availabilitySlice.reducer;
