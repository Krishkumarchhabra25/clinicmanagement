import React, { useState } from 'react'
import cancelIcon from "../../assets/cancel.png";
const ClinicProfileSetting = () => {
  // States for Basic Information
  const [clinicName, setClinicName] = useState("");
  const [tagline, setTagline] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

  // States for Address Details
  const [streetAddress1, setStreetAddress1] = useState("");
  const [streetAddress2, setStreetAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [isEditModeBasic, setIsEditModeBasic] = useState(false);
  const [isEditModeAddress, setIsEditModeAddress] = useState(false);

  const handleClearInput = (setter) => {
    setter("");
  };

  const toggleEditMode = () => {
    setIsEditModeBasic(!isEditModeBasic);
  };
  const toggleEditModeAddress = () => {
    setIsEditModeAddress(!isEditModeAddress);
  };

  const cancelEdit = () => {
    setIsEditModeBasic(false);
  };
  const cancelEditAddreess = () => {
    setIsEditModeAddress(false);
  };

  const saveChanges = () => {
    setIsEditModeBasic(false);
    // Optionally handle save logic here (e.g., API call)
  };
  const saveChangesAddreess = () => {
    setIsEditModeAddress(false);
    // Optionally handle save logic here (e.g., API call)
  };

  // Render input field for Basic Information
  const renderBasicInfoField = (label, value, setter, placeholder, type = "text", icon = null) => (
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">{label}</label>
      <div className={`relative w-full transition-all duration-300`}>
        {isEditModeBasic ? (
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

  // Render input field for Address Details
  const renderAddressField = (label, value, setter, placeholder, type = "text") => (
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">{label}</label>
      <div className={`relative w-full transition-all duration-300`}>
        {isEditModeAddress ? (
          <input
            type={type}
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="w-full p-3 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            placeholder={placeholder}
          />
        ) : (
          <div className="p-3 bg-transparent border-none break-words text-black max-w-[434px]">
            {value || "N/A"}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* Basic Information */}
      <div className="flex items-center justify-between mx-2 mb-6">
        <div className="flex items-center">
          <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
          <h1 className="text-[24px] text-[#FF7B54] mx-2">Basic Information</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEditModeBasic ? (
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
              aria-label="Edit Basic Information"
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
        {renderBasicInfoField("Clinic Name", clinicName, setClinicName, "Enter clinic name")}
        {renderBasicInfoField("Tagline", tagline, setTagline, "Enter tagline")}
        {renderBasicInfoField("Company Logo", companyLogo, setCompanyLogo, "Enter company logo URL")}
      </div>

      {/* Address Details */}
      <div className="flex items-center justify-between mx-2 mb-6 mt-10 ">
        <div className="flex items-center">
          <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
          <h1 className="text-[24px] text-[#FF7B54] mx-2">Address Details</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEditModeAddress ? (
            <>
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                onClick={cancelEditAddreess}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#FF7B54] text-white rounded-lg hover:bg-[#e06a45] transition"
                onClick={saveChangesAddreess}
              >
                Save
              </button>
            </>
          ) : (
            <button
              aria-label="Edit Address Details"
              className="p-2 rounded-full hover:bg-gray-200 transition"
              onClick={toggleEditModeAddress}
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
        {renderAddressField("Street Address-1", streetAddress1, setStreetAddress1, "Enter street address 1")}
        {renderAddressField("Street Address-2", streetAddress2, setStreetAddress2, "Enter street address 2")}
        {renderAddressField("City/Town", city, setCity, "Enter city")}
        {renderAddressField("Postal/Zip Code", postalCode, setPostalCode, "Enter postal/zip code", "number")}
        {renderAddressField("State", state, setState, "Enter state")}
        {renderAddressField("Country", country, setCountry, "Enter country")}

     </div>
    </div>
  )
}

export default ClinicProfileSetting
