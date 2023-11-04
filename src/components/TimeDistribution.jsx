import React, { useEffect } from "react";

const TimeDistribution = ({ tasks, workTime, IMPORTANT }) => {
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

  // Функция для форматирования времени в формате "ч:мм"
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}:${mins < 10 ? "0" : ""}${mins}`;
  };

  // распределение времени с округлением до ближайшей целой минуты
  const distributeTime = () => {
    return tasks.map((task) => {
      const taskTimeMinutes = convertToMinutes(task.duration);
      const distributedTime = Math.round(
        totalWorkMinutes * (taskTimeMinutes / totalTasksDurationMinutes)
      );
      return { ...task, distributedTime: formatTime(distributedTime) };
    });
  };

  const distributedTasks = distributeTime();

  useEffect(() => {
    // Здесь ты можешь выполнять действия при изменении значения IMPORTANT
    console.log(`Время важного события: ${IMPORTANT}`);
  }, [IMPORTANT]);

  return (
    <div>
      <h2>Распределение времени</h2>
      {distributedTasks.map((task, index) => (
        <div key={index}>
          {task.name}: {task.distributedTime}
        </div>
      ))}
      <div>Важное время: {IMPORTANT}</div>
    </div>
  );
};

export default TimeDistribution;
