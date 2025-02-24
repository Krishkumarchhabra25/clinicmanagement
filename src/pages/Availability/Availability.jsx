import React, { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Switch from "react-switch";
import Template from "../../components/common/Template";
import { FaClock } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchAvailability, updateAvailabilityStatus } from "../../redux/slices/availabilitySlice";


const Availability = () => {
/*   const [schedule, setSchedule] = useState(scheduleData);

  const updateSchedule = (index, key, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][key] = value;
    setSchedule(newSchedule);
  };
 */

  const dispatch = useDispatch();
  const { schedule, loading } = useSelector((state) => state.availability);

  useEffect(() => {
    console.log("Dispatching fetchAvailability");
    dispatch(fetchAvailability());
  }, [dispatch]);

  const updateSchedule = (index, key, value) => {
    const updatedData = { ...schedule[index], [key]: value };
  
    // Dispatch Redux action to update API & state
    dispatch(updateAvailabilityStatus({ id: schedule[index]._id, updatedData }));
  };
  

  return (
    <Template>
    <div className="flex overflow-hidden flex-col px-6 py-5 bg-white rounded-3xl max-md:px-5">
      <div className="self-start text-base font-medium text-neutral-400">
        Add Your Availability
      </div>
      <div className="flex flex-col mt-10 w-full max-md:max-w-full">
        {loading ? (
          <div className="w-full flex justify-center items-center text-gray-500 text-lg min-h-[100px]">
            Loading...
          </div>
        ) : schedule && schedule.length > 0 ? (
          <div className="flex flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full">
            {schedule.map((daySchedule, index) => (
              <DaySchedule
                key={daySchedule._id}
                index={index}
                schedule={daySchedule}
                updateSchedule={updateSchedule}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center text-gray-500 text-lg min-h-[100px]">
            No availability is there
          </div>
        )}
      </div>
    </div>
  </Template>
  );
};

export default Availability;

const DaySchedule = ({ index, schedule, updateSchedule }) => {
  // Destructure using correct key from API
  const { day, isworking, startTime, endTime } = schedule;

  return (
    <div className="flex flex-col min-w-[240px] w-[485px] max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <div className="self-stretch my-auto text-lg text-neutral-600">{day}</div>
        <Switch
          onChange={() => updateSchedule(index, "isworking", !isworking)}
          checked={isworking} // Ensure correct state mapping
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
      {isworking ? (
        <TimeSlot
          startTime={startTime}
          endTime={endTime}
          updateSchedule={(key, value) => updateSchedule(index, key, value)}
        />
      ) : (
        <div className="flex-1 shrink gap-3.5 self-stretch mt-3.5 w-full text-base text-gray-800 min-h-[52px] max-md:max-w-full">
          Not working on this day
        </div>
      )}
    </div>
  );
};

const TimeSlot = ({ startTime, endTime, updateSchedule }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center items-center mt-3.5 w-full text-base text-stone-950 max-md:max-w-full">
      <div className="flex flex-col flex-1 shrink justify-center self-stretch px-2.5 py-3.5 my-auto rounded-xl basis-0 bg-transparent min-h-[52px] border border-gray-300">
        <div className="flex items-center gap-2">
          <TimePicker
            onChange={(value) => updateSchedule("startTime", value)}
            value={startTime && startTime !== "" ? startTime : ""}
            disableClock
            clearIcon={null}
            className="w-full bg-transparent outline-none border-none text-sm"
            placeholder="09:00 AM"
          />
          <FaClock className="text-gray-500" />
        </div>
      </div>
      <div className="self-stretch my-auto text-gray-800">To</div>
      <div className="flex flex-col flex-1 shrink justify-center self-stretch px-2.5 py-3.5 my-auto rounded-xl basis-0 bg-transparent min-h-[52px] border border-gray-300">
        <div className="flex items-center gap-2">
          <TimePicker
            onChange={(value) => updateSchedule("endTime", value)}
            value={endTime && endTime !== "" ? endTime : ""}
            disableClock
            clearIcon={null}
            className="w-full bg-transparent outline-none border-none text-sm"
            placeholder="05:00 PM"
          />
          <FaClock className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};
