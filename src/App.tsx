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
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

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

// TODO: 뒤로가기 버튼 클릭시 데이터 갱신 안되는 문제 해결 (잠금 해제, 리뷰 수정) - 완료
// TODO: 스플래시 화면 구성 제대로 하기 - 완료
// TODO: 리프레시 토큰 재발급 할 API 확보 및 코드 수정
// TODO: 폰트 적용하기
// TODO: 알림 기능 만들기

PushNotification.configure({
  // (optional) 토큰이 생성될 때 실행됨(토큰을 서버에 등록할 때 쓸 수 있음)
  onRegister: function (token: any) {
    console.log('TOKEN:', token);
  },

  // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
  onNotification: function (notification: any) {
    console.log('NOTIFICATION:', notification);
    if (notification.channelId === 'worried') {
      // if (notification.message || notification.data.message) {
      //   store.dispatch(
      //     userSlice.actions.showPushPopup(
      //       notification.message || notification.data.message,
      //     ),
      //   );
      // }
    }
    // process the notification

    // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) 등록한 액션을 누렀고 invokeApp이 false 상태일 때 실행됨, true면 onNotification이 실행됨 (Android)
  onAction: function (notification: any) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err: Error) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'worried', // (required)
    channelName: '앱 전반', // (required)
    channelDescription: '앱 실행하는 알림', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) =>
    console.log(`createChannel riders returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

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
    // fcm.getMessage();
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
