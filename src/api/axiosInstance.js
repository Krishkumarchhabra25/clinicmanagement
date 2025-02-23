import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://clinicmanagement-backend-12ng.vercel.app/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Set token from cookies on load
const token = Cookies.get("token");
if (token) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export default axiosInstance;
