import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProportionalTasksAndTimePage from "./pages/ProportionalTasksAndTimePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/mvp/proporsional-tasks-and-time"
          element={<ProportionalTasksAndTimePage />}
        />
        <Route path="/mvp" element={<div>Страница MVP</div>} />
        <Route path="/" element={<div>Начнем заново</div>} />
      </Routes>
    </Router>
  );
}

export default App;
