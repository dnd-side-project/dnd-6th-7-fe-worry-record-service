import React, { FC, memo } from 'react';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevice,
	responsiveWidth as wp,
} from '@lib/util/helper';
import { GradientWrapperProps } from '@components/GradientWrapper/GradientWrapper';
import GradientWrapper from '@components/GradientWrapper';

import { theme } from '@lib/styles/palette';

import IconRightArrow from '@assets/image/arrow_right.svg';
import Moon from '@assets/image/moon.svg';
import RectCloud from '@assets/image/cloud_1.svg';
import RectCloud2 from '@assets/image/cloud_7.svg';
import RectCloud3 from '@assets/image/cloud_8.svg';
import Cloud1 from '@assets/image/cloud_2.svg';
import Cloud2 from '@assets/image/cloud_3.svg';
import Cloud3 from '@assets/image/cloud_4.svg';
import Cloud4 from '@assets/image/cloud_5.svg';
import Cloud5 from '@assets/image/cloud_6.svg';

// import Test1 from '@assets/image/Group 843.png';

interface HomeProps {
	username: string;
	worryRatio: number;
	worryTerm: number;
	numWorries: number;
}

const MainText = styled.Text`
	font-size: 26px;
	line-height: 34px;
	text-align: center;
	color: ${theme.color.white};
	font-weight: 200;
	margin: 0;
	padding: 0;
`;

const BoldMainText = styled.Text`
	font-size: ${fontSizeByValue(26, heightDevice())}px;
	line-height: ${fontSizeByValue(34, heightDevice())}px;
	text-align: center;
	color: ${theme.color.white};
	font-weight: 700;
	margin: 0;
	padding: 0;
`;

const SubText = styled.Text`
	font-size: ${fontSizeByValue(18, heightDevice())}px;
	line-height: ${fontSizeByValue(18, heightDevice())}px;
	text-align: center;
	color: ${theme.color.white};
	font-weight: 200;
	margin: 0;
	padding: 0;
`;
const SubBoldText = styled.Text`
	font-size: ${fontSizeByValue(18, heightDevice())}px;
	line-height: ${fontSizeByValue(18, heightDevice())}px;
	text-align: center;
	color: ${theme.color.white};
	font-weight: 700;
	margin: 0;
	padding: 0;
`;

const Home: FC<HomeProps> = props => {
	return (
		<>
			<TextContainer {...props} />
			<MoonContainer {...props} />
		</>
	);
};

