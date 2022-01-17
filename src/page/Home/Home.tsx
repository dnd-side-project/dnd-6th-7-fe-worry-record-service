import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { HomeProps } from '~/types/Navigation';

const Home = ({ navigation }: HomeProps) => {
	return (
		<View style={styles.container}>
			<Text>Home</Text>
			<Button
				title="Go to Detail"
				onPress={() => navigation.navigate('Detail')}
			/>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});
