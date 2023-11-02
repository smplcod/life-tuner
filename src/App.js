import React, { useState } from "react";

import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TimeDistribution from "./components/TimeDistribution";
import TimeInput from "./components/TimeInput";

function App() {
  const [tasks, setTasks] = useState([]);
  const [workTime, setWorkTime] = useState(8);

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleSetWorkTime = (workTime) => {
    console.log(`Рабочее время: ${workTime}`);
    // Здесь ты можешь делать что угодно с рабочим временем
  };

  return (
    <>
      <TimeInput onSetWorkTime={setWorkTime} />
      <hr></hr>
      <TaskInput onAddTask={handleAddTask} />
      <hr></hr>
      <TimeDistribution tasks={tasks} workTime={workTime} />
      <hr></hr>
      <TaskList tasks={tasks} />
    </>
  );
}

export default App;
