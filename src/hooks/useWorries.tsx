/* eslint-disable react-hooks/rules-of-hooks */
import { useQueryClient } from 'react-query';
import { useCustomMutation, useCustomQuery } from '@lib/queries';
import { worriesKeys } from '@lib/queries/keys';
import { makeQueryString } from '@lib/util/helper';
import WorriesService from '@service/archive';
import { httpClient } from '~/App';

const worriesService = new WorriesService(httpClient);

// custom hook을 사용하여 쿼리를 실행
const callUseQuery = (
  tabIndex: any,
  tagId: string | number[],
  api: any,
  onSuccess?: (data: any) => void,
) => {
  return useCustomQuery(worriesKeys.worries(String(tabIndex), tagId), api, {
    onSuccess: onSuccess && onSuccess,
  });
};

// 요즘 걱정 목록을 가져오는 함수
const fetchRecentWorries = (
  tabIndex: number,
  userId: string,
  eachTagId: string,
  tagId: string | number[],
  onSuccess?: (data: any) => void,
) => {
  console.log('fetchRecentWorries');
  switch (eachTagId) {
    case '-1':
      return callUseQuery(
        tabIndex,
        tagId,
        worriesService.getRecentWorries(userId),
        onSuccess,
      );

    default:
      return callUseQuery(
        tabIndex,
        tagId,
        worriesService.filterRecentWorries(
          makeQueryString({ userId, categories: eachTagId }),
        ),
        onSuccess,
      );
  }
};

// 지난 걱정 목록을 가져오는 함수
const fetchPastWorries = (
  tabIndex: number,
  userId: string,
  eachTagId: string,
  tagId: string | number[],
  onSuccess?: (data: any) => void,
) => {
  console.log('fetchPastWorries');
  switch (eachTagId) {
    case '-1':
      return callUseQuery(
        tabIndex,
        tagId,
        worriesService.getPastWorries(userId),
        onSuccess,
      );
    case '-2':
      return callUseQuery(
        tabIndex,
        tagId,
        worriesService.filterValuablePastWorries(userId),
        onSuccess,
      );

    case '-3':
      return callUseQuery(
        tabIndex,
        tagId,
        worriesService.filterInvaluablePastWorries(userId),
        onSuccess,
      );

    default:
      return callUseQuery(
        tabIndex,
        tagId,
        worriesService.filterPastWorries(
          makeQueryString({ userId, categories: eachTagId }),
        ),
        onSuccess,
      );
  }
};

// 걱정 목록을 가져오는 함수
export const useGetWorries = (
  tabIndex: number,
  userId: string,
  eachTagId: string,
  tagId: string | number[],
  onSuccess?: (data: any) => void,
): any =>
  tabIndex === 0
    ? fetchRecentWorries(tabIndex, userId, eachTagId, tagId, onSuccess)
    : fetchPastWorries(tabIndex, userId, eachTagId, tagId, onSuccess);

// 걱정 삭제하는 함수
export const useDeleteWorry = (
  tabIndex: number,
  eachTagId: string,
  onSuccess: (data: any) => void,
): any => {
  const queryClient = useQueryClient();

  return useCustomMutation(
    (worryId: string) => worriesService.deleteWorry(worryId),
    (result: any) => {
      console.log('삭제 성공', result);
      queryClient.invalidateQueries({
        queryKey: worriesKeys.worries(String(tabIndex), eachTagId),
      });
      onSuccess(result);
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};

// 걱정 잠금헤제하는 함수
export const useUnlockWorry = (tabIndex: number, eachTagId: string): any => {
  const queryClient = useQueryClient();
  return useCustomMutation(
    (worryId: string) => worriesService.unlockWorry(worryId),
    (result: any) => {
      console.log('잠금 해제 성공', result);
      queryClient.invalidateQueries({
        queryKey: worriesKeys.worries(String(tabIndex), eachTagId),
      });
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};
