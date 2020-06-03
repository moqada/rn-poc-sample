import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';

import * as routes from '@config/routes';
import HomePage from '@containers/HomePage';
import LoginPage from '@containers/LoginPage';
import SettingPage from '@containers/SettingPage';

import {selectors} from '../redux/features/auth/authSlice';

const Stack = createStackNavigator();

const Navigator = () => {
  const accessToken = useSelector(selectors.selectAccessToken);
  return (
    <Stack.Navigator>
      {accessToken ? (
        <>
          <Stack.Screen name={routes.Home} component={HomePage} />
          <Stack.Screen name={routes.Setting} component={SettingPage} />
        </>
      ) : (
        <Stack.Screen name={routes.Login} component={LoginPage} />
      )}
    </Stack.Navigator>
  );
};
export default Navigator;
