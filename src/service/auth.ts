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

  async login(oauthToken: any, deviceToken: any) {
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
