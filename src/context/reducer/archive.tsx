/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-case-declarations */
import { WORRIES_DATA } from '~/constants/WorriesData';
import { WorryProps } from '@components/Worries/Worries';
import _ from 'lodash';

const tag = '[ArchiveReducer]';

export type State = {
  index: number;
  isUpdating: boolean;
  tags: WorryProps[];
  activeTags: string;
  worries: WorryProps[];
  isDone: boolean;
};

export type Action =
  | { type: 'INIT'; values?: { idx: number } }
  | { type: 'CHANGE_MODE'; values: { isUpdating: boolean } }
  | { type: 'CLICK_CHECKBOX'; values: { id: string | number[] } }
  | { type: 'FILTER_TAG'; values: { tag: string } };

export const INIT = 'INIT';
export const CHANGE_MODE = 'CHANGE_MODE';
export const CLICK_CHECKBOX = 'CLICK_CHECKBOX';
export const FILTER_TAG = 'FILTER_TAG';

export const initialValue: State = {
  index: 0,
  isUpdating: false,
  tags: [],
  activeTags: '모든걱정',
  worries: WORRIES_DATA,
  isDone: false,
};

const filterdTagDatas = (idx: number, worries: WorryProps[]) =>
  idx === 0
    ? worries.filter(worry => !worry.isDone)
    : worries.filter(worry => worry.isDone);

export default function ArchiveReducer(state: State, action: Action) {
  switch (action.type) {
    case INIT:
      console.log(tag, INIT);

      const idx = action.values?.idx || 0;
      const initWorres = filterdTagDatas(idx, WORRIES_DATA);

      return {
        ...state,
        index: idx,
        worries: initWorres,
        tags: _.uniqBy(initWorres, 'content'),
        activeTags: '모든걱정',
      };

    case CHANGE_MODE:
      console.log(tag, CHANGE_MODE);

      return {
        ...state,
        isUpdating: action.values.isUpdating,
      };

    case CLICK_CHECKBOX:
      console.log(tag, CLICK_CHECKBOX);
      const index = state.worries.findIndex(
        worry => worry.id === action.values.id,
      );
      state.worries[index].isChecked = !state.worries[index].isChecked;
      return {
        ...state,
      };

    case FILTER_TAG:
      console.log(tag, FILTER_TAG);
      const filterdWorries =
        action.values.tag === '모든걱정'
          ? filterdTagDatas(state.index, WORRIES_DATA)
          : filterdTagDatas(state.index, WORRIES_DATA).filter(
              worry => worry.content === action.values.tag,
            );

      return {
        ...state,
        worries: filterdWorries,
        activeTags: action.values.tag,
      };
  }
}
