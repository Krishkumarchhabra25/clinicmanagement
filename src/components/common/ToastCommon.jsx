import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const notifySuccess = (message) => {
    toast.dismiss(); // Clear existing toasts
    toast.success(message, { toastId: "patient-success-toast" });
  };
  
  // Utility function to handle error toast
 export  const notifyError = (message) => {
    toast.dismiss(); // Clear existing toasts
    toast.error(message, { toastId: "patient-error-toast" });
  };