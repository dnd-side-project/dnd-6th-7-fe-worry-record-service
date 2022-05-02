import { useState, useEffect } from 'react';
import { AppState } from 'react-native';

type AppStateProps = {
  appState: string;
};

const useAppState = (): AppStateProps => {
  const [appState, setAppState] = useState<string>(AppState.currentState);

  // 어플리케이션 상태 체크
  const handleAppStateChange = (state: string) => {
    setAppState(state);
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.addEventListener('change', handleAppStateChange).remove();
    };
  }, []);

  return { appState };
};

export default useAppState;
