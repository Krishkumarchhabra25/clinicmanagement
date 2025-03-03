import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import cancelIcon from "../../../assets/cancel.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientDetails, UpdatePatientsDetailsData } from "../../../redux/slices/patinetSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { notifyError, notifySuccess } from "../../common/ToastCommon";

export default function PatientDetailsComponent() {
  const [activeTab, setActiveTab] = useState("Patient Information");
  const { state } = useLocation();
  const [isEditMode, setIsEditMode] = useState(state?.isEditMode || false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchPatientDetails(id));
    }
  }, [dispatch, id]);

  const { patientsDetails } = useSelector((state) => state.patients);

  // Prepare initial values (enableReinitialize will update the form when data is loaded)
  const initialValues = {
    patientname: patientsDetails?.patientname || "",
    phonenumber: patientsDetails?.phonenumber || "",
    remarks: patientsDetails?.remarks || "",
    gender: patientsDetails?.gender || "",
    age: patientsDetails?.age || "",
    village: patientsDetails?.village || "",
    email: patientsDetails?.email || "",
    dob: patientsDetails?.dob
      ? new Date(patientsDetails.dob).toISOString().split("T")[0]
      : "",
    registrationDate: patientsDetails?.createdAt
      ? new Date(patientsDetails.createdAt).toISOString().split("T")[0]
      : "",
  };

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    patientname: Yup.string().trim().required("Patient name is required"),
    remarks: Yup.string().trim().required("remarks is required"),
    phonenumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.number()
      .required("Age is required")
      .min(1, "Age must be between 1 and 99")
      .max(99, "Age must be between 1 and 99"),
    village: Yup.string().trim().required("Village details are required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    dob: Yup.date().required("Date of Birth is required"),
    registrationDate: Yup.date().required("Registration date is required"),
  });

  // onSubmit handler
  const onSubmit = async (values) => {
    if (isSaving) return;
    setIsSaving(true);
    try {
  const response =    await dispatch(
        UpdatePatientsDetailsData({
          patientId: patientsDetails._id,
          updatedData: values,
        })
      ).unwrap();
      
      toast.success( response?.data?.message || "Update successfully!" ,"update-success");
      navigate("/PatientRecord");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error?.message || "Update failed!", "update-failed");
    } finally {
      setIsSaving(false);
      setIsEditMode(false);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between px-4 pb-4">
        <h1 className="text-[25px] text-[#FF7B54] font-medium" style={{ fontFamily: "Outfit" }}>
          <button onClick={() => navigate("/PatientRecord")}>Patient Records </button>
          <span> &gt; Patient Details</span>
        </h1>
      </div>

      <div className="flex overflow-hidden flex-col bg-white rounded-t-3xl max-md:pb-24">
        {/* Top Section: Patient Info and Edit Controls */}
        {isEditMode ? (
          // When in edit mode, wrap the entire editable section in Formik so that the
          // Save/Cancel buttons (which remain in the top-right) are within Formik context.
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ submitForm, resetForm }) => (
              <>
                <div className="flex flex-wrap gap-10 justify-between items-center px-10 mt-6 relative">
                  {/* Patient Info */}
                  <div className="flex gap-3 items-start my-auto min-w-[240px] w-[341px]">
                    <div
                      className="flex gap-2 items-center p-2.5 bg-red-400 rounded-2xl h-[35px] min-h-[35px] w-[35px]"
                      onClick={() => navigate("/PatientRecord")}
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
                        {patientsDetails?.patientname || "Patient Name"}
                      </div>
                      <div className="flex gap-3 mt-3 w-full text-xs text-neutral-500">
                        <div className="px-4 py-2 bg-stone-100">
                          {patientsDetails?.phonenumber || "#PatientNumber"}
                        </div>
                        <div className="px-4 py-2 bg-stone-100">Registered By ADMIN</div>
                      </div>
                    </div>
                  </div>
                  {/* Edit Mode Controls (positioned as before) */}
                  <div className="absolute right-10 top-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setIsEditMode(false);
                      }}
                      className="pr-[20px] pl-[20px] pt-[10px] pb-[10px] bg-[#F4F4F4] text-black rounded-lg disabled:opacity-50"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={submitForm}
                      className="pr-[20px] pl-[20px] pt-[10px] pb-[10px] bg-[#FF7B54] text-white rounded-lg text-[18px] disabled:opacity-75 disabled:cursor-not-allowed"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </div>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-10 mt-12 px-10 text-lg font-medium">
                  <button
                    className={`${
                      activeTab === "Patient Information"
                        ? "text-red-400 border-b-4 border-red-400"
                        : "text-zinc-400"
                    } pb-2`}
                    onClick={() => setActiveTab("Patient Information")}
                  >
                    Patient Information
                  </button>
                  <button
                    className={`${
                      activeTab === "Medical Preferences"
                        ? "text-red-400 border-b-4 border-red-400"
                        : "text-zinc-400"
                    } pb-2`}
                    onClick={() => setActiveTab("Medical Preferences")}
                  >
                    Medical Preferences
                  </button>
                </div>

                {/* Editable Patient Details Form */}
          {/* Editable Patient Details Form */}
