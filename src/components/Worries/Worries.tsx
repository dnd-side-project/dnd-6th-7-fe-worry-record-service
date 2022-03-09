/* eslint-disable no-mixed-spaces-and-tabs */
import React, { FC, memo, useCallback } from 'react';
import { FlatList, GestureResponderEvent } from 'react-native';

import styled from 'styled-components/native';

import Worry from '@components/Worry';
import CustomeButton from '@components/Button';
import Modal from '@components/Modal';

import { theme } from '@lib/styles/palette';
import { Header6_bold } from '@lib/styles/_mixin';

import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';
import { CHANGE_MODE, UNLOCK_WORRY } from '@context/reducer/archive';

import { WorryTempProps } from '~/types/Worry';

import { useUnlockWorry } from '~/hooks/useWorries';

import IconDelete from '@assets/image/delete.svg';

export interface WorriesProps {
  worries: WorryTempProps[];
  onChangeCheckBox: (e: GestureResponderEvent, worryId: number) => void;
  onPressTag: (id: number, tagId: string | number[]) => void;
  onPressConfirm: () => void;
  openDeleteModal: boolean;
}

const Worries: FC<WorriesProps> = ({
  worries,
  onChangeCheckBox,
  onPressTag,
  openDeleteModal,
  onPressConfirm,
}) => {
  const tag = '[Worries]';

  const { isUpdating, tags, activeTags, index } = useSceneState();
  const dispatch = useSceneDispatch();

  const { mutate } = useUnlockWorry(index, activeTags);

  const onPressEdit = useCallback(() => {
    console.log(tag, 'onPressEdit');
    dispatch({ type: CHANGE_MODE, values: { isUpdating: !isUpdating } });
  }, [dispatch, isUpdating]);

  const onLongPressUnlock = (item: WorryTempProps): void => {
    console.log(tag, 'onLongPressUnlock');
    mutate(String(item.worryId));
    dispatch({ type: UNLOCK_WORRY, values: { isUnlock: true } });
  };

  return (
    <WorriesWrapper>
      <FilterWrapper>
        {tags
          .filter((tagss: WorryTempProps) =>
            index === 0 ? !tagss.finished : tagss,
          )
          .map((item: WorryTempProps) => (
            <ButtonWrapper key={item.worryId}>
              <CustomeButton
                title={item.categoryName}
                isBorderRadius
                onPress={onPressTag.bind(null, item.worryId, item.id)}
                backgroundColor={{
                  color:
                    String(item.worryId) === activeTags
                      ? 'white'
                      : 'lightWhite',
                }}
                color={{
                  color:
                    String(item.worryId) === activeTags
                      ? 'originalBlack'
                      : 'lightGray',
                }}
                fontSize={12}
              />
            </ButtonWrapper>
          ))}
      </FilterWrapper>
      <UpdateWrapper>
        <InfoText>
          총 <Count>{worries?.length}개</Count> 걱정
        </InfoText>
        {worries?.length > 0 && (
          <UpdateButton onPress={onPressEdit}>
            <ButtonName>{isUpdating ? '취소' : '편집하기'}</ButtonName>
          </UpdateButton>
        )}
      </UpdateWrapper>

      <ListWrapper
        data={worries?.filter((item: any) => item.worryId !== '-1')}
        renderItem={({ item }: { item: WorryTempProps }) => (
          <Worry
            key={item.worryId}
            item={item}
            onChangeCheckBox={onChangeCheckBox}
          />
        )}
        numColumns={2}
        keyExtractor={(item, index) => String(index)}
      />
      <Modal visible={openDeleteModal}>
        <ModalWrapper>
          <ModalTitle>걱정은 쏙!</ModalTitle>
          <IconWrapper>
            <IconDelete />
          </IconWrapper>
          <ModalTitle>걱정이</ModalTitle>
          <ModalTitle>삭제 되었어요!</ModalTitle>
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
