import React, { useState } from "react";
import cancelIcon from "../../../assets/cancel.png";
import messageIcon from "../../../assets/message (1).png";
import CallIcon from "../../../assets/message (2).png";

export function PatientInfoFieldDetails({ isEditMode }) {
  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [villageDetails, setVillageDetails] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");

  const handleClearInput = (setter) => {
    setter("");
  };

  const renderInputField = (label, value, setter, placeholder, type = "text", icon = null) => (
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">{label}</label>
      <div
        className={`relative w-full transition-all duration-300 ${
          isEditMode ? "animate-fadeIn" : "animate-fadeOut"
        }`}
      >
        {isEditMode ? (
          <input
            type={type}
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            placeholder={placeholder}
          />
        ) : (
          <div className="p-3 bg-transparent border-none break-words text-black max-w-[434px] flex justify-between items-center">
            <div className="flex-1">{value || "N/A"}</div>
            {icon && <img src={icon} alt={label} className="w-6 h-6 ml-2" />}
          </div>
        )}
        {value && isEditMode && (
          <button
            type="button"
            onClick={() => handleClearInput(setter)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black flex items-center justify-center"
          >
            <img
              src={cancelIcon}
              alt="cancel"
              className="w-5 h-5 object-contain"
            />
          </button>
        )}
      </div>
    </div>
  );
  

  return (
    <div className="flex flex-wrap gap-7 w-full">
      {/* Patient Name */}
      {renderInputField("Name", patientName, setPatientName, "Enter patient name")}

      {/* Date of Birth */}
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

      {/* Phone Number */}
      {renderInputField(
        "Phone Number",
        patientNumber,
        setPatientNumber,
        "Enter patient number",
        "tel",
        CallIcon // Pass CallIcon here for phone section
      )}

      {/* Age */}
      {renderInputField("Age", age, setAge, "Enter Age", "text")}

      {/* Email */}
      {renderInputField(
        "Email",
        email,
        setEmail,
        "Enter email",
        "email",
        messageIcon // Pass MessageIcon here for email section
      )}

      {/* Village Details */}
      {renderInputField("Village Details", villageDetails, setVillageDetails, "Enter village details")}

      {/* Gender */}
      <div className="flex flex-col items-start w-[45%]">
        <label className="text-gray-600 font-medium mb-2">Gender</label>
        <div
          className={`relative w-full transition-all duration-300 ${
            isEditMode ? "animate-fadeIn" : "animate-fadeOut"
          }`}
        >
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

      {/* Registration Date */}
      <div className="flex flex-col items-start w-[45%]">
        <label className="text-gray-600 font-medium mb-2">Registration Date</label>
        <div
          className={`relative w-full transition-all duration-300 ${
            isEditMode ? "animate-fadeIn" : "animate-fadeOut"
          }`}
        >
          {isEditMode ? (
            <input
              type="date"
              value={registrationDate}
              onChange={(e) => setRegistrationDate(e.target.value)}
              className="w-full p-3 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            />
          ) : (
            <div className="p-3 bg-transparent border-none text-black">
              {registrationDate || "N/A"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
