import React, { FC, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@page/Login';
import SignupScreen from '@page/Signup';
import HomeScreen from '@page/Home';
import DetailScreen from '@page/Detail';
import { WithAuthStackParamList, RootStackParamList } from '~/types/Navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<WithAuthStackParamList>();

const AfterLogin: FC = () => {
	return (
		<AuthStack.Group>
			<AuthStack.Screen
				name="Home"
				component={HomeScreen}
				options={{ title: 'HOME' }}
			/>
			<AuthStack.Screen
				name="Detail"
				component={DetailScreen}
				options={{ title: 'DETAIL' }}
			/>
		</AuthStack.Group>
	);
};

const BeforeLogin: FC = () => {
	return (
		<Stack.Group>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: 'LOGIN',
					headerStyle: {
						backgroundColor: '#f4511e',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			/>
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Group>
	);
};

const App: FC = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={{
					headerStyle: {
						backgroundColor: '#8e9162',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			>
				{isLoggedIn ? AfterLogin(props) : BeforeLogin(props)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
