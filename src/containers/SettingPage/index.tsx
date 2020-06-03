import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import SettingPage from '@components/SettingPage';

import {logout, selectors} from '../../redux/features/auth/authSlice';

const ConnectedSettingPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectors.selectAccessToken);
  const onPress = useCallback(() => {
    if (accessToken) {
      dispatch(logout({token: accessToken.token}));
    }
  }, [dispatch, accessToken]);
  return <SettingPage onPressLogout={onPress} />;
};
export default ConnectedSettingPage;
