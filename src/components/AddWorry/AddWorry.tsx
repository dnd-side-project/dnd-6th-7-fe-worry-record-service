import React, { FC } from 'react';
import styled from 'styled-components/native';
import { View, Image, Text } from 'react-native';

import CustomeButton from '@components/Button';

import { responsiveWidth as wp } from '@lib/util/helper';
import { theme } from '@lib/styles/palette';

interface AddWorryProps {
  navigation?: any;
}

const AddWorry: FC<AddWorryProps> = ({ navigation }) => {
  return (
    <WorriesWrapper>
      <Text>월월월월</Text>
      {/* <InfoText>TestModal</InfoText>
      <CustomeButton
        isBorder
        backgroundColor={{
          color: 'blue',
        }}
        title="Go Back"
        onPress={() => navigation.goBack()}
      /> */}
    </WorriesWrapper>
  );
};

export default AddWorry;

const WorriesWrapper = styled.View`
  border: 0px;
  background: #fff;
`;

const InfoText = styled.Text`
  color: ${theme.color.black}};
`;
