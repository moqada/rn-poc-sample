import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import SettingPage from '@components/SettingPage';
import {logoutUseCase} from '@useCases/auth';

import {selectors} from '../../redux/features/auth/authSlice';

const ConnectedSettingPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectors.selectAccessToken);
  const onPress = useCallback(() => {
    if (accessToken) {
      dispatch(logoutUseCase());
    }
  }, [dispatch, accessToken]);
  return <SettingPage onPressLogout={onPress} />;
};
export default ConnectedSettingPage;
