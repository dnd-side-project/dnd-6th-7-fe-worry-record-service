/* eslint-disable react-hooks/rules-of-hooks */
import { useCustomMutation } from '@lib/queries';
import { KakaoOAuthToken } from '@react-native-seoul/kakao-login';
import { authService, httpClient } from '~/App';
import Storage from '@lib/storage';

const JWT_EXPIRY_TIME = 24 * 3600 * 1000;
const storage = new Storage();

const setRefreshToken = (result: any) => {
  httpClient.client.headers['at-jwt-access-token'] = result.accessToken;
  storage.set('jwt_refreshToken', result.refreshToken);
  // setTimeout(useSilentRefresh, JWT_EXPIRY_TIME - 60000);
};

// 리프레시 토큰 받는 함수
export const useSilentRefresh = (): any => {
  return useCustomMutation(
    () => {
      // const refreshToken = localStorage.getItem('jwt_refreshToken');
      // return authService.silentRefresh(refreshToken);
    },
    (result: any) => {
      setRefreshToken(result);
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};

// 로그인 하는 함수
export const useLogin = (onSuccess: (data: any) => void): any => {
  return useCustomMutation(
    (token: any) => {
      return authService.login(token);
    },
    (result: any) => {
      console.log(result, '로그인 성공');
      // setRefreshToken(result);
      // onSuccess(result);
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};
