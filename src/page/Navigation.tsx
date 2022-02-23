import React, { FC, forwardRef, memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@page/Login';
import HomeScreen from '@page/Home';
import DetailScreen from '@page/Detail';
import ArchiveScreen from '@page/Archive';
import AddWorryScreen from '@page/AddWorry';
import ReviewScreen from '@page/Review';
import { WithAuthStackParamList, RootStackParamList } from '~/types/Navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSceneState } from '@context/ArchiveContext';

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
import BottomDrawer from '@components/BottomDrawer';
import Confirm from '@components/Confirm';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<WithAuthStackParamList>();
const Tab = createBottomTabNavigator<WithAuthStackParamList>();

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

export interface RefRbProps {
  open: () => void;
  close: () => void;
}
interface ConfirmAlertProps {
  title: string;
  subtitle: string;
  confrimButtonTitle: string;
  onPressCancel: () => void;
  onPressConfirm: () => void;
}

export const ConfirmAlert = memo(
  forwardRef((props: ConfirmAlertProps, ref) => (
    <BottomDrawer ref={ref}>
      <Confirm
        confrimButtonTitle={props.confrimButtonTitle}
        title={props.title}
        subtitle={props.subtitle}
        onPressCancel={props.onPressCancel}
        onPressConfirm={props.onPressConfirm}
      />
    </BottomDrawer>
  ))
);

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
        <AuthStack.Screen name="AddWorry" component={AddWorryScreen} />
        <AuthStack.Screen name="Detail" component={DetailScreen} options={{}} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

export const AddWorryScreens: FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="AddWorry"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Group>
        <AuthStack.Screen name="Home" component={HomeScreen} options={{}} />
        <AuthStack.Screen name="AddWorry" component={AddWorryScreen} />
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
        <AuthStack.Screen name="Archive" component={ArchiveScreen} />
        <AuthStack.Screen name="Review" component={ReviewScreen} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

export const AfterLogin: FC = () => {
  const { isUpdating, isReviewing } = useSceneState();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [
          isUpdating || isReviewing ? styles.hideTabBar : styles.tabBar,
        ],
        tabBarItemStyle: styles.tabBarItem,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? <IconFillHome /> : <IconHome />;
              break;
            case 'Archive':
              iconName = focused ? <IconFillStorage /> : <IconStorage />;
              break;
            case 'AddWorry':
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
        name="Home"
        component={HomeScreens}
      />
      <Tab.Screen
        options={{
          tabBarIconStyle: styles.centerTabBarIcon,
          tabBarItemStyle: styles.centerTabBarItem,
        }}
        component={AddWorryScreens}
        name="AddWorry"
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AddWorry');
          },
        })}
      />
      <Tab.Screen
        options={{
          tabBarIconStyle: styles.rightTabBarIcon,
          tabBarItemStyle: styles.rightTabBarItem,
        }}
        name="Archive"
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
  hideTabBar: {
    display: 'none',
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
