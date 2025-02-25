import axiosInstance from "../axiosInstance";

export const sendOtpApi = async (email) => {
    return axiosInstance.post("/otp/send-otp", { email });
  };