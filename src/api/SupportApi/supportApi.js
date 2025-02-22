// src/api/supportAPI.js
import axiosInstance from "../axiosInstance";

// Get support profile (email, password, permissions, etc.)
export const getSupportProfile = async () => {
  try {
    const response = await axiosInstance.get("/support/support/profile");
    return response.data; // Expected: { success: true, data: { email, password, permissions, ... } }
  } catch (error) {
    throw error.response?.data || "Something went wrong while fetching support profile";
  }
};

// Update support permissions
export const updateSupportPermissions = async (permissionsData) => {
  try {
    // Ensure the payload is sent as JSON with the proper header.
    const response = await axiosInstance.put(
      "/admin/update-support-permissions",
      JSON.stringify(permissionsData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Expected: { success: true, message, data: { patients, appointments, availability } }
  } catch (error) {
    throw error.response?.data || "Something went wrong while updating support permissions";
  }
};
