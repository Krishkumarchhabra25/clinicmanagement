import * as React from "react";

function GenderChart() {
  return (
    <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden flex-col items-start px-5 py-7 mx-auto w-full text-base font-medium bg-white rounded-3xl text-neutral-500 max-md:mt-6 max-md:max-w-full">
        <div className="flex gap-10 self-stretch w-full text-neutral-400 max-md:max-w-full">
          <div className="grow">Patient's By Gender</div>
          <div className="flex gap-3.5 items-center self-start whitespace-nowrap">
            <div className="flex gap-1 items-center self-stretch my-auto">
              <div className="flex shrink-0 self-stretch my-auto bg-red-400 rounded-sm h-[11px] w-[11px]" />
              <div className="self-stretch my-auto">Male</div>
              <div className="self-stretch my-auto">75%</div>
            </div>
            <div className="flex gap-1 items-center self-stretch my-auto">
              <div className="flex shrink-0 self-stretch my-auto bg-gray-800 rounded-sm h-[11px] w-[11px]" />
              <div className="self-stretch my-auto">Female</div>
              <div className="self-stretch my-auto">24%</div>
            </div>
            <div className="flex gap-1 items-center self-stretch my-auto">
              <div className="flex shrink-0 self-stretch my-auto bg-red-300 rounded-sm h-[11px] w-[11px]" />
              <div className="self-stretch my-auto">Others</div>
              <div className="self-stretch my-auto">1%</div>
            </div>
          </div>
          <button className="flex gap-1.5 items-center px-1.5 py-1 text-xs whitespace-nowrap rounded border border-solid border-stone-300">
            <div className="self-stretch my-auto">2022</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/be93c900e01626c0e788e4d687c3116fe4c44bbf99060971d65b723f6214bc86?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-2 aspect-[2]"
            />
          </button>
        </div>
        <div className="mt-5">80</div>
        <div className="mt-5">60</div>
        <div className="mt-5">40</div>
        <div className="mt-5">20</div>
        <div className="flex gap-5 mt-5 whitespace-nowrap">
          <div>0</div>
          <div>Jan</div>
          <div>Feb</div>
          <div>Mar</div>
          <div>Apr</div>
          <div>May</div>
          <div>June</div>
          <div>Jul</div>
          <div>Aug</div>
          <div>Sep</div>
          <div>Oct</div>
          <div>Nov</div>
          <div>Dec</div>
        </div>
      </div>
    </div>
  );
}

export default GenderChart;