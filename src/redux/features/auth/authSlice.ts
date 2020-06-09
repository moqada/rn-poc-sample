import {APIClient} from '@infra/api/APIClient';
import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import {AsyncStorage} from 'react-native';
import {RootState} from 'redux/rootReducer';
import {AppThunkAPI} from 'redux/store';

const ACCESS_TOKEN_STORE_KEY = 'auth/accessToken';

type AccessTokenResponse = {
  token: string;
  expiresIn: number;
  createdAt: string;
};
interface AuthState {
  accessToken: null | AccessTokenResponse;
}
const initialState: AuthState = {
  accessToken: null,
};

const selectState = (state: RootState) => state.auth;
const selectAccessToken = createSelector(
  selectState,
  (state) => state.accessToken
);

export const login = createAsyncThunk<
  AccessTokenResponse,
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
      await AsyncStorage.setItem(
        ACCESS_TOKEN_STORE_KEY,
        JSON.stringify(response)
      );
      return response.data;
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
  AccessTokenResponse | null,
  void,
  AppThunkAPI
>('auth/loadAccessToken', async () => {
  const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_STORE_KEY);
  return accessToken ? (JSON.parse(accessToken) as AccessTokenResponse) : null;
});

const account = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
      })
      .addCase(loadAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      });
  },
});

export const selectors = {selectAccessToken};
export default account.reducer;