<div className="flex flex-col mt-3 px-10 bg-white rounded-b-3xl p-4">
{activeTab === "Patient Information" && (
  <Form className="flex flex-wrap w-full gap-6 justify-between">
    
    {/* Patient Name */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Name</label>
      <Field name="patientname">
        {({ field, form }) => (
          <div className="relative w-full">
            <input
              {...field}
              type="text"
              placeholder="Enter patient name"
              className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            />
            {field.value && (
              <img
                src={cancelIcon}
                alt="Clear"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => form.setFieldValue("patientname", "")}
              />
            )}
          </div>
        )}
      </Field>
      <ErrorMessage name="patientname" component="div" className="text-red-500 text-xs mt-1" />
    </div>

    {/* Date of Birth */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Date of Birth</label>
      <Field name="dob">
        {({ field, form }) => (
          <div className="relative w-full">
            <input
              {...field}
              type="date"
              className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            />
            {field.value && (
              <img
                src={cancelIcon}
                alt="Clear"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => form.setFieldValue("dob", "")}
              />
            )}
          </div>
        )}
      </Field>
      <ErrorMessage name="dob" component="div" className="text-red-500 text-xs mt-1" />
    </div>

    {/* Phone Number */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Phone Number</label>
      <Field name="phonenumber">
        {({ field, form }) => (
          <div className="relative w-full">
            <input
              {...field}
              type="tel"
              placeholder="Enter 10-digit number"
              maxLength={10}
              className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            />
            {field.value && (
              <img
                src={cancelIcon}
                alt="Clear"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => form.setFieldValue("phonenumber", "")}
              />
            )}
          </div>
        )}
      </Field>
      <ErrorMessage name="phonenumber" component="div" className="text-red-500 text-xs mt-1" />
    </div>

    {/* Age */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Age</label>
      <Field name="age">
        {({ field, form }) => (
          <div className="relative w-full">
            <input
              {...field}
              type="number"
              placeholder="Enter age (1-99)"
              className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            />
            {field.value && (
              <img
                src={cancelIcon}
                alt="Clear"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => form.setFieldValue("age", "")}
              />
            )}
          </div>
        )}
      </Field>
      <ErrorMessage name="age" component="div" className="text-red-500 text-xs mt-1" />
    </div>

    {/* Email */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Email</label>
      <Field name="email">
        {({ field, form }) => (
          <div className="relative w-full">
            <input
              {...field}
              type="email"
              placeholder="Enter email"
              className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            />
            {field.value && (
              <img
                src={cancelIcon}
                alt="Clear"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => form.setFieldValue("email", "")}
              />
            )}
          </div>
        )}
      </Field>
      <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
    </div>

    {/* Village Details */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Village Details</label>
      <Field name="village">
        {({ field, form }) => (
          <div className="relative w-full">
            <input
              {...field}
              type="text"
              placeholder="Enter village details"
              className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            />
            {field.value && (
              <img
                src={cancelIcon}
                alt="Clear"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => form.setFieldValue("village", "")}
              />
            )}
          </div>
        )}
      </Field>
      <ErrorMessage name="village" component="div" className="text-red-500 text-xs mt-1" />
    </div>

    {/* Registration Date */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Registration Date</label>
      <Field name="remarks">
        {({ field, form }) => (
          <div className="relative w-full">
          <input
            {...field}
            type="text"
            placeholder="Enter patient name"
            className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
          />
          {field.value && (
            <img
              src={cancelIcon}
              alt="Clear"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => form.setFieldValue("remarks", "")}
            />
          )}
        </div>
        )}
      </Field>
      <ErrorMessage name="remarks" component="div" className="text-red-500 text-xs mt-1" />
    </div>

    {/* Gender */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Gender</label>
      <Field name="gender">
        {({ field, form }) => (
          <div className="relative w-full">
            <select
              {...field}
              className="w-full p-3 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
      
          </div>
        )}
      </Field>
      <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
    </div>

  </Form>
)}
</div>

              </>
            )}
          </Formik>
        ) : (
          // Read-only view (when not in edit mode)
          <>
            <div className="flex flex-wrap gap-10 justify-between items-center px-10 mt-6 relative">
              {/* Patient Info */}
              <div className="flex gap-3 items-start my-auto min-w-[240px] w-[341px]">
                <div
                  className="flex gap-2 items-center p-2.5 bg-red-400 rounded-2xl h-[35px] min-h-[35px] w-[35px]"
                  onClick={() => navigate("/PatientRecord")}
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
                    {patientsDetails?.patientname || "Patient Name"}
                  </div>
                  <div className="flex gap-3 mt-3 w-full text-xs text-neutral-500">
                    <div className="px-4 py-2 bg-stone-100">
                      {patientsDetails?.phonenumber || "#PatientNumber"}
                    </div>
                    <div className="px-4 py-2 bg-stone-100">Registered By ADMIN</div>
                  </div>
                </div>
              </div>
              {/* Edit Button */}
              <div className="absolute right-10 top-6">
                <button
                  onClick={() => setIsEditMode(true)}
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
              </div>
            </div>
        
        {/* Read-only Patient Details */}
<div className="flex flex-col mt-3 px-10 bg-white rounded-b-3xl p-4">
{activeTab === "Patient Information" && (
  <div className="flex flex-wrap gap-7">
    
    {/* Patient Name */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Name</label>
      <div className="p-3   rounded-[13px] text-black w-full">
        {patientsDetails?.patientname || "N/A"}
      </div>
    </div>

    {/* Date of Birth */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Date of Birth</label>
      <div className="p-3  rounded-[13px] text-black w-full">
        {patientsDetails?.dob || "N/A"}
      </div>
    </div>

    {/* Phone Number */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Phone Number</label>
      <div className="p-3  rounded-[13px] text-black w-full">
        {patientsDetails?.phonenumber || "N/A"}
      </div>
    </div>

    {/* Age */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Age</label>
      <div className="p-3  rounded-[13px] text-black w-full">
        {patientsDetails?.age || "N/A"}
      </div>
    </div>

    {/* Email */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Email</label>
      <div className="p-3  rounded-[13px] text-black w-full">
        {patientsDetails?.email || "N/A"}
      </div>
    </div>

    {/* Village Details */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Village Details</label>
      <div className="p-3  rounded-[13px] text-black w-full">
        {patientsDetails?.village || "N/A"}
      </div>
    </div>

    {/* Registration Date */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Registration Date</label>
      <div className="p-3  rounded-[13px] text-black w-full">
        {patientsDetails?.remarks || "N/A"}
      </div>
    </div>

    {/* Gender */}
    <div className="flex flex-col items-start w-full md:w-[45%] relative">
      <label className="text-gray-600 font-medium mb-1 pl-2">Gender</label>
      <div className="p-3 rounded-[13px] text-black w-full">
        {patientsDetails?.gender || "N/A"}
      </div>
    </div>

  </div>
)}
</div>

          </>
        )}
      </div>
    </div>
  );
}
