import messaging from '@react-native-firebase/messaging';

class FCM {
  messaging;
  storage;
  message;

  constructor(storage: any) {
    this.messaging = messaging;
    this.message = '';
    this.storage = storage;
  }
  get(): string {
    return this.message;
  }

  async getToken(): Promise<any> {
    return await this.messaging().getToken();
  }

  getMessage(): any {
    this.messaging().onMessage(message => {
      console.log('Message received. ', message);
      this.message = String(message);
    });
  }

  async checkPermission(): Promise<any> {
    const enabled = await messaging().hasPermission();
    if (!enabled) {
      await this.requestPermission();
    }
  }

  async requestPermission(): Promise<any> {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      // 0: denied, 1: authorized, 2: provisional
      this.storage.set('fcm_permission', String(authStatus));
    }
  }
}

export default FCM;
