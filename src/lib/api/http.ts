import axios from 'axios';
import CheckErrorStatus from '~/constants/ErrorStatus';
import CustomError from '../util/CustomError';

export default class HttpClient {
  client: any;
  storage: any;

  constructor(baseURL: any, storage: any) {
    this.storage = storage;
    this.client = this.initAxios(baseURL);
    this.setInterceptors();
  }

  initAxios(baseURL: any) {
    const instance = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        'at-jwt-access-token': '',
      },
      withCredentials: true,
    });
    return instance;
  }

  setInterceptors() {
    let isRequest = false;
    this.client.interceptors.request.use(
      async (config: any) => {
        let accessToken = config.headers['at-jwt-access-token'];
        if (!accessToken) {
          accessToken = await this.storage.get('jwt_accessToken');
          config.headers['at-jwt-access-token'] = accessToken;
        }
        if (accessToken) {
          // 만료 토근 확인 > 만약에 지났으면 리프레시 토큰과 함께 보내기

          if (accessToken.exp < new Date() / 1000) {
            if (isRequest) {
              return config;
            }
            console.log(isRequest, 'isRequest');
            console.log('EXPIRED');
            isRequest = true;
            const refreshToken = await this.storage.get('jwt_refreshToken');
            const userId = await this.storage.get('user_id');
            await this.client.put(
              `/auth/refresh?userId=${userId}&deviceToken=`,
              {
                headers: {
                  'at-jwt-access-token': accessToken,
                  'at-jwt-refresh-token': refreshToken,
                },
              },
            );
          }
        }
        return config;
      },
      async (error: any) => {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    // Add a response interceptor
    this.client.interceptors.response.use(
      async (response: any) => {
        console.log(response, 'd');

        if (response.headers['at-jwt-access-token']) {
          this.client.defaults.headers['at-jwt-access-token'] =
            response.headers['at-jwt-access-token'];
          await this.storage.set(
            'jwt_accessToken',
            response.headers['at-jwt-access-token'],
          );
        }

        if (response.headers['at-jwt-refresh-token']) {
          await this.storage.set(
            'jwt_refreshToken',
            response.headers['at-jwt-refresh-token'],
          );
        }
        return response;
      },
      async (error: any) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      },
    );
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
      console.log(res);
      return res.data;
    } catch (err: any) {
      const { status } = err.response;
      throw new CustomError(CheckErrorStatus(status));
    }
  }
}
