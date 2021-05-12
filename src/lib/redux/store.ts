import {
  configureStore as rtkConfigureStore,
  AnyAction,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import thunk, { ThunkAction } from 'redux-thunk';

import { UseCaseExecutor } from '../useCase';
import { actionSanitizer } from '../useCase/redux/devTools';

import rootReducer, { RootState } from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunk];

const store = rtkConfigureStore({
  devTools: { actionSanitizer },
  middleware: middlewares,
  reducer: rootReducer,
});

export const configureStore = ({
  useCaseExecutor,
}: {
  useCaseExecutor: UseCaseExecutor;
}) => {
  sagaMiddleware.run(rootSaga, { useCaseExecutor });
  return store;
};

export type AppThunk = ThunkAction<any, RootState, unknown, AnyAction>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
// export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppThunkAPI<E = void, R = void> = {
  state: RootState;
  dispatch: AppDispatch;
  extra: E;
  rejectValue: R;
};
export interface ReduxProvider {
  dispatch: AppDispatch;
  getState: typeof store.getState;
}
