import React from 'react';
import {useDispatch} from 'react-redux';

import View from '@components/LoginPage';
import {loginUseCase} from '@useCases/auth';

const LoginPage = () => {
  const dispatch = useDispatch();
  const onPressLogin = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    dispatch(loginUseCase({username, password}));
  };
  return <View onPressLogin={onPressLogin} initialData={undefined} />;
};
export default LoginPage;
