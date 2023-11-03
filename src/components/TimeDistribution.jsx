import React from "react";

const TimeDistribution = ({ tasks, workTime }) => {
  // Удалим неиспользуемые переменные startTime и endTime, поскольку рабочее время приходит из props

  // функция для преобразования времени задачи в минуты
  const convertToMinutes = (hours) => {
    return hours * 60; // теперь у нас часы преобразуются в минуты напрямую
  };

  // общее доступное время для работы в минутах
  const totalWorkMinutes = convertToMinutes(workTime);

  // расчет общей длительности задач в минутах
  const totalTasksDurationMinutes = tasks.reduce(
    (acc, task) => acc + convertToMinutes(task.duration),
    0
  );

  // проверка, превышает ли суммарная длительность задач доступное время
  if (totalTasksDurationMinutes > totalWorkMinutes) {
    console.error(
      "Суммарная длительность задач превышает доступное рабочее время!"
    );
    // Здесь можно добавить какую-то логику обработки ошибки
  }

  // распределение времени, если суммарная длительность задач меньше или равна доступному времени
  const distributeTime = () => {
    return tasks.map((task) => {
      const taskTimeMinutes = convertToMinutes(task.duration);
      const distributedTime =
        totalWorkMinutes * (taskTimeMinutes / totalTasksDurationMinutes);
      return { ...task, distributedTime: distributedTime / 60 }; // переводим обратно в часы
    });
  };

  const distributedTasks = distributeTime();

  return (
    <div>
      <h2>Распределение времени</h2>
      {distributedTasks.map((task, index) => (
        <div key={index}>
          {task.name}: {task.distributedTime.toFixed(2)} часа(ов)
        </div>
      ))}
    </div>
  );
};

export default TimeDistribution;
