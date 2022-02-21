/* eslint-disable no-mixed-spaces-and-tabs */
import React, { FC, memo, useCallback, useRef } from 'react';

import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import Worry from '@components/Worry';
import CustomeButton from '@components/Button';
import Modal from '@components/Modal';

import { theme } from '@lib/styles/palette';
import { Header6_bold } from '@lib/styles/_mixin';

import {
  useSceneState,
  useSceneDispatch,
  useWorriesApi,
} from '@context/ArchiveContext';

import {
  CHANGE_MODE,
  CHANGE_MODE_REVIEW,
  FILTER_TAG,
  UNLOCK_WORRY,
} from '~/context/reducer/archive';
import { useQuery } from 'react-query';
import { ConfirmAlert, RefRbProps } from '~/page/Navigation';
import { useNavigation } from '@react-navigation/native';
import { ArchiveScreenNavigationProp } from '~/types/Navigation';

import IconUnlock from '@assets/image/unlock.svg';
export interface WorryProps {
  id: string | number[];
  title: string;
  content: string;
  isOpen: boolean;
  isDone: boolean;
  isChecked: boolean;
}

const Worries: FC = () => {
  const tag = '[Worries]';

  const navigation = useNavigation<ArchiveScreenNavigationProp>();
  const refRBSheet = useRef<RefRbProps>(null);

  const { isUpdating, worries, tags, activeTags, isUnlock } = useSceneState();
  const dispatch = useSceneDispatch();
  const worriedApi = useWorriesApi();

  // TODO: 데이터 받아오기 추후 구현 예정
  // const { data, isLoading } = useQuery(
  //   ['worries', { tags: activeTags }],
  //   api.getWorries(),
  // );

  const onPressEdit = useCallback(() => {
    console.log(tag, 'onPressEdit');
    dispatch({ type: CHANGE_MODE, values: { isUpdating: !isUpdating } });
  }, [dispatch, isUpdating]);

  const onPressTag = useCallback(
    (content: string) => {
      console.log(tag, 'onPressTag');
      dispatch({ type: FILTER_TAG, values: { tag: content } });
    },
    [dispatch],
  );

  const onPressCancel = (): void => {
    console.log(tag, 'onPressCancel');
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }
  };

  const onLongPressUnlock = (): void => {
    console.log(tag, 'onLongPressUnlock');
    // if (refRBSheet.current) {
    //   refRBSheet.current.open();
    // }
    dispatch({ type: UNLOCK_WORRY, values: { isUnlock: true } });
  };

  const onPressConfirm = (): void => {
    console.log(tag, 'onPressConfirm');
    // if (refRBSheet.current) {
    //   refRBSheet.current.close();
    // }
    dispatch({ type: UNLOCK_WORRY, values: { isUnlock: false } });
    dispatch({ type: CHANGE_MODE_REVIEW, values: { isReviewing: true } });
    navigation.navigate('Review');
  };

  return (
    <WorriesWrapper>
      <FilterWrapper>
        {worries.length
          ? tags.map((item: WorryProps) => (
              <ButtonWrapper>
                <CustomeButton
                  title={item.content}
                  isBorderRadius
                  onPress={onPressTag.bind(null, item.content)}
                  backgroundColor={{
                    color: item.content === activeTags ? 'white' : 'lightWhite',
                  }}
                  color={{
                    color:
                      item.content === activeTags
                        ? 'originalBlack'
                        : 'lightGray',
                  }}
                  fontSize={12}
                />
              </ButtonWrapper>
            ))
          : null}
      </FilterWrapper>
      <UpdateWrapper>
        <InfoText>
          총
          <Count>
            {activeTags === '모든걱정' ? worries.length - 1 : worries.length}개
          </Count>
          걱정
        </InfoText>
        <UpdateButton onPress={onPressEdit}>
          <ButtonName>{isUpdating ? '취소' : '편집하기'}</ButtonName>
        </UpdateButton>
      </UpdateWrapper>

      <ListWrapper
        data={worries.filter(item => item.id !== '-1')}
        renderItem={({ item, index }: { item: WorryProps; index: number }) => (
          <Worry onLongPress={onLongPressUnlock} item={item} index={index} />
        )}
        numColumns={2}
        keyExtractor={(item, index) => item.id.toString()}
      />
      {/* <ConfirmAlert
        ref={refRBSheet}
        confrimButtonTitle="잠금 해제"
        title={'12월 24일에 작성한 #관계 걱정을 잠금 해제 하시겠어요?'}
        subtitle="잠금 해제한 걱정은 다시 되돌릴 수 없어요."
        onPressCancel={onPressCancel}
        onPressConfirm={onPressConfirm}
      /> */}
      <Modal visible={isUnlock}>
        <ModalWrapper>
          <ModalTitle>걱정은 어떻게 되었나요?</ModalTitle>
          <IconWrapper>
            <IconUnlock />
          </IconWrapper>
          <ModalTitle>12월 24일 #관계 걱정이 </ModalTitle>
          <ModalTitle>잠금 해제되었어요!</ModalTitle>
        </ModalWrapper>
        <ModalButtonWrapper>
          <CustomeButton
            title="확인"
            isBorderRadius
            onPress={onPressConfirm}
            backgroundColor={{
              color: 'white',
            }}
            height={52}
            color={{
              color: 'black',
            }}
            fontSize={16}
          />
        </ModalButtonWrapper>
      </Modal>
    </WorriesWrapper>
  );
};

export default memo(Worries);

const WorriesWrapper = styled.View`
  flex: 1;
`;

const FilterWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
`;

const ButtonWrapper = styled.View`
  margin-right: 8px;
  margin-bottom: 8px;
`;

const UpdateWrapper = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 38px 0;
`;

const InfoText = styled.Text`
  ${Header6_bold(theme.color.lightGray2)}
`;

const Count = styled.Text`
  ${Header6_bold(theme.color.white)}
`;

const UpdateButton = styled.TouchableOpacity``;

const ButtonName = styled.Text`
  ${Header6_bold(theme.color.lightGray2)}
`;

const ListWrapper = styled.FlatList`` as unknown as typeof FlatList;

const IconWrapper = styled.View`
  margin: 18px 0;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.color.white};
  line-height: 28px;
`;

const ModalWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalButtonWrapper = styled.View`
  margin-bottom: 36px;
`;
