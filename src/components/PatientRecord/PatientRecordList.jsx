import Pagination from "./Pagination";
import PatientListHeader from "./PatientRecordHeader";

import cancelIcon from "../../assets/cancel.png"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createPatient, fetchSearchPatients } from "../../redux/slices/patinetSlice";
import dotIcon from "../../assets/Frame 64.png"
import editIcon from "../../assets/border_color.png"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllPatients } from "../../redux/slices/patinetSlice";

const PatientList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("patientname");
  const [sortBy, setSortBy] = useState("Name A-Z");

  const { patinets, currentPage, loading, error } = useSelector((state) => state.patients);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Debounced search effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        dispatch(
          fetchSearchPatients({
            type: searchType, 
            query: searchTerm,
            page: currentPage,
          })
        );
      } else {
        dispatch(fetchAllPatients({ page: currentPage }));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, searchType, currentPage, dispatch]);

  // Handle error via toast instead of inline display
  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "object" ? error.message || JSON.stringify(error) : error,
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    }
  }, [error]);

  const handleSearch = (term, type) => {
    setSearchTerm(term);
    setSearchType(type);
  };

  const handleSort = (sortValue) => {
    setSortBy(sortValue);
    // Implement your sorting logic here if needed
  };

  const handleRowClick = (id, isEditMode = false) => {
    navigate(`/patientdetails/${id}`, { state: { isEditMode } });
  };

  const handleEditClick = (e, id) => {
    e.stopPropagation();
    handleRowClick(id, true);
  };

  return (
    <div>
      {/* Header area */}
      <div className="flex flex-row items-center justify-between px-4 pb-4">
        <h1
          className="text-[25px] text-[#FF7B54] font-medium"
          style={{ fontFamily: "Outfit" }}
        >
          Patient Records
        </h1>
        <div className="flex items-center gap-10">
          <button
            className="flex items-center justify-center gap-2 bg-white text-[#FF7B54] font-medium text-[16px] py-[13.5px] px-[20px] rounded-[27px] shadow-md hover:bg-gray-100 transition"
            onClick={openModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Patient
          </button>
        </div>
      </div>
    
      {/* Main content area */}
      <div className="flex flex-col justify-center px-7 py-4 bg-white rounded-3xl max-md:px-5">
        <div className="flex flex-col w-full max-md:max-w-full">
          <PatientListHeader
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onSort={handleSort}
          />

          {loading ? (
            <p>Loading patients...</p>
          ) : (
            <div className="flex flex-col flex-1 justify-between mt-5 w-full max-md:max-w-full">
              <table className="table-auto w-full text-xs text-gray-800 border-collapse cursor-pointer">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="py-3 px-4">Patient ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Mobile Number</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Registration Date</th>
                    <th className="py-3 px-4">Village</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patinets.length > 0 ? (
                    patinets.map((patient) => (
                      <tr
                        key={patient._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                        onClick={() => handleRowClick(patient._id)}
                      >
                        <td className="py-3 px-4">{patient._id}</td>
                        <td className="py-3 px-4">{patient.patientname}</td>
                        <td className="py-3 px-4">{patient.phonenumber}</td>
                        <td className="py-3 px-4">{patient.email}</td>
                        <td className="py-3 px-4">
                          {new Date(patient.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">{patient.village}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex gap-4 justify-center">
                            <button
                              aria-label="Edit patient"
                              onClick={(e) => handleEditClick(e, patient._id)}
                            >
                              <img
                                loading="lazy"
                                src={editIcon}
                                alt="Edit"
                                className="object-contain w-6"
                              />
                            </button>
                            <button aria-label="Delete patient">
                              <img
                                loading="lazy"
                                src={dotIcon}
                                alt="Delete"
                                className="object-contain w-6"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No patients found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination />
            </div>
          )}
        </div>
      </div>
    
      {/* Sidebar Modal */}
      <PatientModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};






  export const PatientModal = ({ isOpen, onClose }) => {
    const initialFormData = {
      patientname: "",
      phonenumber: "",
      gender: "",
      village: "",
      email: "",
      dob: "",
      remarks: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSaving, setIsSaving] = useState(false);
    const dispatch = useDispatch()
    if (!isOpen) return null;

    const validateFields = () => {
      if (!formData.patientname) return "Patient Name is required.";
      if (!formData.phonenumber) return "Patient Number is required.";
      if (!/^\d{10}$/.test(formData.phonenumber)) return "Patient Number must be 10 digits.";
      if (!formData.gender) return "Gender is required.";
      if (!formData.village) return "Village Details are required.";
      if (formData.village.length > 60) return "Village Details can be a maximum of 60 characters.";
      if (!formData.email) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email address.";
      if (!formData.dob) return "Date of Birth is required.";
      if (formData.remarks.length > 30) return "Remarks can be a maximum of 30 characters.";
      return null;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (isSaving) return;

      setIsSaving(true);
      const error = validateFields();

      if (error) {
        toast.error(error, { toastId: "validation-error" });
        setIsSaving(false);
        return;
      }

      try {
        await dispatch(createPatient(formData)).unwrap()
        toast.success("Patient details saved successfully!");
        setFormData(initialFormData);
        onClose();
      } catch (error) {
        toast.error("Failed to save patient details");
      } finally {
        setIsSaving(false);
      }
    };

    const handleInputChange = (field, value) => {
      if (field === "phonenumber") {
        value = value.replace(/\D/g, "").slice(0, 10);
      }
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const inputFields = [
      { label: "Patient Name", field: "patientname", type: "text", placeholder: "Enter patient name" },
      { label: "Patient Number", field: "phonenumber", type: "tel", placeholder: "Enter 10-digit number" },
      { label: "Gender", field: "gender", type: "select", options: ["male", "female", "other"] },
      { label: "Village Details", field: "village", type: "text", placeholder: "Enter village details (max 60 characters)" },
      { label: "Email", field: "email", type: "email", placeholder: "Enter email" },
      { label: "Date of Birth", field: "dob", type: "date" },
      { label: "Remarks", field: "remarks", type: "text", placeholder: "Enter remarks (max 30 characters)" },
    ];

    return (
      <div className="fixed inset-0 z-50 flex justify-end items-center">
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

        <div className="relative w-[400px] h-[calc(100%-40px)] bg-white rounded-l-3xl rounded-r-3xl shadow-lg p-6 overflow-y-auto mr-5 mt-5 mb-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            disabled={isSaving}
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold text-[#FF7B54]">Add Patient</h2>

          <form className="mt-4" onSubmit={handleSubmit}>
            {inputFields.map(({ label, field, type, placeholder, options }) => (
              <div key={field} className="mb-4 relative">
                <label className="block text-gray-600 font-medium mb-2">{label}</label>

                {type === "select" ? (
                  <select
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black"
                    disabled={isSaving}
                  >
                    <option value="">Select {label}</option>
                    {options.map((option) => (
                      <option key={option} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black pr-12"
                    placeholder={placeholder}
                    disabled={isSaving}
                  />
                )}

                {formData[field] && type !== "select" && (
                  <button
                    type="button"
                    onClick={() => handleInputChange(field, "")}
                    className="absolute top-14 right-4 transform -translate-y-1/2 text-black"
                    disabled={isSaving}
                  >
                    <img src={cancelIcon} alt="cancel" className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[#FF7B54] text-white p-3 rounded-md hover:bg-[#e76a48] transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Patient"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  };
  export default PatientList; 