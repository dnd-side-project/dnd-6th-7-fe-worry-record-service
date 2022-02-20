/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, {
  useReducer,
  createContext,
  useContext,
  Dispatch,
  useEffect,
} from 'react';
import { WorriesServiceClass } from '~/service/worries';

import ArchiveReducer, {
  Action,
  INIT,
  initialValue,
  State,
} from './reducer/archive';

type SampleDispatch = Dispatch<Action>;
interface Props {
  worriesService: WorriesServiceClass;
  children: any;
}

const ArchiveStateContext = createContext<State | null>(null);
const ArchiveDispatchContext = createContext<SampleDispatch | null>(null);
const ArchiveDispatchApi = createContext<WorriesServiceClass | null>(null);

const tag = '[ArchiveContext]';

export function ArchiveProvider({ children, worriesService }: Props) {
  const [state, dispatch] = useReducer(ArchiveReducer, initialValue);

  useEffect(() => {
    console.log(tag, 'init');
    dispatch({ type: INIT });
  }, []);

  return (
    <ArchiveDispatchApi.Provider value={worriesService}>
      <ArchiveStateContext.Provider value={state}>
        <ArchiveDispatchContext.Provider value={dispatch}>
          {children}
        </ArchiveDispatchContext.Provider>
      </ArchiveStateContext.Provider>
    </ArchiveDispatchApi.Provider>
  );
}

export const useSceneDispatch = () => {
  const context = useContext(ArchiveDispatchContext);
  if (!context) {
    throw new Error('Cannot find ArchiveProvider');
  }
  return context;
};

export const useSceneState = () => {
  const context = useContext(ArchiveStateContext);
  if (!context) {
    throw new Error('Cannot find ArchiveProvider');
  }
  return context;
};

export const useWorriesApi = () => {
  const context = useContext(ArchiveDispatchApi);
  if (!context) {
    throw new Error('Cannot find ArchiveDispatchApi');
  }
  return context;
};
