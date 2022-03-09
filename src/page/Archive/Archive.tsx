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

import { USER_ID } from '~/App';

import CustomeButton from '@components/Button';
import CustomeTabs from '@components/Tabs';
import AppLayout from '@components/AppLayout';
import Worries from '@components/Worries';

import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';
import { INIT } from '@context/reducer/archive';

import { ArchiveProps } from '~/types/Navigation';
import { WorryTempProps } from '~/types/Worry';

import { ConfirmAlert, RefRbProps } from '../Navigation';

import { useGetWorries, useDeleteWorry } from '@hooks/useWorries';

import { getDate } from '@lib/util/date';

const Archive: FC<ArchiveProps> = ({ navigation }) => {
  const tag = '[Archive]';
  const refRBSheet = useRef<RefRbProps>(null);
  const dispatch = useSceneDispatch();
  const { isUpdating, activeTags, index, activeTagsId } = useSceneState();

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  // 걱정 목록을 가져오는 함수
  const queryData = useGetWorries(index, USER_ID, activeTags, activeTagsId);

  // 걱정 삭제 함수
  const { mutate } = useDeleteWorry(index, activeTags, () => {
    setOpenDeleteModal(true);
  });

  // 걱정 탭 함수
  const onPressTabs = useCallback(
    (tabId: number): void => {
      console.log(tag, tabId, 'onPressTabs');
      dispatch({ type: INIT, values: { idx: tabId } });
    },
    [dispatch],
  );

  // 걱정 삭제 개수 계산 함수
  const getCheckedNumber = useCallback((): number => {
    console.log(tag, 'getCheckedNumber');
    return queryData.data.filter((item: WorryTempProps) => item.isChecked)
      .length;
  }, [queryData.data]);

  // 걱정 삭제 체크 되어 있는 것만 도출하는 함수
  const getIsChecked = useCallback((): WorryTempProps[] => {
    console.log(tag, 'getIsChecked');
    return queryData.data.filter((item: WorryTempProps) => item.isChecked);
  }, [queryData.data]);

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

    mutate(query);
    onPressCancel();
  }, [queryData.data, mutate]);

  // 걱정 컨펌 창 숨김 함수
  const onPressCancel = (): void => {
    console.log(tag, 'onPressCancel');
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }
  };

  const onPressConfirm = (): void => {
    console.log(tag, 'onPressConfirm');
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    dispatch({ type: INIT });
  }, []);

  const firstRoute = (): ReactElement => (
    <Worries
      onPressConfirm={onPressConfirm}
      openDeleteModal={openDeleteModal}
      worries={queryData.data}
    />
  );
  const secondRoute = (): ReactElement => (
    <Worries
      onPressConfirm={onPressConfirm}
      openDeleteModal={openDeleteModal}
      worries={queryData.data}
    />
  );

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
    </AppLayout>
  );
};

export default memo(Archive);

const ButtonWrapper = styled.View`
  margin-bottom: 20px;
`;
