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
import IconSetting from '@assets/image/settings.svg';

const AddWorryPage: FC<HomeProps> = ({ navigation }) => {
  return (
    <AppLayout headerLeft={<Title>흐릿에 걱정 맡기기</Title>}>
      {/* // <AppLayout> */}
      <AddWorry />

      {/* <CustomeButton
				title="Go to Detail"
				onPress={() => navigation.navigate('Detail')}
				backgroundColor={{
					color: 'indigo',
					weight: '400',
				}}
			/> */}
    </AppLayout>
  );
};

const Title = styled.Text`
  font-size: ${fontSizeByValue(26, heightDevice())}px;
  line-height: ${fontSizeByValue(34, heightDevice())}px;
  width: ${wp('50%')}px;
  color: ${theme.color.white};
  font-weight: bold;
`;

export default AddWorryPage;
