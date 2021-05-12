import { combineReducers } from '@reduxjs/toolkit';
import useCaseReducer from '../useCase/redux/useCaseSlice';
import todoReducer from '../../adapters/domain/todo/redux/todoSlice';
import indicatorReducer from '../../adapters/services/indicator/redux/indicatorSlice';

const rootReducer = combineReducers({
  indicator: indicatorReducer,
  todo: todoReducer,
  useCase: useCaseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
