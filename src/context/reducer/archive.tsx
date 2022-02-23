/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-case-declarations */
import { WORRIES_DATA } from '~/constants/WorriesData';
import { WorryProps } from '@components/Worries/Worries';
import _ from 'lodash';

const tag = '[ArchiveReducer]';

export type State = {
  index: number;
  isUpdating: boolean;
  isReviewing: boolean;
  tags: WorryProps[];
  activeTags: string;
  worries: WorryProps[];
  isDone: boolean;
};

export type Action =
  | { type: 'INIT'; values?: { idx: number } }
  | { type: 'CHANGE_MODE'; values: { isUpdating: boolean } }
  | { type: 'CHANGE_MODE_REVIEW'; values: { isReviewing: boolean } }
  | { type: 'CLICK_CHECKBOX'; values: { id: string | number[] } }
  | { type: 'FILTER_TAG'; values: { tag: string } }
  | { type: 'DELETE_WORRY' };

export const INIT = 'INIT';
export const CHANGE_MODE = 'CHANGE_MODE';
export const CHANGE_MODE_REVIEW = 'CHANGE_MODE_REVIEW';
export const CLICK_CHECKBOX = 'CLICK_CHECKBOX';
export const FILTER_TAG = 'FILTER_TAG';

export const DELETE_WORRY = 'DELETE_WORRY';

export const initialValue: State = {
  index: 0,
  isReviewing: false,
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
        isUpdating: false,
        isReviewing: false,
      };

    case CHANGE_MODE:
      console.log(tag, CHANGE_MODE);

      return {
        ...state,
        worries: state.worries.map(worry => ({ ...worry, isChecked: false })),
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

    case DELETE_WORRY:
      console.log(tag, DELETE_WORRY);
      const deleteWorry = state.worries.filter(worry => !worry.isChecked);
      return {
        ...state,
        worries: deleteWorry,
      };

    case CHANGE_MODE_REVIEW:
      console.log(tag, CHANGE_MODE_REVIEW);

      return {
        ...state,
        isReviewing: action.values.isReviewing,
      };
  }
}
