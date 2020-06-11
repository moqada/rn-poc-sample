import {APIClient, AccessTokenResource} from '@infra/api/APIClient';
import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {AsyncStorage} from 'react-native';

import {AccessToken, AccessTokenId} from '@domain/auth';

import {RootState} from '../../../redux/rootReducer';
import {AppThunkAPI} from '../../../redux/store';

const ACCESS_TOKEN_STORE_KEY = 'auth/accessToken';

type AccessTokenEntity = {
  id: string;
  expiresIn: number;
  createdAt: string;
};

const createAccessToken = (entity: AccessTokenEntity): AccessToken => {
  return new AccessToken({
    createdAt: new Date(entity.createdAt),
    expiresIn: entity.expiresIn,
    id: new AccessTokenId(entity.id),
  });
};
const convertAccessTokenEntity = ({
  token,
  ...response
}: AccessTokenResource): AccessTokenEntity => {
  return {...response, id: token};
};
const accessTokenAdapter = createEntityAdapter<AccessTokenEntity>();
const initialState = accessTokenAdapter.getInitialState<{
  currentId: string | null;
}>({
  currentId: null,
});

type AuthState = typeof initialState;

const selectState = (state: RootState) => state.auth;
const adapterSelectors = accessTokenAdapter.getSelectors(selectState);
const selectOne = (state: RootState) => {
  return (id: string) => {
    const entity = adapterSelectors.selectById(state, id);
    return entity ? createAccessToken(entity) : null;
  };
};
const selectCurrentId = createSelector(selectState, (state) => state.currentId);
const selectAccessToken = createSelector(
  selectCurrentId,
  selectOne,
  (currentId, selecor) => {
    return currentId && selecor(currentId);
  }
);

export const login = createAsyncThunk<
  AccessTokenEntity,
  {username: string; password: string},
  AppThunkAPI
>(
  'auth/login',
  async (
    {username, password}: {username: string; password: string},
    {rejectWithValue}
  ) => {
    const api = new APIClient({});
    try {
      const response = await api.login({username, password});
      const entity = convertAccessTokenEntity(response.data);
      await AsyncStorage.setItem(
        ACCESS_TOKEN_STORE_KEY,
        JSON.stringify(entity)
      );
      return entity;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const logout = createAsyncThunk<void, {token: string}, AppThunkAPI>(
  'auth/logout',
  async ({token}, {rejectWithValue}) => {
    const api = new APIClient({token});
    try {
      await api.logout({token});
      await AsyncStorage.removeItem(ACCESS_TOKEN_STORE_KEY);
      return;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const loadAccessToken = createAsyncThunk<
  AccessTokenEntity | null,
  void,
  AppThunkAPI
>('auth/loadAccessToken', async () => {
  const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_STORE_KEY);
  return accessToken ? (JSON.parse(accessToken) as AccessTokenEntity) : null;
});

const account = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.currentId = action.payload.id;
        return accessTokenAdapter.addOne(state, action.payload);
      })
      .addCase(logout.fulfilled, (state, action) => {
        const {token} = action.meta.arg;
        state.currentId = null;
        return accessTokenAdapter.removeOne(state, token);
      })
      .addCase(loadAccessToken.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentId = action.payload.id;
          return accessTokenAdapter.addOne(state, action.payload);
        }
        state.currentId = null;
      });
  },
});

export const selectors = {selectAccessToken};
export default account.reducer;
