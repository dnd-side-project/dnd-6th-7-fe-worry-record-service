import messaging from '@react-native-firebase/messaging';

class FCM {
  messaging;
  storage;

  constructor(storage: any) {
    this.messaging = messaging;
    this.storage = storage;
  }

  async getToken(): Promise<any> {
    return await this.messaging().getToken();
  }

  getMessage(): any {
    return this.messaging().onMessage(message => {
      console.log('Message received. ', message);
      return message;
    });
  }

  async requestUserPermission(): Promise<any> {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // 0: denied, 1: authorized, 2: provisional
      this.storage.set('fcm_permission', String(authStatus));
      console.log('Authorization status:', authStatus);
    }
  }
}

export default FCM;
