import Pagination from "./Pagination";
import PatientListHeader from "./PatientRecordHeader";
import { useEffect, useState } from "react";
import { patients } from "../../dummydata/patientDataList";
import cancelIcon from "../../assets/cancel.png"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchAllPatients } from "../../redux/slices/patinetSlice";
const PatientList =()=> {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate();
 
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(()=>{
    dispatch(fetchAllPatients({page:1}))
  },[dispatch])


  const handleRowClick = (id, isEditMode = false) => {
    navigate(`/pateintdetails/${id}`, { state: { isEditMode } });
  };
  
  const handleEditClick = (e, id) => {
    e.stopPropagation(); // Prevents triggering row click
    handleRowClick(id, true); // Navigate with isEditMode as true
  };
  
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 pb-4">
        <h1 className="text-[25px] text-[#FF7B54] font-medium" style={{ fontFamily: "Outfit" }}>
          Patient Records
        </h1>
        <div className="flex items-center gap-10">
          {/* Add Patient Button */}
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Patient
          </button>
        </div>
      </div>

      <div className="flex overflow-hidden flex-col justify-center px-7 py-4 bg-white rounded-3xl max-md:px-5">
        <div className="flex flex-col w-full  max-md:max-w-full">
          <PatientListHeader />
          <div className="flex flex-col flex-1 justify-between mt-5 w-full max-md:max-w-full">
            <div className="flex flex-col pb-9 w-full max-md:max-w-full">
              {/* Table Structure */}
              <table className="table-auto w-full text-xs text-gray-800 border-collapse cursor-pointer">
                <thead>
                  <tr>
                    <th className="py-2 px-4 ">Name</th>
                    <th className="py-2 px-4">Mobile Number</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Registration Date</th>
                    <th className="py-2 px-4">Village Details</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="space-y-9 p-4">
                      <td className="py-[7px] px-[5px] border border-zinc-100">{patient.name}</td>
                      <td className="py-[7px] px-[5px] border border-zinc-100">{patient.mobile}</td>
                      <td className="py-[7px] px-[5px] border border-zinc-100">{patient.email}</td>
                      <td className="py-[7px] px-[5px] border border-zinc-100">{patient.registrationDate}</td>
                      <td className="py-[7px] px-[5px] border border-zinc-100">{patient.villageDetails}</td>
                      <td className="py-[7px] px-[5px] border border-zinc-100">
                        <div className="flex gap-4 justify-center">
                          <button aria-label="Edit patient"  onClick={(e) => handleEditClick(e, patient.id)}>
                            <img
                              loading="lazy"
                              src={patient.editIcon}
                              alt="Edit"
                              className="object-contain w-6"
                            />
                          </button>
                          <button aria-label="Delete patient">
                            <img
                              loading="lazy"
                              src={patient.deleteIcon}
                              alt="Delete"
                              className="object-contain w-6"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Modal */}
      <PatientModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}







export const PatientModal = ({ isOpen, onClose }) => {
  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [gender, setGender] = useState("");
  const [villageDetails, setVillageDetails] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const validateFields = () => {
    if (!patientName) return "Patient Name is required.";
    if (!patientNumber) return "Patient Number is required.";
    if (!/^\d{10}$/.test(patientNumber)) return "Patient Number must be 10 digits.";
    if (!gender) return "Gender is required.";
    if (!villageDetails) return "Village Details are required.";
    if (villageDetails.length > 60) return "Village Details can be a maximum of 60 characters.";
    if (!email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address.";
    if (!dob) return "Date of Birth is required.";
    if (remarks.length > 30) return "Remarks can be a maximum of 30 characters.";
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
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  
      // Show success toast
      toast.success("Patient details saved successfully!", { toastId: "success" });
  
      // Reset form before closing
      setPatientName("");
      setPatientNumber("");
      setGender("");
      setVillageDetails("");
      setEmail("");
      setDob("");
      setRemarks("");
  
      onClose(); // Close modal after showing toast
    } catch (error) {
      toast.error("Failed to save patient details", { toastId: "error" });
    } finally {
      setIsSaving(false);
    }
  };
  

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPatientNumber(value);
  };

  const inputFields = [
    { label: "Patient Name", value: patientName, setter: setPatientName, type: "text", placeholder: "Enter patient name" },
    { label: "Patient Number", value: patientNumber, setter: setPatientNumber, type: "tel", placeholder: "Enter 10-digit number", onChange: handlePhoneChange },
    { label: "Gender", value: gender, setter: setGender, type: "select", options: ["Male", "Female", "Other"] },
    { label: "Village Details", value: villageDetails, setter: setVillageDetails, type: "text", placeholder: "Enter village details (max 60 characters)" },
    { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "Enter email" },
    { label: "Date of Birth", value: dob, setter: setDob, type: "date" },
    { label: "Remarks", value: remarks, setter: setRemarks, type: "text", placeholder: "Enter remarks (max 30 characters)" }
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
        {inputFields.map((field) => (
          <div key={field.label} className="mb-4 relative">
            <label className="block text-gray-600 font-medium mb-2">{field.label}</label>
            
            {field.type === "select" ? (
              <select
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black"
                disabled={isSaving}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option.toLowerCase()}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={field.value}
                onChange={field.onChange ? field.onChange : (e) => field.setter(e.target.value)}
                className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black pr-12"
                placeholder={field.placeholder}
                disabled={isSaving}
              />
            )}
        
            {field.value && field.type !== "select" && (
              <button
                type="button"
                onClick={() => field.setter("")}
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
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
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