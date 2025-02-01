import React, { useState } from 'react';
import cancelIcon from "../../assets/cancel.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from 'react-router-dom';

export function AdminProfileSetting() {
  const { state } = useLocation();
  const [isEditMode, setIsEditMode] = useState(state?.isEditMode || false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    patientNumber: "",
    gender: "",
    age: "",
    villageDetails: "",
    email: "",
    dob: "",
    registrationDate: "",
  });

  // Generic function for handling input changes
  const handleInputChange = (field, value) => {
    let processedValue = value;
    
    // Add input type-specific handling
    switch(field) {
      case 'patientNumber':
        // Allow only numbers and limit to 10 digits
        processedValue = value.replace(/\D/g, '').slice(0, 10);
        break;
        
      case 'age':
        // Allow only numbers and limit to 2 digits
        processedValue = value.replace(/\D/g, '').slice(0, 2);
        break;
        
      case 'patientName':
        // Allow only letters and spaces
        processedValue = value.replace(/[^a-zA-Z\s'-]/g, '');
        break;
        
   
    }
  
    setFormData(prev => ({ ...prev, [field]: processedValue }));
  };
  // Generic function for canceling individual fields
  const handleCancelField = (field) => {
    handleInputChange(field, "");
  };

  const handleSave = () => {
    if (validateFields()) {
      setIsEditMode(false);
      toast.success("Patient information saved successfully!");
    }
  };

  // Consolidated validation for all fields
  const validateFields = () => {
    toast.dismiss(); // Dismiss existing toasts before showing a new one
  
    const requiredFields = [
      { field: 'patientName', message: " name is required." },
      { field: 'patientNumber', message: "Patient number is required." },
      { field: 'age', message: "Age is required." },
      { field: 'email', message: "Email is required." },
      { field: 'gender', message: "Gender is required." },
      { field: 'dob', message: "Date of birth is required." },
      { field: 'registrationDate', message: "Registration date is required." },
      { field: 'villageDetails', message: "Village details are required." }
    ];
  
    for (const item of requiredFields) {
      if (!formData[item.field]) {
        toast.error(item.message, { toastId: "validation-error" }); // Show only one toast at a time
        return false;
      }
    }
  
    // Additional specific format validations
    if (!/^\d+$/.test(formData.patientNumber)) {
      toast.error(" number must be numeric.", { toastId: "validation-error" });
      return false;
    }
    if (!/^\d+$/.test(formData.age)) {
      toast.error("Age must be numeric.", { toastId: "validation-error" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email address.", { toastId: "validation-error" });
      return false;
    }
  
    return true;
  };
  
  

  // Render function for input fields, including dropdown for gender
  const renderField = (label, field, placeholder, type = "text") => (
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">{label}</label>
      <div className="relative w-full">
        {isEditMode ? (
          type === "select" ? (
            <select
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-3 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            >
              <option value="">Select {label}</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <input
              type={type}
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
              placeholder={placeholder}
              inputMode={
                field === 'patientNumber' || field === 'age' 
                  ? 'numeric' 
                  : 'text'
              }
              maxLength={
                field === 'patientNumber' ? 10 :
                field === 'age' ? 2 :
                undefined
              }
            />
          )
        ) : (
          <div className="p-3 bg-transparent border-none break-words text-black max-w-[434px]">
            {formData[field] || "N/A"}
          </div>
        )}
        {formData[field] && isEditMode && type !== "select" && (
          <button
            type="button"
            onClick={() => handleCancelField(field)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black"
          >
            <img src={cancelIcon} alt="cancel" className="w-5 h-5 object-contain" />
          </button>
        )}
      </div>
    </div>
  );
  

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  return (
    <div>
      <ToastContainer />
      {/* Support Management */}
      <div className="flex items-center justify-between mx-2 mb-6">
        <div className="flex items-center">
          <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
          <h1 className="text-[24px] text-[#FF7B54] mx-2">Support Management</h1>
        </div>
      </div>

      {/* Profile Information */}
      <div className="flex flex-col mx-2 mb-10 gap-4">
        <label className="text-gray-600 font-medium mb-1">Username</label>
        <div className="bg-transparent border-none break-words text-black max-w-[434px] flex justify-between items-center">
          <div className="flex-1">Sarthak Ranjan Hota</div>
        </div>
        <label className="text-gray-600 font-medium mb-1">Password</label>
        <div className="bg-transparent border-none break-words text-black max-w-[434px] flex justify-between items-center">
          <div className="flex-1">sarthakranjanhota@gmail.com</div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="flex items-center justify-between mx-2 mb-6">
        <div className="flex items-center">
          <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
          <h1 className="text-[24px] text-[#FF7B54] mx-2">Personal Information</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEditMode ? (
            <>
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#FF7B54] text-white rounded-lg hover:bg-[#e06a45] transition"
                onClick={handleSave}
              >
                Save
              </button>
            </>
          ) : (
            <button
              aria-label="Edit Personal Information"
              className="px-2.5 py-3 border border-solid border-stone-300 rounded w-12"
              onClick={toggleEditMode}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/27b25ccc7cf50ff795844cd0bf3810da438b9aba9011a555a2d83af0274ad469"
                alt="Edit"
                className="w-6 h-6"
              />
            </button>
          )}
        </div>
      </div>

      {/* Input Fields */}
      <div className="flex flex-wrap gap-7 w-full">
        {renderField("Name", "patientName", "Enter patient name")}
        {renderField("Phone Number", "patientNumber", "Enter patient number", "tel")}
        {renderField("Age", "age", "Enter age", "number")}
        {renderField("Email", "email", "Enter email", "email")}
        {renderField("Village Details", "villageDetails", "Enter village details")}
        {renderField("Date of Birth", "dob", "", "date")}
        {renderField("Registration Date", "registrationDate", "", "date")}
        {renderField("Gender", "gender", "", "select")}
      </div>
    </div>
  );
}