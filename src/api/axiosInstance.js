import axios from "axios";

const API_URL = "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {    
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
