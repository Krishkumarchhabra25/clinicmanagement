import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { addPatient, DeletePatients, detailsPatient, exportPatients, getAllPatients, searchPatinets, sortPatients, updatePatients } from "../../api/patientsApi/PatientsApi";

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
    "patients/fetchSortedPatients",
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

// Sort patients (updated)
export const fetchSortPatients = createAsyncThunk(
  "patients/sortPatients",
  async ({ sortBy, sortOrder, page = 1 }, { rejectWithValue }) => {
    try {
      // Pass an object containing sortBy, sortOrder, and page
      const data = await sortPatients({ sortBy, sortOrder, page });
      if (data.success) return data.data;
      return rejectWithValue("Failed to sort patients");
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

  export const exportPatientsThunk = createAsyncThunk(
    "patients/exportPatients",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch("/api/export-patients", {
          method: "GET",
        });
  
        if (!response.ok) throw new Error("Failed to export patients");
  
        // Convert response to Blob
        const blob = await response.blob();
  
        // Handle file download in the component, not Redux
        return { blob }; // ✅ Return Blob as an object property
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

  export const fetchPatientDetails = createAsyncThunk(
    "patients/fetchdPatientsdetails",
    async (patientId, {rejectWithValue})=>{
      try {
        const data = await  detailsPatient(patientId);
        if(data.success) return data.data;
        return rejectWithValue("Failed to load PatientsDetails")
      } catch (error) {
         rejectWithValue(error)
      }
    }
  )

  export const UpdatePatientsDetailsData = createAsyncThunk(
    "patients/UpdatePatientsDetailsData",
    async ({ patientId, updatedData }, { rejectWithValue }) => {
      console.log("Dispatching update for patient:", patientId, "with data:", updatedData);
      try {
        const response = await updatePatients(patientId, updatedData);
        console.log("API update response:", response);
        if (response.success) {
          return response.data;
        }
        return rejectWithValue("Failed to update patient");
      } catch (error) {
        console.error("Error in updatePatients thunk:", error);
        return rejectWithValue(error);
      }
    }
  );
  
  export const deletePatients = createAsyncThunk(
    "patients/deletePatients",
    async({patientId},{rejectWithValue})=>{
        try {
          const response = await  DeletePatients(patientId);
          if(response.success){
            return { patientId, message: response.message };
          }
          rejectWithValue("Failed to deletePatients");
        } catch (error) {
            return rejectWithValue(error)
        }
    }
  )


    const PatinetSlice = createSlice({
      name:"patients",
      initialState:{
          patinets:[],
          patientsDetails:null,
          totalPages:1,
          currentPage:1,
          loading:false,
          error:null,
          exportFile: null,
          successMessage: null,
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


            .addCase(fetchSortPatients.pending,(state)=>{
              state.loading= true;
            })
            .addCase(fetchSortPatients.fulfilled,(state, action)=>{
              state.loading = false;
              state.patinets = action.payload.patients;
              state.totalPages = action.payload.totalPages;
              state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchSortPatients.rejected , (state ,action)=>{
              state.loading = false;
              state.error = action.payload
            })


            .addCase(exportPatientsThunk.pending, (state) => {
              state.loading = true;
            })
            .addCase(exportPatientsThunk.fulfilled, (state) => {
              state.loading = false;
            })
            .addCase(exportPatientsThunk.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })

            .addCase(fetchPatientDetails.pending, (state)=>{
                state.loading = true
            })
            .addCase(fetchPatientDetails.fulfilled , (state,action)=>{
              state.loading = false;
              state.patientsDetails = action.payload;
            })
            .addCase(fetchPatientDetails.rejected,(state,action)=>{
                state.loading= false;
                state.error = action.payload
            })

            .addCase(UpdatePatientsDetailsData.pending, (state) => {
              state.loading = true;
              console.log("UpdatePatientsDetailsData pending...");
            })
            .addCase(UpdatePatientsDetailsData.fulfilled, (state, action) => {
              state.loading = false;
              console.log("UpdatePatientsDetailsData fulfilled with payload:", action.payload);
              // Update patient list
              state.patinets = state.patinets.map((patient) =>
                patient._id === action.payload._id ? action.payload : patient
              );
              // Update currently viewed patient details if applicable
              if (state.patientsDetails && state.patientsDetails._id === action.payload._id) {
                state.patientsDetails = action.payload;
              }
            })
            .addCase(UpdatePatientsDetailsData.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
              console.error("UpdatePatientsDetailsData rejected with error:", action.payload);
            })
           
            .addCase(deletePatients.pending, (state) => {
              state.loading = true;
              state.error = null;
              state.successMessage = null;
            })
            .addCase(deletePatients.fulfilled, (state, action) => {
              state.loading = false;
              state.patinets = state.patinets.filter(
                (patient) => patient._id !== action.payload.patientId
              );
             
              state.successMessage = action.payload.message;
            })
            .addCase(deletePatients.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });

      }
    });

    export default PatinetSlice.reducer;