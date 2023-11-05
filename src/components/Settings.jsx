import React from "react";

function Settings({
  isIntervalsEnabled,
  onToggleIntervals,
  isPomodoroEnabled,
  onTogglePomodoro,
}) {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        backgroundColor: "#f0f0f0",
        width: "300px",
        marginBottom: "10px", // Добавлен отступ снизу для разделения настроек
      }}
    >
      <div style={{ marginBottom: "5px" }}>
        {" "}
        {/* Добавлен контейнер для интервалов */}
        <label>
          <input
            type="checkbox"
            checked={isIntervalsEnabled}
            onChange={onToggleIntervals}
          />{" "}
          Интервалы
        </label>
      </div>
      <div>
        {" "}
        {/* Добавлен контейнер для помидоров */}
        <label>
          <input
            type="checkbox"
            checked={isPomodoroEnabled}
            onChange={onTogglePomodoro}
          />{" "}
          Помидоры
        </label>
      </div>
    </div>
  );
}

export default Settings;
