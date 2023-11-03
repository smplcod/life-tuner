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

  // проверка превышения общей длительности задач над доступным временем
  if (totalTasksDurationMinutes > totalWorkMinutes) {
    console.error(
      "Суммарная длительность задач превышает доступное рабочее время!"
    );
  }

  // Функция для форматирования времени в часы и минуты с округлением минут
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours} ч ${mins < 10 ? "0" : ""}${mins} мин`;
  };

  // распределение времени с округлением до двух знаков после запятой
  const distributeTime = () => {
    return tasks.map((task) => {
      const taskTimeMinutes = convertToMinutes(task.duration);
      const distributedTime =
        Math.round(
          totalWorkMinutes * (taskTimeMinutes / totalTasksDurationMinutes) * 100
        ) / 100; // Округление до двух знаков после запятой
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
