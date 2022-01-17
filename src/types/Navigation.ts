import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
	Home: undefined;
	Login: undefined;
};

export type HomeNavigaionProps = NativeStackNavigationProp<
	RootStackParamList,
	'Home'
>;
export type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;
