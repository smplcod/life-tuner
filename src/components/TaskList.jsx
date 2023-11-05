import React from "react";
import styles from "./TaskList.module.css";

function TaskList({
  tasks,
  onRemoveTask,
  onUpdateTime,
  isPomodoroEnabled,
  pomodoroDuration,
  breakDuration,
}) {
  // Функция для преобразования часов в формат "ч:мм"
  const formatDuration = (hours) => {
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}:${m < 10 ? "0" : ""}${m}`;
  };

  // Функция для увеличения длительности задачи на час
  const incrementHours = (index) => {
    onUpdateTime(index, {
      ...tasks[index],
      duration: tasks[index].duration + 1,
    });
  };

  // Функция для уменьшения длительности задачи на час
  const decrementHours = (index) => {
    if (tasks[index].duration >= 1) {
      onUpdateTime(index, {
        ...tasks[index],
        duration: tasks[index].duration - 1,
      });
    }
  };

  // Функция для увеличения длительности задачи на 5 минут
  const incrementMinutes = (index) => {
    const newDuration = tasks[index].duration + 5 / 60;
    onUpdateTime(index, {
      ...tasks[index],
      duration: newDuration,
    });
  };

  // Функция для уменьшения длительности задачи на 5 минут
  const decrementMinutes = (index) => {
    if (tasks[index].duration * 60 >= 5) {
      const newDuration = tasks[index].duration - 5 / 60;
      onUpdateTime(index, {
        ...tasks[index],
        duration: newDuration,
      });
    }
  };

  // Функция для вычисления общего времени задач
  const calculateTotalDuration = () => {
    const totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);
    return formatDuration(totalDuration);
  };

  // Функция для вычисления количества помидоров для задачи
  const getPomodorosForTask = (duration) => {
    return Math.floor(duration / (pomodoroDuration + breakDuration));
  };
  // Функция для создания строки с эмодзи помидоров
  const renderPomodoros = (duration) => {
    const pomodoroCount = getPomodorosForTask(duration * 60);
    return `${"🍅".repeat(pomodoroCount)} ${pomodoroCount}`;
  };

  const totalDuration = calculateTotalDuration();

  return (
    <div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={styles.taskItem}>
            <span
              onClick={() => onRemoveTask(index)}
              className={styles.taskName}
              style={{ cursor: "pointer" }}
            >
              ❌
            </span>
            {task.name}:
            <span className={styles.taskTimeControls}>
              <div className={styles.taskTimeButtonGroup}>
                <button
                  onClick={() => incrementHours(index)}
                  className={styles.buttonSmall}
                >
                  +
                </button>
                <button
                  onClick={() => decrementHours(index)}
                  disabled={tasks[index].duration < 1}
                  className={styles.buttonSmall}
                >
                  -
                </button>
              </div>
              {formatDuration(task.duration)}
              <div className={styles.taskTimeButtonGroup}>
                <button
                  onClick={() => incrementMinutes(index)}
                  className={styles.buttonSmall}
                >
                  +
                </button>
                <button
                  onClick={() => decrementMinutes(index)}
                  disabled={tasks[index].duration * 60 < 5}
                  className={styles.buttonSmall}
                >
                  -
                </button>
              </div>
              {isPomodoroEnabled ? renderPomodoros(task.duration) : ""}
            </span>
          </li>
        ))}
      </ul>
      <div>Общее время задач: {totalDuration}</div>
      <div>
        Помидоры: {pomodoroDuration}/{breakDuration}
      </div>
    </div>
  );
}

export default TaskList;
