import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@page/Login';
import HomeScreen from '@page/Home';
import { RootStackParamList } from '~/types/Navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ title: 'LOGIN' }}
				/>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ title: 'HOME' }}
				/>
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
