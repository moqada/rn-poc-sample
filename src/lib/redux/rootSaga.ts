import { all } from 'redux-saga/effects';
import { UseCaseExecutor } from '../useCase';
import useCaseSaga from '../useCase/redux/sagas';

export default function* rootSaga({
  useCaseExecutor,
}: {
  useCaseExecutor: UseCaseExecutor;
}) {
  yield all([useCaseSaga(useCaseExecutor)]);
}
