import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RNScreens from 'react-native-screens';
import store from './store/configureStore';
import AppContainer from './AppContainer';

RNScreens.enableScreens();

const Root = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <PaperProvider>
          <AppContainer />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default Root;
