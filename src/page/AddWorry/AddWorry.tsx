import React, { FC } from 'react';
import { View } from 'react-native';
import { Switch } from 'react-native-elements';
import { Text } from 'react-native-elements';

import AppLayout from '@components/AppLayout';
import AddWorry from '@components/AddWorry';
import { HomeProps } from '~/types/Navigation';
import styled from 'styled-components/native';

import {
  responsiveFontSizeByValue as fontSizeByValue,
  getHeightDevice as heightDevice,
  responsiveWidth as wp,
} from '@lib/util/helper';
import { theme } from '@lib/styles/palette';
import ArrowLeft from '@assets/image/arrow_left.svg';

const AddWorryPage: FC<HomeProps> = ({ navigation }) => {
  // <Title>흐릿에 걱정 맡기기</Title>
  return (
    <AppLayout
      name="home"
      headerLeft={<ArrowLeft />}
      headerLeftSidePress={() => navigation.goBack()}
      headerTitle={<Title>흐릿에 걱정 맡기기</Title>}
    >
      <AddWorry />
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
