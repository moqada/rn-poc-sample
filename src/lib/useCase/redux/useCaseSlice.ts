import {
  createSlice,
  createEntityAdapter,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../redux/rootReducer';

import { UseCase } from '../UseCase';
import {
  USECASE_EVENT_TYPES,
  UseCaseEventSucceeded,
  UseCaseEvent,
  UseCaseEventFailed,
  UseCaseEventCommanded,
  UseCaseEventType,
} from '../UseCaseExecutor';

type UseCaseEntity = {
  id: string;
  name: string;
  args: any;
  status: UseCaseEventType;
};
type CommandedAction = PayloadAction<UseCaseEntity>;
type SucceededAction = PayloadAction<
  UseCaseEntity,
  string,
  { useCaseResult: any }
>;
type FailedAction = PayloadAction<UseCaseEntity, string, never, any>;
export type UseCaseAction = CommandedAction | SucceededAction | FailedAction;

const useCaseAdapter = createEntityAdapter<UseCaseEntity>();
const initialState = useCaseAdapter.getInitialState();
type UseCaseState = typeof initialState;
const baseSelectors = useCaseAdapter.getSelectors(
  (state: RootState): UseCaseState => state.useCase
);

const isUseCaseProcessing = (useCase: UseCaseEntity) =>
  useCase.status === USECASE_EVENT_TYPES.commanded;
const selectLatestByUseCase = createSelector(
  baseSelectors.selectAll,
  (_: RootState, useCaseClass: typeof UseCase) => useCaseClass.getName(),
  (items, name) => items.reverse().find((item) => item.name === name)
);
const selectProcessingById = createSelector(
  baseSelectors.selectById,
  (useCase) => (useCase ? isUseCaseProcessing(useCase) : false)
);
const selectProcessingByUseCase = createSelector(
  selectLatestByUseCase,
  (useCase) => (useCase ? isUseCaseProcessing(useCase) : false)
);

/**
 * create useCaseEntity from UseCaseEvent
 *
 * @param event - UseCaseEvent
 */
const createUseCaseEntity = (event: UseCaseEvent) => {
  const { type, command } = event;
  return {
    args: command.args,
    id: command.id,
    name: command.useCase.getName(),
    status: type as UseCaseEventType,
  };
};

const useCaseSlice = createSlice({
  initialState,
  name: 'useCase',
  reducers: {
    commanded: {
      prepare: (event: UseCaseEventCommanded) => {
        const payload = createUseCaseEntity(event);
        return { payload };
      },
      reducer: (state: UseCaseState, action: CommandedAction) => {
        return useCaseAdapter.addOne(state, action.payload);
      },
    },
    failed: {
      prepare: (event: UseCaseEventFailed) => {
        const payload = createUseCaseEntity(event);
        return { error: event.error, payload };
      },
      reducer: (state: UseCaseState, action: FailedAction) => {
        return useCaseAdapter.upsertOne(state, action.payload);
      },
    },
    succeeded: {
      prepare: (event: UseCaseEventSucceeded) => {
        const payload = createUseCaseEntity(event);
        return { meta: { useCaseResult: event.result }, payload };
      },
      reducer: (state: UseCaseState, action: SucceededAction) => {
        return useCaseAdapter.upsertOne(state, action.payload);
      },
    },
  },
});

export const { commanded, succeeded, failed } = useCaseSlice.actions;
export const useCaseSelectors = {
  selectProcessingById,
  selectProcessingByUseCase,
};
export default useCaseSlice.reducer;
