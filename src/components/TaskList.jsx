import React from "react";

function TaskList({ tasks, onRemoveTask }) {
  // Функция для преобразования часов в формат "ч:мм"
  const formatDuration = (hours) => {
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}:${m < 10 ? "0" : ""}${m}`;
  };

  // Функция для вычисления общего времени задач
  const calculateTotalDuration = () => {
    const totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);
    return formatDuration(totalDuration);
  };

  const totalDuration = calculateTotalDuration();

  return (
    <div>
      <h2>Список задач</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              onClick={() => onRemoveTask(index)}
              style={{ cursor: "pointer" }}
            >
              ❌
            </span>
            {task.name}: {formatDuration(task.duration)}
          </li>
        ))}
      </ul>
      <div>Общее время задач: {totalDuration}</div>
    </div>
  );
}

export default TaskList;
