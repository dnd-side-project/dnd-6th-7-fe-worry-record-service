/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import WorriesService from '@service/archive';
import { httpClient } from '~/App';
import { ChatData } from '~/constants/ChatData';
import { worriesKeys } from '~/lib/queries/keys';
import { makeQueryString } from '~/lib/util/helper';
import { ReviewChats } from '~/page/ReviewChat/ReviewChat';
import { useCustomMutation, useCustomQuery } from '~/lib/queries';

const worriesService = new WorriesService(httpClient);

// 후기 목록을 가져오는 함수
export const useGetWorry = (
  tabIndex: number,
  userId: string,
  worryId: string,
  chatId: string,
  categoryId: string,
  tagId: string | number[],
  onSuccess: (data: any) => void,
): any => {
  const [worryText, setWorryText] = useState('');
  switch (chatId) {
    case '1':
      return useQuery(
        worriesKeys.worry(String(tabIndex), categoryId, tagId, worryId, chatId),
        () => worriesService.getWorryReviewChat(worryId),
        {
          onSuccess(data: ReviewChats) {
            if (data?.worryText) {
              setWorryText(data?.worryText);
            }
            data = {
              ...data,
              worryChat: ChatData.getChat1(
                data.username || '',
                data?.worryText || '',
              ),
            };
            onSuccess(data);
          },
        },
      );

    case '2':
      return useQuery(
        worriesKeys.worry(String(tabIndex), categoryId, tagId, worryId, chatId),
        () =>
          worriesService.addWorryReview(
            makeQueryString({ userId, worryId, isRealized: false }),
          ),
        {
          onSuccess(data: ReviewChats) {
            data = {
              ...data,
              worryChat: ChatData.getChat2(
                data.username || '',
                data.worryStartDate || '',
                data.categoryName || '',
                data.worryCnt || 0,
                data.meaningfulWorryCnt || 0,
              ),
            };
            onSuccess(data);
          },
        },
      );
    case '3':
      return useQuery(
        worriesKeys.worry(String(tabIndex), categoryId, tagId, worryId, chatId),
        () =>
          worriesService.addWorryReview(
            makeQueryString({ userId, worryId, isRealized: true }),
          ),
        {
          onSuccess(data: ReviewChats) {
            data = {
              ...data,
              worryChat: ChatData.getChat3(
                data.username || '',
                data.worryStartDate || '',
                data.categoryName || '',
                data.worryCnt || 0,
                data.meaningfulWorryCnt || 0,
              ),
            };
            onSuccess(data);
          },
        },
      );
    case '4':
      return useQuery(
        worriesKeys.worry(String(tabIndex), categoryId, tagId, worryId, chatId),
        () =>
          worriesService.addWorryReview(
            makeQueryString({ userId, worryId, isRealized: false }),
          ),
        {
          onSuccess(data: ReviewChats) {
            data = {
              ...data,
              worryChat: ChatData.getChat4(),
            };
            onSuccess(data);
          },
        },
      );

    default:
      break;
  }
};

// 후기 등록 함수
export const useSubmitReview = (
  tabIndex: number,
  categoryId: string,
  tagId: string | number[],
  onSuccess: (data: any) => void,
): any => {
  const queryClient = useQueryClient();
  return useCustomMutation(
    ({ worryId, worryReview }: { worryId: string; worryReview: string }) => {
      worriesService.updateWorryReview(worryId, worryReview);
    },
    async (result: any) => {
      await queryClient.invalidateQueries(
        worriesKeys.worries(String(tabIndex), categoryId, tagId),
      );
      onSuccess(result);
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};

// 후기 만료일자 업데이트
export const useUpdateExpiredDate = (onSuccess: (data: any) => void): any => {
  let expiredDate = '';
  return useCustomMutation(
    ({ worryId, expiryDate }: { worryId: string; expiryDate: string }) => {
      expiredDate = expiryDate;
      return worriesService.updateWorryExpiredDate(
        String(worryId),
        String(expiryDate),
      );
    },
    async (result: any) => {
      console.log(result, '업데이트 성공');
      onSuccess(ChatData.getChat5(expiredDate));
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};

// 후기 작성 되지 않은 컨텐츠 잠금 해제하는 함수
export const useReview = (
  worryId: number,
  onSuccess: (data: any) => void,
): any => {
  return useCustomQuery(
    worriesKeys.review(String(worryId)),
    worriesService.getWorryReview(worryId),
    {
      onSuccess(data: any) {
        onSuccess(data);
      },
    },
  );
};

// 걱정 후기 수정 - 실현 여부 수정
export const useUpdateWorryRealize = (onSuccess: (data: any) => void): any => {
  const queryClient = useQueryClient();
  let id = -1;
  return useCustomMutation(
    ({ worryId, isRealized }: { worryId: number; isRealized: boolean }) => {
      id = worryId;
      worriesService.updatePresentWorry(worryId, isRealized);
    },
    async (result: any) => {
      await queryClient.invalidateQueries(worriesKeys.review(String(id)));
      onSuccess(result);
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};

// 걱정 후기 수정 - 걱정 내용 수정
export const useUpdateWorry = (onSuccess: (data: any) => void): any => {
  const queryClient = useQueryClient();
  let id = -1;
  return useCustomMutation(
    ({ worryId, worryText }: { worryId: number; worryText: string }) => {
      id = worryId;
      worriesService.updateWorryReview(worryId, worryText);
    },
    async (result: any) => {
      await queryClient.invalidateQueries(worriesKeys.review(String(id)));
      onSuccess(result);
    },
    (error: any) => {
      console.log(error, '에러');
    },
  );
};
