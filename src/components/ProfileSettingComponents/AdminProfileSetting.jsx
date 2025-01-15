
import React, { useState } from 'react'
import cancelIcon from "../../assets/cancel.png";
import messageIcon from "../../assets/message (1).png";
import CallIcon from "../../assets/message (2).png";


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

  const handleClearInput = (setter) => {
    setter("");
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
  };

  const saveChanges = () => {
    setIsEditMode(false);
    // Optionally handle save logic here (e.g., API call)
  };

  const renderInputField = (label, value, setter, placeholder, type = "text", icon = null) => (
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">{label}</label>
      <div className={`relative w-full transition-all duration-300`}>
        {isEditMode ? (
          <div className="relative">
            <input
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
              placeholder={placeholder}
            />
            {value && (
              <button
                type="button"
                onClick={() => handleClearInput(setter)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black flex items-center justify-center"
              >
                <img
                  src={cancelIcon}
                  alt="Clear"
                  className="w-5 h-5 object-contain"
                />
              </button>
            )}
          </div>
        ) : (
          <div className="p-3 bg-transparent border-none break-words text-black max-w-[434px] flex justify-between items-center">
            <div className="flex-1">{value || "N/A"}</div>
            {icon && <img src={icon} alt={label} className="w-6 h-6 ml-2" />}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* Support Management */}
      <div className="flex items-center justify-between mx-2 mb-6">
        <div className="flex items-center">
          <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
          <h1 className="text-[24px] text-[#FF7B54] mx-2">Support Management</h1>
        </div>
      </div>

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
                onClick={saveChanges}
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

      <div className="flex flex-wrap gap-7 w-full">
        {renderInputField("Name", patientName, setPatientName, "Enter patient name")}
        {renderInputField("Phone Number", patientNumber, setPatientNumber, "Enter patient number", "tel")}
        {renderInputField("Email", email, setEmail, "Enter email", "email")}
        {renderInputField("Age", age, setAge, "Enter age", "number")}
        {renderInputField("Village Details", villageDetails, setVillageDetails, "Enter village details")}
           <div className="flex flex-col items-start w-[45%]">
        <label className="text-gray-600 font-medium mb-2">Date of Birth</label>
        <div
          className={`relative w-full transition-all duration-300 ${
            isEditMode ? "animate-fadeIn" : "animate-fadeOut"
          }`}
        >
          {isEditMode ? (
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            />
          ) : (
            <div className="p-3 bg-transparent border-none text-black">
              {dob || "N/A"}
            </div>
          )}
        </div>
      </div>
        <div className="flex flex-col items-start w-[45%]">
          <label className="text-gray-600 font-medium mb-2">Gender</label>
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
            <div className="p-3 bg-transparent border-none text-black">{gender || "N/A"}</div>
          )}
        </div>
      </div>
    </div>
  );
}
