import React, { useState, useEffect } from "react";

function TimeInput({ onSetWorkTime }) {
  // Функция для получения текущего времени в формате HH:mm
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const [startTime, setStartTime] = useState(getCurrentTime());
  const [endTime, setEndTime] = useState("");

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  // Эффект для пересчета времени при изменении startTime или endTime
  useEffect(() => {
    if (startTime && endTime) {
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const [endHours, endMinutes] = endTime.split(":").map(Number);

      let workMinutes =
        endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
      if (workMinutes < 0) {
        // Переводим время в следующие сутки
        workMinutes =
          24 * 60 -
          (startHours * 60 + startMinutes) +
          (endHours * 60 + endMinutes);
      }

      onSetWorkTime(workMinutes / 60);
    }
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
    </div>
  );
}

export default TimeInput;
