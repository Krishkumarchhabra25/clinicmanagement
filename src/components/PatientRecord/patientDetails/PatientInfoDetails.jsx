import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import cancelIcon from "../../../assets/cancel.png";
export default function PatientDetailsComponent() {
  const [activeTab, setActiveTab] = useState("Patient Information");
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackButtonClick = () => {
    navigate("/PatientRecord");
  };

  const handleCancelField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
  };
  const handleSave = () => {
    if (validateFields()) {
      setIsEditMode(false);
      toast.success("Patient information saved successfully!");
    }
  };

  const validateFields = () => {
    if (!formData.patientName) {
      toast.error("Patient name is required.");
      return false;
    }
    if (!/^\d+$/.test(formData.patientNumber)) {
      toast.error("Patient number must be numeric.");
      return false;
    }
    if (!formData.age || !/^\d+$/.test(formData.age)) {
      toast.error("Age must be numeric.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email address.");
      return false;
    }
    return true;
  };

  const renderInputField = (label, field, placeholder, type = "text") => (
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <ToastContainer />
      <label className="text-gray-600 font-medium mb-1 pl-2">{label}</label>
      <div className="relative w-full">
        {isEditMode ? (
          <input
            type={type}
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            placeholder={placeholder}
          />
        ) : (
          <div className="p-3 bg-transparent border-none break-words text-black max-w-[434px]">
            {formData[field] || "N/A"}
          </div>
        )}
        {formData[field] && isEditMode && (
          <button
            type="button"
            onClick={() => handleCancelField(field)} // Pass the field name here
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black"
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

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between px-4 pb-4">
        <h1 className="text-[25px] text-[#FF7B54] font-medium" style={{ fontFamily: "Outfit" }}>
          <button onClick={handleBackButtonClick}>Patient Records </button>
          <span> &gt; Patient Details</span>
        </h1>
      </div>

      <div className="flex overflow-hidden flex-col bg-white rounded-t-3xl max-md:pb-24">
        <div className="flex flex-wrap gap-10 justify-between items-center px-10 mt-6 relative">
          {/* Patient Info */}
          <div className="flex gap-3 items-start my-auto min-w-[240px] w-[341px]">
            <div
              className="flex gap-2 items-center p-2.5 bg-red-400 rounded-2xl h-[35px] min-h-[35px] w-[35px]"
              onClick={handleBackButtonClick}
            >
              <button>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b29444a3e96d89b2c03d89e4ef1f90395dc02fa16d05f0cd2dd52a98c8cd9cca"
                  alt="back"
                  className="object-contain w-[17px]"
                />
              </button>
            </div>
            <div className="flex flex-col flex-1 shrink min-w-[240px]">
              <div className="text-2xl font-medium text-gray-800">
                {formData.patientName || "Patient Name"}
              </div>
              <div className="flex gap-3 mt-3 w-full text-xs text-neutral-500">
                <div className="px-4 py-2 bg-stone-100">
                  {formData.patientNumber || "#PatientNumber"}
                </div>
                <div className="px-4 py-2 bg-stone-100">Registered By ADMIN</div>
              </div>
            </div>
          </div>

          {/* Edit Mode Controls (Top Right Corner) */}
          <div className="absolute right-10 top-6 flex gap-3">
            {isEditMode ? (
              <>
                <button
                  onClick={() => setIsEditMode(false)}
                  className="pr-[20px] pl-[20px] pt-[10px] pb-[10px] bg-[#F4F4F4] text-black rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="pr-[20px] pl-[20px] pt-[10px] pb-[10px] bg-[#FF7B54] text-white rounded-lg text-[18px]"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={toggleEditMode}
                className="px-2.5 py-3 border border-solid border-stone-300 rounded w-12"
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/27b25ccc7cf50ff795844cd0bf3810da438b9aba9011a555a2d83af0274ad469"
                  alt="edit"
                  className="w-6"
                />
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-10 mt-12 px-10 text-lg font-medium">
          <button
            className={`${activeTab === "Patient Information" ? "text-red-400 border-b-4 border-red-400" : "text-zinc-400"} pb-2`}
            onClick={() => setActiveTab("Patient Information")}
          >
            Patient Information
          </button>
          <button
            className={`${activeTab === "Medical Preferences" ? "text-red-400 border-b-4 border-red-400" : "text-zinc-400"} pb-2`}
            onClick={() => setActiveTab("Medical Preferences")}
          >
            Medical Preferences
          </button>
        </div>
             </div>
        {/* Patient Details */}
        <div className="flex flex-col mt-3 px-10 bg-white rounded-b-3xl p-4">
          {activeTab === "Patient Information" && (
            <div className="flex flex-wrap gap-7">
              {renderInputField("Name", "patientName", "Enter patient name")}
              {renderInputField("Phone Number", "patientNumber", "Enter patient number", "tel")}
              {renderInputField("Age", "age", "Enter age", "number")}
              {renderInputField("Email", "email", "Enter email", "email")}
              {renderInputField("Village Details", "villageDetails", "Enter village details")}
              {renderInputField("Date of Birth", "dob", "", "date")}
              {renderInputField("Registration Date", "registrationDate", "", "date")}
              <div className="flex flex-col items-start w-[45%]">
                <label className="text-gray-600 font-medium mb-2">Gender</label>
                <div className="relative w-full">
                  {isEditMode ? (
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      className="w-full p-3 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-transparent border-none text-black">
                      {formData.gender || "N/A"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
 
    </div>
  );
}
