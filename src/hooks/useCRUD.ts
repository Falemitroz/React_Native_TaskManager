import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import {
  addList,
  updateList,
  removeList,
  setLists,
} from '../features/listsSlice';
import {
  addTask,
  updateTask,
  removeTask,
  setTasks,
} from '../features/tasksSlice';
import { useCallback } from 'react';
import { List } from '../types/listTypes';
import { Task } from '../types/taskTypes';
import { dbAddList, dbDeleteList, dbUpdateList } from '../database/lists';
import { dbAddTask, dbDeleteTask, dbUpdateTask } from '../database/tasks';

export const useList = () => {
  const lists = useSelector((state: RootState) => state.lists.lists);
  const dispatch = useDispatch<AppDispatch>();

  // CREATE
  const createList = useCallback(
    async (data: Omit<List, 'id'>) => {
      const newList = await dbAddList(data);
      dispatch(addList(newList));
      return newList;
    },
    [dispatch],
  );
  // READ
  const getList = useCallback(
    (id: number) => {
      return lists.find(l => l.id === id);
    },
    [lists],
  );

  // UPDATE
  const editList = useCallback(
    async (id: number, updateData: {}) => {
      await dbUpdateList(id, updateData);
      dispatch(updateList({ id, ...updateData }));
    },
    [dispatch],
  );

  // DELETE
  const deleteList = useCallback(
    async (id: number) => {
      await dbDeleteList(id);
      dispatch(removeList(id));
    },
    [dispatch],
  );

  // LOAD LISTS
  const loadLists = useCallback(
    (lists: List[]) => {
      dispatch(setLists(lists));
    },
    [dispatch],
  );

  return {
    lists,
    createList,
    getList,
    editList,
    deleteList,
    loadLists,
  };
};

export const useTask = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();

  // CREATE
  const createTask = useCallback(
    async (data: Omit<Task, 'id'>) => {
      const newTask = await dbAddTask(data);
      dispatch(addTask(newTask));
      return newTask;
    },
    [dispatch],
  );
  // READ
  const getListTasks = useCallback(
    (listId: number) => {
      return tasks.filter(t => t.listId === listId);
    },
    [tasks],
  );

  // UPDATE
  const editTask = useCallback(
    async (id: number, updateData: Partial<Task>) => {
      await dbUpdateTask(id, updateData);
      dispatch(updateTask({ id, changes: updateData }));
    },
    [dispatch],
  );

  // DELETE
  const deleteTask = useCallback(
    async (id: number) => {
      await dbDeleteTask(id);
      dispatch(removeTask(id));
    },
    [dispatch],
  );

  // LOAD TASKS
  const loadTasks = useCallback(
    (tasks: Task[]) => {
      dispatch(setTasks(tasks));
    },
    [dispatch],
  );

  return {
    tasks,
    createTask,
    getListTasks,
    editTask,
    deleteTask,
    loadTasks,
  };
};
