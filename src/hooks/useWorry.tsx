/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import WorriesService from '@service/archive';
import { httpClient } from '~/App';
import { ChatData } from '~/constants/ChatData';
import { worriesKeys } from '~/lib/queries/keys';
import { makeQueryString } from '~/lib/util/helper';
import { ReviewChats } from '~/page/ReviewChat/ReviewChat';

const worriesService = new WorriesService(httpClient);

const getWorryReviewChat = (worryId: string): Promise<any> => {
  return worriesService.getWorryReviewChat(worryId);
};

const addWorryReview = (queryString: string): Promise<any> => {
  return worriesService.addWorryReview(queryString);
};

export const useGetWorry = (
  tabIndex: number,
  userId: string,
  worryId: string,
  chatId: string,
  categoryId: string,
  onSuccess: (data: any) => void,
): any => {
  const [worryText, setWorryText] = useState('');
  switch (chatId) {
    case '1':
      return useQuery(
        worriesKeys.worry(String(tabIndex), categoryId, worryId, chatId),
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
        worriesKeys.worry(String(tabIndex), categoryId, worryId, chatId),
        () =>
          addWorryReview(
            makeQueryString({ userId, worryId, isRealized: false }),
          ),
        {
          onSuccess(data: ReviewChats) {
            data = {
              ...data,
              // worryChat: [
              //   ...ChatData.getChat1(data.username || '', worryText || '')
              //     .filter((item: any) => item.id === chatId || item.id === '-1')
              //     .map((item: any) =>
              //       item.id === chatId ? { ...item, isActive: true } : item,
              //     ),
              //   ...ChatData.getChat2(
              //     data.username || '',
              //     data.worryStartDate || '',
              //     data.categoryName || '',
              //     data.worryCnt || 0,
              //     data.meaningfulWorryCnt || 0,
              //   ),
              // ],
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
        worriesKeys.worry(String(tabIndex), categoryId, worryId, chatId),
        () =>
          addWorryReview(
            makeQueryString({ userId, worryId, isRealized: true }),
          ),
        {
          onSuccess(data: ReviewChats) {
            data = {
              ...data,
              // worryChat: [
              //   ...ChatData.getChat1(data.username || '', worryText || '')
              //     .filter((item: any) => item.id === chatId || item.id === '-1')
              //     .map((item: any) =>
              //       item.id === chatId ? { ...item, isActive: true } : item,
              //     ),
              //   ...ChatData.getChat3(
              //     data.username || '',
              //     data.worryStartDate || '',
              //     data.categoryName || '',
              //     data.worryCnt || 0,
              //     data.meaningfulWorryCnt || 0,
              //   ),
              // ],
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
        worriesKeys.worry(String(tabIndex), categoryId, worryId, chatId),
        () => getWorryReviewChat(worryId),
        {
          onSuccess(data: ReviewChats) {
            data = {
              ...data,
              worryChat: ChatData.getChat1('상초', data?.worryText || ''),
            };
            onSuccess(data);
          },
        },
      );

    default:
      break;
  }
};
