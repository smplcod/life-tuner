import React, { useState } from "react";

function TaskInput({ onAddTask }) {
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("01:00"); // Изменим начальное значение на 30 минут

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskTimeChange = (event) => {
    setTaskTime(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (taskName && taskTime) {
      const [hours, minutes] = taskTime.split(":").map(Number);
      const duration = hours + minutes / 60; // Преобразуем вводимое время в часы с десятичной частью
      onAddTask({ name: taskName, duration });
      setTaskName("");
      setTaskTime("01:00"); // Сбрасываем время на 30 минут
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Название задачи..."
        value={taskName}
        onChange={handleTaskNameChange}
        onKeyPress={handleKeyPress}
      />
      <input
        type="time"
        step="60" // Минимальный шаг ввода — 1 минута
        value={taskTime}
        onChange={handleTaskTimeChange}
      />
      <button onClick={handleSubmit}>Добавить задачу</button>
    </div>
  );
}

export default TaskInput;
