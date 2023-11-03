// TimeInput.js
import React, { useState } from "react";

function TimeInput({ onSetWorkTime }) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleSubmit = () => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    // Пересчитываем время, учитывая возможный переход через полночь
    let workMinutes =
      endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
    if (workMinutes < 0) {
      // Если рабочее время заканчивается после полуночи
      workMinutes =
        24 * 60 -
        (startHours * 60 + startMinutes) +
        (endHours * 60 + endMinutes);
    }
    onSetWorkTime(workMinutes / 60);
    console.log(
      `Начало рабочего дня: ${startTime}, конец рабочего дня: ${endTime}`
    );
  };

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
      <br />
      <button onClick={handleSubmit}>Сохранить</button>
    </div>
  );
}

export default TimeInput;
