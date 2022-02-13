import React, { FC, memo } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevice,
	responsiveWidth as wp,
} from '@lib/util/helper';

import { theme } from '@lib/styles/palette';

interface HomeProps {
	username: string;
	worryRatio: number;
	worryTerm: number;
}

const MainText = styled.Text`
	font-size: 26px;
	line-height: 34px;
	text-align: center;
	color: ${theme.color.white['900']};
	font-weight: 200;
	margin: 0;
	padding: 0;
`;

const BoldMainText = styled.Text`
	font-size: ${fontSizeByValue(26, heightDevice())}px;
	line-height: ${fontSizeByValue(34, heightDevice())}px;
	text-align: center;
	color: ${theme.color.white['900']};
	font-weight: 700;
	margin: 0;
	padding: 0;
`;

const Home: FC<HomeProps> = props => {
	return <TextContainer {...props} />;
};

const TextContainer: FC<HomeProps> = ({ username, worryRatio, worryTerm }) => {
	return (
		<View>
			<View>
				<MainText>{username}님,</MainText>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				<MainText>최근 </MainText>
				<BoldMainText>두 달 걱정 중</BoldMainText>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				<BoldMainText>{worryRatio}%</BoldMainText>
				<MainText>는 안해도 괜찮아요.</MainText>
			</View>
		</View>
	);
};

export default Home;

// const MainText

// export const SettingIcon = () => (

// );
