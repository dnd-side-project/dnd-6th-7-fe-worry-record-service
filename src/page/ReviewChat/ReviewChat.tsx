import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppLayout from '@components/AppLayout';
import ChatBox from '@components/ChatBox';
import ChatBoxWithButton from '@components/ChatBoxWithButton';
import ChatBubble from '@components/ChatBubble';

import { ReviewChatProps } from '~/types/Navigation';

import { getDate } from '@lib/util/date';
import { theme } from '@lib/styles/palette';
import ArrowLeft from '@assets/image/arrow_left.svg';
import { Platform, StyleSheet } from 'react-native';
import { useGetWorry, useSubmitReview } from '@hooks/useWorry';
import { USER_ID } from '~/App';

import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';
import { SET_CHAT_ID } from '@context/reducer/archive';

import IconSubmit from '@assets/image/submit.svg';

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
  const { index, activeTags, worryId, chatId, activeTagsId } = useSceneState();
  const dispatch = useSceneDispatch();

  const [worryChat, setWorryChat] = useState<ReviewChats>();
  const [worryReview, setWorryReview] = useState<string>('');
  const [chatMode, setChatMode] = useState<number>(0);
  const [setMode, setSettingMode] = useState<number>(0);
  const [initDelay, setInitDelay] = useState<boolean>(false);

  const { isLoading, isError } = useGetWorry(
    index,
    USER_ID,
    String(worryId),
    chatId,
    activeTags,
    activeTagsId,
    (item: ReviewChats) => setWorryChat(item),
  );

  const mutation = useSubmitReview(
    index,
    String(worryId),
    chatId,
    activeTags,
    activeTagsId,
    (item: ReviewChats) => {
      console.log(tag, 'ReviewChats mutation success', item);
      navigation.goBack();
    },
  );

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

  const onPressSubmit = useCallback(() => {
    console.log(tag, 'onPressSubmit');
    mutation.mutate({ worryId, worryReview });
  }, [mutation, worryId, worryReview]);

  useEffect(() => {
    console.log(tag, 'init');
    setInitDelay(false);
  }, []);

  return (
    <AppLayout
      name="chat"
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
        contentContainerStyle={styles.container}
      >
        <ChatBoxWrapper>
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
        </ChatBoxWrapper>
        {chatId === '1' || worryChat?.worryChat?.length === 0 ? null : worryChat
            ?.worryChat?.length && chatMode === 0 ? (
          <ChatBubble
            // 애니메이션 설정 하는 props 추가
            value={''}
            placeholder={'걱정 후기를 남겨주세요.'}
            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
            height={42}
            editable={true}
            onPressIn={() => setChatMode(1)}
            isAnimated
            animation="fadeInUp"
            delay={
              initDelay
                ? 0
                : worryChat?.worryChat[worryChat?.worryChat.length - 1]?.delay +
                  500
            }
          />
        ) : (
          <ChatBoxWithButton
            value={worryReview}
            setValue={setWorryReview}
            onBlur={() => {
              console.log('onBlur');
              if (worryReview.length === 0) {
                setChatMode(0);
                setInitDelay(true);
              }
            }}
            setSettingMode={setSettingMode}
            settingIcon={<IconSubmit onPress={onPressSubmit} />}
          />
        )}
      </WithScroll>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const WithScroll = styled(KeyboardAwareScrollView)`
  height: -30px;
`;

const Headeritle = styled.Text`
  font-size: 26px;
  color: ${theme.color.white};
  font-weight: bold;
`;

const ChatBoxWrapper = styled.View`
  flex: 1;
`;

export default ReviewChat;
