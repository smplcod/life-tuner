import React, { useState, useEffect } from "react";

function TimeInput({ onSetWorkTime, setStartTime2 }) {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getEndTimeByAddingHours = (startTime, hoursToAdd) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const endDate = new Date();
    endDate.setHours(startHours + hoursToAdd, startMinutes, 0);
    return endDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${
      mins < 10 ? `0${mins}` : mins
    }`;
  };

  const [startTime, setStartTime] = useState("6:00");
  // const [startTime, setStartTime] = useState(getCurrentTime());

  const [endTime, setEndTime] = useState(() =>
    getEndTimeByAddingHours(getCurrentTime(), 8)
  );
  const [workDuration, setWorkDuration] = useState("");

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
    setStartTime2(startTime);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  useEffect(() => {
    setStartTime2(startTime);
  }, [startTime]);
  useEffect(() => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    let workMinutes =
      endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
    if (workMinutes < 0) {
      workMinutes =
        24 * 60 -
        (startHours * 60 + startMinutes) +
        (endHours * 60 + endMinutes);
    }

    setWorkDuration(formatDuration(workMinutes));
    onSetWorkTime(workMinutes / 60);
  }, [startTime, endTime, onSetWorkTime]);

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        backgroundColor: "#f0f0f0",
        width: "300px",
      }}
    >
      <label>
        Начало рабочего дня:
        <input type="time" value={startTime} onChange={handleStartTimeChange} />
      </label>
      <br />
      <label>
        Конец рабочего дня:
        <input type="time" value={endTime} onChange={handleEndTimeChange} />
      </label>
      <p>Длительность рабочего дня: {workDuration}</p>
    </div>
  );
}

export default TimeInput;
