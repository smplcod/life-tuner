import React from "react";

function TaskList({ tasks }) {
  return (
    <div>
      <h2>Список задач</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name}: {task.duration} часа(ов)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
