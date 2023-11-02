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
    const workMinutes =
      endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
    onSetWorkTime(workMinutes / 60);
    console.log(
      `Начало рабочего дня: ${startTime}, конец рабочего дня: ${endTime}`
    );
  };

  return (
    <div>
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
