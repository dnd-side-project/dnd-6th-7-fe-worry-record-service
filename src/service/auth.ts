import { storage } from '~/App';

export default class AuthService {
  http: any;

  constructor(http: any) {
    this.http = http;
  }

  async signup(email: any, password: any) {
    return this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  async login(token: any): Promise<any> {
    const { oauthToken, deviceToken } = token;
    return this.http.fetch('/auth/kakao', {
      method: 'POST',
      headers: {
        oauthToken,
        deviceToken,
      },
    });
  }

  async silentRefresh(refreshToken: any) {
    return this.http.fetch('/auth/refresh', {
      method: 'POST',
      headers: {
        oauthToken: refreshToken,
        deviceToken: '',
      },
    });
  }

  async updateFCMToken({ userId, deviceToken }: any): Promise<any> {
    const refreshToken = await storage.get('jwt_refreshToken');
    const accessToken = await storage.get('jwt_accessToken');

    return this.http.fetch(
      `/auth/refresh?userId=${userId}&deviceToken=${deviceToken}`,
      {
        method: 'PUT',
        headers: {
          'at-jwt-access-token': accessToken,
          'at-jwt-refresh-token': refreshToken,
        },
      },
    );
  }

  async logout() {
    return this.http.fetch('/auth/logout', {
      method: 'POST',
    });
  }
}
