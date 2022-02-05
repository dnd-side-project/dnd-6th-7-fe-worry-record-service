import React, { FC, useState } from 'react';
import { Switch } from 'react-native-elements';

import CustomeButton from '@components/Button';
import CustomeTabs from '@components/Tabs';
import AppLayout from '@components/AppLayout';
import Worries from '@components/Worries';

import { ArchiveProps } from '~/types/Navigation';
import { USEFUL_WORRIES, WORRIES_LEFT } from '~/constants/WorriesData';

import styled from 'styled-components/native';

import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevice,
	responsiveWidth as wp,
} from '@lib/util/helper';
import { theme } from '@lib/styles/palette';

const firstRoute = () => <Worries counts={4} worries={WORRIES_LEFT} />;
const secondRoute = () => <Worries counts={7} worries={USEFUL_WORRIES} />;

const DUMMY = [
	{
		id: '1',
		title: '남은 걱정',
		component: firstRoute,
	},
	{
		id: '2',
		title: '쓸모있는 걱정',
		component: secondRoute,
	},
];

const Home: FC<ArchiveProps> = ({ navigation }) => {
	const [tabs, setTabs] = useState(DUMMY);
	const [index, setIndex] = useState(0);

	return (
		<AppLayout
			headerLeft={<Title>걱정 보관함</Title>}
			headerRight={<Switch value={true} />}
		>
			<CustomeTabs
				tabItems={tabs}
				index={index}
				onChangeIndex={i => setIndex(i)}
			/>
			{/* <CustomeButton
				title="Go to worry"
				onPress={() => navigation.navigate('Worry')}
				backgroundColor={{
					color: 'indigo',
					weight: '400',
				}}
			/> */}
		</AppLayout>
	);
};

const Title = styled.Text`
	font-size: ${fontSizeByValue(25, heightDevice())}px;
	width: ${wp('50%')}px;
	color: ${theme.color.white['900']};
	font-weight: bold;
`;

export default Home;
