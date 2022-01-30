import { WorryProps } from '@components/Worries/Worries';
import uuid from 'react-native-uuid';
import { getDate } from '@lib/util/date';

export const WORRIES_LEFT: WorryProps[] = [
	{
		id: 11,
		title: getDate(new Date(), 'MM-dd'),
		content: '진로',
	},
	{
		id: 21,
		title: getDate(new Date(), 'MM-dd'),
		content: '취업',
	},
	{
		id: 31,
		title: getDate(new Date(), 'MM-dd'),
		content: '회사일',
	},
	{
		id: 41,
		title: getDate(new Date(), 'MM-dd'),
		content: '썩을',
	},
	{
		id: 51,
		title: getDate(new Date(), 'MM-dd'),
		content: '과제',
	},
	{
		id: 61,
		title: getDate(new Date(), 'MM-dd'),
		content: '과제',
	},
	{
		id: 71,
		title: getDate(new Date(), 'MM-dd'),
		content: '과제',
	},
	{
		id: 81,
		title: getDate(new Date(), 'MM-dd'),
		content: '과제',
	},
	{
		id: 91,
		title: getDate(new Date(), 'MM-dd'),
		content: '과제',
	},
];

export const USEFUL_WORRIES: WorryProps[] = [
	{
		id: 1,
		title: getDate(new Date(), 'MM-dd'),
		content: '취업',
	},
	{
		id: 2,
		title: getDate(new Date(), 'MM-dd'),
		content: '취업',
	},
	{
		id: 3,
		title: getDate(new Date(), 'MM-dd'),
		content: '회사일',
	},
	{
		id: 4,
		title: getDate(new Date(), 'MM-dd'),
		content: '썩을',
	},
	{
		id: 5,
		title: getDate(new Date(), 'MM-dd'),
		content: '과제',
	},
	{
		id: 6,
		title: getDate(new Date(), 'MM-dd'),
		content: '과제',
	},
];
