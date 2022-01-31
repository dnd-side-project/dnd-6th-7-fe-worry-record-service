import React, { FC, memo } from 'react';
import styled from 'styled-components/native';
import { responsiveWidth as wp } from '@lib/util/helper';

export interface WorryEachProps {
	id: number;
	title: string;
	content: string;
}

interface WorryProps {
	item: WorryEachProps;
	index: number;
}

const Worries: FC<WorryProps> = ({ item, index }) => {
	return (
		<CardWrapper index={index}>
			<CardTitle />
			<CardConents>
				<CardConent>
					<Date>{item.title}</Date>
					<Tags>{item.content}</Tags>
					<DateLeft>7일 후 잠금해제</DateLeft>
				</CardConent>
			</CardConents>
		</CardWrapper>
	);
};

export default memo(Worries);

const CardWrapper = styled.View<{ index: number }>`
	height: ${(wp('100%') - wp('15%')) / 2}px;
	flex: 1;
	border: 2px solid #8f8f8f;

	border-radius: 19px;
	margin-right: ${props => (props.index % 2 === 0 ? wp('5%') : 0)}px;
	margin-bottom: ${props => (props.index % 2 === 0 ? wp('5%') : 0)}px;
	background: #000;
`;
const CardTitle = styled.Text`
	font-size: 10px;
	flex: 0.3;
`;

const CardConents = styled.View`
	flex: 1;
	background: #8f8f8f;
	border-radius: 15px;
`;
const CardConent = styled.View`
	flex: 1;
	padding: ${wp('5%')}px;
	justify-content: flex-end;
`;

const Date = styled.Text`
	font-size: 10px;
`;
const Tags = styled.Text`
	font-size: 10px;
`;
const DateLeft = styled.Text`
	font-size: 10px;
`;
