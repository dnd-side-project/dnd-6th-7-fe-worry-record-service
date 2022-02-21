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
  const [user, setUser] = useState<any>(true);

  useImperativeHandle(tokenRef, () => (user ? user.token : undefined));

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

  const signUp = useCallback(
    async (username, password, name, email, url) =>
      authService
        .signup(username, password, name, email, url)
        .then((user: any) => setUser(user)),
    [authService],
  );

  const logIn = useCallback(
    async (username, password) =>
      authService.login(username, password).then((user: any) => setUser(user)),
    [authService],
  );

  const logout = useCallback(
    async () => authService.logout().then(() => setUser(undefined)),
    [authService],
  );

  const context = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      logout,
    }),
    [user, signUp, logIn, logout],
  );

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
