import React, { useState } from "react";

function TaskInput({ onAddTask }) {
  const [taskName, setTaskName] = useState("");
  const [taskDuration, setTaskDuration] = useState("");

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDurationChange = (event) => {
    setTaskDuration(event.target.value);
  };

  const handleSubmit = () => {
    onAddTask({ name: taskName, duration: Number(taskDuration) });
    setTaskName("");
    setTaskDuration("");
  };

  return (
    <div>
      <label>
        Название задачи:
        <input type="text" value={taskName} onChange={handleTaskNameChange} />
      </label>
      <br />
      <label>
        Длительность задачи (в часах):
        <input
          type="number"
          value={taskDuration}
          onChange={handleTaskDurationChange}
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Добавить задачу</button>
    </div>
  );
}

export default TaskInput;
