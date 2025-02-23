import React, { useEffect, useState } from 'react';
import cancelIcon from "../../assets/cancel.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { getAdminProfile, updatePersonalInfoThunk } from '../../redux/slices/profileSettingSlice';
import { useDispatch , useSelector } from "react-redux";

export function AdminProfileSetting() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the profile data from Redux store
  const {profile} = useSelector((state) => state.profile);

  // Local state for the form data.
  const [formData, setFormData] = useState({
    patientName: "",       // Maps to fullname
    patientNumber: "",     // Maps to phoneNumber
    villageDetails: "",    // Maps to address
    dob: "",               // Maps to dateOfBirth (YYYY-MM-DD)
    gender: "",
    // Display-only fields
    age: "",
    email: "",
    registrationDate: "",
  });

  const [isEditMode, setIsEditMode] = useState(state?.isEditMode || false);

  // Fetch the admin profile on component mount.
  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  // When the profile is fetched, update the local form state.
  useEffect(() => {
    if (profile) {
      setFormData({
        patientName: profile.personalInfo?.fullname || "",
        patientNumber: profile.personalInfo?.phoneNumber || "",
        villageDetails: profile.personalInfo?.address || "",
        age:profile.personalInfo?.age || "",
        dob: profile.personalInfo?.dateOfBirth ? profile.personalInfo.dateOfBirth.split('T')[0] : "",
        gender: profile.personalInfo?.gender || "",
        email: profile.email || "",
        registrationDate: "", // Registration date not provided by API
      });
    }
  }, [profile]);

  // Generic function for handling input changes.
  const handleInputChange = (field, value) => {
    let processedValue = value;

    // Input-specific processing.
    switch (field) {
      case 'patientNumber':
        // Allow only numbers and limit to 10 digits.
        processedValue = value.replace(/\D/g, '').slice(0, 10);
        break;
      case 'age':
        // Allow only numbers and limit to 2 digits.
        processedValue = value.replace(/\D/g, '').slice(0, 2);
        break;
      case 'patientName':
        // Allow only letters, spaces, apostrophes, and dashes.
        processedValue = value.replace(/[^a-zA-Z\s'-]/g, '');
        break;
      default:
        processedValue = value;
    }

    setFormData((prev) => ({ ...prev, [field]: processedValue }));
  };

  // Function for canceling a field's value.
  const handleCancelField = (field) => {
    handleInputChange(field, "");
  };

  // Validate required fields for personal info update.
  const validateFields = () => {
    toast.dismiss();
    const requiredFields = [
      { field: 'patientName', message: "Name is required." },
      { field: 'patientNumber', message: "Phone number is required." },
      { field: 'villageDetails', message: "Address is required." },
      { field: 'dob', message: "Date of birth is required." },
      {field:"age" , message:"Age is required"},
      { field: 'gender', message: "Gender is required." },
    ];

    for (const item of requiredFields) {
      if (!formData[item.field]) {
        toast.error(item.message, { toastId: "validation-error" });
        return false;
      }
    }

    // Validate that the phone number is numeric.
    if (!/^\d+$/.test(formData.patientNumber)) {
      toast.error("Phone number must be numeric.", { toastId: "validation-error" });
      return false;
    }

    return true;
  };

  // Save handler that calls the update API endpoint using try/catch.
  const handleSave = async () => {
    if (validateFields()) {
      try {
        // Map form fields to the API payload.
        const payload = {
          fullname: formData.patientName,
          phoneNumber: formData.patientNumber,
          address: formData.villageDetails,
          dateOfBirth: formData.dob,
          age:formData.age,
          gender: formData.gender,
        };
        const updatedInfo = await dispatch(updatePersonalInfoThunk(payload)).unwrap();

        // Optionally update local form data with API response.
        setFormData((prev) => ({
          ...prev,
          patientName: updatedInfo.fullname || prev.patientName,
          patientNumber: updatedInfo.phoneNumber || prev.patientNumber,
          villageDetails: updatedInfo.address || prev.villageDetails,
          age:updatedInfo.age || prev.age,
          dob: updatedInfo.dateOfBirth ? updatedInfo.dateOfBirth.split('T')[0] : prev.dob,
          gender: updatedInfo.gender || prev.gender,
        }));
        setIsEditMode(false);
        toast.success("Personal information updated successfully!");
      } catch (error) {
        console.error("Error updating personal info:", error);
        toast.error("Failed to update personal information.");
      }
    }
  };

  // Render function for input fields (supports both input and select).
  const renderField = (label, field, placeholder, type = "text") => (
    <div className="flex flex-col items-start w-full md:w-[45%] relative" key={field}>
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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <input
              type={type}
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
              placeholder={placeholder}
              inputMode={field === 'patientNumber' || field === 'age' ? 'numeric' : 'text'}
              maxLength={field === 'patientNumber' ? 10 : field === 'age' ? 2 : undefined}
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
    setIsEditMode((prev) => !prev);
  };

  return (
    <div>
      <ToastContainer />
      {/* Admin Management Header */}
      <div className="flex items-center justify-between mx-2 mb-6">
        <div className="flex items-center">
          <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
          <h1 className="text-[24px] text-[#FF7B54] mx-2">Admin Management</h1>
        </div>
      </div>

      {/* Profile Information Section */}
      <div className="flex flex-col mx-2 mb-10 gap-4">
        <label className="text-gray-600 font-medium mb-1">Username</label>
        <div className="bg-transparent border-none break-words text-black max-w-[434px] flex justify-between items-center">
          <div className="flex-1">{profile?.username || "N/A"}</div>
        </div>
        <label className="text-gray-600 font-medium mb-1">Password</label>
        <div className="bg-transparent border-none break-words text-black max-w-[434px] flex justify-between items-center">
          {/* Since password is typically not returned, adjust as needed */}
          <div className="flex-1">{profile?.password || "********"}</div>
        </div>
      </div>

      {/* Personal Information Section */}
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

      {/* Input Fields Section */}
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


