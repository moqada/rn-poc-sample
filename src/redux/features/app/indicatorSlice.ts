import {createSlice, createSelector} from '@reduxjs/toolkit';
import {RootState} from 'redux/rootReducer';

interface IndicatorState {
  visible: boolean;
}
const initialState: IndicatorState = {visible: false};
const selectIndicatorState = (state: RootState) => state.indicator;
const selectVisible = createSelector(
  selectIndicatorState,
  (state: IndicatorState) => state.visible
);
const indicatorSlice = createSlice({
  name: 'indicator',
  initialState,
  reducers: {
    show: (state) => {
      state.visible = true;
    },
    hide: (state) => {
      state.visible = false;
    },
  },
});
export const {show, hide} = indicatorSlice.actions;
export const selectors = {selectVisible};
export default indicatorSlice.reducer;
