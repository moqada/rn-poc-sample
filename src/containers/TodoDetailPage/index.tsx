import {useRoute, RouteProp} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import TodoDetailPage from '@components/TodoDetailPage';
import {StackParam} from '@config/routes';

import {selectors, updateTodo} from '../../redux/features/todo/todoSlice';
import {RootState} from '../../redux/rootReducer';

type TodoDetailRouteProp = RouteProp<StackParam, 'TodoDetail'>;

const ConnectedTodoDetailPage = () => {
  const route = useRoute<TodoDetailRouteProp>();
  const id = route.params.todoId;
  const todo = useSelector((state: RootState) =>
    selectors.selectTodoById(state, id)
  );
  const dispatch = useDispatch();
  const onPressSave = useCallback(
    ({title, checked}: {title: string; checked: boolean}) => {
      dispatch(updateTodo({id, title, checked}));
    },
    [dispatch, id]
  );
  if (!todo) {
    return null;
  }
  const props = {
    title: todo.title.value,
    checked: todo.checked,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
    onPressSave,
  };
  return <TodoDetailPage {...props} />;
};
export default ConnectedTodoDetailPage;
