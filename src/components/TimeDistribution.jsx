// TimeDistribution.js
import React from "react";

function TimeDistribution({ tasks, workTime }) {
  // Проверяем, превышает ли суммарное время задач рабочее время
  const totalTime = tasks.reduce((acc, task) => acc + task.duration, 0);

  let remainingWorkTime = workTime;
  const distributedTasks = tasks.map((task) => {
    // Если суммарное время задач меньше или равно рабочему времени, распределяем время
    const distributedTime =
      totalTime <= workTime
        ? task.duration
        : remainingWorkTime > 0
        ? Math.min(task.duration, remainingWorkTime)
        : 0;
    remainingWorkTime -= distributedTime;
    return { ...task, distributedTime };
  });

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        backgroundColor: "#f0f0f0",
        width: "300px",
      }}
    >
      <h2>Распределение времени</h2>
      <ul>
        {distributedTasks.map((task, index) => (
          <li key={index}>
            {task.name}: {task.distributedTime.toFixed(2)} часа(ов)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimeDistribution;
