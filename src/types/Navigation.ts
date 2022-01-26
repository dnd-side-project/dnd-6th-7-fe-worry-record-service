import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
	Login: undefined;
	Signup: undefined;
};

export type WithAuthStackParamList = {
	Home: undefined;
	Detail: undefined;
};
export type HomeProps = {
	route: RouteProp<WithAuthStackParamList, 'Home'>;
	navigation: NativeStackNavigationProp<WithAuthStackParamList, 'Home'>;
};
export type DetailProps = {
	route: RouteProp<WithAuthStackParamList, 'Detail'>;
	navigation: NativeStackNavigationProp<WithAuthStackParamList, 'Detail'>;
};
export type LoginProps = {
	route: RouteProp<RootStackParamList, 'Login'>;
	navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};
export type SignupProps = {
	route: RouteProp<RootStackParamList, 'Signup'>;
	navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
};