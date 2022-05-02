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
    return this.http.fetch(
      `/auth/refresh?userId=${userId}&deviceToken=${deviceToken}`,
      {
        method: 'PUT',
      },
    );
  }

  async me() {
    return this.http.fetch('/auth/me', {
      method: 'GET',
    });
  }

  async logout() {
    return this.http.fetch('/auth/logout', {
      method: 'POST',
    });
  }
}
