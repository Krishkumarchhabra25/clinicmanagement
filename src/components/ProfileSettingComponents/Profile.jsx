
import  { useState } from 'react'

import {AdminProfileSetting} from './AdminProfileSetting';
import {SupportProfileSetting} from './SupportProfileSetting';
import ClinicProfileSetting from './ClinicProfileSetting';

export default function Profile() {
    const [activeTab, setActiveTab] = useState("Admin Profile");

  
    return (
      <div>
        <div className="flex flex-row items-center justify-between px-4 pb-4">
          <h1
            className="text-[25px] text-[#FF7B54] font-medium"
            style={{ fontFamily: "Outfit" }}
          >
            <button>Profile Setting </button>
          </h1>
        </div>
  
        <div className="flex overflow-hidden flex-col  bg-white rounded-t-3xl max-md:pb-24">
         
  
          <div className="flex gap-10 mt-12 max-w-full text-lg font-medium w-full px-10 max-md:mt-10">
            <button
              className={`${
                activeTab === "Admin Profile"
                  ? "text-red-400 border-b-4 border-red-400"
                  : "text-zinc-400"
              } pb-2`}
              onClick={() => setActiveTab("Admin Profile")}
            >
            Admin Profile
            </button>
            <button
              className={`${
                activeTab === "Suport Profile"
                  ? "text-red-400 border-b-4 border-red-400"
                  : "text-zinc-400"
              } pb-2`}
              onClick={() => setActiveTab("Suport Profile")}
            >
            Suport Profile
            </button>
            <button
              className={`${
                activeTab === "Clinic Profile"
                  ? "text-red-400 border-b-4 border-red-400"
                  : "text-zinc-400"
              } pb-2`}
              onClick={() => setActiveTab("Clinic Profile")}
            >
              Clinic Profile
            </button>
        
          </div>
          </div>
          <div className="flex overflow-hidden flex-col mt-2  bg-white rounded-b-3xl max-md:pb-24">
          <div className="mt-10 w-full px-10 max-md:max-w-full">
            {activeTab === "Admin Profile" && (
              <div className="flex flex-col gap-6 w-full max-md:max-w-full">
                <AdminProfileSetting />
              </div>
            )}
            {activeTab === "Suport Profile" && (
              <div className="flex flex-col gap-6 w-full max-md:max-w-full">
                <SupportProfileSetting />
              </div>
            )}
            {activeTab === "Clinic Profile" && (
              <div className="flex flex-col gap-6 w-full max-md:max-w-full">
                <ClinicProfileSetting />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  