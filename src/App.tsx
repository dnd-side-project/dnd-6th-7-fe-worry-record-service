import React, { FC, Suspense, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AfterLogin } from '@page/Navigation';
import AuthService from '~/service/auth';
import ErrorBoundary from 'react-native-error-boundary';

import { AuthProvider, AuthErrorEventBus } from '@context/AuthContext';
import { ArchiveProvider } from '@context/ArchiveContext';
import HttpClient from '@lib/api/http';
import { theme } from '@lib/styles/palette';

import useAppState from '@hooks/useAppState';
import { ThemeProvider } from 'styled-components';
import { HTTPS_B_URL } from '@env';

import { LogBox } from 'react-native';
import Indicator from '@components/Indicator';
import Error from '@components/Error';
import Storage from '@lib/storage';
import FCM from '@lib/api/fcm';

export const USER_ID = '1';
export const TEMP_DEVICE_TOKEN = '123456789';

const storage = new Storage();

const authErrorEventBus = new AuthErrorEventBus();
export const httpClient = new HttpClient(HTTPS_B_URL, storage);
export const authService = new AuthService(httpClient);

const queryClient = new QueryClient();
const fcm = new FCM(storage);

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App: FC = props => {
  const { appState } = useAppState();

  useEffect(() => {
    console.log('appState', appState);
  }, [appState]);

  const foregroundListener = useCallback(() => {
    const result = fcm.getMessage();
    console.log('foregroundListener', result);
  }, []);

  const handlePushToken = useCallback(async () => {
    fcm.requestUserPermission();
    const fcmToken = await fcm.getToken();
    const isLogedIn = storage.get('jwt_refreshToken');
    if (isLogedIn) {
      // deviceToken과 userId를 서버에 전송
      // await authService.updatePushToken(fcmToken);
    }
    console.log('fcmToken', fcmToken);
  }, []);

  useEffect(() => {
    foregroundListener();
    handlePushToken();
  }, [foregroundListener, handlePushToken]);

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
