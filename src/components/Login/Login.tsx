import React, { FC, useCallback } from 'react';
import styled from 'styled-components/native';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
} from '@react-native-seoul/kakao-login';
import messaging from '@react-native-firebase/messaging';
import CustomeButton from '@components/Button';
import { h5_fontSize } from '@lib/styles/_variable';
import {
  Header1_bold,
  Header1_normal,
  Header5_normal,
} from '@lib/styles/_mixin';
import { theme } from '@lib/styles/palette';

import IconKakao from '@assets/image/kakaotalk.svg';
import IconApple from '@assets/image/apple.svg';

import { useAuth } from '@context/AuthContext';
import { storage } from '~/App';
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
} from '@lib/util/helper';

interface LoginProps {
  data?: string;
  navigation: any;
}

const Login: FC<LoginProps> = props => {
  const { logIn: authLogin } = useAuth();

  const signInWithKakao = async (): Promise<void> => {
    try {
      const result: KakaoOAuthToken = await login();
      const fcmToken = await storage.get('fcm_token');
      authLogin(result, fcmToken);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginWrapper>
      <TitleWrapper>
        <Title>걱정,</Title>
        <NormalTitle>
          이젠 <Title>흐릿</Title> 해요
        </NormalTitle>
        <SutTitleWrapper>
          <SubTitle style={{ marginBottom: 4 }}>걱정은 흐릿에 맡기고</SubTitle>
          <SubTitle>맘 편한 일상을 되찾아봐요</SubTitle>
        </SutTitleWrapper>
      </TitleWrapper>
      <ButtonWrapper>
        <CustomeButton
          title="카카오로 계속하기"
          onPress={() => signInWithKakao()}
          backgroundColor={{
            color: 'yellow',
          }}
          color={{
            color: 'black',
          }}
          isFlex
          icon={
            <IconKakao
              style={{ marginLeft: 12, marginBottom: 3, marginTop: 3 }}
            />
          }
          isBold
          isBorderRadius
          fontSize={h5_fontSize}
        />
        <Space />
        <CustomeButton
          title="Apple로 계속하기"
          onPress={() => props.navigation.navigate('Signup')}
          backgroundColor={{
            color: 'white',
          }}
          icon={
            <IconApple
              style={{ marginLeft: 12, marginBottom: 3, marginTop: 3 }}
            />
          }
          isBold
          isFlex
          color={{
            color: 'black',
          }}
          isBorderRadius
          fontSize={h5_fontSize}
        />
      </ButtonWrapper>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.View`
  width: 100%;
  flex: 1;
`;

const TitleWrapper = styled.View`
  margin: ${hp(0.7)}px 0;
`;

const NormalTitle = styled.Text`
  font-size: ${hp(3.5)}px;
  font-weight: 200;
  font-style: normal;
  color: ${theme.color.white};
`;

const Title = styled.Text`
  font-size: ${hp(3.5)}px;
  font-weight: 800;
  font-style: normal;
  color: ${theme.color.white};
`;

const SutTitleWrapper = styled.View`
  margin: ${hp(0.8)}px 0;
`;

const SubTitle = styled.Text`
  font-size: ${hp(1.7)}px;
  font-weight: 300;
  font-style: normal;
  color: ${theme.color.white};
`;

const Space = styled.View`
  height: ${hp(1)}px;
`;

const ButtonWrapper = styled.View`
  flex: 1;
`;
