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

const authErrorEventBus = new AuthErrorEventBus();
export const storage = new Storage();
export const httpClient = new HttpClient(HTTPS_B_URL, storage);
export const authService = new AuthService(httpClient);
export const fcm = new FCM(storage);

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App: FC = props => {
  const tag = 'App';
  const { appState } = useAppState();

  useEffect(() => {
    console.log('appState', appState);
  }, [appState]);

  // forground 상태(앱이 Active 되어 있는 상태에서 알림이 오는 경우)
  const foregroundListener = useCallback(() => {
    fcm.getMessage();
  }, []);

  const checkIsLogedIn = useCallback(async () => {
    console.log(tag, 'checkIsLogedIn');
    const userId = await storage.get('user_id');
    // 권한 체크
    // 토큰 가져오기
    // 토큰 저장
    // deviceToken과 userId를 서버에 전송
    await fcm.checkPermission();
    const deviceToken = await fcm.getToken();
    storage.set('fcm_token', String(deviceToken));

    if (userId) {
      // 이미 로그인이 되어 있는 상황
      const result = await authService.updateFCMToken({ userId, deviceToken });
      console.log(result, '이미 로그인이 되어 있는 상황');
    }
  }, []);

  useEffect(() => {
    checkIsLogedIn();
    foregroundListener();
  }, [checkIsLogedIn, foregroundListener]);

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
