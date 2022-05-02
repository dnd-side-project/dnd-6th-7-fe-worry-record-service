import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNAsyncStorageFlipper from 'rn-async-storage-flipper';
// RNAsyncStorageFlipper(AsyncStorage);
export default class Storage {
  storage: any;

  constructor() {
    this.storage = AsyncStorage;
  }

  set(key: string, value: any) {
    return this.storage.setItem(key, value);
  }

  async get(key: string) {
    return await this.storage.getItem(key);
  }

  delete(key: string) {
    return this.storage.removeItem(key);
  }
}
