import React, { FC } from 'react';
import { Switch } from 'react-native-elements';

import CustomeButton from '@components/Button';
import AppLayout from '@components/AppLayout';

import { HomeProps } from '~/types/Navigation';

const Home: FC<HomeProps> = ({ navigation }) => {
	return (
		<AppLayout>
			<CustomeButton
				title="Go to Detail"
				onPress={() => navigation.navigate('Detail')}
				backgroundColor={{
					color: 'indigo',
					weight: '400',
				}}
			/>
		</AppLayout>
	);
};

export default Home;
