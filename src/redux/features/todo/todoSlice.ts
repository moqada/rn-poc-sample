import {APIClient} from '@infra/api/APIClient';
import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import {RootState} from 'redux/rootReducer';

type Todo = {
  id: string;
  title: string;
  checked: boolean;
  updatedAt: string;
  createdAt: string;
};
interface TodoState {
  items: Array<Todo>;
}

const initialState: TodoState = {
  items: [],
};

const selectTodoState = (state: RootState) => state.todo;
const selectTodoAll = createSelector(selectTodoState, (state) =>
  state.items.map(({createdAt, updatedAt, ...todo}) => ({
    ...todo,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  }))
);

export const fetchTodoById = createAsyncThunk(
  'todo/fetchTodo',
  async ({id}: {id: string}, {rejectWithValue}) => {
    const api = new APIClient({});
    try {
      const response = await api.todoSelf(id);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);
export const fetchTodoAll = createAsyncThunk(
  'todo/fetchTodoAll',
  async (_, {rejectWithValue}) => {
    const api = new APIClient({});
    try {
      const response = await api.todoInstances();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async (
    {title, checked}: {title: string; checked: boolean},
    {rejectWithValue}
  ) => {
    const api = new APIClient({});
    try {
      const response = await api.todoCreate({title, checked});
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async (
    {id, title, checked}: {id: string; title: string; checked: boolean},
    {rejectWithValue}
  ) => {
    const api = new APIClient({});
    try {
      const response = await api.todoUpdate(id, {title, checked});
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoById.fulfilled, (state, action) => {
        state.items = state.items.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.items = state.items.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(fetchTodoAll.fulfilled, (state, action) => {
        state.items == action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});
export const selectors = {selectTodoAll};
export default todoSlice.reducer;
