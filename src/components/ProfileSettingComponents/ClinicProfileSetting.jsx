import React, { useState } from 'react';
import cancelIcon from "../../assets/cancel.png";
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ClinicProfileSetting = () => {
  const { state } = useLocation();
  const [editModes, setEditModes] = useState({
    basicInfo: state?.isEditMode || false,
    addressInfo: state?.isEditMode || false,
  });

  const [formData, setFormData] = useState({
    basicInfo: {
      clinicName: "",
      tagline: "",
      companyLogo: ""
    },
    addressInfo: {
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      postalCode: "",
      state: "",
      country: ""
    }
  });

  // Generic function for handling input changes
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Validation for basic information
  const validateBasicInfo = () => {
    let isValid = true;
    ['clinicName', 'tagline', 'companyLogo'].forEach(field => {
      if (!formData.basicInfo[field]) {
        toast.error(`${field.replace(/([A-Z])/g, ' $1').trim()} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };

  // Validation for address information
  const validateAddressInfo = () => {
    let isValid = true;
    Object.keys(formData.addressInfo).forEach(field => {
      if (!formData.addressInfo[field]) {
        toast.error(`${field.replace(/([A-Z])/g, ' $1').trim()} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };

  // Generic save handler
  const handleSave = (section) => {
    const validators = {
      'basicInfo': validateBasicInfo,
      'addressInfo': validateAddressInfo
    };
    
    if (validators[section]()) {
      setEditModes(prev => ({ ...prev, [section]: false }));
      toast.success(`${section.replace(/([A-Z])/g, ' $1').trim()} saved successfully!`);
    }
  };

  // Generic cancel handler
  const handleCancel = (section) => {
    setEditModes(prev => ({ ...prev, [section]: false }));
  };

  // Generic field cancel handler
  const handleFieldCancel = (section, field) => {
    handleInputChange(section, field, "");
  };

  // Render input field for both sections
  const renderField = (section, label, field, placeholder, type = "text") => (
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2" aria-label={label}>{label}</label>
      <div className="relative w-full">
        {editModes[section] ? (
          <input
            type={type}
            value={formData[section][field]}
            onChange={(e) => handleInputChange(section, field, e.target.value)}
            className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            placeholder={placeholder}
            aria-label={`Edit ${label}`}
          />
        ) : (
          <div className="p-3 bg-transparent border-none break-words text-black max-w-[434px]" 
               aria-label={`${label}: ${formData[section][field] || 'Not Provided'}`}>
            {formData[section][field] || "N/A"}
          </div>
        )}
        {formData[section][field] && editModes[section] && (
          <button
            type="button"
            onClick={() => handleFieldCancel(section, field)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black"
            aria-label={`Clear ${label}`}
          >
            <img src={cancelIcon} alt="cancel" className="w-5 h-5 object-contain" />
          </button>
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
          {editModes.basicInfo ? (
            <>
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                onClick={() => handleCancel('basicInfo')}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#FF7B54] text-white rounded-lg hover:bg-[#e06a45] transition"
                onClick={() => handleSave('basicInfo')}
              >
                Save
              </button>
            </>
          ) : (
            <button
              aria-label="Edit Basic Information"
              className="p-2 rounded-full hover:bg-gray-200 transition"
              onClick={() => setEditModes(prev => ({ ...prev, basicInfo: true }))}
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
        {renderField('basicInfo', "Clinic Name", "clinicName", "Enter clinic name")}
        {renderField('basicInfo', "Tagline", "tagline", "Enter tagline")}
        {renderField('basicInfo', "Company Logo", "companyLogo", "Enter company logo URL")}
      </div>

      {/* Address Details */}
      <div className="flex items-center justify-between mx-2 mb-6 mt-10 ">
        <div className="flex items-center">
          <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
          <h1 className="text-[24px] text-[#FF7B54] mx-2">Address Details</h1>
        </div>
        <div className="flex items-center gap-2">
          {editModes.addressInfo ? (
            <>
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                onClick={() => handleCancel('addressInfo')}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#FF7B54] text-white rounded-lg hover:bg-[#e06a45] transition"
                onClick={() => handleSave('addressInfo')}
              >
                Save
              </button>
            </>
          ) : (
            <button
              aria-label="Edit Address Details"
              className="p-2 rounded-full hover:bg-gray-200 transition"
              onClick={() => setEditModes(prev => ({ ...prev, addressInfo: true }))}
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
        {renderField('addressInfo', "Street Address-1", "streetAddress1", "Enter street address 1")}
        {renderField('addressInfo', "Street Address-2", "streetAddress2", "Enter street address 2")}
        {renderField('addressInfo', "City/Town", "city", "Enter city")}
        {renderField('addressInfo', "Postal/Zip Code", "postalCode", "Enter postal/zip code", "number")}
        {renderField('addressInfo', "State", "state", "Enter state")}
        {renderField('addressInfo', "Country", "country", "Enter country")}
      </div>

      <ToastContainer />
    </div>
  );
}

export default ClinicProfileSetting;