import Pagination from "./Pagination";
import PatientListHeader from "./PatientRecordHeader";
import PatientListItem from "./PatientRecordItem";
import NotificationIcon from "../../assets/notification.png"
import { useState } from "react";
import { patients } from "../../dummydata/patientDataList";
import cancelIcon from "../../assets/cancel.png"
import { useNavigate } from "react-router-dom";
  
function PatientList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRowClick = (id) => {
    navigate(`/pateintdetails/${id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevents the click from triggering row click
    openModal(); // Opens the modal
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
                    <tr key={patient.id} className="space-y-9 p-4" onClick={() => handleRowClick(patient.id)}>
                      <td className="py-[7px] px-[5px] border border-zinc-100">{patient.name}</td>
                      <td className="py-[7px] px-[5px] border border-zinc-100">{patient.mobile}</td>
                      <td className="py-[7px] px-[5px] border border-zinc-100">{patient.email}</td>
                      <td className="py-[7px] px-[5px] border border-zinc-100">{patient.registrationDate}</td>
                      <td className="py-[7px] px-[5px] border border-zinc-100">{patient.villageDetails}</td>
                      <td className="py-[7px] px-[5px] border border-zinc-100">
                        <div className="flex gap-4 justify-center">
                          <button aria-label="Edit patient" onClick={handleEditClick}>
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








const PatientModal = ({ isOpen, onClose }) => {
  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [gender, setGender] = useState("");
  const [villageDetails, setVillageDetails] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [remarks, setRemarks] = useState("");

  if (!isOpen) return null;

  const handleClearInput = (setter) => {
    setter("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal */}
      <div className="relative w-[400px] h-[calc(100%-40px)] bg-white rounded-l-3xl rounded-r-3xl shadow-lg p-6 overflow-y-auto mr-5 mt-5 mb-5"       style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE and Edge
      }}>
      
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-[#FF7B54]">Add Patient</h2>
        <form className="mt-4">
          <div className="mb-4 relative">
            <label className="block text-gray-600 font-medium mb-2">
              Patient Name
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black pr-10"
              placeholder="Enter patient name"
            />
            {patientName && (
              
              <button
                type="button"
                onClick={() => handleClearInput(setPatientName)}
                className="absolute top-14 right-4 transform -translate-y-1/2 text-black"
              >
                <img src={cancelIcon} alt="cancel" />
              </button>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-600 font-medium mb-2">
              Patient Number
            </label>
            <input
              type="tel"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
              className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black pr-10"
              placeholder="Enter patient number"
            />
            {patientNumber && (
              <button
                type="button"
                onClick={() => handleClearInput(setPatientNumber)}
                className="absolute top-14 right-4 transform -translate-y-1/2 text-black"
              >
              <img src={cancelIcon} alt="cancel" />
              </button>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-600 font-medium mb-2">
              Village Details
            </label>
            <input
              value={villageDetails}
              onChange={(e) => setVillageDetails(e.target.value)}
              className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black"
              placeholder="Enter village details"
            />
            {villageDetails && (
              <button
                type="button"
                onClick={() => handleClearInput(setVillageDetails)}
                className="absolute top-14 right-4 transform -translate-y-1/2 text-black"
              >
              <img src={cancelIcon} alt="cancel" />
              </button>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-600 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black"
              placeholder="Enter email"
            />
            {email && (
              <button
                type="button"
                onClick={() => handleClearInput(setEmail)}
                className="absolute top-14 right-4 transform -translate-y-1/2 text-black"
              >
              <img src={cancelIcon} alt="cancel" />
              </button>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-600 font-medium mb-2">
              Remarks
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:border-black"
              placeholder="Enter any remarks"
            />
            {remarks && (
              <button
                type="button"
                onClick={() => handleClearInput(setRemarks)}
                className="absolute top-14 right-4 transform -translate-y-1/2 text-black"
              >
              <img src={cancelIcon} alt="cancel" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF7B54] text-white p-3 rounded-md hover:bg-[#e76a48] transition"
          >
            Save Patient
          </button>
        </form>
      </div>
    </div>
  );
};


  
  
  
  export default PatientList;