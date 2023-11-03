import React from "react";

const TimeDistribution = ({ tasks, workTime }) => {
  // функция для преобразования времени задачи в минуты
  const convertToMinutes = (hours) => hours * 60;

  // общее доступное время для работы в минутах
  const totalWorkMinutes = convertToMinutes(workTime);

  // расчет общей длительности задач в минутах
  const totalTasksDurationMinutes = tasks.reduce(
    (acc, task) => acc + convertToMinutes(task.duration),
    0
  );

  if (totalTasksDurationMinutes > totalWorkMinutes) {
    console.error(
      "Суммарная длительность задач превышает доступное рабочее время!"
    );
  }

  // Функция для форматирования времени в часы и минуты
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} ч ${mins < 10 ? "0" : ""}${mins} мин`;
  };

  // распределение времени
  const distributeTime = () => {
    return tasks.map((task) => {
      const taskTimeMinutes = convertToMinutes(task.duration);
      const distributedTime =
        totalWorkMinutes * (taskTimeMinutes / totalTasksDurationMinutes);
      return { ...task, distributedTime: formatTime(distributedTime) };
    });
  };

  const distributedTasks = distributeTime();

  return (
    <div>
      <h2>Распределение времени</h2>
      {distributedTasks.map((task, index) => (
        <div key={index}>
          {task.name}: {task.distributedTime}
        </div>
      ))}
    </div>
  );
};

export default TimeDistribution;
