import React, { FC } from 'react';
import styled from 'styled-components/native';
import {
	KakaoOAuthToken,
	KakaoProfile,
	getProfile as getKakaoProfile,
	login,
} from '@react-native-seoul/kakao-login';

import CustomeButton from '@components/Button';
import { h5_fontSize } from '~/lib/styles/_variable';
import {
	Header1_bold,
	Header1_normal,
	Header5_normal,
} from '~/lib/styles/_mixin';
import { theme } from '~/lib/styles/palette';

import IconKakao from '@assets/image/kakaotalk.svg';
import IconApple from '@assets/image/apple.svg';

import {
	responsiveWidth as wp,
	responsiveHeight as hp,
} from '@lib/util/helper';
import { Text } from 'react-native-elements';

interface LoginProps {
	data?: string;
	navigation: any;
}

const Login: FC<LoginProps> = props => {
	const [result, setResult] = React.useState<string>('');
	const signInWithKakao = async (): Promise<void> => {
		try {
			const token: KakaoOAuthToken = await login();
			setResult(JSON.stringify(token));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<LoginWrapper>
			<TitleWrapper>
				<Title>걱정,</Title>
				<NormalTitle>
					이젠 <Title>흐릿</Title> 해요
				</NormalTitle>
				<SutTitleWrapper>
					<SubTitle>걱정은 흐릿에 맡기고</SubTitle>
					<SubTitle>맘 편한 일상을 되찾아봐요</SubTitle>
				</SutTitleWrapper>
			</TitleWrapper>
			<ButtonWrapper>
				<CustomeButton
					title="카카오로 계속하기"
					onPress={() => signInWithKakao()}
					backgroundColor={{
						color: 'yellow',
					}}
					color={{
						color: 'black',
					}}
					icon={<IconKakao />}
					isBold
					isBorderRadius
					fontSize={h5_fontSize}
					width={100}
					height={45}
				/>
				<Space />
				<CustomeButton
					title="Apple로 계속하기"
					onPress={() => props.navigation.navigate('Signup')}
					backgroundColor={{
						color: 'white',
					}}
					icon={<IconApple />}
					isBold
					color={{
						color: 'black',
					}}
					isBorderRadius
					fontSize={h5_fontSize}
					width={100}
					height={45}
				/>
			</ButtonWrapper>
		</LoginWrapper>
	);
};

export default Login;

const LoginWrapper = styled.View`
	width: 100%;
	flex: 1;
`;
const TitleWrapper = styled.View`
	margin: ${hp(3)}px 0;
`;

const NormalTitle = styled.Text`
	${Header1_normal(theme.color.white)}
`;

const Title = styled.Text`
	${Header1_bold(theme.color.white)}
`;

const SutTitleWrapper = styled.View`
	margin-top: 8px;
`;

const SubTitle = styled.Text`
	${Header5_normal(theme.color.white)}
`;

const Space = styled.View`
	height: 10%;
`;

const ButtonWrapper = styled.View`
	flex: 1;
`;
