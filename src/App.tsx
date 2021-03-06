import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';

import Indicator from '@containers/Indicator';

import Navigator from './navigations/Navigator';
import store from './redux/store';
import {systemInitializeUseCase} from './useCases/app';

store.dispatch(systemInitializeUseCase());

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
