import React, { useEffect, useState } from 'react';
import cancelIcon from "../../assets/cancel.png";

import { useLocation, useNavigate } from 'react-router-dom';
import { getAdminProfile, updatePersonalInfoThunk } from '../../redux/slices/profileSettingSlice';
import { useDispatch , useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';



export function AdminProfileSetting() {
  
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);
  const [isEditMode, setIsEditMode] = useState(state?.isEditMode || false);


  const validationSchema = Yup.object().shape({
    patientName: Yup.string()
      .required('Name is required')
      .matches(/^[a-zA-Z\s'-]+$/, 'Invalid characters in name'),
    patientNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Must be 10 digits'),
    villageDetails: Yup.string().required('Address is required'),
    dob: Yup.date().required('Date of birth is required'),
    age: Yup.number()
      .required('Age is required')
      .min(1, 'Age must be at least 1')
      .max(99, 'Age must be less than 100'),
    gender: Yup.string().required('Gender is required'),
  });

  const formik = useFormik({
    initialValues: {
      patientName: '',
      patientNumber: '',
      villageDetails: '',
      dob: '',
      gender: '',
      age: '',
      email: '',
      registrationDate: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          fullname: values.patientName,
          phoneNumber: values.patientNumber,
          address: values.villageDetails,
          dateOfBirth: values.dob,
          age: values.age,
          gender: values.gender,
        };

        const updatedInfo = await dispatch(updatePersonalInfoThunk(payload)).unwrap();
        formik.setValues({
          ...values,
          patientName: updatedInfo.fullname,
          patientNumber: updatedInfo.phoneNumber,
          villageDetails: updatedInfo.address,
          age: updatedInfo.age,
          dob: updatedInfo.dateOfBirth?.split('T')[0] || values.dob,
          gender: updatedInfo.gender,
        });
        setIsEditMode(false);
        toast.success('Personal information updated successfully!');
      } catch (error) {
        console.error('Error updating personal info:', error);
        toast.error('Failed to update personal information.');
      }
    },
  });

  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      formik.setValues({
        patientName: profile.personalInfo?.fullname || '',
        patientNumber: profile.personalInfo?.phoneNumber || '',
        villageDetails: profile.personalInfo?.address || '',
        age: profile.personalInfo?.age || '',
        dob: profile.personalInfo?.dateOfBirth?.split('T')[0] || '',
        gender: profile.personalInfo?.gender || '',
        email: profile.email || '',
        registrationDate: '',
      });
    }
  }, [profile]);

  const handleCancelField = (field) => {
    formik.setFieldValue(field, '');
  };

  // Render function for input fields (supports both input and select).
  const renderField = (label, field, placeholder, type = 'text') => {
    return (
      <div className="flex flex-col items-start w-full md:w-[45%] relative" key={field}>
        <label className="text-gray-600 font-medium mb-1 pl-2">{label}</label>
        <div className="relative w-full">
          {isEditMode ? (
            type === 'select' ? (
              <select
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                name={field}
                value={formik.values[field]}
                onChange={(e) => {
                  let processedValue = e.target.value;
                  switch (field) {
                    case 'patientNumber':
                      processedValue = processedValue.replace(/\D/g, '').slice(0, 10);
                      break;
                    case 'age':
                      processedValue = processedValue.replace(/\D/g, '').slice(0, 2);
                      break;
                    case 'patientName':
                      processedValue = processedValue.replace(/[^a-zA-Z\s'-]/g, '');
                      break;
                    default:
                      break;
                  }
                  formik.setFieldValue(field, processedValue);
                }}
                onBlur={formik.handleBlur}
                className="w-full p-3 pr-12 border bg-[#F4F4F4] rounded-[13px] focus:outline-none focus:border-black"
                placeholder={placeholder}
                disabled={field === 'registrationDate'} // Disable registrationDate field
              />
            )
          ) : (
            <div className="p-3 bg-transparent border-none break-words text-black max-w-[434px]">
              {formik.values[field] || 'N/A'}
            </div>
          )}
          {formik.values[field] && isEditMode && type !== 'select' && field !== 'registrationDate' && (
            <button
              type="button"
              onClick={() => handleCancelField(field)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black"
            >
              <img src={cancelIcon} alt="cancel" className="w-5 h-5 object-contain" />
            </button>
          )}
          {isEditMode && formik.touched[field] && formik.errors[field] && (
            <div className="text-red-500 text-sm pl-2">{formik.errors[field]}</div>
          )}
        </div>
      </div>
    );
  };
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);

  };

  const handleForgotPassword = () => {
    navigate('/change');
  }

  return (
    <div>
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
        <div >
          <button onClick={handleForgotPassword} className='text-[14px]'>Forgot Password ?</button> 
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
 onClick={formik.handleSubmit}
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
        {renderField('Name', 'patientName', 'Enter patient name')}
        {renderField('Phone Number', 'patientNumber', 'Enter patient number', 'tel')}
        {renderField('Age', 'age', 'Enter age', 'number')}
        {renderField('Email', 'email', 'Enter email', 'email')}
        {renderField('Village Details', 'villageDetails', 'Enter village details')}
        {renderField('Date of Birth', 'dob', '', 'date')}
        {renderField('Registration Date', 'registrationDate', '', 'date')}
        {renderField('Gender', 'gender', '', 'select')}
      </div>
    </div>
  );
}


