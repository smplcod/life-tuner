import React, { useState, useEffect, useCallback } from "react";
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
  // useEffect(() => {
  //   console.log(parseInt(pomodoroDuration) + parseInt(breakDuration));
  // }, [tasks, pomodoroDuration, breakDuration]);

  // // Функция для вычисления количества помидоров для задачи
  // const getPomodorosForTask = (duration) => {
  //   return Math.floor(duration / (pomodoroDuration + breakDuration));
  // };
  // // Функция для создания строки с эмодзи помидоров
  // const renderPomodoros = (duration) => {
  //   const pomodoroCount = getPomodorosForTask(duration * 60);
  //   return `${"🍅".repeat(pomodoroCount)} ${pomodoroCount}`;
  // };

  const renderPomodoros = useCallback(
    (duration) => {
      // Вычисляем количество помидоров для задачи
      const getPomodorosForTask = (duration) => {
        return Math.floor(
          duration /
            (parseInt(pomodoroDuration, 10) + parseInt(breakDuration, 10))
        );
      };

      // Получаем количество помидоров и создаем строку с эмодзи
      const pomodoroCount = getPomodorosForTask(duration * 60);
      return `${"🍅".repeat(pomodoroCount)} ${pomodoroCount}`;
    },
    [pomodoroDuration, breakDuration] // зависимости для useCallback
  );

  const totalDuration = calculateTotalDuration();

  return (
    <table style={{ width: "100%", textAlign: "left" }}>
      <tbody>
        <tr>
          <th>Задача</th>
          <th colSpan="3">Время</th>
          {isPomodoroEnabled && <th>Помидоры</th>}
        </tr>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>
              <span
                onClick={() => onRemoveTask(index)}
                style={{ cursor: "pointer" }}
              >
                ❌
              </span>
              {task.name}
            </td>
            <td>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => incrementHours(index)}
                  className={styles.buttonSmall}
                >
                  +
                </button>
                <button
                  onClick={() => decrementHours(index)}
                  disabled={task.duration < 1}
                  className={styles.buttonSmall}
                >
                  -
                </button>
              </div>
            </td>
            <td>{formatDuration(task.duration)}</td>
            <td>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => incrementMinutes(index)}
                  className={styles.buttonSmall}
                >
                  +
                </button>
                <button
                  onClick={() => decrementMinutes(index)}
                  disabled={task.duration * 60 < 5}
                  className={styles.buttonSmall}
                >
                  -
                </button>
              </div>
            </td>
            {isPomodoroEnabled && <td>{renderPomodoros(task.duration)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
