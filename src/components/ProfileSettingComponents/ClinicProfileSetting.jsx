import React, { useEffect, useState } from 'react';
import cancelIcon from "../../assets/cancel.png";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getClinicDetails, updateAddress, updateBasicInfo } from '../../redux/slices/clinicSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schemas defined at the top
const basicInfoValidationSchema = Yup.object({
  clinicName: Yup.string().required("Clinic Name is required"),
  tagline: Yup.string().required("Tagline is required"),
  companyLogo: Yup.string().required("Company Logo is required"),
});

const addressInfoValidationSchema = Yup.object({
  streetAddress1: Yup.string().required("Street Address 1 is required"),
  streetAddress2: Yup.string().required("Street Address 2 is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
});

const ClinicProfileSetting = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { basicInfo, address, loading, error } = useSelector((state) => state.clinic);
  const [editModes, setEditModes] = useState({
    basicInfo: state?.isEditMode || false,
    addressInfo: state?.isEditMode || false,
  });

  // Helper: Extract error message for toast display
  const getErrorMessage = (error) => {
    if (typeof error === "string" && error.includes("<html")) {
      return "Something went wrong";
    }
    if (typeof error === "object" && error !== null) {
      return error.message || "Something went wrong";
    }
    return error || "Something went wrong";
  };

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error), { toastId: "global-error" });
    }
  }, [error]);

  useEffect(() => {
    dispatch(getClinicDetails());
  }, [dispatch]);

  // Helper: Handle image file upload and conversion
  const handleImageUpload = (e, setFieldValue, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      toast.error("Only JPG, JPEG, and PNG files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFieldValue(fieldName, reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  // Helper: Render a Formik field (with optional file upload for images)
  const renderFormikField = (formikProps, name, label, placeholder, type = "text", isImage = false) => {
    const { values, setFieldValue } = formikProps;
    return (
      <div className="flex flex-col items-start w-full md:w-[45%] relative">
        <label className="text-gray-600 font-medium mb-1 pl-2">{label}</label>
        <div className="relative w-full">
          {isImage ? (
            <div className="relative group">
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                onChange={(e) => handleImageUpload(e, setFieldValue, name)}
                className="hidden"
                id={`upload-${name}`}
              />
              <label
                htmlFor={`upload-${name}`}
                className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#FF7B54] transition-colors"
              >
                {values[name] ? (
                  <img
                    src={values[name]}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400 text-center text-sm">Click to upload</span>
                )}
              </label>
            </div>
          ) : (
            <Field
              name={name}
              type={type}
              placeholder={placeholder}
              className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
            />
          )}
          {!isImage && values[name] && (
            <button
              type="button"
              onClick={() => setFieldValue(name, "")}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black"
            >
              <img src={cancelIcon} alt="cancel" className="w-5 h-5 object-contain" />
            </button>
          )}
          <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
        </div>
      </div>
    );
  };

  // Helper: Render a read-only display field
  const renderDisplayField = (label, value, isImage = false) => (
    <div className="flex flex-col items-start w-full md:w-[45%]">
      <label className="text-gray-600 font-medium mb-1 pl-2">{label}</label>
      {isImage ? (
        <div className="w-32 h-32 border rounded-lg overflow-hidden">
          {value ? (
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No logo</span>
            </div>
          )}
        </div>
      ) : (
        <div className="p-3 bg-transparent border-none break-words text-black max-w-[434px]">
          {value || "N/A"}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {loading && <p>Loading...</p>}

      {/* Basic Information Section */}
      <Formik
        initialValues={{
          clinicName: basicInfo?.clinicName || "",
          tagline: basicInfo?.tagline || "",
          companyLogo: basicInfo?.logo?.url || "",
        }}
        enableReinitialize
        validationSchema={basicInfoValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Submitting Values:", values); // Log form data before sending
        
          dispatch(updateBasicInfo(values))
            .unwrap()
            .then(() => {
              console.log("Update Success");
              setEditModes((prev) => ({ ...prev, basicInfo: false }));
              toast.success("Basic Information updated successfully!", { toastId: "success-message" });
            })
            .catch((err) => {
              console.error("Update Failed:", err);
              toast.error("Failed to update Basic Information");
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {(formikProps) => (
          <Form>
            <div className="flex items-center justify-between mx-2 mb-6">
              <div className="flex items-center">
                <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
                <h1 className="text-[24px] text-[#FF7B54] mx-2">Basic Information</h1>
              </div>
              <div className="flex items-center gap-2">
                {editModes.basicInfo ? (
                  <>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                      onClick={() => {
                        formikProps.resetForm();
                        setEditModes((prev) => ({ ...prev, basicInfo: false }));
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#FF7B54] text-white rounded-lg hover:bg-[#e06a45] transition"
                      disabled={formikProps.isSubmitting}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    aria-label="Edit Basic Information"
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                    onClick={() => setEditModes((prev) => ({ ...prev, basicInfo: true }))}
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
              {editModes.basicInfo ? (
                <>
                  {renderFormikField(formikProps, "clinicName", "Clinic Name", "Enter clinic name")}
                  {renderFormikField(formikProps, "tagline", "Tagline", "Enter tagline")}
                  {renderFormikField(formikProps, "companyLogo", "Company Logo", "", "text", true)}
                </>
              ) : (
                <>
                  {renderDisplayField("Clinic Name", formikProps.values.clinicName)}
                  {renderDisplayField("Tagline", formikProps.values.tagline)}
                  {renderDisplayField("Company Logo", formikProps.values.companyLogo, true)}
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {/* Address Details Section */}
      <Formik
        initialValues={{
          streetAddress1: address?.streetAddress1 || "",
          streetAddress2: address?.streetAddress2 || "",
          city: address?.city || "",
          postalCode: address?.postalCode || "",
          state: address?.state || "",
          country: address?.country || "",
        }}
        enableReinitialize
        validationSchema={addressInfoValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(updateAddress(values))
            .unwrap()
            .then(() => {
              setEditModes((prev) => ({ ...prev, addressInfo: false }));
              toast.success("Address updated successfully!", { toastId: "success-message" });
            })
            .catch(() => {
              toast.error("Failed to update Address Information");
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {(formikProps) => (
          <Form>
            <div className="flex items-center justify-between mx-2 mb-6 mt-10">
              <div className="flex items-center">
                <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
                <h1 className="text-[24px] text-[#FF7B54] mx-2">Address Details</h1>
              </div>
              <div className="flex items-center gap-2">
                {editModes.addressInfo ? (
                  <>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                      onClick={() => {
                        formikProps.resetForm();
                        setEditModes((prev) => ({ ...prev, addressInfo: false }));
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#FF7B54] text-white rounded-lg hover:bg-[#e06a45] transition"
                      disabled={formikProps.isSubmitting}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    aria-label="Edit Address Details"
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                    onClick={() => setEditModes((prev) => ({ ...prev, addressInfo: true }))}
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
              {editModes.addressInfo ? (
                <>
                  {renderFormikField(formikProps, "streetAddress1", "Street Address-1", "Enter street address 1")}
                  {renderFormikField(formikProps, "streetAddress2", "Street Address-2", "Enter street address 2")}
                  {renderFormikField(formikProps, "city", "City/Town", "Enter city")}
                  {renderFormikField(formikProps, "postalCode", "Postal/Zip Code", "number")}
                  {renderFormikField(formikProps, "state", "State", "Enter state")}
                  {renderFormikField(formikProps, "country", "Country", "Enter country")}
                </>
              ) : (
                <>
                  {renderDisplayField("Street Address-1", formikProps.values.streetAddress1)}
                  {renderDisplayField("Street Address-2", formikProps.values.streetAddress2)}
                  {renderDisplayField("City/Town", formikProps.values.city)}
                  {renderDisplayField("Postal/Zip Code", formikProps.values.postalCode)}
                  {renderDisplayField("State", formikProps.values.state)}
                  {renderDisplayField("Country", formikProps.values.country)}
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>

    </div>
  );
};

export default ClinicProfileSetting;
