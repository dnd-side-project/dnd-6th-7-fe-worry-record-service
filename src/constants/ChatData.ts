import { getDate } from '@lib/util/date';

export interface ChatDataProp {
  getChat1: (name: string, worryContent: string) => any;
  getChat2: (name: string, worryStartDate: string, tag: string) => any;
  getChat3: (name: string, worryStartDate: string, tag: string) => any;
  getChat4: () => any;
}

export const ChatData = {
  getChat1: (name: string, worryContent: string): any => {
    return [
      {
        id: '-1',
        isOposite: false,
        isActive: false,
        contents: `${name}! 오랜만이야~ 이 걱정에 대해 할 말이 있구나!`,
      },
      {
        id: '-1',
        isOposite: false,
        isActive: true,
        contents: worryContent,
      },
      {
        id: '-1',
        isOposite: false,
        isActive: false,
        contents: 'ㅎㅎ 이 걱정은 어떻게 되었어?',
      },
      {
        id: '2',
        isOposite: true,
        isActive: false,
        contents: '괜히 걱정했어!',
      },
      {
        id: '3',
        isOposite: true,
        isActive: false,
        contents: '걱정대로 됐어ㅠㅠ',
      },
      { id: '4', isOposite: true, contents: '아직 모르겠어...' },
    ];
  },
  getChat2: (
    name: string,
    worryStartDate: string,
    tag: string,
    worryCnt: number,
    meaningfulWorryCnt: number,
  ): any => {
    return [
      {
        id: '-1',
        isOposite: false,
        isActive: false,
        contents: '정말 다행이다!',
      },
      {
        id: '-1',
        isOposite: false,
        isActive: false,
        contents: `${getDate(worryStartDate, 'MM')}월 ${getDate(
          worryStartDate,
          'dd',
        )}일의 #${tag}걱정을 포함한 걱정이었어. ${worryCnt}개의 걱정 중 ${meaningfulWorryCnt}개만 의미있는 걱정이었어. 조금 더 마음 놓아도 좋을 것 같아~!`,
      },
      {
        id: '-1',
        isOposite: false,
        isActive: false,
        contents: `이번 걱정 후기를 남겨줘. 미래의 ${name}가 고마워할거야!`,
      },
    ];
  },
  getChat3: (
    name: string,
    worryStartDate: string,
    tag: string,
    worryCnt: number,
    meaningfulWorryCnt: number,
  ): any => {
    return [
      {
        id: '-1',
        isOposite: false,
        isActive: false,
        contents: '그렇구나 ㅠㅠ',
      },
      {
        id: '-1',
        isOposite: false,
        isActive: false,
        contents: `${getDate(worryStartDate, 'MM')}월 ${getDate(
          worryStartDate,
          'dd',
        )}일의 #${tag}걱정을 포함한 걱정이었어. ${worryCnt}개의 걱정 중 ${meaningfulWorryCnt}개만 의미있는 걱정이었어. 조금 더 마음 놓아도 좋을 것 같아~!`,
      },
      {
        id: '-1',
        isOposite: false,
        isActive: false,
        contents: `이번 걱정 후기를 남겨줘. 미래의 ${name}가 고마워할거야!`,
      },
    ];
  },
  getChat4: (): any => {
    return [
      {
        id: '-1',
        isOposite: false,
        isActive: false,
        contents: '다음에 다시 물어봐줄게 ㅠㅠ',
      },
      {
        id: '-1',
        isOposite: false,
        isActive: false,
        contents: '언제가 좋을까?',
      },
    ];
  },
};
