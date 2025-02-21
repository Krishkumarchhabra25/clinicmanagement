import axiosInstance from "../axiosInstance"

export const getAllAvailability = async()=>{
    try {
        const response = await axiosInstance.get("/availability/get-all");
        return response.data
    } catch (error) {
       throw error.response?.data   || "Something went wrong"
    }
    
}

export const updateAvailability = async(id, updateavailability)=>{
   try {
    const response = await axiosInstance.put(`/availability/update/${id}` , updateavailability);
    return response.data
   } catch (error) {
      throw error.response?.dta || "Somethimg Went wrong"
   }
}