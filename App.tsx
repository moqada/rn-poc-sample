import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { IndicatorContainer } from './src/adapters/services/indicator/IndicatorContainer';
import { Navigator } from './src/adapters/services/navigation/Navigator';
import { ReduxProvider } from './src/lib/redux/ReduxProvider';
import { configureStore } from './src/lib/redux/store';
import { configureUseCase } from './src/lib/useCase';
import { UseCaseContext } from './src/lib/useCase/redux/UseCaseContext';
import { RootNavigator } from './src/navigation/navigators';

const { useCaseCommander, useCaseExecutor } = configureUseCase();
const store = configureStore({ useCaseExecutor });
const navigator = Navigator.create();
const reduxProvider = ReduxProvider.create();
reduxProvider.setContext(store);

const App: React.FC<void> = () => {
  return (
    <Provider store={store}>
      <UseCaseContext.Provider value={{ useCaseCommander }}>
        <NavigationContainer
          ref={(ref) => navigator.setNavigationContainerRef(ref)}
        >
          <RootNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </UseCaseContext.Provider>
      <IndicatorContainer />
    </Provider>
  );
};
export default App;
