import React, { useState } from "react";
import TimePicker from "react-time-picker";
import Switch from "react-switch";
import Template from "../../components/common/Template";

const scheduleData = [
  { day: "Sunday", startTime: "09:00", endTime: "20:00", isWorking: true },
  { day: "Monday", startTime: "09:00", endTime: "20:00", isWorking: true },
  { day: "Tuesday", startTime: "09:00", endTime: "21:00", isWorking: true },
  { day: "Wednesday", startTime: "09:00", endTime: "20:00", isWorking: true },
  { day: "Thursday", startTime: "Select Time", endTime: "20:00", isWorking: true },
  { day: "Friday", startTime: "Select Time", endTime: "Select Time", isWorking: true },
  { day: "Saturday", startTime: "", endTime: "", isWorking: false },
];

const Availability = () => {
  const [schedule, setSchedule] = useState(scheduleData);

  const updateSchedule = (index, key, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][key] = value;
    setSchedule(newSchedule);
  };

  return (
    <Template>
      <div className="flex overflow-hidden flex-col px-6 py-5 bg-white rounded-3xl max-md:px-5">
        <div className="self-start text-base font-medium text-neutral-400">
          Add Your Availability
        </div>
        <div className="flex flex-col mt-10 w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full">
            {schedule.map((daySchedule, index) => (
              <DaySchedule
                key={daySchedule.day}
                index={index}
                schedule={daySchedule}
                updateSchedule={updateSchedule}
              />
            ))}
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Availability;

const DaySchedule = ({ index, schedule, updateSchedule }) => {
  const { day, isWorking, startTime, endTime } = schedule;

  return (
    <div className="flex flex-col min-w-[240px] w-[485px] max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <div className="self-stretch my-auto text-lg text-neutral-600">{day}</div>
        <Switch
          onChange={() => updateSchedule(index, "isWorking", !isWorking)}
          checked={isWorking}
          offColor="#808080"
          onColor="#FF0000"
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </div>
      {isWorking ? (
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
    <div className="flex flex-wrap gap-3.5 justify-center items-center mt-3.5 w-full text-base text-stone-950 max-md:max-w-full">
      <div className="flex flex-col flex-1 shrink justify-center self-stretch px-2.5 py-3.5 my-auto rounded-xl basis-0 bg-zinc-100 min-h-[52px]">
        <TimePicker
          onChange={(value) => updateSchedule("startTime", value)}
          value={startTime === "Select Time" ? null : startTime}
          clearIcon={null}
          clockIcon={null}
        />
      </div>
      <div className="self-stretch my-auto text-gray-800">To</div>
      <div className="flex flex-col flex-1 shrink justify-center self-stretch px-2.5 py-3.5 my-auto rounded-xl basis-0 bg-zinc-100 min-h-[52px]">
        <TimePicker
          onChange={(value) => updateSchedule("endTime", value)}
          value={endTime === "Select Time" ? null : endTime}
          clearIcon={null}
          clockIcon={null}
        />
      </div>
    </div>
  );
};
