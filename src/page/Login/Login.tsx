import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { LoginProps } from '~/types/Navigation';

const Login = ({ navigation }: LoginProps) => {
	return (
		<View style={styles.container}>
			<Text>Login</Text>
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
