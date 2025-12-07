import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { List } from '../types/listTypes';

type ListState = { lists: List[] };

const initialState: ListState = {
  lists: [],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, actions: PayloadAction<List>) => {
      state.lists.push(actions.payload);
    },
    updateList: (state, action: PayloadAction<Partial<List>>) => {
      const index = state.lists.findIndex(l => l.id === action.payload.id);
      if (index !== -1) {
        state.lists[index] = {
          ...state.lists[index],
          ...action.payload,
        };
      }
    },
    removeList: (state, action: PayloadAction<number>) => {
      state.lists = state.lists.filter(l => l.id !== action.payload);
    },
    setLists: (state, action: PayloadAction<List[]>) => {
      state.lists = action.payload;
    },
  },
});

export const { addList, updateList, removeList, setLists } = listsSlice.actions;
export default listsSlice.reducer;
