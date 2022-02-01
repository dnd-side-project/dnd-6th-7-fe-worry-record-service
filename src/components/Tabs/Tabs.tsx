import React, { FC, ReactElement, useState, useCallback, memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getWidthDevice } from '@lib/util/helper';
import { theme } from '@lib/styles/palette';
import {
	responsiveFontSizeByValue as fontSizeByValue,
	getHeightDevice as heightDevice,
	responsiveWidth as wp,
} from '@lib/util/helper';

interface TabItemsProps {
	id: string;
	title: string;
	component: any;
}

interface CustomeTabsProps {
	tabItems: TabItemsProps[];
	index: number;
	onChangeIndex: (index: number) => void;
}

const CustomeTabs: FC<CustomeTabsProps> = ({
	tabItems,
	index,
	onChangeIndex,
}) => {
	const converToObj = tabItems.reduce(
		(prev, current) => ({ ...prev, [current.id]: current.component }),
		{},
	);
	const renderScene = SceneMap(converToObj);
	const [routes] = useState(
		tabItems.map(item => ({ key: item.id, title: item.title })),
	);

	const renderTabBar = useCallback(
		props => (
			<TabBar
				{...props}
				indicatorStyle={styles.tabIndicator}
				style={styles.tabBarWrapper}
				renderLabel={({ route }) => (
					<Text style={styles.tabBarTitle}>{route.title}</Text>
				)}
			/>
		),
		[],
	);

	return (
		<TabView
			sceneContainerStyle={styles.tabViewWrapper}
			renderTabBar={renderTabBar}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={onChangeIndex}
			initialLayout={{ width: getWidthDevice() }}
		/>
	);
};

export default memo(CustomeTabs);

const styles = StyleSheet.create({
	tabBarWrapper: {
		backgroundColor: theme.color.black['900'],
		width: wp('60%'),
	},
	tabBarTitle: {
		fontSize: fontSizeByValue(15, heightDevice()),
		color: theme.color.white['900'],
		fontWeight: 'bold',
	},
	tabIndicator: {
		backgroundColor: theme.color.white['900'],
	},
	tabViewWrapper: {},
});
