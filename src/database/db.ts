import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const openDB = async () => {
  const db = await SQLite.openDatabase({
    name: 'app.db',
    location: 'default',
  });
  console.log('DB path:', db);
  return db;
};
