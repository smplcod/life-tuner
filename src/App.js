import React, { useState } from "react";

import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TimeDistribution from "./components/TimeDistribution";
import TimeInput from "./components/TimeInput";

function App() {
  // Добавляем начальные тестовые задачи
  const initialTasks = [
    { name: "Задача1", duration: 0.5 },
    { name: "Задача2", duration: 0.5 },
    { name: "Задача3", duration: 1 },
    { name: "Задача4", duration: 1 },
    { name: "Задача5", duration: 2 },
    { name: "Задача6", duration: 2 },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [workTime, setWorkTime] = useState(8);

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <>
      <TimeInput onSetWorkTime={setWorkTime} />
      <TaskInput onAddTask={handleAddTask} />
      <TimeDistribution tasks={tasks} workTime={workTime} />
      <TaskList tasks={tasks} />
    </>
  );
}

export default App;
