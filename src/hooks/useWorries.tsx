/* eslint-disable react-hooks/rules-of-hooks */

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { worriesService } from '~/App';
import { WorryTempProps } from '~/components/Worries/Worries';
import { worriesKeys } from '~/lib/queries/keys';
import { makeQueryString } from '~/lib/util/helper';

const getRecentWorries = (userId: string): Promise<any> => {
  return worriesService.getRecentWorries(userId);
};

const getPastWorries = (userId: string): Promise<any> => {
  return worriesService.getPastWorries(userId);
};

const filterRecentWorries = (queryString: string): Promise<any> => {
  return worriesService.filterRecentWorries(queryString);
};

const filterPastWorries = (queryString: string): Promise<any> => {
  return worriesService.filterPastWorries(queryString);
};

const filterValuablePastWorries = (userId: string): Promise<any> => {
  return worriesService.filterValuablePastWorries(userId);
};

const filterInvaluablePastWorries = (userId: string): Promise<any> => {
  return worriesService.filterInvaluablePastWorries(userId);
};

const deleteWorry = (worryId: string): Promise<any> => {
  console.log('deleteWorry', worryId);
  return worriesService.deleteWorry(worryId);
};

const unlockWorry = (worryId: string): Promise<any> => {
  return worriesService.unlockWorry(worryId);
};

const setIsChecked = (data: any) =>
  data.map((item: WorryTempProps) => ({ ...item, isChecked: false }));

export const useGetWorries = (
  tabIndex: number,
  userId: string,
  categoryId: string,
  onSuccess: (data: any) => void,
): any => {
  if (tabIndex === 0) {
    // 요즘 걱정 데이터 받아오기
    switch (categoryId) {
      case '-1':
        return useQuery(
          worriesKeys.worries(String(tabIndex), categoryId),
          () => getRecentWorries(userId),
          {
            select: setIsChecked,
            onSuccess: onSuccess,
          },
        );

      default:
        return useQuery(
          worriesKeys.worries(String(tabIndex), categoryId),
          () =>
            filterRecentWorries(
              makeQueryString({ userId, categories: categoryId }),
            ),
          {
            select: setIsChecked,
            onSuccess: onSuccess,
          },
        );
    }
  } else {
    // 지난 걱정 데이터 받아오기
    switch (categoryId) {
      case '-1':
        return useQuery(
          worriesKeys.worries(String(tabIndex), categoryId),
          () => getPastWorries(userId),
          {
            select: setIsChecked,
            onSuccess: onSuccess,
          },
        );
      case '-2':
        return useQuery(
          worriesKeys.worries(String(tabIndex), categoryId),
          () => filterValuablePastWorries(userId),
          {
            select: setIsChecked,
            onSuccess: onSuccess,
          },
        );
      case '-3':
        return useQuery(
          worriesKeys.worries(String(tabIndex), categoryId),
          () => filterInvaluablePastWorries(userId),
          {
            select: setIsChecked,
            onSuccess: onSuccess,
          },
        );

      default:
        return useQuery(
          worriesKeys.worries(String(tabIndex), categoryId),
          () =>
            filterPastWorries(
              makeQueryString({ userId, categories: categoryId }),
            ),
          {
            select: setIsChecked,
            onSuccess: onSuccess,
          },
        );
    }
  }
};

export const useDeleteWorry = (
  tabIndex: number,
  categoryId: string,
  onSuccess: (data: any) => void,
): any => {
  const queryClient = useQueryClient();
  return useMutation(
    (worryId: string) => {
      console.log('useDeleteWorry', worryId);
      return deleteWorry(worryId);
    },
    {
      onSuccess: (result: any) => {
        console.log('삭제 성공', result);

        queryClient.invalidateQueries({
          queryKey: worriesKeys.worries(String(tabIndex), categoryId),
        });

        onSuccess(result);
      },
      onError(result: any) {
        console.log(result, '에러');
      },
    },
  );
};

export const useUnlockWorry = (tabIndex: number, categoryId: string): any => {
  const queryClient = useQueryClient();
  console.log('useUnlockWorry');
  return useMutation((worryId: string) => unlockWorry(worryId), {
    onSuccess: (result: any) => {
      console.log('잠금 해제 성공');

      queryClient.invalidateQueries({
        queryKey: worriesKeys.worries(String(tabIndex), categoryId),
      });
    },
    onError(result: any) {
      console.log(result, '에러');
    },
  });
};
