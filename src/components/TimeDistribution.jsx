import React from "react";

function TimeDistribution({ tasks, workTime }) {
  const totalTime = tasks.reduce((acc, task) => acc + task.duration, 0);
  const scale = workTime / totalTime;

  const distributedTasks = tasks.map((task) => {
    const distributedTime = Math.min(task.duration * scale, workTime);
    workTime -= distributedTime;
    return { ...task, distributedTime };
  });

  return (
    <div>
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
