export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export interface DueDate {
  day: number;
  month: number;
  year: number;
}

export interface Task {
  id: number;
  listId: number;
  title: string;
  dueDate?: DueDate | null;
  completedAt?: number | undefined;
  checked?: boolean;
  priority?: boolean;
}
