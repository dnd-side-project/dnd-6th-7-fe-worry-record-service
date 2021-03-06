import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppLayout from '@components/AppLayout';
import ChatBox from '@components/ChatBox';
import ChatBoxWithButton from '@components/ChatBoxWithButton';
import ChatBubble from '@components/ChatBubble';
import CustomeButton from '@components/Button';

import { ReviewChatProps } from '~/types/Navigation';

import { addDate, getDate, getIsoDate } from '@lib/util/date';
import { theme } from '@lib/styles/palette';
import ArrowLeft from '@assets/image/arrow_left.svg';
import { Platform, StyleSheet } from 'react-native';
import {
  useGetWorry,
  useSubmitReview,
  useUpdateExpiredDate,
} from '@hooks/useWorry';
import { USER_ID } from '~/App';

import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';
import { SET_CHAT_ID } from '@context/reducer/archive';

import IconSubmit from '@assets/image/submit.svg';
import { ConfirmAlert, RefRbProps } from '../Navigation';
import DatePicker from '~/components/DatePicker';

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
  const refRBSheet = useRef<RefRbProps>(null);
  const { index, activeTags, worryId, chatId, activeTagsId } = useSceneState();
  const dispatch = useSceneDispatch();

  const [worryChat, setWorryChat] = useState<ReviewChats>();
  const [worryReview, setWorryReview] = useState<string>('');
  const [chatMode, setChatMode] = useState<number>(0);
  const [setMode, setSettingMode] = useState<number>(0);
  const [initDelay, setInitDelay] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);

  const expiredDate = useRef<Date>(new Date());

  const { isLoading, isError } = useGetWorry(
    index,
    USER_ID,
    String(worryId),
    chatId,
    activeTags,
    activeTagsId,
    (item: ReviewChats) => setWorryChat(item),
  );

  // ?????? ?????? ???????????? popup??? ????????? - ??????
  // ????????? ?????? ?????? ?????? ?????? - ????????? ??????
  // ?????? ?????? ????????? ??????????????? - ????????? ??????

  // ?????? ?????? ??? submit?????? Mutations
  const mutateReview = useSubmitReview(
    index,
    activeTags,
    activeTagsId,
    (item: ReviewChats) => {
      console.log(tag, 'ReviewChats mutation success', item);
      navigation.goBack();
    },
  );

  // ?????? ?????? ?????? ???????????? ??????
  const mutateExpiredDate = useUpdateExpiredDate((item: ReviewChats) => {
    console.log(tag, 'mutateExpiredDate success', item);

    setIsFinish(true);
    if (expiredDate.current) {
      const realDate = getDate(String(expiredDate.current), 'yyyy-MM-dd');
      onPressCancel();
      updatePersonalDate(realDate);
      return;
    }

    setWorryChat((prev: any) => {
      return {
        ...prev,
        worryChat: [...prev.worryChat, item],
      };
    });
  });

  // ???????????? ??????
  const onPressBack = useCallback(() => {
    console.log(tag, 'onPressBack');
    navigation.goBack();
  }, [navigation]);

  // ?????? ?????? ?????? ?????? ??????
  const onPressOpenDrawer = useCallback((): void => {
    console.log(tag, 'onPressOpenDrawer');
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  }, [refRBSheet]);

  // ?????? ?????? ??????  ?????? ??????
  const onPressCancel = (): void => {
    console.log(tag, 'onPressCancel');
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }
  };

  // ?????? chat ?????? ????????? ?????????
  const onPressEdit = useCallback(
    (chatId: string) => {
      console.log(tag, 'onPressEdit');
      switch (chatId) {
        case '5':
          mutateExpiredDate.mutate({
            worryId,
            expiryDate: getIsoDate(addDate(new Date(), 7)),
          });
          break;
        case '6':
          mutateExpiredDate.mutate({
            worryId,
            expiryDate: getIsoDate(addDate(new Date(), 14)),
          });
          break;
        case '7':
          mutateExpiredDate.mutate({
            worryId,
            expiryDate: getIsoDate(addDate(new Date(), 30)),
          });
          break;
        case '8':
          onPressOpenDrawer();
          break;

        default:
          setWorryChat({});
          dispatch({ type: SET_CHAT_ID, values: { chatId } });
          break;
      }
    },
    [dispatch, mutateExpiredDate, worryId, setWorryChat, onPressOpenDrawer],
  );

  // DatePicker ?????? ????????? ?????? ??????
  const updatePersonalDate = useCallback(
    (expiredDate: string) => {
      console.log(tag, 'updatePersonalDate');

      setWorryChat((prev: any) => {
        const lastItem = prev.worryChat[prev.worryChat.length - 1];
        return {
          ...prev,
          worryChat: [...prev.worryChat, { ...lastItem, expiredDate }],
        };
      });
    },
    [setWorryChat],
  );

  // DatePicker ?????? ????????? ?????? ??????
  const onPressUpdateExpireDate = useCallback(() => {
    console.log(tag, 'onPressUpdateExpireDate');
    mutateExpiredDate.mutate({
      worryId,
      expiryDate: getIsoDate(expiredDate.current),
    });
  }, [mutateExpiredDate, worryId]);

  // ?????? ?????? ??????(??????) ?????? ??????
  const onDateChange = useCallback((date: Date) => {
    const dateString = getDate(String(date), 'yyyy-MM-dd');
    expiredDate.current = date;
    console.log(tag, dateString, 'onDateChange');
  }, []);

  // ?????? ?????? ??? ?????? ????????? ?????????
  const onPressSubmit = useCallback(() => {
    console.log(tag, 'onPressSubmit');
    mutateReview.mutate({ worryId, worryReview });
  }, [mutateReview, worryId, worryReview]);

  // ?????? ?????? ?????????
  const onPressFinish = useCallback(() => {
    console.log(tag, 'onPressFinish');
  }, []);

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
          #{worryChat?.categoryName} ??????
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
        {chatId === '1' ||
        chatId === '4' ||
        worryChat?.worryChat?.length === 0 ? null : worryChat?.worryChat
            ?.length && chatMode === 0 ? (
          <ChatBubble
            // ??????????????? ?????? ?????? props ??????
            value={''}
            placeholder={'?????? ????????? ???????????????.'}
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
        {isFinish && (
          <ButtonWrapper>
            <CustomeButton
              title={'?????? ??????'}
              isBorderRadius
              onPress={onPressFinish}
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
        )}
      </WithScroll>
      <ConfirmAlert
        ref={refRBSheet}
        drawerHeight={48}
        confrimButtonTitle="??????"
        title="?????? ????????? ???????????????."
        subtitle="????????? ????????? ?????? ?????? ????????? ???????????????."
        onPressCancel={onPressCancel}
        onPressConfirm={onPressUpdateExpireDate}
        children={
          <DatePicker date={expiredDate.current} onDateChange={onDateChange} />
        }
      />
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

const ButtonWrapper = styled.View``;

export default ReviewChat;
