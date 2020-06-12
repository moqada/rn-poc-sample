import './wdyr';
import 'react-native-gesture-handler';
import {UseCaseContext, UseCaseExecutor, UseCaseCommander} from '@libs/useCase';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';

import Indicator from '@containers/Indicator';

import Navigator from './navigations/Navigator';
import store from './redux/store';
import {systemInitializeUseCase} from './useCases/app';

store.dispatch(systemInitializeUseCase());
const useCaseExecutor = new UseCaseExecutor();
const useCaseCommander = new UseCaseCommander(useCaseExecutor);

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
