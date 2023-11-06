// PomodoroSettings.jsx
import React from "react";

function PomodoroSettings({
  pomodoroDuration,
  breakDuration,
  onPomodoroChange,
  onBreakChange,
}) {
  // Обработчик изменения времени Помидора
  const handlePomodoroDurationChange = (event) => {
    // Получаем числовое значение из ввода
    const newDuration = Math.max(10, parseInt(event.target.value, 10));
    // Обновляем значение только если оно не NaN и не меньше минимально допустимого
    if (!isNaN(newDuration)) {
      onPomodoroChange({ target: { value: String(newDuration) } });
    }
  };

  // Аналогичный обработчик для времени Паузы
  const handleBreakDurationChange = (event) => {
    const newDuration = Math.max(0, parseInt(event.target.value, 10));
    if (!isNaN(newDuration)) {
      onBreakChange({ target: { value: String(newDuration) } });
    }
  };

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
            onChange={handlePomodoroDurationChange}
            style={{ marginLeft: "10px" }}
            min="10"
          />
        </label>
      </div>
      <div>
        <label>
          Длительность Паузы (минуты):
          <input
            type="number"
            value={breakDuration}
            onChange={handleBreakDurationChange}
            style={{ marginLeft: "10px" }}
            min="0"
          />
        </label>
      </div>
    </div>
  );
}

export default PomodoroSettings;
