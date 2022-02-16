import React, { FC } from 'react';
import { View } from 'react-native';
import { Switch } from 'react-native-elements';
import { Text } from 'react-native-elements';

import AppLayout from '@components/AppLayout';
import Home from '@components/Home';
import { HomeProps } from '~/types/Navigation';
import styled from 'styled-components/native';

import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevice,
	responsiveWidth as wp,
} from '@lib/util/helper';
import { theme } from '@lib/styles/palette';
import IconSetting from '@assets/image/settings.svg';

const HomePage: FC<HomeProps> = ({ navigation }) => {
	return (
		<AppLayout headerRight={<IconSetting />}>
			{/* // <AppLayout> */}
			<Home username="유저" worryRatio={98} worryTerm={10} numWorries={7} />

			{/* <CustomeButton
				title="Go to Detail"
				onPress={() => navigation.navigate('Detail')}
				backgroundColor={{
					color: 'indigo',
					weight: '400',
				}}
			/> */}
		</AppLayout>
	);
};

export default HomePage;
