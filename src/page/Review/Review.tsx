import React, { FC, useCallback } from 'react';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppLayout from '@components/AppLayout';
import CustomeButton from '@components/Button';
import ChatBox from '@components/ChatBox';

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

const Review: FC<ReviewProps> = ({ navigation }) => {
  const tag = '[Review]';

  const dispatch = useSceneDispatch();

  const onPressBack = useCallback(() => {
    console.log(tag, 'onPressBack');

    // mutation 이용해서 업데이트
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
      dispatch({ type: CHANGE_MODE_REALIZED, values: { isRealized } });
    },
    [dispatch],
  );

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
        <Label>그땐 그랬지, 이런 걱정 있었어요</Label>
        <CardTextAreaWrapper>
          <ChatBox
            multiline={true}
            editable={false}
            value="아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 ...아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 ...아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데"
          />
        </CardTextAreaWrapper>

        <Label>바로지금, 걱정은 어떻게 됐나요?</Label>
        <RowWrapper>
          <CustomeButton
            title="걱정대로 됐어.."
            isBorderRadius
            onPress={onPressChangeWorry.bind(null, true)}
            backgroundColor={{
              color: 'white',
            }}
            width={wp('42%')}
            height={44}
            color={{
              color: 'black',
            }}
            fontSize={12}
          />
          <CustomeButton
            title="괜히 걱정했어!"
            isBorderRadius
            onPress={onPressChangeWorry.bind(null, false)}
            backgroundColor={{
              color: 'lightWhite',
            }}
            width={wp('42%')}
            height={44}
            color={{
              color: 'lightGray',
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
        <ChatBox
          multiline={true}
          editable={false}
          value="아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 ...아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 ...아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데 또 아니 내가 뭐 뫄뫄 뫄뫄 때문에 뭐뭐뭐무머 했거든... 근데"
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
