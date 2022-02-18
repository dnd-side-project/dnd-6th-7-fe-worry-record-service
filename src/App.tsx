import React, { FC, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AfterLogin } from '@page/Navigation';
import AuthService from '@service/auth';
import { AuthProvider, AuthErrorEventBus } from '@context/AuthContext';
import HttpClient from '@lib/api/http';
import { theme } from '@lib/styles/palette';

import { ThemeProvider } from 'styled-components';
import { APP_BASE_URL } from '@env';

const baseURL = APP_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL);
const authService = new AuthService(httpClient);

const App: FC = props => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider
          props={props}
          authService={authService}
          authErrorEventBus={authErrorEventBus}
        >
          <AfterLogin />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
