/* eslint-disable react-hooks/rules-of-hooks */
import { useCustomMutation } from '@lib/queries';
import { httpClient } from '~/App';
import AuthService from '@service/auth';
import { KakaoOAuthToken } from '@react-native-seoul/kakao-login';

const authService = new AuthService(httpClient);
const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

const setRefreshToken = (result: any) => {
  // httpClient.client.headers['at-jwt-access-token'] = result.accessToken;
  // localStorage.setItem('jwt_refreshToken', result.refreshToken);
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
    (kakaoToken: KakaoOAuthToken) => authService.login(kakaoToken),
    (result: any) => {
      setRefreshToken(result);

      onSuccess(result);
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};
