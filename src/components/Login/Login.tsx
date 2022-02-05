import React, { FC } from 'react';

import {
	KakaoOAuthToken,
	KakaoProfile,
	getProfile as getKakaoProfile,
	login,
} from '@react-native-seoul/kakao-login';

import { Text } from 'react-native';
import CustomeButton from '@components/Button';

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
		<>
			<Text>{result}</Text>
			<CustomeButton
				title="kakao login"
				onPress={() => signInWithKakao()}
				isBorder
				backgroundColor={{
					color: 'lightBlue',
					weight: '900',
				}}
			/>

			<CustomeButton
				title="Go to Signup"
				onPress={() => props.navigation.navigate('Signup')}
			/>
		</>
	);
};

export default Login;
