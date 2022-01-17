import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { HomeNavigaionProps, HomeRouteProp } from '~/types/Navigation';

interface Props {
	route: HomeRouteProp;
	navigation: HomeNavigaionProps;
}

const Login = ({ navigation }: Props) => {
	return (
		<View style={styles.container}>
			<Text>Login</Text>
			<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
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
