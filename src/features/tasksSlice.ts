import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/taskTypes';

type TaskState = { tasks: Task[] };

const initialState: TaskState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, actions: PayloadAction<Task>) => {
      state.tasks.push(actions.payload);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: number; changes: Partial<Task> }>,
    ) => {
      const { id, changes } = action.payload;
      const index = state.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        if (
          changes.checked === false &&
          state.tasks[index].completedAt !== undefined
        ) {
          changes.completedAt = undefined;
        }
        state.tasks[index] = { ...state.tasks[index], ...changes };
      }
    },

    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, updateTask, removeTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
