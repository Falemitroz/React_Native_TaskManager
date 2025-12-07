import { openDB } from './db';
import { Task } from '../types/taskTypes';

export const dbAddTask = async (task: Omit<Task, 'id'>) => {
  const db = await openDB();

  const result = await db.executeSql(
    `INSERT INTO tasks ( listId, title, checked, completedAt)
     VALUES ( ?, ?, ?, ?)`,
    [task.listId, task.title, task.checked ? 1 : 0, task.completedAt ?? null],
  );
  const insertId = result[0].insertId;
  return { ...task, id: insertId };
};

export const dbGetTasks = async (): Promise<Task[]> => {
  const db = await openDB();
  const res = await db.executeSql(`SELECT * FROM tasks`);
  return res[0].rows.raw(); // raw() → array pulito
};

export const dbGetListTasks = async (
  listId: Task['listId'],
): Promise<Task[]> => {
  const db = await openDB();
  const res = await db.executeSql(`SELECT * FROM tasks WHERE listId= ?`, [
    listId,
  ]);
  const arr = res[0].rows.raw();
  return arr.map(t => ({
    ...t,
    checked: Boolean(t.checked),
  }));
};

export const dbUpdateTask = async (id: number, changes: Partial<Task>) => {
  const db = await openDB();

  const fields = Object.keys(changes);
  if (fields.length === 0) return;

  const setStr = fields.map(f => `${f} = ?`).join(', ');

  const values = fields.map(f => {
    const val = (changes as any)[f];
    if (val === undefined) return null;

    if (typeof val === 'object' && val !== null) {
      return JSON.stringify(val);
    }

    return val;
  });

  await db.executeSql(`UPDATE tasks SET ${setStr} WHERE id = ?`, [
    ...values,
    id,
  ]);
};

export const dbDeleteTask = async (id: number) => {
  const db = await openDB();
  await db.executeSql(`DELETE FROM tasks WHERE id = ?`, [id]);
};
