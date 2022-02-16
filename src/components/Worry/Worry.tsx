import React, { FC, memo } from 'react';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import CustomeButton from '@components/Button';

import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevice,
	responsiveWidth as wp,
} from '@lib/util/helper';

import IconCloseLock from '@assets/image/close_lock.svg';
import IconArchive from '@assets/image/archive.svg';

import { theme } from '@lib/styles/palette';

import GradientWrapper from '@components/GradientWrapper';

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
			<IconArchive style={styles.iconWrapper} />
			<CardTitle />
			<GradientWrapper
				style={styles.cardContents}
				colors={[theme.color.gray, theme.color.blue, theme.color.black]}
			>
				<CardConent>
					<Date>{item.title}</Date>
					<CustomeButton
						title={item.content}
						isBorderRadius
						gradientWrapper={{
							isGradient: true,
							colors: [theme.color.gray, theme.color.blue, theme.color.black],
							style: styles.buttonWrapper,
						}}
						color={{
							color: 'white',
						}}
						fontSize={9}
					/>
					<DateLeftWrapper>
						<IconCloseLock />
						<DateLeft>7일 후 잠금해제</DateLeft>
					</DateLeftWrapper>
				</CardConent>
			</GradientWrapper>
		</CardWrapper>
	);
};

export default memo(Worries);

const styles = StyleSheet.create({
	iconWrapper: { position: 'absolute', left: 0, top: 10, zIndex: 10 },
	cardContents: {
		borderRadius: 16,
	},
	buttonWrapper: {
		flex: 0,
		alignSelf: 'flex-start',
		justifySelf: 'flex-start',
		borderRadius: 5,
	},
});

const CardWrapper = styled.View<{ index: number }>`
	height: ${(wp('100%') - wp('15%')) / 2}px;
	flex: 1;
	border: 2px solid ${theme.color.gray};

	border-radius: 19px;
	margin-right: ${props => (props.index % 2 === 0 ? wp('5%') : 0)}px;
	margin-bottom: ${props => (props.index % 2 === 0 ? wp('5%') : 0)}px;
	background: #000;
`;
const CardTitle = styled.Text`
	font-size: 10px;
	flex: 0.3;
`;

const CardConent = styled.View`
	flex: 1;
	padding: ${wp('5%')}px;
	justify-content: flex-end;
`;

const Date = styled.Text`
	font-size: ${fontSizeByValue(18, heightDevice())}px;
	color: #fff;
	font-weight: 600;
`;

const DateLeftWrapper = styled.View`
	flex-direction: row;
	align-items: center;
`;

const DateLeft = styled.Text`
	font-size: ${fontSizeByValue(10, heightDevice())}px;
	margin-left: 5px;
	color: ${theme.color.gray};
`;
