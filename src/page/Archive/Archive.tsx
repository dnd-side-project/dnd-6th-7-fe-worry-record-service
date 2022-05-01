/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';

import CustomeButton from '@components/Button';
import CustomeTabs from '@components/Tabs';
import AppLayout from '@components/AppLayout';
import Worries from '@components/Worries';
import Inform from '@components/Inform';
import { useIsFocused } from '@react-navigation/native';

import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';
import {
  CHANGE_MODE,
  CHANGE_MODE_REVIEW,
  INIT,
  SET_WORRY_ID,
  UNLOCK_WORRY,
} from '@context/reducer/archive';

import { ArchiveProps } from '~/types/Navigation';
import { WorryTempProps } from '~/types/Worry';

import { ConfirmAlert, RefRbProps } from '../Navigation';

import { useGetWorries, useDeleteWorry } from '@hooks/useWorries';

import { getDate } from '@lib/util/date';

import IconDelete from '@assets/image/delete.svg';
import IconUnlock from '@assets/image/unlock.svg';
import { useAuth } from '~/context/AuthContext';

const Archive: FC<ArchiveProps> = ({ navigation }) => {
  const tag = '[Archive]';
  const refRBSheet = useRef<RefRbProps>(null);
  const dispatch = useSceneDispatch();
  const isFocused = useIsFocused();
  const { userInfo } = useAuth();
  const {
    isUpdating,
    activeTags,
    index,
    activeTagsId,
    checkedWorries,
    worryId,
    isUnlock,
  } = useSceneState();

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  // 걱정 목록을 가져오는 함수
  const { data: worries, refetch } = useGetWorries(
    index,
    userInfo.userId,
    activeTags,
    activeTagsId,
    isUpdating,
    (data: WorryTempProps[]) => {
      console.log('목록 조회 완료');
    },
  );

  // 걱정 컨펌 창 숨김 함수
  const onPressCancel = (): void => {
    console.log(tag, 'onPressCancel');
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }
  };

  // 걱정 삭제 함수
  const { mutate } = useDeleteWorry(index, activeTags, activeTagsId, () => {
    console.log('삭제 완료');
    setOpenDeleteModal(true);
    onPressCancel();
  });

  // 걱정 탭 함수
  const onPressTabs = useCallback(
    (tabId: number): void => {
      console.log(tag, tabId, 'onPressTabs');
      dispatch({ type: INIT, values: { idx: tabId } });
    },
    [dispatch],
  );

  console.log(worries, 'queryData');

  // 걱정 삭제 개수 계산 함수
  const getCheckedNumber = useCallback((): number => {
    console.log(tag, 'getCheckedNumber');
    if (checkedWorries) {
      return checkedWorries.length;
    }
    return 0;
  }, [worries, checkedWorries]);

  // 걱정 삭제 체크 되어 있는 것만 도출하는 함수
  const getIsChecked = useCallback((): WorryTempProps[] => {
    console.log(tag, 'getIsChecked');
    if (worries) {
      return worries?.filter((item: WorryTempProps) =>
        checkedWorries.includes(item.worryId),
      );
    }
    return [];
  }, [worries, checkedWorries]);

  // 걱정 도출하는 함수
  const getWorry = useCallback(
    (key: string): string => {
      console.log(tag, 'getWorry');
      if (worries) {
        const data = worries?.find(
          (item: WorryTempProps) => +item.worryId === +worryId,
        );
        console.log(data, 'dd');
        return data[key];
      }
      return '';
    },
    [worries, worryId],
  );

  // 걱정 삭제 컨펌 오픈 함수
  const onPressOpenDrawer = useCallback((): void => {
    console.log(tag, 'onPressOpenDrawer');
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  }, [refRBSheet]);

  // 걱정 삭제 쿼리 만드는 함수
  const makeQueryDelete = (filterd: WorryTempProps[]): string => {
    console.log(tag, 'makeQueryDelete');
    const result = filterd
      .map((item: WorryTempProps, idx: number) => {
        if (idx === 0) {
          return `worryIds=${item.worryId}`;
        }
        return `&worryIds=${item.worryId}`;
      })
      .join('');
    return result;
  };

  // 걱정 삭제 함수
  const onPressDelete = useCallback((): void => {
    console.log(tag, 'onPressDelete');

    const filterdData = getIsChecked();
    const query = makeQueryDelete(filterdData);
    dispatch({ type: CHANGE_MODE, values: { isUpdating: false } });
    mutate(query);
  }, [worries, mutate, getIsChecked, dispatch, checkedWorries]);

  // 걱정 삭제 확인 함수 (삭제 컨펌 창)
  const onPressDeleteConfirm = useCallback((): void => {
    console.log(tag, 'onPressDeleteConfirm');
    setOpenDeleteModal(false);
  }, [setOpenDeleteModal]);

  // 걱정 잠금해제 컨펌창 확인 버튼 클릭시 이벤트
  const onPressUnlockConfirm = useCallback((): void => {
    console.log(tag, 'onPressConfirm');
    dispatch({ type: UNLOCK_WORRY, values: { isUnlock: false } });
    dispatch({ type: CHANGE_MODE_REVIEW, values: { isReviewing: true } });
    dispatch({ type: SET_WORRY_ID, values: { worryId: worryId } });
    navigation.navigate('ReviewChat');
  }, [dispatch, worryId, navigation]);

  useEffect(() => {
    console.log(tag, 'init Archvie');
    dispatch({ type: INIT });
  }, []);

  useEffect(() => {
    if (isFocused) {
      console.log(tag, 'isFocused Archvie');
      // dispatch({ type: INIT });
      refetch();
    }
  }, [isFocused]);

  const firstRoute = (): ReactElement => <Worries worries={worries} />;
  const secondRoute = (): ReactElement => <Worries worries={worries} />;

  const DUMMY = [
    {
      id: '0',
      title: '요즘 걱정,',
      component: firstRoute,
    },
    {
      id: '1',
      title: '지난 걱정',
      component: secondRoute,
    },
  ];

  return (
    <AppLayout noHeader name="worry">
      <CustomeTabs tabItems={DUMMY} index={index} onChangeIndex={onPressTabs} />
      {isUpdating && (
        <>
          <ButtonWrapper>
            <CustomeButton
              title={`${getCheckedNumber()} 개 삭제하기`}
              isBorderRadius
              disabled={getCheckedNumber() === 0}
              onPress={onPressOpenDrawer}
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
          <ConfirmAlert
            ref={refRBSheet}
            confrimButtonTitle="삭제 하기"
            title={
              getCheckedNumber() > 1
                ? `${getDate(
                    getIsChecked()[0].worryStartDate,
                    'MM',
                  )}월 ${getDate(
                    getIsChecked()[0].worryStartDate,
                    'dd',
                  )}일에 작성한 #${
                    getIsChecked()[0].categoryName
                  } 걱정 및 ${getCheckedNumber()}개를 삭제하시겠어요?`
                : `${
                    getCheckedNumber() &&
                    getDate(getIsChecked()[0].worryStartDate, 'MM')
                  }월 ${
                    getCheckedNumber() &&
                    getDate(getIsChecked()[0].worryStartDate, 'dd')
                  }일에 작성한 #${
                    getCheckedNumber() && getIsChecked()[0].categoryName
                  } 걱정을 삭제하시겠어요?`
            }
            subtitle="삭제한 걱정은 다시 되돌릴 수 없어요."
            onPressCancel={onPressCancel}
            onPressConfirm={onPressDelete}
          />
        </>
      )}
      {openDeleteModal && (
        <Inform
          visible={openDeleteModal}
          onPressConfirm={onPressDeleteConfirm}
          icon={<IconDelete />}
          mainTitle="걱정은 쏙!"
          description={'걱정이'}
          subTitle="삭제 되었어요!"
        />
      )}
      {isUnlock && (
        <Inform
          visible={isUnlock}
          onPressConfirm={onPressUnlockConfirm}
          icon={<IconUnlock />}
          mainTitle="걱정은 어떻게 되었나요?"
          description={`${getDate(
            getWorry('worryStartDate'),
            'MM',
          )}월 ${getDate(getWorry('worryStartDate'), 'dd')}일 #${getWorry(
            'categoryName',
          )} 걱정이`}
          subTitle="잠금 해제되었어요!"
        />
      )}
    </AppLayout>
  );
};

export default Archive;

const ButtonWrapper = styled.View`
  margin-bottom: 20px;
`;
