import React, { FC, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AfterLogin } from '@page/Navigation';
import AuthService from '@service/auth';
import WorriesService from '@service/worries';
import { AuthProvider, AuthErrorEventBus } from '@context/AuthContext';
import { ArchiveProvider } from '@context/ArchiveContext';
import HttpClient from '@lib/api/http';
import { theme } from '@lib/styles/palette';

import { ThemeProvider } from 'styled-components';
import { APP_BASE_URL } from '@env';

// 시연용 워닝 로그 무시 코드
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

const baseURL = APP_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL);
const authService = new AuthService(httpClient);
const worriesService = new WorriesService(httpClient);
const queryClient = new QueryClient();

const App: FC = props => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <AuthProvider
            props={props}
            authService={authService}
            authErrorEventBus={authErrorEventBus}
          >
            <ArchiveProvider worriesService={worriesService}>
              <AfterLogin />
            </ArchiveProvider>
          </AuthProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
