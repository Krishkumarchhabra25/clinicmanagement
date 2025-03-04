import * as React from "react";
import userIcon from "../../assets/user person 1.png"
import navigateIcon  from "../../assets/Group 2.png"
import { useNavigate } from "react-router-dom";
function StatsCard({ title, value, action, icon }) {
  const navigate = useNavigate();

  const handleSubmit = () =>{
     navigate("/Patientrecord")
  }
  const role = localStorage.getItem("role");

  return (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden gap-5 justify-between items-start px-4 py-3.5 mx-auto w-full bg-white rounded-3xl max-md:mt-6">
        <div className="flex flex-col items-start mt-2.5">
          <div className="self-stretch text-base font-medium text-neutral-400">
            {title}
          </div>
          <div className="text-3xl font-bold text-red-400">{value}</div>
          {role === "admin" && (
            <div className="flex flex-col justify-center items-center px-1.5 py-1 mt-3 text-xs rounded-xl bg-zinc-100 text-neutral-500">
              <div className="flex gap-1 items-center">
                <div
                  onClick={handleSubmit}
                  className="self-stretch my-auto cursor-pointer"
                >
                  view more
                </div>
                <img
                  loading="lazy"
                  src={navigateIcon}
                  alt="navigate icon"
                  className="object-contain shrink-0 self-stretch my-auto rounded-none aspect-square w-[18px]"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2.5 justify-center items-center px-1 bg-red-400 rounded-xl h-[41px] min-h-[41px] w-[41px]">
          <img
            loading="lazy"
            src={userIcon}
            alt=""
            className="object-contain self-stretch my-auto w-8 aspect-square"
          />
        </div>
      </div>
    </div>
  );
}

export default StatsCard;