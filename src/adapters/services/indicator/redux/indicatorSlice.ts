import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../lib/redux/rootReducer';

type IndicatorState = { visible: boolean };
const initialState: IndicatorState = { visible: false };

const indicatorSlice = createSlice({
  initialState,
  name: 'indicator',
  reducers: {
    hid: (state) => {
      state.visible = false;
    },
    shown: (state) => {
      state.visible = true;
    },
  },
});

const isVisible = (state: RootState): boolean => state.indicator.visible;

export const indicatorActions = indicatorSlice.actions;
export const indicatorSelectors = { isVisible };
export default indicatorSlice.reducer;
