/* eslint-disable no-mixed-spaces-and-tabs */
import React, { FC, memo, useState } from 'react';

import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { responsiveWidth as wp } from '@lib/util/helper';
import Worry from '@components/Worry';
import CustomeButton from '@components/Button';
import _ from 'lodash';
import { theme } from '~/lib/styles/palette';
import { Header6_bold } from '~/lib/styles/_mixin';
import { getDate } from '~/lib/util/date';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
export interface WorryProps {
  id: number;
  title: string;
  content: string;
  isOpen: boolean;
}

interface WorriesProps {
  counts: number;
  worries: WorryProps[];
}

const renderItem = ({ item, index }: { item: WorryProps; index: number }) => (
  <Worry item={item} index={index} />
);

const Worries: FC<WorriesProps> = ({ counts, worries }) => {
  const [index, setIndex] = useState<number>(0);

  return (
    <WorriesWrapper>
      <FilterWrapper>
        {worries.length
          ? _.uniqBy(worries, 'content').map((item: WorryProps, idx) => (
              <ButtonWrapper>
                <CustomeButton
                  title={item.content}
                  isBorderRadius
                  onPress={() => setIndex(idx)}
                  backgroundColor={{
                    color: index === idx ? 'white' : 'lightWhite',
                  }}
                  color={{
                    color: index === idx ? 'originalBlack' : 'lightGray',
                  }}
                  fontSize={12}
                />
              </ButtonWrapper>
            ))
          : null}
      </FilterWrapper>
      <UpdateWrapper>
        <InfoText>
          총 <Count>{counts}개</Count> 걱정
        </InfoText>
        <UpdateButton>
          <ButtonName>편집하기</ButtonName>
        </UpdateButton>
      </UpdateWrapper>

      <ListWrapper
        data={worries}
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
