import { storage } from '~/App';

export interface HomeServiceClass {
  http: any;
  getHome: () => any;
}

export default class HomeService implements HomeServiceClass {
  http: any;

  constructor(http: any) {
    this.http = http;
  }

  async getHome(): Promise<any> {
    const userId = await storage.get('user_id');
    const result = await this.http.fetch(`/worries/home?userId=${userId}`, {
      method: 'GET',
    });
    return result;
  }
}
