import  { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Toast notifications
import { toast } from "react-hot-toast";

// Components
import Pagination from "./Pagination";
import PatientListHeader from "./PatientRecordHeader"; 

// Assets
import cancelIcon from "../../assets/cancel.png";
import dotIcon from "../../assets/Frame 64.png";
import editIcon from "../../assets/border_color.png";

// Redux actions
import { 
  createPatient, 
  fetchSearchPatients, 
  fetchAllPatients, 
  fetchSortPatients,
  deletePatients
} from "../../redux/slices/patinetSlice";
import { getAdminProfile } from "../../redux/slices/profileSettingSlice";
import { fetchSupportProfile } from "../../redux/slices/supportSlice";
import { notifyError, notifySuccess } from "../common/ToastCommon";



const PatientList = () => {
  // Local state for modal, search, sort, and delete confirmation
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("patientname");
  const [sortBy, setSortBy] = useState("Name A-Z");
  const [patientToDelete, setPatientToDelete] = useState(null);

  // Get state from Redux
  const { patinets, currentPage, loading, error, successMessage } =
    useSelector((state) => state.patients);


    const storedPermissions = localStorage.getItem("permissions");
    const permissions = storedPermissions ? JSON.parse(storedPermissions) : {};
    const patientPermissions = permissions.patients || {};
  
    // Check for specific patient permissions
    const canView = patientPermissions.view;
    const canAdd = patientPermissions.create;
    const canEdit = patientPermissions.edit;
    const canDelete = patientPermissions.delete;
  
  

  // Open/close modal for adding a patient
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!searchTerm) {
      dispatch(fetchAllPatients({ page: currentPage }));
    }
  }, [dispatch, currentPage, searchTerm]);

  
  // Display toast error when error occurs


  // Display toast success when deletion is successful

  const handleSearch = (term, type) => {
    setSearchTerm(term);
    setSearchType(type);
  };

  const handleSearchEnter = () => {
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
  };

  const handleSort = (sortValue) => {
    setSortBy(sortValue);
    if (sortValue !== "None") {
      let sortByParam = "";
      let sortOrderParam = "";
      switch (sortValue) {
        case "Name A-Z":
          sortByParam = "name";
          sortOrderParam = "asc";
          break;
        case "Name Z-A":
          sortByParam = "name";
          sortOrderParam = "desc";
          break;
        case "Registration Date (Newest to Oldest)":
          sortByParam = "registrationDate";
          sortOrderParam = "desc";
          break;
        case "Registration Date (Oldest to Newest)":
          sortByParam = "registrationDate";
          sortOrderParam = "asc";
          break;
        case "Mobile Number (Ascending)":
          sortByParam = "phonenumber";
          sortOrderParam = "asc";
          break;
        case "Mobile Number (Descending)":
          sortByParam = "phonenumber";
          sortOrderParam = "desc";
          break;
        default:
          // If "None" or unexpected value, load all patients
          dispatch(fetchAllPatients({ page: currentPage }));
          return;
      }
      dispatch(
        fetchSortPatients({
          sortBy: sortByParam,
          sortOrder: sortOrderParam,
          page: currentPage,
        })
      );
    } else {
      // If no sorting is required, load all patients
      dispatch(fetchAllPatients({ page: currentPage }));
    }
  };

  const handleRowClick = (id, isEditMode = false) => {
    navigate(`/pateintdetails/${id}`, { state: { isEditMode } });
  };

  const handleEditClick = (e, id) => {
    e.stopPropagation();
    handleRowClick(id, true);
  };

  // When the three‑dot icon is clicked, open a confirmation modal
  const handleShowDeleteModal = (id) => {
    setPatientToDelete(id);
  };

  // When confirmed, dispatch the delete thunk
  const handleConfirmDelete = async () => {
    if (patientToDelete) {
      try {
        await dispatch(deletePatients({ patientId: patientToDelete })).unwrap();
        toast.success("Deleted successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
      setPatientToDelete(null);
    }
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
        {canAdd === true ? (
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
        ) :(
          <p>No permission to add patients</p>
        )}
         
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col justify-center px-7 py-4 bg-white rounded-3xl max-md:px-5">
        <div className="flex flex-col w-full max-md:max-w-full">
          <PatientListHeader
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onSort={handleSort}
            onSearchEnter={handleSearchEnter} // Trigger search on Enter
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
                          {canEdit &&   <button
                            aria-label="Edit patient"
                            onClick={(e) => handleEditClick(e, patient._id)}
                          >
                            <img
                              loading="lazy"
                              src={editIcon}
                              alt="Edit"
                              className="object-contain w-6"
                            />
                          </button> }
                          
                            {/* Clicking the three‑dot icon opens the delete confirmation */}
                            {canDelete &&     <button
                              aria-label="Open delete confirmation"
                              onClick={() =>
                                handleShowDeleteModal(patient._id)
                              }
                            >
                              <img
                                loading="lazy"
                                src={dotIcon}
                                alt="Options"
                                className="object-contain w-6"
                              />
                            </button>}
                         
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

      {/* Delete Confirmation Modal */}
      {patientToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this patient?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                onClick={() => setPatientToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Modal for Adding Patient */}
      <PatientModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Toast Container */}
    </div>
  );
};





export const PatientModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const initialFormData = {
    patientname: "",
    phonenumber: "",
    gender: "",
    age: "",
    village: "",
    email: "",
    dob: "",
    remarks: "",
  };

  const validationSchema = Yup.object().shape({
    patientname: Yup.string().required("Patient Name is required."),
    phonenumber: Yup.string()
      .required("Patient Number is required.")
      .matches(/^\d{10}$/, "Patient Number must be 10 digits."),
    gender: Yup.string().required("Gender is required."),
    age: Yup.string().required("Age is required."),
    village: Yup.string()
      .required("Village Details are required.")
      .max(60, "Village Details can be a maximum of 60 characters."),
    email: Yup.string().required("Email is required.").email("Invalid email address."),
    dob: Yup.date().required("Date of Birth is required.").typeError("Invalid date format"),
    remarks: Yup.string().max(30, "Remarks can be a maximum of 30 characters."),
  });

  const formik = useFormik({
    initialValues: initialFormData,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(createPatient(values)).unwrap();
        toast.success(response?.data?.message || "Patient details saved successfully!");
        resetForm();
        onClose();
      } catch (error) {
        toast.error(error?.message || "Failed to save patient details");
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!isOpen) return null;

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    formik.setFieldValue("phonenumber", value);
  };


  if (!isOpen) return null;



  const inputFields = [
    { label: "Patient Name", field: "patientname", type: "text", placeholder: "Enter patient name" },
    { label: "Patient Number", field: "phonenumber", type: "tel", placeholder: "Enter 10-digit number" },
    { label: "Gender", field: "gender", type: "select", options: ["male", "female", "other"] },
    { label: "Age", field: "age", type: "number", placeholder: "Enter your age" },
    { label: "Village Details", field: "village", type: "text", placeholder: "Enter village details (max 60 characters)" },
    { label: "Email", field: "email", type: "email", placeholder: "Enter email" },
    { label: "Date of Birth", field: "dob", type: "date" },
    { label: "Remarks", field: "remarks", type: "text", placeholder: "Enter remarks (max 30 characters)" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-center">
    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

    <div className="relative w-[400px] h-[calc(100%-40px)] bg-white rounded-l-3xl rounded-r-3xl shadow-lg p-6 overflow-y-auto mr-5 mt-5 mb-5">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        disabled={formik.isSubmitting}
      >
        ✕
      </button>

      <h2 className="text-2xl font-semibold text-[#FF7B54]">Add Patient</h2>

      <form className="mt-4" onSubmit={formik.handleSubmit}>
        {inputFields.map(({ label, field, type, placeholder, options }) => (
          <div key={field} className="mb-4 relative">
            <label className="block text-gray-600 font-medium mb-2">{label}</label>

            {type === "select" ? (
              <select
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                className={`w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black ${
                  formik.touched[field] && formik.errors[field] ? "border-red-500" : ""
                }`}
                disabled={formik.isSubmitting}
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
                name={field}
                value={formik.values[field]}
                onChange={field === "phonenumber" ? handlePhoneNumberChange : formik.handleChange}
                className={`w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black ${
                  formik.touched[field] && formik.errors[field] ? "border-red-500" : ""
                }`}
                placeholder={placeholder}
                disabled={formik.isSubmitting}
              />
            )}

            {/* Inline Error Message */}
            {formik.touched[field] && formik.errors[field] && (
              <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>
            )}

            {formik.values[field] && type !== "select" && (
              <button
                type="button"
                onClick={() => formik.setFieldValue(field, "")}
                className="absolute top-14 right-4 transform -translate-y-1/2 text-black"
                disabled={formik.isSubmitting}
              >
                <img src={cancelIcon} alt="cancel" className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-[#FF7B54] text-white p-3 rounded-md hover:bg-[#e76a48] transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
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