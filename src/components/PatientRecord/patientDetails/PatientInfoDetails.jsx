import React, { useEffect, useState } from "react";
import {  toast } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import cancelIcon from "../../../assets/cancel.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientDetails, UpdatePatientsDetailsData } from "../../../redux/slices/patinetSlice";
export default function PatientDetailsComponent() {
  const [activeTab, setActiveTab] = useState("Patient Information");
  const { state } = useLocation();
  const [isEditMode, setIsEditMode] = useState(state?.isEditMode || false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
 const dispatch = useDispatch()
  const {id} = useParams();

  useEffect(()=>{
    if(id){
       dispatch(fetchPatientDetails(id))
    }
  },[dispatch , id])

  const {patientsDetails , error , loading}=useSelector((state)=>state.patients);


  

  const [formData, setFormData] = useState({
    patientname: "",
    phonenumber: "",
    gender: "",
    age: "",
    village: "",
    email: "",
    dob: "",
    registrationDate: "",
  });

  const handleInputChange = (field, value) => {
    let processedValue = value;

    if (field === 'phonenumber') {
      processedValue = processedValue.replace(/\D/g, '').slice(0, 10);
    }
    
    if (field === 'age') {
      processedValue = processedValue.replace(/\D/g, '').slice(0, 2);
    }

    setFormData((prev) => ({ ...prev, [field]: processedValue }));
  };

  const handleBackButtonClick = () => {
    navigate("/PatientRecord");
  };

  const handleCancelField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
  };



  const showError = (message, toastId) => {
    if (!toast.isActive(toastId)) {
      toast.error(message, { toastId });
    }
  };

  const validateFields = () => {
    if (!formData.patientname.trim()) {
      showError("Patient name is required.", 'name-error');
      return false;
    }
  
    if (!formData.phonenumber) {
      showError("Phone number is required.", 'phone-required');
      return false;
    } else if (formData.phonenumber.length !== 10) {
      showError("Phone number must be 10 digits.", 'phone-length');
      return false;
    }
  
    if (!formData.gender) {
      showError("Gender is required.", 'gender-error');
      return false;
    }
  
    if (!formData.age) {
      showError("Age is required.", 'age-required');
      return false;
    } else {
      const ageNum = parseInt(formData.age, 10);
      if (ageNum < 1 || ageNum > 99) {
        showError("Age must be between 1 and 99.", 'age-range');
        return false;
      }
    }
  
    if (!formData.village.trim()) {
      showError("Village details are required.", 'village-error');
      return false;
    }
  
    if (!formData.email) {
      showError("Email is required.", 'email-required');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showError("Invalid email address.", 'email-invalid');
      return false;
    }
  
    if (!formData.dob) {
      showError("Date of Birth is required.", 'dob-error');
      return false;
    }
  
    if (!formData.registrationDate) {
      showError("Registration date is required.", 'registration-error');
      return false;
    }
  
    return true;
  };
  
  useEffect(() => {
    if (patientsDetails) {
      setFormData({
        patientname: patientsDetails.patientname || "",
        phonenumber: patientsDetails.phonenumber || "",
        gender: patientsDetails.gender || "",
        age:patientsDetails.age || "",
        village: patientsDetails.village || "",
        email: patientsDetails.email || "",
        dob: patientsDetails.dob ? new Date(patientsDetails.dob).toISOString().split("T")[0] : "",
        registrationDate: patientsDetails.createdAt ? new Date(patientsDetails.createdAt).toISOString().split("T")[0] : "",
        remarks: patientsDetails.remarks || "",
      });
    }
  }, [patientsDetails]);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    console.log("Attempting update with formData:", formData);

    const isValid = validateFields();
    if (isValid) {
      try {
        const result = await dispatch(
          UpdatePatientsDetailsData({
            patientId: patientsDetails._id,
            updatedData: formData,
          })
        ).unwrap();
        console.log("Update successful, result:", result);
        toast.success("Update successfully!");
        // Navigate after update
        navigate("/PatientRecord");
      } catch (error) {
        console.error("Update failed:", error);
        toast.error("Update failed!");
      } finally {
        setIsSaving(false);
        setIsEditMode(false);
      }
    } else {
      console.log("Validation failed, update aborted.");
      setIsSaving(false);
    }
  }

  const renderInputField = (label, field, placeholder, type = "text") => (
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">{label}</label>
      <div className="relative w-full">
        {isEditMode ? (
          <input
            type={type}
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            placeholder={placeholder}
            maxLength={
              field === 'phonenumber' ? 10 : 
              field === 'age' ? 2 : 
              undefined
            }
            inputMode={
              (field === 'phonenumber' || field === 'age') ? 'numeric' : undefined
            }
            disabled={isSaving}
          />
        ) : (
          <div className="p-3 bg-transparent border-none break-words text-black max-w-[434px]">
            {formData[field] || "N/A"}
          </div>
        )}
        {formData[field] && isEditMode && (
          <button
            type="button"
            onClick={() => handleCancelField(field)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black"
            disabled={isSaving}
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
    if (!isSaving) {
      setIsEditMode((prev) => !prev);
    }
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
                {formData.patientname || "Patient Name"}
              </div>
              <div className="flex gap-3 mt-3 w-full text-xs text-neutral-500">
                <div className="px-4 py-2 bg-stone-100">
                  {formData.phonenumber || "#PatientNumber"}
                </div>
                <div className="px-4 py-2 bg-stone-100">Registered By ADMIN</div>
              </div>
            </div>
          </div>

          {/* Edit Mode Controls */}
          <div className="absolute right-10 top-6 flex gap-3">
            {isEditMode ? (
              <>
                <button
                  onClick={() => !isSaving && setIsEditMode(false)}
                  className="pr-[20px] pl-[20px] pt-[10px] pb-[10px] bg-[#F4F4F4] text-black rounded-lg disabled:opacity-50"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="pr-[20px] pl-[20px] pt-[10px] pb-[10px] bg-[#FF7B54] text-white rounded-lg text-[18px] disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : 'Save'}
                </button>
              </>
            ) : (
              <button
                onClick={toggleEditMode}
                className="px-2.5 py-3 border border-solid border-stone-300 rounded w-12 hover:bg-gray-50"
                disabled={isSaving}
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

        {/* Patient Details */}
       {/* Patient Details */}
<div className="flex flex-col mt-3 px-10 bg-white rounded-b-3xl p-4">
  {activeTab === "Patient Information" && (
    <div className="flex flex-wrap gap-7">
      {renderInputField("Name", "patientname", "Enter patient name")}
      {renderInputField("Date of Birth", "dob", "", "date")}
      {renderInputField("Phone Number", "phonenumber", "Enter 10-digit number", "tel")}
      {renderInputField("Age", "age", "Enter age (1-99)", "number")}
      {renderInputField("Email", "email", "Enter email", "email")}
      {renderInputField("Village Details", "village", "Enter village details")}
      {renderInputField("Registration Date", "registrationDate", "", "date")}
      
      <div className="flex flex-col items-start w-[45%]">
        <label className="text-gray-600 font-medium mb-2">Gender</label>
        <div className="relative w-full">
          {isEditMode ? (
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="w-full p-3 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
              disabled={isSaving}
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
    </div>
  );
}