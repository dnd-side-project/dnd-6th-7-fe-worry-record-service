import React, { FC } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { LoginProps } from '~/types/Navigation';
import AppLayout from '@components/AppLayout';
import LoginCP from '@components/Login';

const Login: FC<LoginProps> = ({ navigation }) => {
	return (
		<AppLayout title="Login" noHeader>
			<LoginCP navigation={navigation} />
		</AppLayout>
	);
};

export default Login;
