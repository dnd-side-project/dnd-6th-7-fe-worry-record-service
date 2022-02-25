import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppLayout from '@components/AppLayout';
import ChatBox from '@components/ChatBox';
import Error from '@components/Error';

import { ReviewChatProps } from '~/types/Navigation';

import { getDate } from '@lib/util/date';
import { theme } from '@lib/styles/palette';
import ArrowLeft from '@assets/image/arrow_left.svg';
import { Platform } from 'react-native';
import { useGetWorry } from '~/hooks/useWorry';
import { USER_ID } from '~/App';

import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';
import { SET_CHAT_ID } from '~/context/reducer/archive';

export interface ReviewChats {
  categoryName?: string;
  username?: string;
  worryStartDate?: string;
  worryText?: string;
  worryCnt?: number;
  meaningfulWorryCnt?: number;
  worryChat?: [];
}

const ReviewChat: FC<ReviewChatProps> = ({ navigation }) => {
  const tag = '[ReviewChat]';
  const { index, activeTags, worryId, chatId } = useSceneState();
  const dispatch = useSceneDispatch();

  const [worryChat, setWorryChat] = useState<ReviewChats>();

  const { isLoading, isError } = useGetWorry(
    index,
    USER_ID,
    String(worryId),
    chatId,
    activeTags,
    (item: ReviewChats) => setWorryChat(item),
  );

  console.log(worryChat);

  const onPressBack = useCallback(() => {
    console.log(tag, 'onPressBack');
    navigation.goBack();
  }, [navigation]);

  const onPressEdit = useCallback(
    (chatId: string) => {
      console.log(tag, 'onPressEdit');
      dispatch({ type: SET_CHAT_ID, values: { chatId } });
    },
    [dispatch],
  );

  // if (isLoading) {
  //   return <Indicator />;
  // }

  if (isError) {
    return <Error />;
  }

  return (
    <AppLayout
      name="review"
      noBackGroundImage={true}
      headerLeft={<ArrowLeft />}
      headerLeftSidePress={onPressBack}
      headerTitle={
        <Headeritle>
          {worryChat?.worryStartDate &&
            getDate(worryChat?.worryStartDate, 'yy/MM')}{' '}
          #{worryChat?.categoryName} 걱정
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
        {worryChat?.worryChat?.map((item: any, index: any) => (
          <ChatBox
            key={index}
            isOposite={item.isOposite}
            fontColor={item.isOposite ? theme.color.lightGray : ''}
            bgColor={
              item.isOposite
                ? theme.color.lightWhite
                : item.isActive
                ? theme.color.light2White
                : ''
            }
            value={item.contents}
            onPressEdit={onPressEdit}
            id={item.id}
            isActive={item.isActive}
          />
        ))}
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

export default ReviewChat;
