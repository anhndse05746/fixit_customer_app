import {Provider as PaperProvider} from 'react-native-paper';
import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import RNScreens from 'react-native-screens';
import store from './store/configureStore';
import AppContainer from './AppContainer';

import RNBootSplash from 'react-native-bootsplash';

RNScreens.enableScreens();

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    RNBootSplash.show({fade: true});
  }

  componentDidMount() {
    RNBootSplash.hide({fade: true});
  }

  componentWillUnmount() {}

  render() {
    return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Provider store={store}>
          <PaperProvider>
            <AppContainer />
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
