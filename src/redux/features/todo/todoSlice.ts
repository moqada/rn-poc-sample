import {APIClient, TodoResource} from '@infra/api/APIClient';
import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {RootState} from 'redux/rootReducer';
import {AppThunkAPI} from 'redux/store';

import {Todo, TodoId, TodoTitle} from '@domain/todo';

type TodoStateEntity = {
  id: string;
  title: string;
  checked: boolean;
  updatedAt: string;
  createdAt: string;
};
const todoAdapter = createEntityAdapter<TodoStateEntity>();
const initialState = todoAdapter.getInitialState();
type TodoState = typeof initialState;
// const initialState: TodoState = {
//   items: [],
// };
const convertResponseToTodoStateEntity = (
  response: TodoResource
): TodoStateEntity => {
  return response;
};
const convertStateEntityToTodoEntity = (entity: TodoStateEntity): Todo => {
  // console.log('convert', entity);
  return new Todo({
    id: new TodoId(entity.id),
    title: new TodoTitle(entity.title),
    checked: entity.checked,
    createdAt: new Date(entity.createdAt),
    updatedAt: new Date(entity.updatedAt),
  });
};

const performSelectAll = (state) => {
  const before = performance.now();
  const ret = adapterSelectors.selectAll(state);
  // const ret = adapterSelectors
  //   .selectAll(state)
  //   .map(convertStateEntityToTodoEntity);
  console.log('peprformSelectAll', performance.now() - before);
  return ret;
};
const selectTodoState = (state: RootState) => state.todo;
const adapterSelectors = todoAdapter.getSelectors();
const selectTodoAll = createSelector(selectTodoState, (state: TodoState) => {
  console.log('call selectTodoAll');
  // return adapterSelectors.selectAll(state).map(convertStateEntityToTodoEntity);
  // return adapterSelectors.selectAll(state);
  return performSelectAll(state);
});
const selectTodoById = createSelector(
  selectTodoState,
  (state: RootState, id: string) => id,
  (state: TodoState, id: string) => {
    console.log('call selectTodoById', id);
    const entity = adapterSelectors.selectById(state, id);
    return entity && convertStateEntityToTodoEntity(entity);
  }
);

export const fetchTodoById = createAsyncThunk<
  TodoStateEntity,
  {id: string},
  AppThunkAPI
>('todo/fetchTodo', async ({id}: {id: string}, {rejectWithValue}) => {
  const api = new APIClient({});
  try {
    const response = await api.todoSelf(id);
    return convertResponseToTodoStateEntity(response.data);
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response);
  }
});
export const fetchTodoAll = createAsyncThunk<
  Array<TodoStateEntity>,
  void,
  AppThunkAPI
>('todo/fetchTodoAll', async (_, {rejectWithValue}) => {
  const api = new APIClient({});
  try {
    const response = await api.todoInstances();
    return response.data.map(convertResponseToTodoStateEntity);
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response);
  }
});

export const createTodo = createAsyncThunk<
  TodoStateEntity,
  {title: string; checked: boolean},
  AppThunkAPI
>(
  'todo/createTodo',
  async (
    {title, checked}: {title: string; checked: boolean},
    {rejectWithValue}
  ) => {
    const api = new APIClient({});
    try {
      const response = await api.todoCreate({title, checked});
      return convertResponseToTodoStateEntity(response.data);
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const updateTodo = createAsyncThunk<
  TodoStateEntity,
  {id: string; title: string; checked: boolean},
  AppThunkAPI
>(
  'todo/updateTodo',
  async (
    {id, title, checked}: {id: string; title: string; checked: boolean},
    {rejectWithValue}
  ) => {
    const api = new APIClient({});
    try {
      const response = await api.todoUpdate(id, {title, checked});
      return convertResponseToTodoStateEntity(response.data);
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
        return todoAdapter.addOne(state, action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        return todoAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchTodoAll.fulfilled, (state, action) => {
        return todoAdapter.addMany(state, action.payload);
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        return todoAdapter.addOne(state, action.payload);
      });
  },
});
export const selectors = {selectTodoAll, selectTodoById};
export default todoSlice.reducer;
