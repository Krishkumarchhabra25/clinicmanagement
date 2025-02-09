import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { addPatient, getAllPatients, searchPatinets } from "../../api/patientsApi/PatientsApi";

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

  export const fetchSearchPatients = createAsyncThunk(
    "patients/searchPatients",
    async ({ type, query, page = 1 }, { rejectWithValue }) => {
      try {
        
        const params = { page, limit: 10 };
        
        params[type] = query;
        const data = await searchPatinets(params);
        if (data.success) return data.data;
        return rejectWithValue("Failed to search patients");
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const createPatient = createAsyncThunk(
    "patients/createPatient",
    async(patientData,{rejectWithValue})=>{
      try {
        const response = await addPatient(patientData);
        if(response.success) return response.data;
        return rejectWithValue("Failed to add patients")
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  )

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

          .addCase(createPatient.pending,(state)=>{
            state.loading = true;
          })
          .addCase(createPatient.fulfilled,(state, action)=>{
            state.loading= false;
            state.patinets.push(action.payload)
          })
          .addCase(createPatient.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
          })

          .addCase(fetchSearchPatients.pending ,(state)=>{
            state.loading = true;

          })
          .addCase(fetchSearchPatients.fulfilled ,(state, action)=>{
            state.loading = false;
            state.patinets = action.payload.patients;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage
          })
          .addCase(fetchSearchPatients.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload
          })
    }
  });

  export default PatinetSlice.reducer;