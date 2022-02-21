import React, { FC, useCallback } from 'react';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppLayout from '@components/AppLayout';
import CustomeButton from '@components/Button';
import ChatBox from '@components/ChatBox';

import { ReviewEditProps } from '~/types/Navigation';

import { theme } from '@lib/styles/palette';
import ArrowLeft from '@assets/image/arrow_left.svg';
import { responsiveWidth as wp } from '@lib/util/helper';
// import { CHANGE_MODE_REVIEWEdit } from '@context/reducer/archive';
import { useSceneDispatch, useSceneState } from '@context/ArchiveContext';
import { Platform } from 'react-native';

const ReviewEdit: FC<ReviewEditProps> = ({ navigation }) => {
  const tag = '[ReviewEdit]';

  const dispatch = useSceneDispatch();

  const onPressBack = useCallback(() => {
    console.log(tag, 'onPressBack');
    // dispatch({ type: CHANGE_MODE_REVIEWEdit, values: { isReviewEditing: false } });
    navigation.goBack();
  }, [navigation]);

  const onPressEdit = useCallback(() => {
    console.log(tag, 'onPressEdit');
    // dispatch({ type: CHANGE_MODE_REVIEWEdit, values: { isReviewEditing: false } });
    navigation.navigate('ReviewEdit');
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
        <ChatBox
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
  // border: pink;
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
