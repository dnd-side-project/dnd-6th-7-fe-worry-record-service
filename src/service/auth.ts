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

  async login(token: any) {
    return this.http.fetch('/auth/login', {
      method: 'POST',
      headers: {
        oauthToken: token,
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
