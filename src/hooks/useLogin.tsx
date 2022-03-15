/* eslint-disable react-hooks/rules-of-hooks */
import { useQueryClient } from 'react-query';
import { useCustomMutation } from '@lib/queries';
import { worriesKeys } from '@lib/queries/keys';
import { httpClient } from '~/App';
import AuthService from '@service/auth';
import { KakaoOAuthToken } from '@react-native-seoul/kakao-login';

const authService = new AuthService(httpClient);

// 걱정 삭제하는 함수
export const useLogin = (onSuccess: (data: any) => void): any => {
  return useCustomMutation(
    (kakaoToken: KakaoOAuthToken) => authService.login(kakaoToken),
    (result: any) => {
      onSuccess(result);
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};
