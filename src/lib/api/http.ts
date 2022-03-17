import axios from 'axios';
import CheckErrorStatus from '~/constants/ErrorStatus';

export default class HttpClient {
  client: any;

  constructor(baseURL: any, jwtToken: any) {
    const instance = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        // 'at-jwt-access-token': jwtToken,
      },
      withCredentials: true,
    });

    this.client = this.setInterceptors(instance);
  }

  setInterceptors(instance: any) {
    // Add a request interceptor
    instance.interceptors.request.use(
      function (config: any) {
        // Do something before request is sent
        return config;
      },
      function (error: any) {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    // Add a response interceptor
    instance.interceptors.response.use(
      function (response: any) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error: any) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      },
    );

    return instance;
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
