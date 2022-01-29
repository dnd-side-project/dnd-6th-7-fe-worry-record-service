import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@page/Login';
import SignupScreen from '@page/Signup';
import HomeScreen from '@page/Home';
import DetailScreen from '@page/Detail';
import ArchiveScreen from '@page/Archive';
import WorryScreen from '@page/Worry';
import { WithAuthStackParamList, RootStackParamList } from '~/types/Navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native-elements/dist/buttons/Button';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<WithAuthStackParamList>();
const Tab = createBottomTabNavigator();

export const BeforeLogin: FC = () => {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Group>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Signup" component={SignupScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
};

export const HomeScreens: FC = () => {
	return (
		<AuthStack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
			}}
		>
			<AuthStack.Group>
				<AuthStack.Screen name="Home" component={HomeScreen} options={{}} />
				<AuthStack.Screen name="Detail" component={DetailScreen} options={{}} />
			</AuthStack.Group>
		</AuthStack.Navigator>
	);
};

export const ArchiveScreens: FC = () => {
	return (
		<AuthStack.Navigator
			initialRouteName="Archive"
			screenOptions={{
				headerShown: false,
			}}
		>
			<AuthStack.Group>
				<AuthStack.Screen
					name="Archive"
					component={ArchiveScreen}
					options={{}}
				/>
				<AuthStack.Screen name="Worry" component={WorryScreen} options={{}} />
			</AuthStack.Group>
		</AuthStack.Navigator>
	);
};

export const AfterLogin: FC = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen name="Homes" component={HomeScreens} />
			<Tab.Screen name="Archives" component={ArchiveScreens} />
		</Tab.Navigator>
	);
};
