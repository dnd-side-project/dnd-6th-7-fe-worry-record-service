import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  storage: any;

  constructor() {
    this.storage = AsyncStorage;
  }

  set(key: string, value: any) {
    return this.storage.setItem(key, value);
  }

  get(key: string) {
    return this.storage.getItem(key);
  }
}
