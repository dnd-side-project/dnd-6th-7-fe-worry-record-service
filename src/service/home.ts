import { storage } from '~/App';
import CustomError from '~/lib/util/CustomError';

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
    console.log('userId', userId);

    try {
      const result = await this.http.fetch(`/worries/home?userId=${userId}`, {
        method: 'GET',
      });
      // throw new CustomError('HOME에서 에러 발생');
      return result;
    } catch (error) {
      throw new CustomError('HOME에서 에러 발생');
    }
  }
}
