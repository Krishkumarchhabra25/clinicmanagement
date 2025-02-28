import * as React from "react";

function GenderChart({ genderPercentages }) {
  return (
    <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col items-start px-5 py-7 mx-auto w-full text-base font-medium bg-white rounded-3xl text-neutral-500 max-md:mt-6 max-md:max-w-full">
        <div className="flex gap-10 self-stretch w-full text-neutral-400 max-md:max-w-full">
          <div className="grow">Patients By Gender</div>
          <div className="flex gap-3.5 items-center self-start whitespace-nowrap">
            <div className="flex gap-1 items-center">
              <div className="flex bg-red-400 rounded-sm h-[11px] w-[11px]" />
              <div>Male</div>
              <div>{genderPercentages.male}%</div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="flex bg-gray-800 rounded-sm h-[11px] w-[11px]" />
              <div>Female</div>
              <div>{genderPercentages.female}%</div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="flex bg-red-300 rounded-sm h-[11px] w-[11px]" />
              <div>Others</div>
              <div>{genderPercentages.other}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenderChart;
