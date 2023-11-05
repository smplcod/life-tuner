import React, { useEffect } from "react";

const TimeDistribution = ({ tasks, workTime, startTime }) => {
  // функция для преобразования времени задачи в минуты
  const convertToMinutes = (hours) => hours * 60;

  // функция для преобразования минут в формат "ч:мм"
  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins < 10 ? "0" : ""}${mins}`;
  };

  // функция для форматирования интервала времени
  const formatTimeInterval = (start, duration) => {
    const end = start + duration;
    return `${convertMinutesToTime(start)} — ${convertMinutesToTime(end)}`;
  };

  // общее доступное время для работы в минутах
  const totalWorkMinutes = convertToMinutes(workTime);

  // преобразование startTime в минуты
  let currentTime =
    convertToMinutes(parseFloat(startTime.split(":")[0])) +
    parseFloat(startTime.split(":")[1]);

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

  // распределение времени с округлением до ближайшей целой минуты
  const distributeTime = () => {
    return tasks.map((task) => {
      const taskTimeMinutes = convertToMinutes(task.duration);
      const distributedTime = Math.round(
        totalWorkMinutes * (taskTimeMinutes / totalTasksDurationMinutes)
      );
      const timeInterval = formatTimeInterval(currentTime, distributedTime);
      currentTime += distributedTime; // обновление текущего времени для следующей задачи
      return {
        ...task,
        distributedTime: convertMinutesToTime(distributedTime),
        timeInterval,
      };
    });
  };

  const distributedTasks = distributeTime();

  useEffect(() => {
    // Здесь ты можешь выполнять действия при изменении значения startTime
    console.log(`Время важного события: ${startTime}`);
  }, [startTime]);

  return (
    <div>
      <h2>Распределение времени</h2>
      {distributedTasks.map((task, index) => (
        <div key={index}>
          {task.name}: {task.distributedTime} ({task.timeInterval})
        </div>
      ))}
    </div>
  );
};

export default TimeDistribution;
