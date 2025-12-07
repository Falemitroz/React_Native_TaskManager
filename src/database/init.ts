import { openDB } from './db';

export const initDB = async () => {
  const db = await openDB();

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      icon TEXT,
      iconBgColor TEXT
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY NOT NULL,
      listId INTEGER NOT NULL,
      title TEXT NOT NULL,
      checked INTEGER DEFAULT 0,
      priority INTEGER DEFAULT 0,
      dueDate TEXT,             
      completedAt INTEGER,       
      FOREIGN KEY(listId) REFERENCES lists(id)
    );
  `);

  return db;
};
