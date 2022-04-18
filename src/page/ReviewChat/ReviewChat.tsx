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

import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';
import { SET_CHAT_ID } from '@context/reducer/archive';

import IconSubmit from '@assets/image/submit.svg';
import { ConfirmAlert, RefRbProps } from '../Navigation';
import DatePicker from '~/components/DatePicker';
import { useAuth } from '~/context/AuthContext';
import Inform from '~/components/Inform';

import IconFinish from '@assets/image/finish.svg';
import IconNotFinish from '@assets/image/unFinish.svg';
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
  const { userInfo } = useAuth();
  const { index, activeTags, worryId, chatId, activeTagsId } = useSceneState();
  const dispatch = useSceneDispatch();

  const [worryChat, setWorryChat] = useState<ReviewChats>();
  const [worryReview, setWorryReview] = useState<string>('');
  const [chatMode, setChatMode] = useState<number>(0);
  const [setMode, setSettingMode] = useState<number>(0);
  const [initDelay, setInitDelay] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  const [isNotReviewed, setIsNotReviewed] = useState<boolean>(false);
  const [isCustomed, setIsCustomed] = useState<boolean>(false);

  const expiredDate = useRef<Date>(new Date());

  const { isLoading, isError } = useGetWorry(
    index,
    userInfo.userId,
    String(worryId),
    chatId,
    activeTags,
    activeTagsId,
    (item: ReviewChats) => setWorryChat(item),
  );

  // 알림 날짜 설정하는 popup창 만들기 - 완료
  // 선택한 알림 날짜 표출 하기 - 테스트 필요
  // 채팅 종료 전까지 테스트하기 - 테스트 필요

  // 리뷰 작성 후 submit하는 Mutations
  const mutateReview = useSubmitReview(
    index,
    activeTags,
    activeTagsId,
    (item: ReviewChats) => {
      console.log(tag, 'ReviewChats mutation success', item);
      setIsReviewed(true);
    },
  );

  // 걱정 종료 시간 계산하는 함수
  const mutateExpiredDate = useUpdateExpiredDate((item: ReviewChats[]) => {
    console.log(tag, 'mutateExpiredDate success', item);

    setIsFinish(true);
    if (isCustomed) {
      // 날짜 선택하여 저장하는 경우
      const realDate = getDate(String(expiredDate.current), 'yyyy-MM-dd');
      onPressCancel();
      updatePersonalDate(realDate, item);
      return;
    }

    setWorryChat((prev: any) => {
      return {
        ...prev,
        worryChat: [...prev.worryChat, ...item],
      };
    });
  });

  // 뒤로가기 함수
  const onPressBack = useCallback(() => {
    console.log(tag, 'onPressBack');
    setIsNotReviewed(true);
  }, [setIsNotReviewed]);

  // 걱정 종료 달력 오픈 함수
  const onPressOpenDrawer = useCallback((): void => {
    console.log(tag, 'onPressOpenDrawer');
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  }, [refRBSheet]);

  // 걱정 종료 달력  숨김 함수
  const onPressCancel = (): void => {
    console.log(tag, 'onPressCancel');
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }
  };

  // 우측 chat 버튼 클릭시 이벤트
  const onPressEdit = useCallback(
    (chatId: string) => {
      console.log(tag, 'onPressEdit');
      switch (chatId) {
        case '5':
          mutateExpiredDate.mutate({
            worryId,
            expiryDate: getDate(
              String(addDate(new Date(), 7)),
              "yyyy-MM-dd'T'HH:mm:ss",
            ),
          });
          break;
        case '6':
          mutateExpiredDate.mutate({
            worryId,
            expiryDate: getDate(
              String(addDate(new Date(), 14)),
              "yyyy-MM-dd'T'HH:mm:ss",
            ),
          });
          break;
        case '7':
          mutateExpiredDate.mutate({
            worryId,
            expiryDate: getDate(
              String(addDate(new Date(), 30)),
              "yyyy-MM-dd'T'HH:mm:ss",
            ),
          });
          break;
        case '8':
          setIsCustomed(true);
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

  // DatePicker 에서 선택한 날짜 저장
  const updatePersonalDate = useCallback(
    (expiredDate: string, item: ReviewChats[]) => {
      console.log(tag, 'updatePersonalDate');

      setWorryChat((prev: any) => {
        const lastItem = prev.worryChat[prev.worryChat.length - 1];
        lastItem.contents = expiredDate;
        prev.worryChat[prev.worryChat.length - 1] = lastItem;
        return {
          ...prev,
          worryChat: [...prev.worryChat, ...item],
        };
      });
    },
    [setWorryChat],
  );

  // DatePicker 에서 선택한 날짜 저장
  const onPressUpdateExpireDate = useCallback(() => {
    console.log(tag, 'onPressUpdateExpireDate');
    mutateExpiredDate.mutate({
      worryId,
      expiryDate: getDate(String(expiredDate.current), "yyyy-MM-dd'T'HH:mm:ss"),
    });
  }, [mutateExpiredDate, worryId]);

  // 채팅 종료 시간(임의) 설정 함수
  const onDateChange = useCallback((date: Date) => {
    const dateString = getDate(String(date), 'yyyy-MM-dd');
    expiredDate.current = date;
    console.log(tag, dateString, 'onDateChange');
  }, []);

  // 채팅 입력 후 전송 클릭시 이벤트
  const onPressSubmit = useCallback(() => {
    console.log(tag, 'onPressSubmit');
    mutateReview.mutate({ worryId, worryReview });
  }, [mutateReview, worryId, worryReview]);

  // 채팅 종료 이벤트
  const onPressFinish = useCallback(() => {
    console.log(tag, 'onPressFinish');
    navigation.goBack();
  }, [navigation]);

  const onPressConfirmIsReviewed = useCallback(() => {
    console.log(tag, 'onPressConfirmIsReviewed');
    setIsReviewed(false);
    navigation.goBack();
  }, [navigation, setIsReviewed]);

  const onPressConfirmIsNotReviewed = useCallback(() => {
    console.log(tag, 'onPressConfirmIsNotReviewed');
    setIsNotReviewed(false);
    navigation.goBack();
  }, [navigation, setIsNotReviewed]);

  useEffect(() => {
    console.log(tag, 'init');
    setInitDelay(false);
    setIsCustomed(false);
    setIsFinish(false);
    setIsNotReviewed(false);
    setIsReviewed(false);
  }, []);

  return (
    <AppLayout
      name="chat"
      headerLeft={<ArrowLeft />}
      headerLeftSidePress={onPressBack}
      headerTitle={
        <Headeritle>
          {worryChat?.worryStartDate &&
            getDate(worryChat?.worryStartDate, 'yy/MM')}
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
        {chatId === '1' ||
        chatId === '4' ||
        worryChat?.worryChat?.length === 0 ? null : worryChat?.worryChat
            ?.length && chatMode === 0 ? (
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
        {isFinish && (
          <ButtonWrapper>
            <CustomeButton
              title={'채팅 종료'}
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
        confrimButtonTitle="확인"
        title="알림 날짜를 설정하세요."
        subtitle="설정한 날짜에 맞춰 걱정 잠금이 해제됩니다."
        onPressCancel={onPressCancel}
        onPressConfirm={onPressUpdateExpireDate}
        children={
          <DatePicker date={expiredDate.current} onDateChange={onDateChange} />
        }
      />
      {isReviewed && (
        <Inform
          visible={isReviewed}
          onPressConfirm={onPressConfirmIsReviewed}
          icon={<IconFinish />}
          mainTitle="걱정은 안녕!"
          description={`${
            worryChat?.worryStartDate &&
            getDate(worryChat?.worryStartDate, 'MM')
          }월 ${
            worryChat?.worryStartDate &&
            getDate(worryChat?.worryStartDate, 'dd')
          }일 #${worryChat?.categoryName} 걱정`}
          subTitle="안해도 문제 없었어요."
        />
      )}
      {isNotReviewed && (
        <Inform
          visible={isNotReviewed}
          onPressConfirm={onPressConfirmIsNotReviewed}
          icon={<IconNotFinish />}
          mainTitle="걱정은 안녕!"
          description={`${
            worryChat?.worryStartDate &&
            getDate(worryChat?.worryStartDate, 'MM')
          }월 ${
            worryChat?.worryStartDate &&
            getDate(worryChat?.worryStartDate, 'dd')
          }일 #${worryChat?.categoryName} 걱정이`}
          subTitle="걱정 데이터로 수집 되었어요."
        />
      )}
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
