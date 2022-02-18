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

	const renderTabBar = props => (
		<TabBar
			{...props}
			indicatorStyle={styles.tabIndicator}
			style={styles.tabBarWrapper}
			tabStyle={styles.tabStyle}
			activeColor={theme.color.black}
			renderLabel={({ route }) => (
				<Text
					style={
						+route.key === index ? styles.tabBarTitle : styles.tabBarActiveTitle
					}
				>
					{route.title}
				</Text>
			)}
		/>
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
		backgroundColor: 'transparent',
		width: wp('60%'),
		// borderColor: 'pink',
		// borderWidth: 1,
	},
	tabStyle: {
		padding: 0,
		margin: 0,
	},
	tabBarActiveTitle: {
		fontSize: fontSizeByValue(26, heightDevice()),
		color: theme.color.gray,
		fontWeight: 'bold',
	},
	tabBarTitle: {
		fontSize: fontSizeByValue(26, heightDevice()),
		color: theme.color.white,
		fontWeight: 'bold',
	},
	tabIndicator: {
		backgroundColor: 'transparent',
	},
	tabViewWrapper: {
		// borderColor: 'pink',
		// borderWidth: 1,
	},
});
