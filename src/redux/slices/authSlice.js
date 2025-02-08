import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response  = await axiosInstance.post("/admin/login-admin" , credentials);
            if(response.data.success){
                return { isAuthenticated: true, message: response.data.message };
            }else{
                return rejectWithValue(response.data.message || "Login Failed");
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
              );
        }
    }
);


const authSlice = createSlice({
    name:"auth",
    initialState:{
        isAuthenticated: false,
        loading: false,
        error: null,
        message: null,
    },
    reducers:{
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.message = null;
          },
         
          setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
          },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.message = action.payload.message;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
})

export default authSlice.reducer;