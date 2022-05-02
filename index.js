import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

// background 상태(앱이 Active 되어 있는 상태에서 알림이 오는 경우)
messaging().setBackgroundMessageHandler(async message => {
  console.log(message);
});

AppRegistry.registerComponent(appName, () => App);