const TextContainer: FC<HomeProps> = ({
	username,
	worryRatio,
	worryTerm,
	numWorries,
}) => {
	return (
		<>
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
			<View
				style={{
					marginTop: 16,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<SubText>요즘 걱정 </SubText>
				<SubBoldText> {numWorries}건</SubBoldText>
				<View>
					<IconRightArrow />
				</View>
			</View>
		</>
	);
};

const MoonContainer: FC<HomeProps> = ({ numWorries }) => {
	return (
		<>
			<View style={style.moonContainer}>
				{numWorries === 0 ? (
					<CloudContainer0 />
				) : numWorries === 1 ? (
					<CloudContainer1 />
				) : numWorries === 2 ? (
					<CloudContainer2 />
				) : numWorries < 5 ? (
					<CloudContainer3 />
				) : numWorries <= 10 ? (
					<CloudContainer4 />
				) : (
					<CloudContainer5 />
				)}
			</View>
		</>
	);
};
const CloudContainer0: FC = () => {
	return (
		<>
			<Moon style={style.moonSvg} />
		</>
	);
};
const CloudContainer1: FC = () => {
	return (
		<>
			<Moon style={style.moonSvg} />
		</>
	);
};
const CloudContainer2: FC = () => {
	const style3 = StyleSheet.create({
		cloudFront1: {
			opacity: 50,
			position: 'absolute',
			top: 161,
			left: wp(50) - 42,
		},
		cloudBack1: {
			position: 'absolute',
			top: 63,
			left: wp(50) - 24,
		},
		cloudBack2: {
			position: 'absolute',
			top: 92,
			left: wp(50) + 8,
		},
		cloudBack3: {
			position: 'absolute',
			top: 41,
			left: wp(50) + 71,
		},
		cloudBack4: {
			position: 'absolute',
			top: 292,
			left: wp(50) - 195 - 34,
		},
	});
	return (
		<>
			{/* 달 뒤쪽 배경 */}
			<RectCloud2 style={style.cloudBack4} />
			<RectCloud3 style={style3.cloudBack4} width={210} />

			{/* 뒤쪽 - 우측 상단 구름 */}
			<RectCloud3 style={style3.cloudBack1} />
			<RectCloud3 style={style3.cloudBack2} />
			<RectCloud3 style={style3.cloudBack3} />
			<Moon style={style.moonSvg} />
			{/* 달 앞쪽 배경 */}
			<Cloud1 style={style3.cloudFront1} width={200.1} />
		</>
	);
};
const CloudContainer3: FC = () => {
	const style3 = StyleSheet.create({
		cloudFront1: {
			position: 'absolute',
			top: 161,
			left: wp(50) - 42,
		},
		cloudFront2: {
			position: 'absolute',
			top: 182,
			left: wp(50) - 42,
		},
		cloudBack1: {
			position: 'absolute',
			top: 63,
			left: wp(50) - 24,
		},
		cloudBack2: {
			position: 'absolute',
			top: 92,
			left: wp(50) + 8,
		},
		cloudBack3: {
			position: 'absolute',
			top: 41,
			left: wp(50) + 71,
		},
	});
	return (
		<>
			{/* 달 뒤쪽 배경 */}
			<RectCloud2 style={style.cloudBack4} />
			<RectCloud style={style.cloudBack5} />
			<RectCloud style={style.cloudBack6} />
			{/* 뒤쪽 - 우측 상단 구름 */}
			<RectCloud3 style={style3.cloudBack1} />
			<RectCloud3 style={style3.cloudBack2} />
			<RectCloud3 style={style3.cloudBack3} />
			<Moon style={style.moonSvg} />
			{/* 달 앞쪽 배경 */}
			<Cloud1 style={style3.cloudFront1} width={200.1} />
		</>
	);
};

const CloudContainer4: FC = () => {
	const style4 = StyleSheet.create({
		cloudFront1: {
			position: 'absolute',
			top: 184,
			left: wp(50) - 22,
		},
		cloudFront2: {
			position: 'absolute',
			top: 182,
			left: wp(50) - 91,
		},
	});
	return (
		<>
			{/* 달 뒤쪽 배경 */}
			<Cloud3 style={style.cloudBack1} />
			<Cloud4 style={style.cloudBack2} />
			<Cloud5 style={style.cloudBack3} />
			<RectCloud2 style={style.cloudBack4} />
			<RectCloud style={style.cloudBack5} />
			<RectCloud style={style.cloudBack6} />
			<Moon style={style.moonSvg} />
			{/* 달 앞쪽 배경 */}
			<Image
				source={require('@assets/image/Group843.png')}
				style={style4.cloudFront2}
			/>
			{/* <Cloud1 style={style4.cloudFront1} width={151.5} /> */}
			{/* <Test1 style={style4.cloudFront1} width={151.5} /> */}
			<Cloud2 style={style4.cloudFront2} width={108} />
		</>
	);
};

const CloudContainer5: FC = () => {
	return (
		<>
			{/* 달 뒤쪽 배경 */}
			<Cloud3 style={style.cloudBack1} />
			<Cloud4 style={style.cloudBack2} />
			<Cloud5 style={style.cloudBack3} />
			<RectCloud2 style={style.cloudBack4} />
			<RectCloud style={style.cloudBack5} />
			<RectCloud style={style.cloudBack6} />
			<Moon style={style.moonSvg} />
			{/* 달 앞쪽 배경 */}
			<RectCloud style={style.cloudFront1} />
			<RectCloud style={style.cloudFront2} />
			<RectCloud style={style.cloudFront3} />
			<RectCloud style={style.cloudFront4} />
			<Cloud1 style={style.cloudFront5} />
			<Cloud2 style={style.cloudFront6} />
		</>
	);
};

const style = StyleSheet.create({
	moonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	moonSvg: {
		position: 'absolute',
		top: 100,
	},
	rectCloud: {
		width: 177,
		height: 32,
	},
	cloudFront1: {
		position: 'absolute',
		blurRadius: 10,
		top: 385,
		left: wp(50) + 23,
	},
	cloudFront2: {
		position: 'absolute',
		backdropFilter: 'blur(10px)',
		top: 385 + 19,
		left: wp(50) + 23 + 40,
	},
	cloudFront3: {
		position: 'absolute',
		top: 124,
		left: wp(50) + 10,
	},
	cloudFront4: {
		position: 'absolute',
		top: 124 + 19,
		left: wp(50) + 50,
	},
	cloudFront5: {
		position: 'absolute',
		top: 159,
		left: wp(50) - 22,
	},
	cloudFront6: {
		position: 'absolute',
		top: 168,
		left: wp(50) - 134,
	},
	cloudBack1: {
		position: 'absolute',
		blurRadius: 10,
		top: -18,
		left: wp(50) - 46,
	},
	cloudBack2: {
		position: 'absolute',
		blurRadius: 10,
		top: 79,
		left: wp(50) + 18,
	},
	// 이 컴포넌트 디자인팀이랑 논의 진행해야 함
	// 하단부 블러가 전체 스크린에 덮이는데 svg 이렇게 처리하면 탭같이 width 넓은 기종의 경우 하단부 블러가 가운데만 됨
	cloudBack3: {
		position: 'absolute',
		blurRadius: 10,
		top: 33,
	},
	cloudBack4: {
		position: 'absolute',
		blurRadius: 10,
		top: 137,
		left: wp(50) - 160,
	},
	cloudBack5: {
		position: 'absolute',
		blurRadius: 10,
		top: 313,
		left: wp(50) - 195 - 51,
	},
	cloudBack6: {
		position: 'absolute',
		blurRadius: 10,
		top: 331,
		left: wp(50) - 195 - 11,
	},
});

export default Home;
