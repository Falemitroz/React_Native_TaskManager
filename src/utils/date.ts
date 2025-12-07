import { useTask } from '../hooks';
import { DueDate, Task } from '../types/taskTypes';

export const getWeekTasks = () => {
  const { tasks } = useTask();
  const today = new Date();

  // Calcola il giorno di partenza
  let startDate = new Date(today);

  const isSame = (a?: DueDate, b?: DueDate) =>
    a && b && a.day === b.day && a.month === b.month && a.year === b.year;

  const result: {
    dayName: string;
    date: DueDate;
    tasks: Task[];
  }[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);

    const due: DueDate = {
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
    };

    const dayName =
      i === 0
        ? 'Today'
        : i === 1
        ? 'Tomorrow'
        : d.toLocaleString('en', { weekday: 'long' });

    result.push({
      dayName,
      date: due,
      tasks: tasks.filter(t => isSame(t.dueDate, due)),
    });
  }

  return result;
};

export const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const MONTHS = Array.from({ length: 12 }, (_, i) =>
  new Date(2000, i).toLocaleString('en', { month: 'short' }),
);
