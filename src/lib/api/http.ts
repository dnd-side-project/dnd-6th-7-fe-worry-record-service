import axios from 'axios';
import CheckErrorStatus from '~/constants/ErrorStatus';

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
      return res.data;
    } catch (err: any) {
      const { status } = err.response;
      throw new Error(CheckErrorStatus(status));
    }
  }
}
