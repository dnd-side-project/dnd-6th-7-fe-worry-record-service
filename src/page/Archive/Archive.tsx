/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
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
import { WorryTempProps } from '@components/Worries/Worries';

import { getDate } from '@lib/util/date';
import { ArchiveProps } from '~/types/Navigation';

import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';
import { INIT, FILTER_TAG } from '@context/reducer/archive';

import { ConfirmAlert, RefRbProps } from '../Navigation';
import { useGetWorries, useDeleteWorry } from '~/hooks/useWorries';
import { USER_ID } from '~/App';

const Archive: FC<ArchiveProps> = ({ navigation }) => {
  const tag = '[Archive]';

  const refRBSheet = useRef<RefRbProps>(null);
  const dispatch = useSceneDispatch();
  const { isUpdating, activeTags, index } = useSceneState();

  const [worries, setWorriess] = useState<WorryTempProps[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const { isLoading, isError } = useGetWorries(
    index,
    USER_ID,
    activeTags,
    (item: WorryTempProps[]) => setWorriess(item.length ? item : []),
  );

  const { mutate } = useDeleteWorry(index, activeTags, () => {
    setOpenDeleteModal(true);
  });

  const onChangeCheckBox = useCallback(
    (worryId: number) => {
      console.log(tag, 'onChangeCheckBox');

      setWorriess((previous: any) =>
        previous.map((worry: WorryTempProps) =>
          worry.worryId === worryId
            ? { ...worry, isChecked: !worry.isChecked }
            : worry,
        ),
      );
    },
    [setWorriess],
  );

  const onPressTag = useCallback(
    (tagId: number) => {
      console.log(tag, tagId, 'onPressTag');
      dispatch({ type: FILTER_TAG, values: { tag: String(tagId) } });
    },
    [dispatch],
  );

  const onPressTabs = useCallback(
    (tabId: number): void => {
      console.log(tag, 'onPressTabs');
      dispatch({ type: INIT, values: { idx: tabId } });
    },
    [dispatch],
  );

  const getCheckedNumber = useCallback((): number => {
    console.log(tag, 'getCheckedNumber');
    return worries.filter((item: WorryTempProps) => item.isChecked).length;
  }, [worries]);

  const getIsChecked = useCallback((): WorryTempProps[] => {
    console.log(tag, 'getIsChecked');
    return worries.filter((item: WorryTempProps) => item.isChecked);
  }, [worries]);

  const onPressOpenDrawer = useCallback((): void => {
    console.log(tag, 'onPressOpenDrawer');
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  }, [refRBSheet]);

  const onPressDelete = useCallback((): void => {
    console.log(tag, 'onPressDelete');
    const filterd = worries.filter((item: WorryTempProps) => item.isChecked);
    console.log(worries, 'filterd', filterd);
    const result = filterd
      .map((item: WorryTempProps, idx: number) => {
        if (idx === 0) {
          return `worryIds=${item.worryId}`;
        }
        return `&worryIds=${item.worryId}`;
      })
      .join('');
    mutate(result);
    onPressCancel();
  }, [worries, mutate]);

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
    // dispatch({ type: FILTER_TAG, values: { tag: '모든걱정' } });
  }, []);

  const firstRoute = (): ReactElement => (
    <Worries
      onPressConfirm={onPressConfirm}
      openDeleteModal={openDeleteModal}
      isLoading={isLoading}
      isError={isError}
      worries={worries}
      onChangeCheckBox={onChangeCheckBox}
      onPressTag={onPressTag}
    />
  );
  const secondRoute = (): ReactElement => (
    <Worries
      onPressConfirm={onPressConfirm}
      openDeleteModal={openDeleteModal}
      isLoading={isLoading}
      isError={isError}
      worries={worries}
      onChangeCheckBox={onChangeCheckBox}
      onPressTag={onPressTag}
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

export default Archive;

const ButtonWrapper = styled.View`
  margin-bottom: 20px;
`;
