import {
	KakaoOAuthToken,
	KakaoProfile,
	getProfile as getKakaoProfile,
	login,
	logout,
	unlink,
} from '@react-native-seoul/kakao-login';

import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { LoginProps } from '~/types/Navigation';

const Login = ({ navigation }: LoginProps) => {
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
		<View style={styles.container}>
			<Text>Login</Text>
			<Text>{result}</Text>
			<Button onPress={() => signInWithKakao()} title="카카오 로그인" />
			<Button
				title="Go to Signup"
				onPress={() => navigation.navigate('Signup')}
			/>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});
