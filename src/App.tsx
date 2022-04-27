import React, { FC, useCallback, useEffect } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AfterLogin } from '@page/Navigation';
import AuthService from '~/service/auth';

import { AuthProvider, AuthErrorEventBus } from '@context/AuthContext';
import { ArchiveProvider } from '@context/ArchiveContext';
import HttpClient from '@lib/api/http';
import { theme } from '@lib/styles/palette';

import useAppState from '@hooks/useAppState';
import { ThemeProvider } from 'styled-components';
import { HTTPS_B_URL } from '@env';

import { LogBox } from 'react-native';
import Indicator from '@components/Indicator';
import AsyncBoundary from '@components/AsyncBoundary';
import Error from '@components/Error';
import Storage from '@lib/storage';
import FCM from '@lib/api/fcm';

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

// TODO: 뒤로가기 버튼 클릭시 데이터 갱신 안되는 문제 해결 (잠금 해제, 리뷰 수정) - 서버 확인 필요
// TODO: 스플래시 화면 구성 제대로 하기 - 디자인팀 문의 필요
// TODO: 리프레시 토큰 재발급 할 API 확보 및 코드 수정
// TODO: 폰트 적용하기
// TODO: 알림 기능 만들기

const App: FC = props => {
  const tag = 'App';
  const { appState } = useAppState();
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  useEffect(() => {
    console.log('appState', appState);
  }, [appState]);

  // forground 상태(앱이 Active 되어 있는 상태에서 알림이 오는 경우)
  const foregroundListener = useCallback(() => {
    fcm.getMessage();
  }, []);

  useEffect(() => {
    foregroundListener();
  }, [foregroundListener]);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <AsyncBoundary pendingFallback={<Indicator />} rejectedFallback={Error}>
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
        </AsyncBoundary>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
