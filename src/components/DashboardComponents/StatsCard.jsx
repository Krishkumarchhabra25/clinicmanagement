import * as React from "react";

function StatsCard({ title, value, action, icon }) {
  return (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden gap-5 justify-between items-start px-4 py-3.5 mx-auto w-full bg-white rounded-3xl max-md:mt-6">
        <div className="flex flex-col items-start mt-2.5">
          <div className="self-stretch text-base font-medium text-neutral-400">
            {title}
          </div>
          <div className="text-3xl font-bold text-red-400">{value}</div>
          <div className="flex flex-col justify-center items-center px-1.5 py-1 mt-3 text-xs rounded-xl bg-zinc-100 text-neutral-500">
            <div className="flex gap-1 items-center">
              <div className="self-stretch my-auto">{action}</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/730219f8851c40f2b60c3b9a09e165dcc7eff22a7529050bf9cc1810b4bd1c7e?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto rounded-none aspect-square w-[18px]"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 justify-center items-center px-1 bg-red-400 rounded-xl h-[41px] min-h-[41px] w-[41px]">
          <img
            loading="lazy"
            src={icon}
            alt=""
            className="object-contain self-stretch my-auto w-8 aspect-square"
          />
        </div>
      </div>
    </div>
  );
}

export default StatsCard;