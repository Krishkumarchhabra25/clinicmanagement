import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPatients } from "../../api/patientsApi/PatientsApi";

export const fetchAllPatients = createAsyncThunk(
    "patients/fetchPatients", 
    async ({ page = 1 }, { rejectWithValue }) => { 
      try {
        const data = await getAllPatients(page); 
        if (data.success) return data.data;
        return rejectWithValue("Failed to fetch patients"); 
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  const PatinetSlice = createSlice({
    name:"patients",
    initialState:{
        patinets:[],
        totalPages:1,
        currentPage:1,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
          .addCase(fetchAllPatients.pending,(state)=>{
            state.loading= true;
            state.error = null;
          })
          .addCase(fetchAllPatients.fulfilled, (state, action)=>{
            state.loading = false ;
            state.patinets = action.payload.patients;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
          })
          .addCase(fetchAllPatients.rejected, (state, action)=>{
            state.loading= false,
            state.error = action.payload
          })
    }
  });

  export default PatinetSlice.reducer;