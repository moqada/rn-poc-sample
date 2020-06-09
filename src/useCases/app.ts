import {fetchUser} from '../redux/features/account/accountSlice';
import {initialized} from '../redux/features/app/appSlice';
import {loadAccessToken} from '../redux/features/auth/authSlice';
import {fetchTodoAll} from '../redux/features/todo/todoSlice';
import {AppDispatch} from '../redux/store';

export const refreshHomePageUseCase = () => {
  return async (dispatch: AppDispatch) => {
    await Promise.all([dispatch(fetchUser()), dispatch(fetchTodoAll())]);
  };
};

export const systemInitializeUseCase = () => {
  return async (dispatch: AppDispatch) => {
    await dispatch(loadAccessToken());
    dispatch(initialized());
  };
};
