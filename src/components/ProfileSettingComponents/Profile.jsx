
import  { useEffect, useState } from 'react'

import {AdminProfileSetting} from './AdminProfileSetting';
import {SupportProfileSetting} from './SupportProfileSetting';
import ClinicProfileSetting from './ClinicProfileSetting';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProfile } from '../../redux/slices/profileSettingSlice';
import { fetchSupportProfile } from '../../redux/slices/supportSlice';

export default function Profile() {
  const dispatch = useDispatch();

  // Fetch admin and support profile data
  const adminProfile = useSelector((state) => state.profile.profile);
  const supportProfile = useSelector((state) => state.support.profile);

  // Determine role from fetched data
  const userRole = adminProfile?.role || supportProfile?.role;

  // State to track the active tab
  const [activeTab, setActiveTab] = useState("");

  // Fetch only the necessary data based on role
  useEffect(() => {
    if (!userRole) {
      dispatch(getAdminProfile()); // Try fetching admin profile first
      dispatch(fetchSupportProfile()); // Try fetching support profile
    }
  }, [dispatch, userRole]);

  // Set the initial active tab after role is determined
  useEffect(() => {
    if (userRole === "admin") {
      setActiveTab("Admin Profile");
    } else if (userRole === "support") {
      setActiveTab("Support Profile");
    }
  }, [userRole]);

  // Show loading if role is not yet determined
  if (!userRole) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 pb-4">
        <h1
          className="text-[25px] text-[#FF7B54] font-medium"
          style={{ fontFamily: "Outfit" }}
        >
          <button>Profile Setting</button>
        </h1>
      </div>

      <div className="flex overflow-hidden flex-col bg-white rounded-t-3xl max-md:pb-24">
        <div className="flex gap-10 mt-12 max-w-full text-lg font-medium w-full px-10 max-md:mt-10">
          {userRole === "admin" && (
            <>
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
                  activeTab === "Clinic Profile"
                    ? "text-red-400 border-b-4 border-red-400"
                    : "text-zinc-400"
                } pb-2`}
                onClick={() => setActiveTab("Clinic Profile")}
              >
                Clinic Profile
              </button>
              <button
                className={`${
                  activeTab === "Support Profile"
                    ? "text-red-400 border-b-4 border-red-400"
                    : "text-zinc-400"
                } pb-2`}
                onClick={() => setActiveTab("Support Profile")}
              >
                Support Profile
              </button>
            </>
          )}
          {userRole === "support" && (
            <button
              className={`${
                activeTab === "Support Profile"
                  ? "text-red-400 border-b-4 border-red-400"
                  : "text-zinc-400"
              } pb-2`}
              onClick={() => setActiveTab("Support Profile")}
            >
              Support Profile
            </button>
          )}
        </div>
      </div>

      <div className="flex overflow-hidden flex-col mt-2 bg-white rounded-b-3xl max-md:pb-24">
        <div className="mt-10 w-full px-10 max-md:max-w-full">
          {activeTab === "Admin Profile" && <AdminProfileSetting />}
          {activeTab === "Clinic Profile" && <ClinicProfileSetting />}
          {activeTab === "Support Profile" && <SupportProfileSetting />}
        </div>
      </div>
    </div>
  );
}
  