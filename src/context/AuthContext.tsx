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
import SplashScreen from 'react-native-splash-screen';
import CustomError from '~/lib/util/CustomError';

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
  const handleUserInfo = useCallback(async () => {
    const userId = await storage.get('user_id');
    const userEmail = await storage.get('user_email');
    const userName = await storage.get('user_name');
    const userImage = await storage.get('user_image_url');
    const isLogined = await storage.get('jwt_refreshToken');
    console.log(isLogined, 'userId');

    setUserInfo({
      userId,
      userName,
      userEmail,
      userImage,
    });

    return { isLogined, userId, userName, userEmail, userImage };
  }, []);
  const checkIsLogedIn = useCallback(async () => {
    console.log(tag, 'checkIsLogedIn');

    const { isLogined, userId } = await handleUserInfo();
    // 권한 체크
    // 토큰 가져오기
    // 토큰 저장
    // deviceToken과 userId를 서버에 전송
    await fcm.checkPermission();
    const deviceToken = await fcm.getToken();
    console.log(deviceToken, 'deviceToken');
    await storage.set('fcm_token', String(deviceToken));

    if (!isLogined) {
      SplashScreen.hide();
      return;
    }
    // 이미 로그인이 되어 있는 상황
    console.log('이미 로그인이 되어 있는 상황');
    try {
      await authService.updateFCMToken({ userId, deviceToken });
      setUser(true);
    } catch (error) {
      throw new CustomError('LOGIN에서 에러 발생');
    } finally {
      SplashScreen.hide();
    }
  }, [authService, handleUserInfo]);

  const mutation = useLogin(async data => {
    console.log(data, 'data');
    await handleUserInfo();
    setUser(true);
  });

  const logIn = useCallback(
    async (result: any, deviceToken: string) => {
      mutation.mutate({ result, deviceToken });
    },
    [mutation],
  );

  const logout = useCallback(async () => {
    await storage.delete('user_id');
    await storage.delete('user_email');
    await storage.delete('user_name');
    await storage.delete('user_image_url');
    await storage.delete('jwt_refreshToken');
    await storage.delete('jwt_accessToken');
    await storage.delete('fcm_token');
    setUser(false);
  }, [setUser]);

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
