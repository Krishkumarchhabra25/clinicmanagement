import axiosInstance from "../axiosInstance";

export const getAllPatients = async(page=1)=>{
  try {
    const response = await axiosInstance.get(`/patient/all-patient?page=${page}`);
    return response.data;

  } catch (error) {
    throw error.response?.data || "Something went wrong"
  }
}