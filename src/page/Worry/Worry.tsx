import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import AppLayout from '@components/AppLayout';
import { WorryProps } from '~/types/Navigation';

const Worry = ({ navigation }: WorryProps) => {
	return (
		<AppLayout>
			<Text>Worry</Text>
			<Button title="Go back to Archive" onPress={() => navigation.goBack()} />
		</AppLayout>
	);
};

export default Worry;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});
