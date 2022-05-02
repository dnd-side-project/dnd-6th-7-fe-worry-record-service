/* eslint-disable react-hooks/rules-of-hooks */
import { useCustomQuery } from '@lib/queries';
import { httpClient } from '~/App';
import HomeService from '@service/home';
import { homekeys } from '~/lib/queries/keys';
const homeService = new HomeService(httpClient);

// 로그인 하는 함수
export const useHome = (onSuccess: (data: any) => void): any => {
  return useCustomQuery(homekeys.all, homeService.getHome(), {
    onSuccess(result: any) {
      console.log(result, '로그인 성공');
      onSuccess(result);
    },
    onError(err: any) {
      console.log(err, '에러');
    },
  });
};
