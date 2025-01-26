import React, { useState } from "react";
import cancelIcon from "../../../assets/cancel.png";
import messageIcon from "../../../assets/message (1).png";
import CallIcon from "../../../assets/message (2).png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function PatientInfoFieldDetails({ isEditMode }) {
  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [villageDetails, setVillageDetails] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");

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
    }
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
            onClick={handleClearAllFields}
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
    <div className="flex flex-col gap-7 w-full">
    <ToastContainer />

    {/* Input Fields */}
    <div className="flex flex-wrap gap-7">
      {renderInputField("Name", patientName, setPatientName, "Enter patient name")}
      {renderInputField("Phone Number", patientNumber, setPatientNumber, "Enter patient number", "tel")}
      {renderInputField("Age", age, setAge, "Enter Age", "text")}
      {renderInputField("Email", email, setEmail, "Enter email", "email")}
      {renderInputField("Village Details", villageDetails, setVillageDetails, "Enter village details")}
      
      {/* Gender */}
      <div className="flex flex-col items-start w-[45%]">
        <label className="text-gray-600 font-medium mb-2">Gender</label>
        <div className="relative w-full">
          {isEditMode ? (
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <div className="p-3 bg-transparent border-none text-black">
              {gender || "N/A"}
            </div>
          )}
        </div>
      </div>

      {renderInputField("Date of Birth", dob, setDob, "", "date")}
      {renderInputField("Registration Date", registrationDate, setRegistrationDate, "", "date")}
    </div>

    {/* Buttons */}
    <div className="flex justify-end gap-4 mt-6">
      <button
        onClick={handleClearAllFields}
        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
      >
        Cancel
      </button>
      <button
        onClick={handleSave}
        className="px-6 py-2 bg-[#FF7B54] text-white rounded-md hover:bg-[#e76a48]"
      >
        Save
      </button>
    </div>
  </div>
  );
}