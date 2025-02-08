// src/utils/toastHelper.js
import { toast } from "react-toastify";

export const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000, // auto close after 3 seconds
    pauseOnHover: true,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  });
};
