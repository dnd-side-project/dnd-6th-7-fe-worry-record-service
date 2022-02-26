import axios from 'axios';

export default class HttpClient {
  client: any;

  constructor(baseURL: any, jwtToken: any) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        'at-jwt-access-token': jwtToken,
      },
      withCredentials: true,
    });
  }

  async fetch(url: any, options: { body: any; method: any; headers: any }) {
    const { body, method, headers } = options;
    const req = {
      url,
      method,
      headers: {
        ...headers,
      },
      data: body,
    };

    try {
      const res = await this.client(req);
      console.log(res, 'res');
      return res.data;
    } catch (err: any) {
      if (err.response) {
        const data = err.response.data;
        const message =
          data && data.message ? data.message : 'Something went wrong! 🤪';
        throw new Error(message);
      }
      throw new Error('connection error');
    }
  }
}
