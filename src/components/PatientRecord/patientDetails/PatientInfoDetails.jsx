import React, { useState } from "react";
import { PatientHeader } from "./PatientHeaderDetails";
import { PatientInfoFieldDetails } from "./PatientInputFiledDetails";
import { useLocation, useNavigate } from "react-router-dom";

export default function PatientInfoDetails() {
  const [activeTab, setActiveTab] = useState("Patient Information");
  const { state } = useLocation();
  const [isEditMode, setIsEditMode] = useState(state?.isEditMode || false);

  const navigate = useNavigate();

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const cancelEditMode = () => {
    setIsEditMode(false);
  };

  const saveChanges = () => {
    // Save logic here
    console.log("Changes saved");
    setIsEditMode(false);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 pb-4">
        <h1
          className="text-[25px] text-[#FF7B54] font-medium"
          style={{ fontFamily: "Outfit" }}
        >
          <button>Patient Records </button> <span> > Patient Details</span>
        </h1>
      </div>

      <div className="flex overflow-hidden flex-col  bg-white rounded-3xl max-md:pb-24">
        <PatientHeader
          isEditMode={isEditMode}
          toggleEditMode={toggleEditMode}
          cancelEditMode={cancelEditMode}
          saveChanges={saveChanges}
        />

        <div className="flex gap-10 mt-12 max-w-full text-lg font-medium w-full px-10 max-md:mt-10">
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
        </div>
        <div className="flex overflow-hidden flex-col mt-2  bg-white rounded-3xl max-md:pb-24">
        <div className="mt-10 w-full px-10 max-md:max-w-full">
          {activeTab === "Patient Information" && (
            <div className="flex flex-col gap-6 w-full max-md:max-w-full">
              <PatientInfoFieldDetails isEditMode={isEditMode} />
            </div>
          )}
          {activeTab === "Medical Preferences" && (
            <div className="flex flex-col gap-6 w-full max-md:max-w-full">
              <PatientInfoFieldDetails />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
