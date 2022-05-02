import React from 'react';
import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { BeforeLogin } from '@page/Navigation';
import { useLogin } from '@hooks/useLogin';
import { fcm, storage } from '~/App';

const AuthContext = createContext({});

const tokenRef = createRef();

interface Props {
  props: any;
  authService: any;
  authErrorEventBus: any;
  children: any;
}

export function AuthProvider({
  props,
  authService,
  authErrorEventBus,
  children,
}: Props): any {
  const tag = 'AuthProvider';
  const [user, setUser] = useState<any>(false);
  const [userInfo, setUserInfo] = useState<any>({
    userId: '',
    userName: '',
    userEmail: '',
    userImage: '',
  });

  // useImperativeHandle(tokenRef, () => (user ? user.token : undefined));

  //TODO: 추후 작업필요 (Auth Error 발생시 반응하는 API)
  // useEffect(() => {
  // 	authErrorEventBus.listen((err: any) => {
  // 		console.log(err);
  // 		setUser(undefined);
  // 	});
  // }, [authErrorEventBus]);

  //TODO: 추후 작업필요 (토큰 확인하는 API)
  // useEffect(() => {
  // 	authService.me().then(setUser).catch(console.error);
  // }, [authService]);

  const checkIsLogedIn = useCallback(async () => {
    console.log(tag, 'checkIsLogedIn');
    const userId = await storage.get('user_id');
    const userEmail = await storage.get('user_email');
    const userName = await storage.get('user_name');
    const userImage = await storage.get('user_image_url');

    setUserInfo({
      userId,
      userName,
      userEmail,
      userImage,
    });
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
      setUser(true);
      console.log(result, '이미 로그인이 되어 있는 상황');
    }
  }, [authService]);

  const mutation = useLogin(data => {
    console.log(data);
    setUser(true);
  });

  const logIn = useCallback(
    async (result: any, deviceToken: string) => {
      mutation.mutate({ result, deviceToken });
    },
    [mutation],
  );

  const logout = useCallback(
    async () => authService.logout().then(() => setUser(undefined)),
    [authService],
  );

  const context = useMemo(
    () => ({
      user,
      userInfo,
      logIn,
      logout,
    }),
    [user, userInfo, logIn, logout],
  );

  useEffect(() => {
    checkIsLogedIn();
  }, [checkIsLogedIn]);

  return (
    <AuthContext.Provider value={context}>
      {user ? children : <BeforeLogin />}
    </AuthContext.Provider>
  );
}

export class AuthErrorEventBus {
  callback: any;

  listen(callback: any) {
    this.callback = callback;
  }

  notify(error: any) {
    this.callback(error);
  }
}

export default AuthContext;
export const fetchToken = (): any => tokenRef.current;
export const useAuth = (): any => useContext(AuthContext);
