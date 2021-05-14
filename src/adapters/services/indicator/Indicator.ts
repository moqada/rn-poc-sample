import {ReduxProvider} from '../../../lib/redux/ReduxProvider';
import {indicatorActions} from './redux/indicatorSlice';

const redux = ReduxProvider.create();

export interface IIndicator {
  show(): void;
  hide(): void;
}
export const Indicator: IIndicator = {
  hide: () => {
    redux.dispatch(indicatorActions.hid());
  },
  show: () => {
    redux.dispatch(indicatorActions.shown());
  },
};
