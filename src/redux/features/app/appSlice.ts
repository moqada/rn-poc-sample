import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {loadAccessToken} from '../auth/authSlice';

interface AppState {
  state: 'none' | 'initialized';
}
const initialState: AppState = {
  state: 'none',
};

export const initialize = createAsyncThunk(
  'app/initialize',
  async (_, {dispatch}) => {
    // FIXME: TypeError
    await dispatch(loadAccessToken());
  }
);
const app = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initialize.fulfilled, (state) => {
      state.state = 'initialized';
    });
  },
});

// export const {initialized} = app.actions;
export default app.reducer;
