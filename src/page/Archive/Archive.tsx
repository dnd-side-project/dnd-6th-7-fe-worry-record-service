/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components/native';

import CustomeButton from '@components/Button';
import CustomeTabs from '@components/Tabs';
import AppLayout from '@components/AppLayout';
import Worries from '@components/Worries';
import { WorryProps } from '@components/Worries/Worries';
import BottomDrawer from '@components/BottomDrawer';

import { ArchiveProps } from '~/types/Navigation';
import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';

import { INIT, FILTER_TAG, DELETE_WORRY } from '@context/reducer/archive';

import Confirm from '~/components/Confirm';

interface RefRbProps {
  open: () => void;
  close: () => void;
}

const Archive: FC<ArchiveProps> = ({ navigation }) => {
  const tag = '[Archive]';

  const refRBSheet = useRef<RefRbProps>(null);
  const dispatch = useSceneDispatch();
  const { index, isUpdating, worries } = useSceneState();

  const firstRoute = (): ReactElement => <Worries />;
  const secondRoute = (): ReactElement => <Worries />;

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

  const onPressTabs = useCallback(
    (idx: number): void => {
      console.log(tag, 'onPressTabs');
      dispatch({ type: INIT, values: { idx } });
    },
    [dispatch],
  );

  const getCheckedNumber = (): number => {
    console.log(tag, 'getCheckedNumber');
    return worries.filter((item: WorryProps) => item.isChecked).length;
  };

  const onPressOpenDrawer = (): void => {
    console.log(tag, 'onPressOpenDrawer');
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  };

  const onPressDelete = useCallback((): void => {
    console.log(tag, 'onPressDelete');
    dispatch({ type: DELETE_WORRY });
    onPressCancel();
  }, [dispatch]);

  const onPressCancel = (): void => {
    console.log(tag, 'onPressCancel');
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }
  };

  useEffect(() => {
    dispatch({ type: INIT });
    dispatch({ type: FILTER_TAG, values: { tag: '모든걱정' } });
  }, []);

  return (
    <AppLayout noHeader name="worry">
      <CustomeTabs tabItems={DUMMY} index={index} onChangeIndex={onPressTabs} />
      {isUpdating && (
        <>
          <ButtonWrapper>
            <CustomeButton
              title={`${getCheckedNumber()} 개 삭제하기`}
              isBorderRadius
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
          <BottomDrawer ref={refRBSheet}>
            <Confirm
              title={`12월 24일에 작성한 #관계 걱정 및 ${getCheckedNumber()}개를 삭제하시겠어요?`}
              subtitle="삭제한 걱정은 다시 되돌릴 수 없어요."
              onPressCancel={onPressCancel}
              onPressDelete={onPressDelete}
            />
          </BottomDrawer>
        </>
      )}
    </AppLayout>
  );
};

export default Archive;

const ButtonWrapper = styled.View`
  margin-bottom: 20px;
`;
