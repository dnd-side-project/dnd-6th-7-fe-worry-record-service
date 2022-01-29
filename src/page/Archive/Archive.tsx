import React, { FC } from 'react';
import { Switch } from 'react-native-elements';

import CustomeButton from '@components/Button';
import AppLayout from '@components/AppLayout';

import { ArchiveProps } from '~/types/Navigation';
import styled from 'styled-components/native';
import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevicee,
	responsiveWidth as wp,
} from '~/lib/util/helper';

const Home: FC<ArchiveProps> = ({ navigation }) => {
	return (
		<AppLayout
			headerLeft={<Title>걱정보관함</Title>}
			headerRight={<Switch value={true} />}
		>
			<CustomeButton
				title="Go to worry"
				onPress={() => navigation.navigate('Worry')}
				backgroundColor={{
					color: 'indigo',
					weight: '400',
				}}
			/>
		</AppLayout>
	);
};

const Title = styled.Text`
	font-size: ${fontSizeByValue(24, heightDevicee())};
	width: ${wp('50%')};
`;

export default Home;
