/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-case-declarations */
import { TAG_RECENT_DATA, TAG_PAST_DATA } from '~/constants/WorriesData';
import { WorryTempProps } from '~/types/Worry';

const tag = '[ArchiveReducer]';

export type State = {
  index: number;
  isUpdating: boolean;
  isAdding: boolean;
  isReviewing: boolean;
  isRealized: boolean;
  tags: WorryTempProps[];
  activeTags: string;
  activeTagsId: string | number[];
  worries: WorryTempProps[];
  checkedWorries: number[];
  worryId: number;
  chatId: string;
  isDone: boolean;
  isUnlock: boolean;
  isDelete: boolean;
};

export type Action =
  | { type: 'INIT'; values?: { idx: number } }
  | { type: 'CHANGE_MODE'; values: { isUpdating: boolean } }
  | { type: 'CHANGE_MODE_REVIEW'; values: { isReviewing: boolean } }
  | { type: 'CHANGE_MODE_ADD'; values: { isAdding: boolean } }
  | { type: 'CHANGE_MODE_REALIZED'; values: { isRealized: boolean } }
  | { type: 'CLICK_CHECKBOX'; values: { id: number } }
  | { type: 'FILTER_TAG'; values: { tag: string; tagId: string | number[] } }
  | { type: 'SET_WORRY_ID'; values: { worryId: number } }
  | { type: 'SET_CHAT_ID'; values: { chatId: string } }
  | { type: 'UNLOCK_WORRY'; values: { isUnlock: boolean } }
  | { type: 'DELETE_WORRY_MODAL'; values: { isDelete: boolean } }
  | { type: 'DELETE_WORRY' };

export const INIT = 'INIT';
export const CHANGE_MODE = 'CHANGE_MODE';
export const CHANGE_MODE_REVIEW = 'CHANGE_MODE_REVIEW';
export const CHANGE_MODE_ADD = 'CHANGE_MODE_ADD';
export const CHANGE_MODE_REALIZED = 'CHANGE_MODE_REALIZED';
export const CLICK_CHECKBOX = 'CLICK_CHECKBOX';
export const FILTER_TAG = 'FILTER_TAG';
export const SET_WORRY_ID = 'SET_WORRY_ID';
export const SET_CHAT_ID = 'SET_CHAT_ID';
export const UNLOCK_WORRY = 'UNLOCK_WORRY';

export const DELETE_WORRY = 'DELETE_WORRY';
export const DELETE_WORRY_MODAL = 'DELETE_WORRY_MODAL';

export const initialValue: State = {
  index: 0,
  isReviewing: false,
  isRealized: false,
  isUpdating: false,
  isAdding: false,
  tags: TAG_RECENT_DATA,
  activeTags: '-1',
  activeTagsId: TAG_RECENT_DATA[0].id,
  worries: [],
  checkedWorries: [],
  isDone: false,
  isUnlock: false,
  worryId: -1,
  chatId: '1',
  isDelete: false,
};

export default function ArchiveReducer(state: State, action: Action) {
  switch (action.type) {
    case INIT:
      console.log(tag, INIT);
      const idx = action.values?.idx || 0;

      return {
        ...state,
        index: idx,
        tags: idx === 0 ? TAG_RECENT_DATA : TAG_PAST_DATA,
        activeTags: '-1',
        activeTagsId: idx === 0 ? TAG_RECENT_DATA[0].id : TAG_PAST_DATA[0].id,
        isUpdating: false,
        isReviewing: false,
        isAdding: false,
        isUnlock: false,
        isRealized: false,
        isDelete: false,
        worryId: -1,
        chatId: '1',
        checkedWorries: [],
      };

    case CHANGE_MODE:
      console.log(tag, CHANGE_MODE);

      return {
        ...state,
        checkedWorries: [],
        isUpdating: action.values.isUpdating,
      };

    case UNLOCK_WORRY:
      console.log(tag, UNLOCK_WORRY);
      return {
        ...state,
        chatId: '1',
        isUnlock: action.values.isUnlock,
      };

    case DELETE_WORRY_MODAL:
      console.log(tag, DELETE_WORRY_MODAL);
      return {
        ...state,
        isDelete: action.values.isDelete,
      };

    case CHANGE_MODE_REALIZED:
      console.log(tag, CHANGE_MODE_REALIZED);
      return {
        ...state,
        isRealized: action.values.isRealized,
      };

    case CLICK_CHECKBOX:
      console.log(tag, CLICK_CHECKBOX);

      if (state.checkedWorries.includes(action.values.id)) {
        const checkedWorries = state.checkedWorries.filter(
          num => num !== action.values.id,
        );
        return {
          ...state,
          checkedWorries,
        };
      }

      return {
        ...state,
        checkedWorries: [...state.checkedWorries, action.values.id],
      };

    case FILTER_TAG:
      console.log(tag, FILTER_TAG);

      return {
        ...state,
        activeTags: action.values.tag,
        activeTagsId: action.values.tagId,
        isUpdating: false,
      };

    case SET_WORRY_ID:
      console.log(tag, SET_WORRY_ID);

      return {
        ...state,
        worryId: action.values.worryId,
      };

    case SET_CHAT_ID:
      console.log(tag, SET_CHAT_ID);
      return {
        ...state,
        chatId: action.values.chatId,
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
    case CHANGE_MODE_ADD:
      console.log(tag, CHANGE_MODE_ADD);

      return {
        ...state,
        isReviewing: action.values.isAdding,
      };
  }
}
