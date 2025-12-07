import { openDB } from './db';
import { List } from '../types/listTypes';

export const dbAddList = async (list: Omit<List, 'id'>) => {
  const db = await openDB();
  const result = await db.executeSql(
    `INSERT INTO lists ( title, icon, iconBgColor) VALUES ( ?, ?, ?)`,
    [list.title, list.icon, list.iconBgColor],
  );
  const insertId = result[0].insertId;
  return { ...list, id: insertId };
};

export const dbGetLists = async (): Promise<List[]> => {
  const db = await openDB();
  const res = await db.executeSql(`SELECT * FROM lists`);
  return res[0].rows.raw(); // raw() → array pulito
};

export const dbUpdateList = async (id: number, changes: Partial<List>) => {
  const db = await openDB();

  const fields = Object.keys(changes);
  const values = Object.values(changes);

  if (fields.length === 0) return;

  const setStr = fields.map(f => `${f} = ?`).join(', ');

  await db.executeSql(`UPDATE lists SET ${setStr} WHERE id = ?`, [
    ...values,
    id,
  ]);
};

export const dbDeleteList = async (id: number) => {
  const db = await openDB();
  await db.executeSql(`DELETE FROM lists WHERE id = ?`, [id]);
};
