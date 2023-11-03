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
