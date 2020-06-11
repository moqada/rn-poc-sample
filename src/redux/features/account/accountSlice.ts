import {APIClient} from '@infra/api/APIClient';
import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import {RootState} from 'redux/rootReducer';

type UserResponse = {
  username: string;
  phoneNumber: string;
  birthday: string;
};
interface AccountState {
  user: null | UserResponse;
}
const initialState: AccountState = {
  user: null,
};

const selectState = (state: RootState): AccountState => state.account;
const selectUser = createSelector(selectState, (account) => {
  console.log('selectUser');
  return account.user;
});

export const fetchUser = createAsyncThunk(
  'account/fetchUser',
  async (params, {rejectWithValue}) => {
    // TODO: token
    const api = new APIClient({});
    try {
      const response = await api.userSelf();
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

const account = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const selectors = {selectUser};
export default account.reducer;
