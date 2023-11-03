import React, { useState } from "react";

function TaskInput({ onAddTask }) {
  const [taskName, setTaskName] = useState("");
  // Используем localStorage для сохранения длительности задачи
  const [taskTime, setTaskTime] = useState(
    localStorage.getItem("lastTaskDuration") || "00:30"
  );

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskTimeChange = (event) => {
    setTaskTime(event.target.value);
    localStorage.setItem("lastTaskDuration", event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (taskName && taskTime) {
      const [hours, minutes] = taskTime.split(":").map(Number);
      const duration = hours + minutes / 60;
      onAddTask({ name: taskName, duration });
      setTaskName("");
      // Не сбрасываем время на 30 минут, оставляем последнее введенное
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
        step="60"
        value={taskTime}
        onChange={handleTaskTimeChange}
      />
      <button onClick={handleSubmit}>Добавить задачу</button>
    </div>
  );
}

export default TaskInput;
