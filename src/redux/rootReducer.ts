import {combineReducers} from '@reduxjs/toolkit';

import accountReducer from './features/account/accountSlice';
import appReducer from './features/app/appSlice';
import indicatorReducer from './features/app/indicatorSlice';
import authReducer from './features/auth/authSlice';
import todoReducer from './features/todo/todoSlice';

const rootReducer = combineReducers({
  account: accountReducer,
  app: appReducer,
  auth: authReducer,
  indicator: indicatorReducer,
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
