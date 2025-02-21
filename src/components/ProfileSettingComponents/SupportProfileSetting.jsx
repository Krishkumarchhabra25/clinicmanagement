import React, { useState } from 'react';
import Switch from 'react-switch';

export const SupportProfileSetting = () => {
  const patientRecordsPermissions = [
    { id: 'view', label: "View Patient Records" },
    { id: 'create', label: "Create Patient Records" },
    { id: 'edit', label: "Edit Patient Records" },
    { id: 'delete', label: "Delete Patient Records" },
  ];

  const otherPermissions = [
    { id: 'other1', label: "Other Permission 1" },
    { id: 'other2', label: "Other Permission 2" },
  ];

  const initialToggleStates = {
    view: false,
    create: false,
    edit: false,
    delete: false,
    other1: false,
    other2: false,
  };

  const [toggleStates, setToggleStates] = useState(initialToggleStates);

  const handleToggle = (id, value) => {
    setToggleStates(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      {/* Support Management Header */}
      <div className="flex items-center justify-between mx-2 mb-6">
        <div className="flex items-center">
          <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
          <h1 className="text-[24px] text-[#FF7B54] mx-2">Support Management</h1>
        </div>
      </div>

      {/* Profile Information Section */}
      <div className="flex flex-col mx-2 mb-10 gap-4">
        <label className="text-gray-600 font-medium mb-1">Username</label>
        <div className="bg-transparent border-none break-words text-black max-w-[434px] flex justify-between items-center">
          <div className="flex-1">support@gmail.com</div>
        </div>
        <label className="text-gray-600 font-medium mb-1">Password</label>
        <div className="bg-transparent border-none break-words text-black max-w-[434px] flex justify-between items-center">
          <div className="flex-1">support</div>
        </div>
      </div>

      {/* Access Control Section */}
      <div className="flex items-center justify-between mx-2 mb-6">
        <div className="flex items-center">
          <div className="h-[48px] w-[9px] border-e-2 bg-[#FF7B54]" />
          <h1 className="text-[24px] text-[#FF7B54] mx-2">Access Control</h1>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 justify-between items-start mt-6 w-full max-md:max-w-full">
        <PermissionSection
          title="Patient's Records"
          permissions={patientRecordsPermissions}
          toggleStates={toggleStates}
          onToggle={handleToggle}
        />

        <PermissionSection
          title="Other's Permissions"
          permissions={otherPermissions}
          toggleStates={toggleStates}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
};


export const PermissionToggle = ({ label, checked = false, onChange }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <h3 className="flex-1 shrink self-stretch my-auto text-2xl text-black">
        {label}
      </h3>
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
};

export const PermissionSection = ({ title, permissions, toggleStates, onToggle }) => {
  return (
    <section className="p-5 rounded-2xl bg-neutral-100 min-w-60 w-[476px] max-md:max-w-full">
      <h2 className="text-lg text-black max-md:max-w-full">{title}</h2>
      <div className="py-2.5 mt-3 w-full border-t bg-neutral-100 border-zinc-300 max-md:max-w-full">
        {permissions.map((permission) => (
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
};
