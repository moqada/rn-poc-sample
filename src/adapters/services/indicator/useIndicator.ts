import { useDispatch } from 'react-redux';
import { indicatorActions } from './redux/indicatorSlice';

export const useIndicator = () => {
  const dispatch = useDispatch();
  return {
    hide: () => dispatch(indicatorActions.hid()),
    show: () => dispatch(indicatorActions.shown()),
  };
};
