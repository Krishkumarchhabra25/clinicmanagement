// src/components/SupportProfileSetting.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from 'react-switch';
import { fetchSupportProfile, updateSupportPermissionsThunk } from '../../redux/slices/supportSlice';
import { toast } from 'react-toastify';
// Toggle component for each permission
export const PermissionToggle = ({ label, checked = false, onChange }) => (
  <div className="flex justify-between items-center w-full">
    <h3 className="flex-1 shrink my-auto text-2xl text-black">{label}</h3>
    <Switch
      onChange={onChange}
      checked={checked}
      offColor="#E5E5E5"
      onColor="#E5E5E5"
      offHandleColor="#162832"
      onHandleColor="#FF7B54"
      uncheckedIcon={false}
      checkedIcon={false}
      handleDiameter={20}
      height={23}
      width={48}
    />
  </div>
);

// Section component for grouping related permissions
export const PermissionSection = ({ title, permissionsList, toggleStates, onToggle }) => (
  <section className="p-5 rounded-2xl bg-neutral-100 min-w-60 w-[476px] max-md:max-w-full">
    <h2 className="text-lg text-black">{title}</h2>
    <div className="py-2.5 mt-3 w-full border-t bg-neutral-100 border-zinc-300">
      {permissionsList.map((permission) => (
        <div key={permission.id} className="mt-4 first:mt-0">
          <PermissionToggle
            label={permission.label}
            checked={toggleStates[permission.id]}
            onChange={(value) => onToggle(permission.id, value)}
          />
        </div>
      ))}
    </div>
  </section>
);

export const SupportProfileSetting = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.support);

  const role = localStorage.getItem("role");

  // Local state for toggles; keys correspond to the permission structure in the backend.
  const [toggleStates, setToggleStates] = useState({
    view: false,
    create: false,
    edit: false,
    delete: false,
    appointments_create: false,
    appointments_edit: false,
    availability_edit: false,
  });

  // Define the permissions for each section
  const patientRecordsPermissions = [
    { id: 'view', label: "View Patient Records" },
    { id: 'create', label: "Create Patient Records" },
    { id: 'edit', label: "Edit Patient Records" },
    { id: 'delete', label: "Delete Patient Records" },
  ];

  const otherPermissions = [
    { id: 'appointments_create', label: "Create Appointments" },
    { id: 'appointments_edit', label: "Edit Appointments" },
    { id: 'availability_edit', label: "Edit Availability" },
  ];

  // Fetch support profile on component mount
  useEffect(() => {
    dispatch(fetchSupportProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const errorMessage =
        typeof error === "string" ? error : error.message || "Something went wrong";
      toast.error(errorMessage, { toastId: "support-error" });
    }
  }, [error]);
  
  // When profile is loaded, initialize toggle states with current permission values
  useEffect(() => {
    if (profile && profile.permissions) {
      setToggleStates({
        view: profile.permissions.patients?.view || false,
        create: profile.permissions.patients?.create || false,
        edit: profile.permissions.patients?.edit || false,
        delete: profile.permissions.patients?.delete || false,
        appointments_create: profile.permissions.appointments?.create || false,
        appointments_edit: profile.permissions.appointments?.edit || false,
        availability_edit: profile.permissions.availability?.edit || false,
      });
    }
  }, [profile]);

  // When a toggle changes, update local state and immediately call the API.
  const handleToggle = (id, value) => {
    setToggleStates((prev) => {
      const newState = { ...prev, [id]: value };
      // Build the permissions object as expected by the backend
      const updatedPermissions = {
        patients: {
          view: newState.view,
          create: newState.create,
          edit: newState.edit,
          delete: newState.delete,
        },
        appointments: {
          create: newState.appointments_create,
          edit: newState.appointments_edit,
        },
        availability: {
          edit: newState.availability_edit,
        }
      };
      // Dispatch the API update immediately
      dispatch(updateSupportPermissionsThunk({ permissions: updatedPermissions }));
      return newState;
    });
  };

  return (
    <div className="p-6">
    <div className="flex items-center justify-between mx-2 mb-6">
    <div className="flex items-center">
      <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
      <h1 className="text-[24px] text-[#FF7B54] mx-2">Support Mangement</h1>
    </div>
  </div>
      {loading && <p>Loading support profile...</p>}

      {profile && (
        <>
          {/* Profile Information */}
          <div className="flex flex-col mx-2 mb-10 gap-4">
            <label className="text-gray-600 font-medium mb-1">Username</label>
            <div className="bg-transparent break-words text-black max-w-[434px] flex items-center">
              <div className="flex-1">{profile.email}</div>
            </div>
            <label className="text-gray-600 font-medium mb-1">Password</label>
            <div className="bg-transparent break-words text-black max-w-[434px] flex items-center">
              <div className="flex-1">********</div>
            </div>
          </div>

          {/* Access Control Section */}
          {role === "admin" ? (
            <>
            <div className="flex items-center justify-between mx-2 mb-6">
            <div className="flex items-center">
              <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
              <h1 className="text-[24px] text-[#FF7B54] mx-2">Access Control</h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 justify-between items-start mt-6 w-full max-md:max-w-full">
            <PermissionSection
              title="Patient's Records"
              permissionsList={patientRecordsPermissions}
              toggleStates={toggleStates}
              onToggle={handleToggle}
            />
            <PermissionSection
              title="Appointments & Availability"
              permissionsList={otherPermissions}
              toggleStates={toggleStates}
              onToggle={handleToggle}
            />
          </div>
          </>
          ) :(

          <div>
            <h1>No Permission granted</h1>
          </div>
           )}
     
        </>
      )}
    </div>
  );
};
