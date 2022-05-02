import React, { FC, useCallback } from 'react';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppLayout from '@components/AppLayout';
import CustomeButton from '@components/Button';
import ChatInput from '@components/ChatInput';

import { ReviewEditProps } from '~/types/Navigation';

import { theme } from '@lib/styles/palette';
import ArrowLeft from '@assets/image/arrow_left.svg';
import { Platform } from 'react-native';

const ReviewEdit: FC<ReviewEditProps> = ({ navigation }) => {
  const tag = '[ReviewEdit]';

  const onPressBack = useCallback(() => {
    console.log(tag, 'onPressBack');
    navigation.goBack();
  }, [navigation]);

  const onPressEdit = useCallback(() => {
    console.log(tag, 'onPressEdit');

    // mutation 이용해서 업데이트
    navigation.goBack();
  }, [navigation]);

  return (
    <AppLayout
      name="review"
      noBackGroundImage={true}
      headerLeft={<ArrowLeft />}
      headerLeftSidePress={onPressBack}
      headerTitle={<Headeritle>12/24 #관계 걱정</Headeritle>}
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
          value="아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 ...아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 ...아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데"
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
  margin-bottom: 10px;
  margin-top: 43px;
`;

const ButtonWrapper = styled.View`
  margin-top: 124px;
`;

export default ReviewEdit;
