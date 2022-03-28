import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async message => {
  console.log(message);
});

AppRegistry.registerComponent(appName, () => App);
