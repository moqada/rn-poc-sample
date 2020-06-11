import {show, hide} from '../redux/features/app/indicatorSlice';
import {createTodo, updateTodo} from '../redux/features/todo/todoSlice';
import {AppDispatch} from '../redux/store';

export const createTodoUseCase = ({
  title,
  checked,
}: {
  title: string;
  checked: boolean;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(show());
    await dispatch(createTodo({title, checked}));
    dispatch(hide());
  };
};

export const updateTodoUseCase = ({
  id,
  title,
  checked,
}: {
  id: string;
  title: string;
  checked: boolean;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(show());
    await dispatch(updateTodo({id, title, checked}));
    dispatch(hide());
  };
};
