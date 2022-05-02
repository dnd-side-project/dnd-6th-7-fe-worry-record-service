import React, { FC } from 'react';

import AppLayout from '@components/AppLayout';
import AddWorry from '@components/AddWorry';
import { AddWorryProps } from '~/types/Navigation';
import styled from 'styled-components/native';

import {
  responsiveFontSizeByValue as fontSizeByValue,
  getHeightDevice as heightDevice,
  responsiveWidth as wp,
} from '@lib/util/helper';
import { theme } from '@lib/styles/palette';
import ArrowLeft from '@assets/image/arrow_left.svg';

const AddWorryPage: FC<AddWorryProps> = ({ navigation }) => {
  // <Title>흐릿에 걱정 맡기기</Title>
  return (
    <AppLayout
      noBackGroundImage={false}
      name="AddWorry"
      headerLeft={<ArrowLeft />}
      headerLeftSidePress={() => navigation.goBack()}
      headerTitle={<Title>흐릿에 걱정 맡기기</Title>}
    >
      <AddWorry navigation={navigation} />
    </AppLayout>
  );
};

const Title = styled.Text`
  font-size: ${fontSizeByValue(26, heightDevice())}px;
  line-height: ${fontSizeByValue(34, heightDevice())}px;
  color: ${theme.color.white};
  font-weight: bold;
`;

export default AddWorryPage;
