import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import HomePage from '@components/HomePage';
import * as routes from '@config/routes';
import {refreshHomePageUseCase} from '@useCases/app';
import {createTodoUseCase} from '@useCases/todo';

import {selectors as accountSelectors} from '../../redux/features/account/accountSlice';
import {selectors as todoSelectors} from '../../redux/features/todo/todoSlice';

const ConnectedHomePage = () => {
  const [isRefreshing, setRefreshing] = useState(false);
  const user = useSelector(accountSelectors.selectUser);
  const todos = useSelector(todoSelectors.selectTodoAll);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onPressSetting = useCallback(() => {
    navigation.navigate(routes.Setting);
  }, [navigation]);
  const onPressAdd = useCallback(
    ({title}: {title: string}) => {
      dispatch(createTodoUseCase({title, checked: false}));
    },
    [dispatch]
  );
  const onPressItem = useCallback(
    ({id}: {id: string}) => {
      navigation.navigate(routes.TodoDetail, {todoId: id});
    },
    [navigation]
  );
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(refreshHomePageUseCase());
    setRefreshing(false);
  }, [dispatch, setRefreshing]);

  useEffect(() => {
    dispatch(refreshHomePageUseCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return user ? (
    <HomePage
      onPressSetting={onPressSetting}
      onPressAdd={onPressAdd}
      onPressItem={onPressItem}
      onRefresh={onRefresh}
      isRefreshing={isRefreshing}
      username={user.username}
      phoneNumber={user.phoneNumber}
      todos={todos.map((entity) => ({
        id: entity.id.value,
        title: entity.title.value,
        checked: entity.checked,
        updatedAt: entity.updatedAt,
        createdAt: entity.createdAt,
      }))}
    />
  ) : null;
};
export default ConnectedHomePage;
