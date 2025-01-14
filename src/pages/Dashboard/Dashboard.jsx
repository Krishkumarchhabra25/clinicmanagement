import Template from "../../components/common/Template";
import GenderChart from "../../components/DashboardComponents/GenderChart";
import StatsCard from "../../components/DashboardComponents/StatsCard";
import doctorPhoto from "../../assets/doctor.png";
import BackgroundPhoto from "../../assets/Background.png";
import { useState } from "react";

const statsData = [
  {
    title: "Appointments",
    value: "280",
    action: "View More",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a65b94c5f951244c9c3f82e3c6f208908d09e293be0d15bf42b32f3655e15d5b?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094",
  },
  {
    title: "Today's New Patients",
    value: "5",
    action: "View List",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c1484a8416d3a773ad130c90e5e45778516e3feb26984d414d890a26cf1a7767?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094",
  },
  {
    title: "Total Patients",
    value: "561",
    action: "View List",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c1484a8416d3a773ad130c90e5e45778516e3feb26984d414d890a26cf1a7767?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094",
  },
];

const Dashboard = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
  
      const openModal = () => setIsModalOpen(true);
      const closeModal = () => setIsModalOpen(false);
  return (
    <Template>
      <div className="overflow-hidden pr-9 max-md:pr-5">
        <div className="flex flex-col ml-5 w-full max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-6 w-full max-md:mt-10 max-md:max-w-full">
            {/* Navigation Section */}
            <div className="flex justify-between items-center w-full gap-4 max-md:flex-col max-md:gap-2">
              {/* Left Side: Home > Dashboard */}
              <div className="text-2xl font-medium text-red-400">
                <span className="text-stone-950">Home &gt;</span> Dashboard
              </div>

              {/* Right Side: Add Patients Button and Bell Icon */}
              <div className="flex gap-4 items-center">
                {/* Add Patients Button */}
                <button className="flex gap-3 items-center px-4 py-2 text-lg text-red-400 bg-white rounded-3xl" onClick={openModal}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/874760c2663c6faa1d3c0e9bd5098aba26030a899498306744e98c73ff55b777?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
                    alt="Add Patients"
                    className="w-6 aspect-square"
                  />
                  <span>Add Patients</span>
                </button>

                {/* Bell Icon */}
                <button className="p-3 bg-white rounded-3xl h-[51px] w-[51px] flex items-center justify-center">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a7d180f2faa03e2b2d5fc9af8941b387b39edf3a69901854b08bbdd2730a31b?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
                    alt="Bell Icon"
                    className="w-6 aspect-square"
                  />
                </button>
              </div>
            </div>

            {/* Banner Section */}
            <div
              className="relative w-full bg-red-400 rounded-3xl aspect-[4.5] max-md:aspect-auto max-md:max-w-full"
              style={{
                backgroundImage: `url(${BackgroundPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-between px-10 py-6 max-md:px-5 max-md:flex-col max-md:gap-5">
                {/* Text Content */}
                <div className="text-white max-w-md max-md:text-center">
                  <h1 className="text-4xl font-bold max-md:text-3xl">Good Morning, Dr. Rabindra</h1>
                  <p className="mt-2 text-lg max-md:text-base">
                    Have a nice day at work! Let's start by reviewing your patients.
                  </p>
                  <button className="mt-4 px-6 py-2 text-lg font-medium text-red-400 bg-white rounded-lg max-md:w-full">
                    View Patient's Details
                  </button>
                </div>

                {/* Doctor's Photo */}
                <div className="flex-shrink-0">
                  <img
                    src={doctorPhoto}
                    alt="Doctor"
                    className="h-48 rounded-full max-md:h-36"
                  />
                </div>
              </div>
            </div>

            {/* Stats Cards Section */}
            <div className="mt-3.5 w-full max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                {statsData.map((stat, index) => (
                  <StatsCard key={index} {...stat} />
                ))}
              </div>
            </div>

            {/* Additional Content Section */}
            <div className="mt-6 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <GenderChart />
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex shrink-0 mx-auto max-w-full bg-white rounded-3xl h-[292px] w-[339px] max-md:mt-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <PatientDashboardModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </Template>
  );
};


const PatientDashboardModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-center">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black bg-opacity-50"
      onClick={onClose}
    ></div>
    {/* Modal */}
    <div
      className="relative w-[400px] h-[calc(100%-40px)] bg-white rounded-l-3xl rounded-r-3xl shadow-lg p-6 overflow-y-auto mr-5 mt-5 mb-5"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE and Edge
      }}
    >
      <style>
        {`
        /* For WebKit browsers (Chrome, Safari) */
        .relative::-webkit-scrollbar {
          display: none;
        }
      `}
      </style>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
      <h2 className="text-2xl font-semibold text-[#FF7B54]">Add Patient</h2>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Patient Name
          </label>
          <input
            type="text"
            className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:ring "
            placeholder="Enter patient name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Patient Number
          </label>
          <input
            type="tel"
               className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:ring "
            placeholder="Enter patient number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Gender
          </label>
          <select
            className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:ring "
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Village Details
          </label>
          <input
            className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:ring "
            rows="3"
            placeholder="Enter village details"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:ring "
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:ring "
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Remarks
          </label>
          <textarea
            className="w-full p-2 border bg-[#F4F4F4] h-[52px] rounded-[13px] focus:outline-none focus:ring "
            rows="3"
            placeholder="Enter any remarks"
          ></textarea>
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
export default Dashboard;
