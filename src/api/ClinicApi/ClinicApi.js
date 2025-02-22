import axiosInstance from "../axiosInstance"

export const AddBasicInfoOfClinic = async(basicInfoData)=>{
    try {
         const response = await axiosInstance.post(`clinic/add-basic-info` , basicInfoData);
         return response.data
    } catch (error) {
        throw error.response?.data || "Something went wrong"
    }
}

export const updateBasicInfoClinic = async(updatebasicInfoData)=>{
    try {
        const response = await axiosInstance.put('clinic/update-basic-info', updatebasicInfoData);
        return response.data
    } catch (error) {
        throw error.response?.data || "Something went wrong"

    }
}
export const AddAddressInfoOfClinic = async(AddressInfoData)=>{
    try {
         const response = await axiosInstance.post(`/clinic/add-address` , AddressInfoData);
         return response.data
    } catch (error) {
        throw error.response?.data || "Something went wrong"
    }
}

export const updateAddressInfoClinic = async(updateAdressInfoData)=>{
    try {
        const response = await axiosInstance.put('/clinic/update-address', updateAdressInfoData);
        return response.data
    } catch (error) {
        throw error.response?.data || "Something went wrong"

    }
}

export const getAllClinicData = async()=>{
    try {
        const response = await axiosInstance.get('/clinic/clinic');
        return response.data
    } catch (error) {
        throw error.response?.data || "Something went wrong"

    }
}
