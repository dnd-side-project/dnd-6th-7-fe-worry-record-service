import React, { FC } from 'react';

import AppLayout from '@components/AppLayout';
import AddWorrySetting from '@components/AddWorrySetting';
import { AddWorrySettingProps } from '~/types/Navigation';
import styled from 'styled-components/native';

import {
  responsiveFontSizeByValue as fontSizeByValue,
  getHeightDevice as heightDevice,
  responsiveWidth as wp,
} from '@lib/util/helper';
import { theme } from '@lib/styles/palette';
import ArrowLeft from '@assets/image/arrow_left.svg';

const AddWorrySettingPage: FC<AddWorrySettingProps> = ({
  route,
  navigation,
}) => {
  const { worryText } = route?.params;
  console.log(route.params);
  return (
    <AppLayout
      noBackGroundImage={false}
      name="AddWorrySetting"
      headerLeft={<ArrowLeft />}
      headerLeftSidePress={() => navigation.goBack()}
      headerTitle={<Title>흐릿에 걱정 맡기기</Title>}
    >
      <AddWorrySetting navigation={navigation} worryText={worryText} />
    </AppLayout>
  );
};

const Title = styled.Text`
  font-size: ${fontSizeByValue(26, heightDevice())}px;
  line-height: ${fontSizeByValue(34, heightDevice())}px;
  color: ${theme.color.white};
  font-weight: bold;
`;

export default AddWorrySettingPage;
