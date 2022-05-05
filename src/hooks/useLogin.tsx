/* eslint-disable react-hooks/rules-of-hooks */
import { useCustomMutation } from '@lib/queries';
import { authService, httpClient, storage } from '~/App';

const setUserInfo = async (result: any, tokens: any, deviceToken: any) => {
  await storage.set('user_id', String(result.userId));
  await storage.set('user_image_url', result.imgURL);
  await storage.set('user_email', result.email);
  await storage.set('user_name', result.username);
  await storage.set('fcm_Token', deviceToken);
};

// 리프레시 토큰 받는 함수
// export const useSilentRefresh = (): any => {
//   return useCustomMutation(
//     () => {
//       // const refreshToken = localStorage.getItem('jwt_refreshToken');
//       // return authService.silentRefresh(refreshToken);
//     },
//     (result: any) => {
//       setRefreshToken(result);
//     },
//     (error: any) => {
//       console.log(error, '에러');
//     },
//   );
// };

// 로그인 하는 함수
export const useLogin = (onSuccess: (data: any) => void): any => {
  let deviceToken = '';
  let tokens = '';
  return useCustomMutation(
    (token: any) => {
      tokens = token.result.accessToken;
      console.log('토큰', token);
      deviceToken = token.deviceToken;
      return authService.login({
        oauthToken: tokens, // 'yDIW_7RS2cOVUvppixh2tEdCNYvdjwdXtLb15AopyNkAAAGAI1h5Wg',
        deviceToken,
      });
    },
    async (result: any) => {
      console.log(result, '로그인 성공');
      await setUserInfo(result, tokens, deviceToken);
      return onSuccess(result);
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};
