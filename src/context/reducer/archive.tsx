/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-case-declarations */
import { WORRIES_DATA } from '~/constants/WorriesData';
import { WorryProps } from '@components/Worries/Worries';

const tag = '[ArchiveReducer]';

export type State = {
  isUpdating: boolean;
  worries: WorryProps[];
};

export type Action =
  | { type: 'INIT' }
  | { type: 'CHANGE_MODE'; values: { isUpdating: boolean } }
  | { type: 'CLICK_CHECKBOX'; values: { id: string | number[] } };

export const INIT = 'INIT';
export const CHANGE_MODE = 'CHANGE_MODE';
export const CLICK_CHECKBOX = 'CLICK_CHECKBOX';

export const initialValue: State = {
  isUpdating: false,
  worries: WORRIES_DATA,
};

export default function ArchiveReducer(state: State, action: Action) {
  switch (action.type) {
    case INIT:
      console.log(tag, INIT);

      return {
        ...state,
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
  }
}
