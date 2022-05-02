import React, { FC, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Image, Text, Switch, StyleSheet } from 'react-native';
import { Button, ButtonGroup, withTheme } from 'react-native-elements';

import { theme } from '@lib/styles/palette';
import { th } from 'date-fns/locale';

interface AddWorryCompleteProps {
  worryExpiryDate: Date;
  navigation: any;
}

const AddWorryComplete: FC<AddWorryCompleteProps> = ({
  worryExpiryDate,
  navigation,
}) => {
  const navigateToHome = () => {
    navigation.popToTop();
  };
  return (
    <View style={style.textContainer} onTouchStart={navigateToHome}>
      <View style={style.textRowContainer}>
        <RegularText>오늘 걱정도 </RegularText>
        <BoldText>흐릿</BoldText>
        <RegularText>해져요</RegularText>
      </View>
      <View style={style.textRowContainer}>
        <Text style={style.detailText}>
          {`흐릿이 걱정을 맡아둘게요.
오늘의 걱정은 ${
            worryExpiryDate.getMonth() + 1
          }월 ${worryExpiryDate.getDate()}일에 
다시 읽어볼 수 있어요.`}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  textContainer: {
    marginTop: 450,
  },
  textRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  detailText: {
    fontSize: 16,
    fontWeight: '200',
    lineHeight: 24,
    color: theme.color.white,
  },
});

const RegularText = styled.Text`
  font-weight: 200;
  font-size: 26px;
  line-height: 34px;
  color: ${theme.color.white};
`;

const BoldText = styled.Text`
  font-weight: 700;
  font-size: 26px;
  line-height: 34px;
  color: ${theme.color.white};
`;

export default AddWorryComplete;
