import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppLayout from '@components/AppLayout';
import CustomeButton from '@components/Button';
import ChatInput from '@components/ChatInput';

import { ReviewProps } from '~/types/Navigation';

import { theme } from '@lib/styles/palette';
import ArrowLeft from '@assets/image/arrow_left.svg';
import { responsiveWidth as wp } from '@lib/util/helper';
import {
  CHANGE_MODE_REVIEW,
  CHANGE_MODE_REALIZED,
} from '@context/reducer/archive';
import { useSceneDispatch, useSceneState } from '@context/ArchiveContext';
import { Platform } from 'react-native';
import { useReview, useUpdateWorryRealize } from '~/hooks/useWorry';
import { getDate } from '~/lib/util/date';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { worriesKeys } from '~/lib/queries/keys';
import WorriesService from '~/service/archive';
import { httpClient } from '~/App';
import { useCustomQuery } from '~/lib/queries';

const Review: FC<ReviewProps> = ({ navigation }) => {
  const tag = '[Review]';
  const queryClient = useQueryClient();
  const worriesService = new WorriesService(httpClient);
  const dispatch = useSceneDispatch();
  const { worryId } = useSceneState();

  // 걱정 목록을 가져오는 함수
  const { data: review } = useReview(worryId, (data: any) => {
    console.log(data, tag, '목록 조회 완료');
  });

  // const { data: review } = useQuery(
  //   worriesKeys.review(String(worryId)),
  //   () => worriesService.getWorryReview(worryId),
  //   {
  //     refetchOnWindowFocus: false,
  //     suspense: true,
  //     useErrorBoundary: true,
  //     structuralSharing: false,
  //     notifyOnChangeProps: 'tracked',
  //   },
  // );

  // const updateWorryRealize = useUpdateWorryRealize((data: any) => {
  //   console.log(data, '실현 여부 수정 완료');
  // });

  const updateWorryRealize = useMutation(
    ({ worryId, isRealized }: { worryId: number; isRealized: boolean }) =>
      worriesService.updatePresentWorry(worryId, isRealized),
    {
      onSuccess: (result: any) => {
        queryClient.invalidateQueries(worriesKeys.review(String(worryId)));
      },
      onError: (error: any) => {
        console.log(error, '에러');
      },
    },
  );

  const onPressBack = useCallback(() => {
    console.log(tag, 'onPressBack');

    dispatch({ type: CHANGE_MODE_REVIEW, values: { isReviewing: false } });
    navigation.goBack();
  }, [navigation, dispatch]);

  const onPressEdit = useCallback(() => {
    console.log(tag, 'onPressEdit');
    navigation.navigate('ReviewEdit');
  }, [navigation]);

  const onPressChangeWorry = useCallback(
    (isRealized: boolean) => {
      console.log(tag, 'onPressChangeWorry');
      // dispatch({ type: CHANGE_MODE_REALIZED, values: { isRealized } });
      updateWorryRealize.mutate({
        worryId,
        isRealized,
      });
    },
    [updateWorryRealize, worryId],
  );

  return (
    <AppLayout
      name="review"
      noBackGroundImage={true}
      headerLeft={<ArrowLeft />}
      headerLeftSidePress={onPressBack}
      headerTitle={
        <Headeritle>
          {review?.worryStartDate && getDate(review?.worryStartDate, 'yy/MM')}#
          {review?.categoryName} 걱정
        </Headeritle>
      }
    >
      <WithScroll
        extraHeight={300}
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === 'ios'}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <Label>그땐 그랬지, 이런 걱정 있었어요</Label>
        <CardTextAreaWrapper>
          <ChatInput
            multiline={true}
            editable={false}
            value={review?.worryText || ''}
          />
        </CardTextAreaWrapper>

        <Label>바로지금, 걱정은 어떻게 됐나요?</Label>
        <RowWrapper>
          <CustomeButton
            title="걱정대로 됐어.."
            isBorderRadius
            onPress={onPressChangeWorry.bind(null, true)}
            backgroundColor={{
              color: `${!review?.realized ? 'lightWhite' : 'white'}`,
            }}
            width={wp('42%')}
            height={44}
            color={{
              color: `${!review?.realized ? 'lightGray' : 'black'}`,
            }}
            fontSize={12}
          />
          <CustomeButton
            title="괜히 걱정했어!"
            isBorderRadius
            onPress={onPressChangeWorry.bind(null, false)}
            backgroundColor={{
              color: `${review?.realized ? 'lightWhite' : 'white'}`,
            }}
            width={wp('42%')}
            height={44}
            color={{
              color: `${review?.realized ? 'lightGray' : 'black'}`,
            }}
            fontSize={12}
          />
        </RowWrapper>
        <RowReviewWrapper>
          <Label>걱정 후기를 작성해 보세요</Label>
          <UpdateButton onPress={onPressEdit}>
            <ButtonName>편집하기</ButtonName>
          </UpdateButton>
        </RowReviewWrapper>
        <ChatInput
          multiline={true}
          editable={false}
          value={review?.worryReview || ''}
        />
      </WithScroll>
    </AppLayout>
  );
};

const WithScroll = styled(KeyboardAwareScrollView)`
  // border: pink;
  height: -30px;
`;

const Headeritle = styled.Text`
  font-size: 26px;
  color: ${theme.color.white};
  font-weight: bold;
`;

const CardTextAreaWrapper = styled.View`
  margin-bottom: 40px;
`;

const Label = styled.Text`
  font-size: 12px;
  color: ${theme.color.white};
  font-weight: 700;
  margin-bottom: 10px;
`;

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 58px;
`;

const RowReviewWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UpdateButton = styled.TouchableOpacity``;

const ButtonName = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${theme.color.lightGray};
  margin-bottom: 10px;
`;

export default Review;
