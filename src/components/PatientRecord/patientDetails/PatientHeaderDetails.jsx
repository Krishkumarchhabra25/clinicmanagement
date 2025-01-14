import * as React from "react";
import { useNavigate } from "react-router-dom";
export function PatientHeader({
  isEditMode,
  toggleEditMode,
  cancelEditMode,
  saveChanges,
}) {

  const navigate = useNavigate(); // Initialize the navigate function

  const handleBackButtonClick = () => {
    navigate("/PatientRecord"); // Navigate to the PatientRecord page
  };
  return (
    <div className="flex flex-col px-10 w-full max-md:px-5 max-md:max-w-full mt-6">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <div className="flex gap-3 items-start self-stretch my-auto min-w-[240px] w-[341px]">
          <div className="flex gap-2 items-center p-2.5 bg-red-400 rounded-2xl h-[35px] min-h-[35px] w-[35px]" onClick={handleBackButtonClick}>
          <button >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b29444a3e96d89b2c03d89e4ef1f90395dc02fa16d05f0cd2dd52a98c8cd9cca?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
              alt=""
              className="object-contain self-stretch my-auto aspect-square w-[17px]"
            />
            </button>
          </div>
          <div className="flex flex-col flex-1 shrink basis-[18px] min-w-[240px]">
            <div className="text-2xl font-medium text-gray-800">
              Sarthak Ranjan Hota
            </div>
            <div className="flex gap-3 justify-between items-start mt-3 w-full text-xs max-w-[278px] text-neutral-500">
              <div className="gap-2.5 self-stretch px-4 py-2 whitespace-nowrap bg-stone-100">
                #Patients1234
              </div>
              <div className="gap-2.5 self-stretch px-4 py-2 bg-stone-100">
                Registered By ADMIN
              </div>
            </div>
          </div>
        </div>

        {/* Edit Mode Controls */}
        <div className="flex gap-3 items-center self-stretch my-auto">
          {isEditMode ? (
            <>
            <button
            onClick={cancelEditMode}
            className="pr-[20px] pl-[20px] pt-[10px] pb-[10px] bg-[#F4F4F4] text-black rounded-lg"
          >
            Cancel
          </button>
              <button
                onClick={saveChanges}
                className="pr-[20px] pl-[20px] pt-[10px] pb-[10px] bg-[#FF7B54] text-white rounded-lg text-[18px]"
              >
                Save
              </button>
             
            </>
          ) : (
            <button
              onClick={toggleEditMode}
              className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch px-2.5 py-3 my-auto w-12 rounded border border-solid border-stone-300 min-h-[47px]"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/27b25ccc7cf50ff795844cd0bf3810da438b9aba9011a555a2d83af0274ad469?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
                alt="edit"
                className="object-contain self-stretch my-auto w-6 aspect-square"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}