import React from "react";

function TaskList({ tasks }) {
  // Функция для преобразования часов в формат "ч:мм"
  const formatDuration = (hours) => {
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}:${m < 10 ? "0" : ""}${m}`;
  };

  return (
    <div>
      <h2>Список задач</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name}: {formatDuration(task.duration)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
