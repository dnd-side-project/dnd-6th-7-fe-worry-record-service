import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppLayout from '@components/AppLayout';
import ChatBox from '@components/ChatBox';
import ChatBoxWithButton from '@components/ChatBoxWithButton';

import { ReviewChatProps } from '~/types/Navigation';

import { getDate } from '@lib/util/date';
import { theme } from '@lib/styles/palette';
import ArrowLeft from '@assets/image/arrow_left.svg';
import { Platform } from 'react-native';
import { useGetWorry } from '~/hooks/useWorry';
import { USER_ID } from '~/App';

import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';
import { SET_CHAT_ID } from '~/context/reducer/archive';
import ChatBubble from '~/components/ChatBubble';

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
  const [worryReview, setWorryReview] = useState<string>('');
  const [chatMode, setChatMode] = useState<number>(0);
  const [setMode, setSettingMode] = useState<number>(0);

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
    (id: string) => {
      console.log(tag, 'onPressEdit');
      setWorryChat({});
      dispatch({ type: SET_CHAT_ID, values: { chatId: id } });
    },
    [dispatch],
  );

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
            delay={item.delay}
            onPressEdit={onPressEdit}
            id={item.id}
            isActive={item.isActive}
          />
        ))}
        {chatMode === 0 ? (
          <ChatBubble
            value={''}
            placeholder={'걱정이 있나요?'}
            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
            height={42}
            editable={true}
            onPressIn={() => setChatMode(1)}
          />
        ) : (
          <ChatBoxWithButton
            value={worryReview}
            setValue={setWorryReview}
            onBlur={() => {
              console.log('onBlur');
              if (worryReview.length === 0) {
                setChatMode(0);
              }
            }}
            setSettingMode={setSettingMode}
          />
        )}
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
