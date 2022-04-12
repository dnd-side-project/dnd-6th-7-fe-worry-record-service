import React, { FC, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AfterLogin } from '@page/Navigation';
import AuthService from '~/service/auth';
import ErrorBoundary from 'react-native-error-boundary';

import { AuthProvider, AuthErrorEventBus } from '@context/AuthContext';
import { ArchiveProvider } from '@context/ArchiveContext';
import HttpClient from '@lib/api/http';
import { theme } from '@lib/styles/palette';

import { ThemeProvider } from 'styled-components';
import { HTTPS_B_URL } from '@env';

import { LogBox } from 'react-native';
import Indicator from '@components/Indicator';
import Error from '@components/Error';
import Storage from '@lib/storage';

export const USER_ID = '1';
export const TEMP_DEVICE_TOKEN = '123456789';

const storage = new Storage();

const authErrorEventBus = new AuthErrorEventBus();
export const httpClient = new HttpClient(HTTPS_B_URL, storage);
export const authService = new AuthService(httpClient);

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App: FC = props => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Suspense fallback={<Indicator />}>
          <ErrorBoundary FallbackComponent={Error}>
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
          </ErrorBoundary>
        </Suspense>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
