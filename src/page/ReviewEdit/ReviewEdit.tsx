import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppLayout from '@components/AppLayout';
import CustomeButton from '@components/Button';
import ChatInput from '@components/ChatInput';

import { ReviewEditProps } from '~/types/Navigation';

import { theme } from '@lib/styles/palette';
import ArrowLeft from '@assets/image/arrow_left.svg';
import { Platform } from 'react-native';
import { useSceneState } from '~/context/ArchiveContext';
import { useReview, useUpdateWorry } from '~/hooks/useWorry';
import { getDate } from '~/lib/util/date';

const ReviewEdit: FC<ReviewEditProps> = ({ navigation }) => {
  const tag = '[ReviewEdit]';

  const { worryId } = useSceneState();
  const { data: review } = useReview(worryId, (data: any) => {
    console.log(data, '목록 조회 완료');
  });

  const [worryContents, setWorryContents] = useState(review?.worryReview || '');

  const updateWorry = useUpdateWorry((data: any) => {
    console.log(data, '리뷰 수정 완료');
    navigation.goBack();
  });

  const onPressBack = useCallback(() => {
    console.log(tag, 'onPressBack');
    navigation.goBack();
  }, [navigation]);

  const onPressEdit = useCallback(() => {
    console.log(tag, 'onPressEdit');
    updateWorry.mutate({
      worryId,
      worryText: worryContents,
    });
  }, [updateWorry, worryId, worryContents]);

  const onChangeText = useCallback(value => {
    console.log(tag, 'onChangeText');
    setWorryContents(value);
  }, []);

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
        <Label>걱정 후기를 작성해 보세요</Label>
        <ChatInput
          multiline={true}
          editable={true}
          bgColor={'rgba(0, 0, 0, 0.3)'}
          value={worryContents}
          onChangeText={onChangeText}
        />
        <ButtonWrapper>
          <CustomeButton
            title="수정 완료"
            isBorderRadius
            onPress={onPressEdit}
            backgroundColor={{
              color: 'white',
            }}
            height={52}
            color={{
              color: 'black',
            }}
            fontSize={16}
          />
        </ButtonWrapper>
      </WithScroll>
    </AppLayout>
  );
};

const WithScroll = styled(KeyboardAwareScrollView)`
  height: -30px;
`;

const Headeritle = styled.Text`
  font-size: 26px;
  color: ${theme.color.white};
  font-weight: bold;
`;

const Label = styled.Text`
  font-size: 12px;
  color: ${theme.color.white};
  font-weight: 700;
  margin-bottom: 15px;
  margin-top: 43px;
`;

const ButtonWrapper = styled.View`
  margin-top: 124px;
`;

export default ReviewEdit;
