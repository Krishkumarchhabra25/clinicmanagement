import axiosInstance from "../axiosInstance";

export const getAllPatients = async(page=1)=>{
  try {
    const response = await axiosInstance.get(`/patient/all-patient?page=${page}`);
    return response.data;

  } catch (error) {
    throw error.response?.data || "Something went wrong"
  }
}

export const searchPatinets = async (params) => {
  try {
    const response = await axiosInstance.get(`/patient/search-patient`, {
      params, // params is an object with search criteria, page, limit, etc.
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Something went wrong";
  }
};

export const sortPatients = async (params)=>{
  try {
    const response = await axiosInstance.get(`/patient/sort-patient`,{
      params
    });
    return response.data;
  } catch (error) {
    console.log("error" ,error)
      throw error.response?.data || "Something went wrong"
  }
}

export const addPatient = async(patinetData)=>{
  try {
    const response = await axiosInstance.post(`/patient/add-patient`, patinetData);
    return response.data
  } catch (error) {
    throw error.response?.data || "Something went wrong"
  }
}

export const exportPatients = async () => {
  try {
    const response = await axiosInstance.get(`/patient/export-patient`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Export error:", error);
    throw error.response?.data || "Something went wrong";
  }
};