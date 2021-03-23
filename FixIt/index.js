/**
 * @format
 */
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

if (__DEV__) {
} else {
  console.log = () => { };
  console.time = () => { };
  console.timeEnd = () => { };
  console.timeLog = () => { };
  console.warn = () => { };
  console.count = () => { };
  console.countReset = () => { };
  console.error = () => { };
  console.info = () => { };
}

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


AppRegistry.registerComponent(appName, () => require('./app/index').default);
