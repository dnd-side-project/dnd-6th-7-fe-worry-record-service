import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { SignupProps } from '~/types/Navigation';

const Signup = ({ navigation }: SignupProps) => {
	return (
		<View style={styles.container}>
			<Text>Signup</Text>
			<Button
				title="Go back to Login"
				onPress={() => navigation.navigate('Login')}
			/>
		</View>
	);
};

export default Signup;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});
