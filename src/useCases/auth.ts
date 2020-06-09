import {show, hide} from '../redux/features/app/indicatorSlice';
import {login, logout, selectors} from '../redux/features/auth/authSlice';
import {RootState} from '../redux/rootReducer';
import {AppDispatch} from '../redux/store';

export const loginUseCase = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(show());
    await dispatch(login({username, password}));
    dispatch(hide());
  };
};

export const logoutUseCase = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(show());
    const accessToken = selectors.selectAccessToken(getState());
    if (accessToken) {
      await dispatch(logout({token: accessToken.token}));
    }
    dispatch(hide());
  };
};
