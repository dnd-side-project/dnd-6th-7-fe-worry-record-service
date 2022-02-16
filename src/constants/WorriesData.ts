import { WorryProps } from '@components/Worries/Worries';
import uuid from 'react-native-uuid';
import { getDate } from '@lib/util/date';

export const WORRIES_LEFT: WorryProps[] = [
  {
    id: 11,
    title: getDate(new Date(), 'MM/dd'),
    content: '경제',
    isOpen: false,
  },
  {
    id: 21,
    title: getDate(new Date(), 'MM/dd'),
    content: '경제',
    isOpen: false,
  },
  {
    id: 31,
    title: getDate(new Date(), 'MM/dd'),
    content: '진로',
    isOpen: true,
  },
  {
    id: 41,
    title: getDate(new Date(), 'MM/dd'),
    content: '학업',
    isOpen: false,
  },
  {
    id: 51,
    title: getDate(new Date(), 'MM/dd'),
    content: '관계',
    isOpen: true,
  },
  {
    id: 61,
    title: getDate(new Date(), 'MM/dd'),
    content: '가족',
    isOpen: false,
  },
  {
    id: 71,
    title: getDate(new Date(), 'MM/dd'),
    content: '경제',
    isOpen: true,
  },
  {
    id: 81,
    title: getDate(new Date(), 'MM/dd'),
    content: '경제',
    isOpen: false,
  },
  {
    id: 91,
    title: getDate(new Date(), 'MM/dd'),
    content: '진로',
    isOpen: false,
  },
];

export const USEFUL_WORRIES: WorryProps[] = [
  {
    id: 1,
    title: getDate(new Date(), 'MM/dd'),
    content: '학업',
    isOpen: true,
  },
  {
    id: 2,
    title: getDate(new Date(), 'MM/dd'),
    content: '관계',
    isOpen: true,
  },
  {
    id: 3,
    title: getDate(new Date(), 'MM/dd'),
    content: '직장',
    isOpen: false,
  },
  {
    id: 4,
    title: getDate(new Date(), 'MM/dd'),
    content: '가족',
    isOpen: false,
  },
  {
    id: 5,
    title: getDate(new Date(), 'MM/dd'),
    content: '진로',
    isOpen: false,
  },
  {
    id: 6,
    title: getDate(new Date(), 'MM/dd'),
    content: '경제',
    isOpen: false,
  },
];
