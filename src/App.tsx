import React, { FC, Suspense, lazy } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AfterLogin } from '@page/Navigation';
import AuthService from '~/service/auth';
import WorriesService from '~/service/archive';
import ErrorBoundary from 'react-native-error-boundary';

import { AuthProvider, AuthErrorEventBus } from '@context/AuthContext';
import { ArchiveProvider } from '@context/ArchiveContext';
import HttpClient from '@lib/api/http';
import { theme } from '@lib/styles/palette';

import { ThemeProvider } from 'styled-components';
import { BASE_URL, JWT_TOKEN } from '@env';

import { LogBox } from 'react-native';
import Indicator from './components/Indicator';
import Error from './components/Error';
import { Text } from 'react-native-elements';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export const USER_ID = '56';

const baseURL = BASE_URL;
const jwtToken = JWT_TOKEN;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL, jwtToken);

export const authService = new AuthService(httpClient);
export const worriesService = new WorriesService(httpClient);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const App: FC = props => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider
          props={props}
          authService={authService}
          authErrorEventBus={authErrorEventBus}
        >
          <ArchiveProvider>
            <QueryClientProvider client={queryClient}>
              <Suspense fallback={<Indicator />}>
                <ErrorBoundary FallbackComponent={Error}>
                  <AfterLogin />
                </ErrorBoundary>
              </Suspense>
            </QueryClientProvider>
          </ArchiveProvider>
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
