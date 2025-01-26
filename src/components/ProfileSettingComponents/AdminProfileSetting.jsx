
import React, { useState } from 'react'
import cancelIcon from "../../assets/cancel.png";
import messageIcon from "../../assets/message (1).png";
import CallIcon from "../../assets/message (2).png";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // For toast notifications

export function AdminProfileSetting() {
  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [villageDetails, setVillageDetails] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);

  // Validation function
  const validateFields = () => {
    if (!patientName) {
      toast.error("Patient name is required.");
      return false;
    }

    if (!patientNumber) {
      toast.error("Patient number is required.");
      return false;
    } else if (!/^\d+$/.test(patientNumber)) {
      toast.error("Patient number must be numeric.");
      return false;
    }

    if (!gender) {
      toast.error("Gender is required.");
      return false;
    }

    if (!age) {
      toast.error("Age is required.");
      return false;
    } else if (!/^\d+$/.test(age)) {
      toast.error("Age must be numeric.");
      return false;
    }

    if (villageDetails.length > 60) {
      toast.error("Village details can be a maximum of 60 characters.");
      return false;
    }

    if (!email) {
      toast.error("Email is required.");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email address.");
      return false;
    }

    if (!dob) {
      toast.error("Date of birth is required.");
      return false;
    }

    if (!registrationDate) {
      toast.error("Registration date is required.");
      return false;
    }

    // If all validations pass
    return true;
  };

  // Reset all input fields
  const handleClearAllFields = () => {
    setPatientName("");
    setPatientNumber("");
    setGender("");
    setAge("");
    setVillageDetails("");
    setEmail("");
    setDob("");
    setRegistrationDate("");
    toast.info("All fields have been cleared.");
  };

  // Save the changes after validation
  const handleSave = () => {
    if (validateFields()) {
      toast.success("Patient information saved successfully!");
      console.log({
        patientName,
        patientNumber,
        gender,
        age,
        villageDetails,
        email,
        dob,
        registrationDate,
      });
      setIsEditMode(false);
    }
  };

  // Toggle Edit Mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Cancel Edit Mode
  const cancelEdit = () => {
    setIsEditMode(false);
    // Optionally reset the form fields if needed
    handleClearAllFields();
  };

  const renderInputField = (label, value, setter, placeholder, type = "text") => (
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">{label}</label>
      <div className="relative w-full">
        {isEditMode ? (
          <input
            type={type}
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            placeholder={placeholder}
          />
        ) : (
          <div className="p-3 bg-transparent border-none break-words text-black max-w-[434px]">
            {value || "N/A"}
          </div>
        )}
              {value && isEditMode && (
                  <button
                    type="button"
                  
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black"
                  >
                    <img
                      src={cancelIcon} // Replace with your cancel icon path
                      alt="cancel"
                      className="w-5 h-5 object-contain"
                    />
                  </button>
                )}
      </div>
    </div>
  );

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
                onClick={cancelEdit}
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
              className="p-2 rounded-full hover:bg-gray-200 transition"
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
        {renderInputField("Name", patientName, setPatientName, "Enter patient name")}
        {renderInputField("Phone Number", patientNumber, setPatientNumber, "Enter patient number", "tel")}
        {renderInputField("Email", email, setEmail, "Enter email", "email")}
        {renderInputField("Age", age, setAge, "Enter age", "number")}
        {renderInputField("Village Details", villageDetails, setVillageDetails, "Enter village details")}
        {renderInputField("Date of Birth", dob, setDob, "", "date")}
        {renderInputField("Registration Date", registrationDate, setRegistrationDate, "", "date")}
      </div>
    </div>
  );
}
