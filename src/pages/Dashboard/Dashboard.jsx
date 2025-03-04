import Template from "../../components/common/Template";
import GenderChart from "../../components/DashboardComponents/GenderChart";
import StatsCard from "../../components/DashboardComponents/StatsCard";
import doctorPhoto from "../../assets/doctor.png";
import BackgroundPhoto from "../../assets/Background.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../../redux/slices/DashboardSlice";

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
  const dispatch = useDispatch();
  const { totalPatients, todaysPatients, genderPercentages, loading, error } =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  console.log("ptoatalpatience",totalPatients)
  console.log("today pateimnce",todaysPatients)
  console.log("gender percemntage",genderPercentages)

      const navigate = useNavigate();

      const handlePatienceList = ()=>{
        navigate("/Patientrecord")
      }

      const role = localStorage.getItem("role");

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
                  {role === "admin" && (
                    <button onClick={handlePatienceList} className="mt-4 px-6 py-2 text-lg font-medium text-red-400 bg-white rounded-lg max-md:w-full">
                    View Patient's Details
                  </button>
                  )}
             
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
              <StatsCard title="Total Patients" value={totalPatients} />
              <StatsCard title="Today's Patients" value={todaysPatients} />
              </div>
            </div>

            {/* Additional Content Section */}
            <div className="mt-6 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
              <GenderChart genderPercentages={genderPercentages} />
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
};



export default Dashboard;
