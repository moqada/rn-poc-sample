import {fetchUser} from '../redux/features/account/accountSlice';
import {initialized} from '../redux/features/app/appSlice';
import {loadAccessToken} from '../redux/features/auth/authSlice';
import {fetchTodoAll} from '../redux/features/todo/todoSlice';
import {AppDispatch} from '../redux/store';

export const refreshHomePageUseCase = ({userOnly}: {userOnly: boolean}) => {
  return async (dispatch: AppDispatch) => {
    const promises: Array<Promise<any>> = [dispatch(fetchUser())];
    if (!userOnly) {
      promises.push(dispatch(fetchTodoAll()));
    }
    await Promise.all(promises);
  };
};

export const systemInitializeUseCase = () => {
  return async (dispatch: AppDispatch) => {
    await dispatch(loadAccessToken());
    dispatch(initialized());
  };
};
