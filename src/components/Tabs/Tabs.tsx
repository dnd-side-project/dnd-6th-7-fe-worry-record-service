import React, { FC, ReactElement, useState, useCallback, memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getWidthDevice } from '@lib/util/helper';

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
				renderLabel={({ route }) => (
					<Text style={{ color: 'black' }}>{route.title}</Text>
				)}
			/>
		),
		[],
	);

	return (
		<TabView
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
	container: {
		backgroundColor: 'transparent',
		height: 100,
	},
});
