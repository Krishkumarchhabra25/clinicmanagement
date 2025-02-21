// src/api/adminProfileApi.js
import axiosInstance from "../axiosInstance";

export const fetchAdminProfile = async () => {
  try {
    const response = await axiosInstance.get('/admin/admin-profile');

    return response.data.data;
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    throw error;
  }
};

export const updatePersonalInfo = async (personalInfoData) => {
  try {
    const response = await axiosInstance.put('/admin/personal-info', personalInfoData);
 
    return response.data.data;
  } catch (error) {
    console.error("Error updating personal info:", error);
    throw error;
  }
};
