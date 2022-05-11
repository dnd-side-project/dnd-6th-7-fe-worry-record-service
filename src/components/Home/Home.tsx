import React, { FC, memo, useEffect, useState } from 'react';
import axios from 'axios';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

import {
  responsiveFontSizeByValue as fontSizeByValue,
  getHeightDevice as heightDevice,
  responsiveWidth as wp,
} from '@lib/util/helper';
import { storage } from '~/App';

import { theme } from '@lib/styles/palette';

import IconRightArrow from '@assets/image/arrow_right.svg';
import { useHome } from '~/hooks/useHome';
import { useAuth } from '@context/AuthContext';

interface TextContainerProps {
  username: string;
  meanlessWorryPer: number;
  recentWorryCnt: number;
}

const Home: FC<HomeProps> = ({ setBackgroundImageUrl }) => {
  const { userInfo } = useAuth();

  // const [worryInfo, setWorryInfo] = useState({
  //   meanlessWorryPer: 0,
  //   recentWorryCnt: 0,
  //   imgUrl: '',
  // });

  const { data: worryInfo } = useHome(res => {
    console.log(userInfo, '카카오 계정 인포');
    console.log(res, 'result');

    // setWorryInfo({ ...res });
  });

  return (
    <>
      {worryInfo.recentWorryCnt === 0 ? (
        <TextContainer1
          meanlessWorryPer={worryInfo.meanlessWorryPer}
          recentWorryCnt={worryInfo.recentWorryCnt}
          username={userInfo.userName}
        />
      ) : worryInfo.recentWorryCnt <= 3 ? (
        <TextContainer2
          meanlessWorryPer={worryInfo.meanlessWorryPer}
          recentWorryCnt={worryInfo.recentWorryCnt}
          username={userInfo.userName}
        />
      ) : worryInfo.meanlessWorryPer <= 50 ? (
        <TextContainer3
          meanlessWorryPer={worryInfo.meanlessWorryPer}
          recentWorryCnt={worryInfo.recentWorryCnt}
          username={userInfo.userName}
        />
      ) : (
        <TextContainer4
          meanlessWorryPer={worryInfo.meanlessWorryPer}
          recentWorryCnt={worryInfo.recentWorryCnt}
          username={userInfo.userName}
        />
      )}
    </>
  );
};

const TextContainer1: FC<TextContainerProps> = ({
  username,
  meanlessWorryPer,
  recentWorryCnt,
}) => {
  return (
    <>
      <View>
        <View style={style.textContainer}>
          <MainText>{username}님,</MainText>
          <MainText>요즘은 걱정없이</MainText>
          <MainText>편안하네요</MainText>
        </View>
      </View>
      <View style={style.textDetailContainer}>
        <SubText>요즘 걱정 </SubText>
        <SubBoldText> {recentWorryCnt}건</SubBoldText>
        <View>
          <IconRightArrow />
        </View>
      </View>
    </>
  );
};

const TextContainer2: FC<TextContainerProps> = ({
  username,
  meanlessWorryPer,
  recentWorryCnt,
}) => {
  return (
    <>
      <View>
        <View style={style.textContainer}>
          <MainText>{username}님,</MainText>
          <MainText>걱정이 있다면</MainText>
          <MainText>흐릿에 털어두세요</MainText>
        </View>
      </View>
      <View style={style.textDetailContainer}>
        <SubText>요즘 걱정 </SubText>
        <SubBoldText> {recentWorryCnt}건</SubBoldText>
        <View>
          <IconRightArrow />
        </View>
      </View>
    </>
  );
};

const TextContainer3: FC<TextContainerProps> = ({
  username,
  meanlessWorryPer,
  recentWorryCnt,
}) => {
  return (
    <>
      <View>
        <View style={style.textContainer}>
          <MainText2>{`미래도 언젠가는
현재가 되고
지금의 현재처럼
그렇게 대수롭지 않게
여겨질 거에요`}</MainText2>
        </View>
      </View>
      <View style={style.textDetailContainer}>
        <SubText>요즘 걱정 </SubText>
        <SubBoldText> {recentWorryCnt}건</SubBoldText>
        <View>
          <IconRightArrow />
        </View>
      </View>
    </>
  );
};

const TextContainer4: FC<TextContainerProps> = ({
  username,
  meanlessWorryPer,
  recentWorryCnt,
}) => {
  return (
    <>
      <View>
        <View style={style.textContainer}>
          <MainText>{username}님,</MainText>
        </View>
        <View style={style.textRowContainer}>
          <MainText>최근 </MainText>
          <BoldMainText>두 달 걱정 중</BoldMainText>
        </View>
        <View style={style.textRowContainer}>
          <BoldMainText>{meanlessWorryPer}%</BoldMainText>
          <MainText>는 안해도 괜찮아요.</MainText>
        </View>
      </View>
      <View style={style.textDetailContainer}>
        <SubText>요즘 걱정 </SubText>
        <SubBoldText> {recentWorryCnt}건</SubBoldText>
        <View>
          <IconRightArrow />
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  imgContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginTop: 45,
  },
  textRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textDetailContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;

const MainText = styled.Text`
  font-size: 26px;
  line-height: 34px;
  text-align: center;
  color: ${theme.color.white};
  font-weight: 200;
  margin: 0;
  padding: 0;
`;

const MainText2 = styled.Text`
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: ${theme.color.white};
  font-weight: 200;
  margin: 0;
  padding: 0;
`;

const BoldMainText = styled.Text`
  font-size: ${fontSizeByValue(26, heightDevice())}px;
  line-height: ${fontSizeByValue(34, heightDevice())}px;
  text-align: center;
  color: ${theme.color.white};
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const SubText = styled.Text`
  font-size: ${fontSizeByValue(18, heightDevice())}px;
  line-height: ${fontSizeByValue(18, heightDevice())}px;
  text-align: center;
  color: ${theme.color.white};
  font-weight: 200;
  margin: 0;
  padding: 0;
`;
const SubBoldText = styled.Text`
  font-size: ${fontSizeByValue(18, heightDevice())}px;
  line-height: ${fontSizeByValue(18, heightDevice())}px;
  text-align: center;
  color: ${theme.color.white};
  font-weight: 700;
  margin: 0;
  padding: 0;
`;
