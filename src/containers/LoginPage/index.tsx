import React from 'react';
import {useDispatch} from 'react-redux';

import View from '@components/LoginPage';

import {login} from '../../redux/features/auth/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const onPressLogin = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    dispatch(login({username, password}));
  };
  return <View onPressLogin={onPressLogin} initialData={undefined} />;
};
export default LoginPage;
