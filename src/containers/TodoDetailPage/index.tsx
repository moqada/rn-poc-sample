import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import TodoDetailPage from '@components/TodoDetailPage';
import {StackParam, Home} from '@config/routes';
import {updateTodoUseCase} from '@useCases/todo';

import {selectors} from '../../redux/features/todo/todoSlice';
import {RootState} from '../../redux/rootReducer';

type TodoDetailRouteProp = RouteProp<StackParam, 'TodoDetail'>;

const ConnectedTodoDetailPage = () => {
  const route = useRoute<TodoDetailRouteProp>();
  const navigation = useNavigation();
  const id = route.params.todoId;
  const todo = useSelector((state: RootState) =>
    selectors.selectTodoById(state, id)
  );
  const dispatch = useDispatch();
  const onPressSave = useCallback(
    async ({title, checked}: {title: string; checked: boolean}) => {
      await dispatch(updateTodoUseCase({id, title, checked}));
      navigation.navigate(Home);
    },
    [dispatch, id, navigation]
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
