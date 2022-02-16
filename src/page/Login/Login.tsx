import React, { FC } from 'react';
import styled from 'styled-components/native';
import { LoginProps } from '~/types/Navigation';
import AppLayout from '@components/AppLayout';
import LoginCP from '@components/Login';

import IconLogin from '@assets/image/icon_login.svg';

const Login: FC<LoginProps> = ({ navigation }) => {
  return (
    <AppLayout noHeader name="login">
      <IconWrapper>
        <IconLogin height={'100%'} />
      </IconWrapper>

      <LoginCP navigation={navigation} />
    </AppLayout>
  );
};

export default Login;

const IconWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 1.8;
`;
