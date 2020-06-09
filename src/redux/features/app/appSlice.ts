import {createSlice} from '@reduxjs/toolkit';

interface AppState {
  state: 'none' | 'initialized';
}
const initialState: AppState = {
  state: 'none',
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initialized: (state) => {
      state.state = 'initialized';
    },
  },
});

export const {initialized} = app.actions;
export default app.reducer;
