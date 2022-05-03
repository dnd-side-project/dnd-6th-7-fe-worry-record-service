import React, { FC, useCallback } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Switch } from 'react-native-elements';
import { Text } from 'react-native-elements';

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
import { CHANGE_MODE_ADD } from '~/context/reducer/archive';
import { useSceneDispatch } from '~/context/ArchiveContext';

const AddWorryPage: FC<AddWorryProps> = ({ navigation }) => {
  const dispatch = useSceneDispatch();

  const onPressBack = useCallback(() => {
    dispatch({ type: CHANGE_MODE_ADD, values: { isAdding: false } });
    navigation.goBack();
  }, [dispatch, navigation]);

  return (
    <AppLayout
      noBackGroundImage={false}
      name="home"
      headerLeft={<ArrowLeft />}
      headerLeftSidePress={onPressBack}
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
