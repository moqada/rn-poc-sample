import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import HomePage from '@components/HomePage';
import * as routes from '@config/routes';

import {
  selectors as accountSelectors,
  fetchUser,
} from '../../redux/features/account/accountSlice';
import {
  selectors as todoSelectors,
  createTodo,
} from '../../redux/features/todo/todoSlice';

// import {RefreshHomeUseCase} from '@useCases/app/RefreshHomeUseCase';

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
      dispatch(createTodo({title, checked: false}));
    },
    [dispatch]
  );
  const onPressItem = useCallback(({id}: {id: string}) => {
    Alert.alert(`${id}: まだないよ`);
  }, []);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchUser());
    setRefreshing(false);
  }, [dispatch, setRefreshing]);

  useEffect(() => {
    dispatch(fetchUser());
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
      todos={todos}
    />
  ) : null;
};
export default ConnectedHomePage;
