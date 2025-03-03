import React, { useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Switch from "react-switch";
import Template from "../../components/common/Template";
import { FaClock } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchAvailability, updateAvailabilityStatus } from "../../redux/slices/availabilitySlice";

const Availability = () => {
  const dispatch = useDispatch();
  const { schedule, loading } = useSelector((state) => state.availability);

  useEffect(() => {
    dispatch(fetchAvailability());
  }, [dispatch]);

  const updateSchedule = (index, key, value) => {
    const updatedData = { ...schedule[index], [key]: value };
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
              No availability found.
            </div>
          )}
        </div>
      </div>
    </Template>
  );
};

export default Availability;

const DaySchedule = ({ index, schedule, updateSchedule }) => {
  const { day, isworking, startTime, endTime } = schedule;

  return (
    <div className="flex flex-col min-w-[240px] w-[485px] max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <div className="self-stretch my-auto text-lg text-neutral-600">{day}</div>
        <Switch
          onChange={() => updateSchedule(index, "isworking", !isworking)}
          checked={isworking}
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
  // Helper function to convert 24-hour format to 12-hour format with AM/PM
  const convertTo12HourFormat = (time) => {
    if (!time) return ""; // Return empty string if no time is provided

    const [hour, minute] = time.split(":");
    let period = "AM";
    let hour12 = parseInt(hour, 10);

    if (hour12 >= 12) {
      period = "PM";
      if (hour12 > 12) hour12 -= 12;
    } else if (hour12 === 0) {
      hour12 = 12; // Handle midnight (00:00)
    }

    return `${hour12}:${minute} ${period}`;
  };

  // Helper function to convert 12-hour format back to 24-hour format
  const convertTo24HourFormat = (time) => {
    if (!time) return ""; // Return empty string if no time is provided

    const [timePart, period] = time.split(" ");
    const [hour, minute] = timePart.split(":");
    let hour24 = parseInt(hour, 10);

    if (period === "PM" && hour24 < 12) {
      hour24 += 12;
    } else if (period === "AM" && hour24 === 12) {
      hour24 = 0; // Handle midnight (12:00 AM)
    }

    return `${hour24.toString().padStart(2, "0")}:${minute}`;
  };

  const handleTimeChange = (key, value) => {
    if (key === "startTime" && endTime && value >= endTime) {
      alert("Start time must be before end time.");
      return;
    }
    if (key === "endTime" && startTime && value <= startTime) {
      alert("End time must be after start time.");
      return;
    }

    // Convert the selected time back to 24-hour format before updating
    const time24Hour = convertTo24HourFormat(value);
    updateSchedule(key, time24Hour);
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center items-center mt-3.5 w-full text-base text-stone-950 max-md:max-w-full">
      <div className="flex flex-col flex-1 shrink justify-center self-stretch px-2.5 py-3.5 my-auto rounded-xl basis-0 bg-transparent min-h-[52px] border border-gray-300">
        <div className="flex items-center gap-2">
          <TimePicker
            onChange={(value) => handleTimeChange("startTime", value)}
            value={convertTo12HourFormat(startTime) || "09:00 AM"} // Default to 09:00 AM if no startTime is provided
            disableClock
            clearIcon={null}
            className="w-full bg-transparent outline-none border-none text-sm"
            format="h:mm a" // Display time in 12-hour format with AM/PM
          />
          <FaClock className="text-gray-500" />
        </div>
      </div>
      <div className="self-stretch my-auto text-gray-800">To</div>
      <div className="flex flex-col flex-1 shrink justify-center self-stretch px-2.5 py-3.5 my-auto rounded-xl basis-0 bg-transparent min-h-[52px] border border-gray-300">
        <div className="flex items-center gap-2">
          <TimePicker
            onChange={(value) => handleTimeChange("endTime", value)}
            value={convertTo12HourFormat(endTime) || "05:00 PM"} // Default to 05:00 PM if no endTime is provided
            disableClock
            clearIcon={null}
            className="w-full bg-transparent outline-none border-none text-sm"
            format="h:mm a" // Display time in 12-hour format with AM/PM
          />
          <FaClock className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};