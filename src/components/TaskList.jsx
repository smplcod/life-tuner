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

// Родительский компонент
function Parent() {
  const toParent = (data) => {
    console.log(data);
  };

  return <Child toParent={toParent} />;
}

// Дочерний компонент
function Child({ toParent }) {
  const sendData = () => {
    const data = "Данные от дочернего компонента";
    toParent(data);
  };

  return <button onClick={sendData}>Send</button>;
}
