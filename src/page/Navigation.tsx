import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@page/Login';
import HomeScreen from '@page/Home';
import DetailScreen from '@page/Detail';
import ArchiveScreen from '@page/Archive';
import AddWorryScreen from '@page/AddWorry';
import { WithAuthStackParamList, RootStackParamList } from '~/types/Navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from '@lib/util/helper';

import IconFillHome from '@assets/image/fill_home.svg';
import IconHome from '@assets/image/home.svg';
import IconStorage from '@assets/image/storage.svg';
import IconFillStorage from '@assets/image/fill_storage.svg';
import IconAdd from '@assets/image/add.svg';

import { StyleSheet } from 'react-native';
import { theme } from '@lib/styles/palette';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<WithAuthStackParamList>();
const Tab = createBottomTabNavigator();

export const BeforeLogin: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export const HomeScreens: FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Group>
        <AuthStack.Screen name="Home" component={HomeScreen} options={{}} />
        <AuthStack.Screen name="CreatePosts0" component={AddWorryScreen} />
        <AuthStack.Screen name="Detail" component={DetailScreen} options={{}} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

export const ArchiveScreens: FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Archive"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Group>
        <AuthStack.Screen
          name="Archive"
          component={ArchiveScreen}
          options={{}}
        />
        <AuthStack.Screen name="CreatePosts2" component={AddWorryScreen} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

const Add = () => null;

export const AfterLogin: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case 'Homes':
              iconName = focused ? <IconFillHome /> : <IconHome />;
              break;
            case 'Archives':
              iconName = focused ? <IconFillStorage /> : <IconStorage />;
              break;
            case 'Add':
              iconName = <IconAdd />;
              break;

            default:
              break;
          }
          return iconName;
        },
      })}
    >
      <Tab.Screen
        options={{
          tabBarIconStyle: styles.leftTabBarIcon,
          tabBarItemStyle: styles.leftTabBarItem,
        }}
        name="Homes"
        component={HomeScreens}
      />
      <Tab.Screen
        options={{
          tabBarIconStyle: styles.centerTabBarIcon,
          tabBarItemStyle: styles.centerTabBarItem,
        }}
        component={Add}
        name="Add"
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate(`CreatePosts${navigation.getState().index}`);
          },
        })}
      />
      <Tab.Screen
        options={{
          tabBarIconStyle: styles.rightTabBarIcon,
          tabBarItemStyle: styles.rightTabBarItem,
        }}
        name="Archives"
        component={ArchiveScreens}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    paddingHorizontal: wp('18%'),
    marginBottom: hp('5%'),
    height: 90,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  tabBarItem: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  centerTabBarItem: {
    backgroundColor: 'rgba(15, 15, 21, 0.5)',

    zIndex: 100,
  },
  leftTabBarItem: {
    backgroundColor: 'rgba(15, 15, 21, 0.5)',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  centerTabBarIcon: {
    position: 'absolute',
    top: 0,
  },
  leftTabBarIcon: {},
  rightTabBarIcon: {},
  rightTabBarItem: {
    backgroundColor: 'rgba(15, 15, 21, 0.5)',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
