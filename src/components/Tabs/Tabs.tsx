import React, { FC, useState, useCallback, memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getWidthDevice } from '@lib/util/helper';
import { theme } from '@lib/styles/palette';
import {
  responsiveFontSizeByValue as fontSizeByValue,
  getHeightDevice as heightDevice,
  responsiveWidth as wp,
} from '@lib/util/helper';
import { useNavigation } from '@react-navigation/native';

import IconSetting from '@assets/image/settings.svg';
import { SettingScreenNavigationProp } from '~/types/Navigation';
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
  const tag = '[CustomeTabs]';

  const converToObj = tabItems.reduce(
    (prev, current) => ({ ...prev, [current.id]: current.component }),
    {},
  );
  const renderScene = SceneMap(converToObj);

  const navigation = useNavigation<SettingScreenNavigationProp>();

  const [routes] = useState(
    tabItems.map(item => ({ key: item.id, title: item.title })),
  );

  const onPressSetting = useCallback(() => {
    console.log(tag, 'onPressSetting');
    navigation.navigate('Setting');
  }, [navigation]);

  const renderTabBar = (props: any) => (
    <View style={styles.tabBarBox}>
      <TabBar
        {...props}
        indicatorStyle={styles.tabIndicator}
        style={styles.tabBarWrapper}
        tabStyle={styles.tabStyle}
        activeColor={theme.color.black}
        renderLabel={({ route }) => (
          <Text
            style={
              +route.key === index
                ? styles.tabBarTitle
                : styles.tabBarActiveTitle
            }
          >
            {route.title}
          </Text>
        )}
      />
      <TouchableOpacity onPress={onPressSetting}>
        <IconSetting />
      </TouchableOpacity>
    </View>
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

export default CustomeTabs;

const styles = StyleSheet.create({
  tabBarWrapper: {
    backgroundColor: 'transparent',
    width: wp('50%'),
  },
  tabBarBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  tabStyle: {
    padding: 0,
    margin: 0,
  },
  tabBarActiveTitle: {
    fontSize: fontSizeByValue(23, heightDevice()),
    color: theme.color.gray,
    fontWeight: '800',
  },
  tabBarTitle: {
    fontSize: fontSizeByValue(23, heightDevice()),
    color: theme.color.white,
    fontWeight: '800',
  },
  tabIndicator: {
    backgroundColor: 'transparent',
  },
  tabViewWrapper: {},
});
