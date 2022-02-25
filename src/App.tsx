import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AfterLogin } from '@page/Navigation';
import AuthService from '~/service/auth';
import WorriesService from '~/service/archive';

import { AuthProvider, AuthErrorEventBus } from '@context/AuthContext';
import { ArchiveProvider } from '@context/ArchiveContext';
import HttpClient from '@lib/api/http';
import { theme } from '@lib/styles/palette';

import { ThemeProvider } from 'styled-components';
import { BASE_URL, JWT_TOKEN } from '@env';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export const USER_ID = '56';

const baseURL = BASE_URL;
const jwtToken = JWT_TOKEN;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL, jwtToken);

export const authService = new AuthService(httpClient);
export const worriesService = new WorriesService(httpClient);

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
            <ArchiveProvider>
              <AfterLogin />
            </ArchiveProvider>
          </AuthProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
