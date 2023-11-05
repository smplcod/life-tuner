// PomodoroSettings.jsx
import React from "react";

function PomodoroSettings({
  pomodoroDuration,
  breakDuration,
  onPomodoroChange,
  onBreakChange,
}) {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        backgroundColor: "#f0f0f0",
        width: "300px",
        marginBottom: "10px",
      }}
    >
      <div style={{ marginBottom: "5px" }}>
        <label>
          Длительность Помидора (минуты):
          <input
            type="number"
            value={pomodoroDuration}
            onChange={onPomodoroChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div>
        <label>
          Длительность Паузы (минуты):
          <input
            type="number"
            value={breakDuration}
            onChange={onBreakChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
    </div>
  );
}

export default PomodoroSettings;
