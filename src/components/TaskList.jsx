import React from "react";

function TaskList({ tasks, onRemoveTask, onUpdateTime }) {
  // Функция для преобразования часов в формат "ч:мм"
  const formatDuration = (hours) => {
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}:${m < 10 ? "0" : ""}${m}`;
  };

  // Функция для увеличения длительности задачи
  const incrementHours = (index) => {
    onUpdateTime(index, {
      ...tasks[index],
      duration: tasks[index].duration + 1,
    });
  };

  // Функция для уменьшения длительности задачи
  const decrementHours = (index) => {
    if (tasks[index].duration >= 1) {
      onUpdateTime(index, {
        ...tasks[index],
        duration: tasks[index].duration - 1,
      });
    }
  };

  // Функция для вычисления общего времени задач
  const calculateTotalDuration = () => {
    const totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);
    return formatDuration(totalDuration);
  };

  const totalDuration = calculateTotalDuration();

  return (
    <div>
      <h2>Список задач</h2>
      <ul>
        {tasks.map((task, index) => {
          // Извлекаем часы и минуты для отображения кнопок управления
          const hours = Math.floor(task.duration);
          const minutes = Math.round((task.duration - hours) * 60);

          return (
            <li key={index}>
              <span
                onClick={() => onRemoveTask(index)}
                style={{ cursor: "pointer", marginRight: "10px" }}
              >
                ❌
              </span>
              {task.name}:
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "5px",
                  }}
                >
                  <button
                    onClick={() => incrementHours(index)}
                    style={{ marginBottom: "2px" }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => decrementHours(index)}
                    disabled={hours < 1}
                  >
                    -
                  </button>
                </div>
                {formatDuration(task.duration)}
              </span>
            </li>
          );
        })}
      </ul>
      <div>Общее время задач: {totalDuration}</div>
    </div>
  );
}

export default TaskList;
