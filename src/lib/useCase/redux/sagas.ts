import { EventChannel, eventChannel } from 'redux-saga';
import { fork, put, take } from 'redux-saga/effects';

import { commanded, failed, succeeded } from './useCaseSlice';

import {
  UseCaseExecutor,
  USECASE_EVENT_TYPES,
  UseCaseEvent,
  UseCaseEventCommanded,
  UseCaseEventSucceeded,
  UseCaseEventFailed,
} from '../UseCaseExecutor';

type Event = UseCaseEventCommanded & UseCaseEventSucceeded & UseCaseEventFailed;

const handlers = {
  [USECASE_EVENT_TYPES.commanded]: (event: UseCaseEventCommanded) =>
    commanded(event),
  [USECASE_EVENT_TYPES.succeeded]: (event: UseCaseEventSucceeded) =>
    succeeded(event),
  [USECASE_EVENT_TYPES.failed]: (event: UseCaseEventFailed) => failed(event),
};

/**
 * useCase saga
 *
 * @param executor - UseCaseExecutor
 */
export default function* useCaseSaga(executor: UseCaseExecutor) {
  const chan = createUseCaseChannel(executor);
  yield fork(watchUseCaseEvent, chan);
}

/**
 * create saga channel for watching useCase event
 *
 * @param executor - UseCaseExecutor
 */
function createUseCaseChannel(executor: UseCaseExecutor) {
  return eventChannel((emit) => {
    const handler = (event: UseCaseEvent) => {
      emit(event);
    };
    const unregister = executor.onChange(handler);
    return () => unregister();
  });
}

/**
 * watch useCaseEvent and dispatch action
 *
 * @param chan - saga channel
 */
function* watchUseCaseEvent(chan: EventChannel<unknown>) {
  while (true) {
    const event: Event = yield take(chan);
    const handle = handlers[event.type];
    if (handle) {
      yield put(handle(event));
    }
  }
}
