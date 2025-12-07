import { Task } from '../types/taskTypes';
import { MONTHS } from './date';

export const getFormattedTaskDueDate = (dueDate: Task['dueDate']) =>
  `${dueDate?.day}/${MONTHS[dueDate?.month || 0]}/${dueDate?.year}`;

// funzione per ottenere task filtrate
export const filterTasks = (tasks: Task[]) => {
  const pendingTasks = tasks.filter(t => !t.checked);
  const doneTasks = tasks.filter(t => t.checked);
  const priorityTasks = tasks.filter(t => t.priority);

  return { pendingTasks, doneTasks, priorityTasks };
};

export const listProgress = (tasks: Task[]) => {
  const pendingTasks = tasks.filter(t => !t.checked);
  const doneTasks = tasks.filter(t => t.checked);

  const pendingCount = pendingTasks.length;
  const doneCount = doneTasks.length;
  const totalCount = pendingCount + doneCount;

  const progress = totalCount === 0 ? 0 : doneCount / totalCount;

  return { pendingTasks, doneCount, totalCount, progress };
};
