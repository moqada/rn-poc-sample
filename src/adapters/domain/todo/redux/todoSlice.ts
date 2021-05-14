import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Project, TodoItem} from '../../../../domain/todo';
import {RootState} from '../../../../lib/redux/rootReducer';

type TodoState = {
  items: {[key: string]: TodoItem};
  projects: {[key: string]: Project};
};
const p = Project.create({
  createdAt: new Date(),
  id: 'inbox',
  title: 'Inbox',
  updatedAt: new Date(),
});
const initialState: TodoState = {items: {}, projects: {p}};
const todoSlice = createSlice({
  initialState,
  name: 'todo',
  reducers: {
    itemSaved: (state, action: PayloadAction<TodoItem>) => {
      state.items[action.payload.id] = action.payload;
    },
    projectSaved: (state, action: PayloadAction<Project>) => {
      state.projects[action.payload.id] = action.payload;
    },
  },
});

const selectState = (state: RootState) => state.todo;
const selectProjectAll = createSelector(
  selectState,
  (todo): Array<Project> => Object.values(todo.projects)
);
const selectProjectById = (state: RootState, id: string): Project | null =>
  selectState(state).projects[id] || null;
const selectItemById = (state: RootState, id: string): TodoItem | null =>
  selectState(state).items[id] || null;

export const todoActions = todoSlice.actions;
export const todoSelectors = {
  selectItemById,
  selectProjectAll,
  selectProjectById,
};
export default todoSlice.reducer;
