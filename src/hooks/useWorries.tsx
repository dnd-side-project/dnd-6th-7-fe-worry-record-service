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
  eachTagId: string,
  tagId: string | number[],
  api: any,
  isUpdating: boolean,
  onSuccess?: (data: any) => void,
) => {
  return useCustomQuery(
    worriesKeys.worries(String(tabIndex), eachTagId, tagId),
    api,
    {
      onSuccess: onSuccess && onSuccess,
      // enabled: !isUpdating,
    },
  );
};

// 요즘 걱정 목록을 가져오는 함수
const fetchRecentWorries = (
  tabIndex: number,
  userId: string,
  eachTagId: string,
  tagId: string | number[],
  isUpdating: boolean,
  onSuccess?: (data: any) => void,
) => {
  console.log('fetchRecentWorries');
  switch (eachTagId) {
    case '-1':
      return callUseQuery(
        tabIndex,
        eachTagId,
        tagId,
        worriesService.getRecentWorries(userId),
        isUpdating,
        onSuccess,
      );

    default:
      return callUseQuery(
        tabIndex,
        eachTagId,
        tagId,
        worriesService.filterRecentWorries(
          makeQueryString({ userId, categories: eachTagId }),
        ),
        isUpdating,
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
  isUpdating: boolean,
  onSuccess?: (data: any) => void,
) => {
  console.log('fetchPastWorries');
  switch (eachTagId) {
    case '-1':
      return callUseQuery(
        tabIndex,
        eachTagId,
        tagId,
        worriesService.getPastWorries(userId),
        isUpdating,
        onSuccess,
      );
    case '-2':
      return callUseQuery(
        tabIndex,
        eachTagId,
        tagId,
        worriesService.filterValuablePastWorries(userId),
        isUpdating,
        onSuccess,
      );

    case '-3':
      return callUseQuery(
        tabIndex,
        eachTagId,
        tagId,
        worriesService.filterInvaluablePastWorries(userId),
        isUpdating,
        onSuccess,
      );

    default:
      return callUseQuery(
        tabIndex,
        eachTagId,
        tagId,
        worriesService.filterPastWorries(
          makeQueryString({ userId, categories: eachTagId }),
        ),
        isUpdating,
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
  isUpdating: boolean,
  onSuccess?: (data: any) => void,
): any =>
  tabIndex === 0
    ? fetchRecentWorries(
        tabIndex,
        userId,
        eachTagId,
        tagId,
        isUpdating,
        onSuccess,
      )
    : fetchPastWorries(
        tabIndex,
        userId,
        eachTagId,
        tagId,
        isUpdating,
        onSuccess,
      );

// 걱정 삭제하는 함수
export const useDeleteWorry = (
  tabIndex: number,
  eachTagId: string,
  tagId: string | number[],
  onSuccess: (data: any) => void,
): any => {
  const queryClient = useQueryClient();
  return useCustomMutation(
    (worryId: string) => {
      worriesService.deleteWorry(worryId);
    },
    (result: any) => {
      onSuccess(result);
      return queryClient.invalidateQueries(
        worriesKeys.worries(String(tabIndex), eachTagId, tagId),
      );
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};

// 걱정 잠금헤제하는 함수
export const useUnlockWorry = (
  tabIndex: number,
  eachTagId: string,
  tagId: string | number[],
  onSuccess: (data: any) => void,
): any => {
  const queryClient = useQueryClient();
  return useCustomMutation(
    (worryId: string) => {
      worriesService.unlockWorry(worryId);
    },
    (result: any) => {
      console.log('잠금 해제 성공', tagId);
      onSuccess(result);
      return queryClient.invalidateQueries({
        queryKey: worriesKeys.worries(String(tabIndex), eachTagId, tagId),
      });
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};
