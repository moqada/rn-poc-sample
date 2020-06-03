import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';

import Indicator from '@containers/Indicator';

import Navigator from './navigations/Navigator';
import {initialize} from './redux/features/app/appSlice';
import store from './redux/store';
store.dispatch(initialize());

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
        <Indicator />
      </NavigationContainer>
    </Provider>
  );
}
