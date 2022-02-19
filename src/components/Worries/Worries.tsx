/* eslint-disable no-mixed-spaces-and-tabs */
import React, { FC, memo, useState } from 'react';

import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import Worry from '@components/Worry';
import CustomeButton from '@components/Button';
import { theme } from '@lib/styles/palette';
import { Header6_bold } from '@lib/styles/_mixin';

import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';

import { CHANGE_MODE, FILTER_TAG } from '~/context/reducer/archive';
export interface WorryProps {
  id: string | number[];
  title: string;
  content: string;
  isOpen: boolean;
  isDone: boolean;
  isChecked: boolean;
}

const renderItem = ({ item, index }: { item: WorryProps; index: number }) => (
  <Worry item={item} index={index} />
);

const Worries: FC = () => {
  const tag = '[Worries]';

  const { isUpdating, worries, tags, activeTags } = useSceneState();
  const dispatch = useSceneDispatch();

  const onPressEdit = () => {
    console.log(tag, 'onPressEdit');
    dispatch({ type: CHANGE_MODE, values: { isUpdating: !isUpdating } });
  };

  const onPressTag = (content: string) => {
    console.log(tag, 'onPressTag');
    dispatch({ type: FILTER_TAG, values: { tag: content } });
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
          <ButtonName>{isUpdating ? '되돌리기' : '편집하기'}</ButtonName>
        </UpdateButton>
      </UpdateWrapper>

      <ListWrapper
        data={worries.filter(item => item.id !== '-1')}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => item.id.toString()}
      />
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
