import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Login: undefined;
};

export type WithAuthStackParamList = {
  Home: undefined;
  Detail: undefined;
  AddWorry: undefined;
  Archive: undefined;
  Review: undefined;
  ReviewEdit: undefined;
  ReviewChat: undefined;
  Setting: undefined;
};

export type HomeProps = {
  route: RouteProp<WithAuthStackParamList, 'Home'>;
  navigation: StackNavigationProp<WithAuthStackParamList, 'Home'>;
};
export type DetailProps = {
  route: RouteProp<WithAuthStackParamList, 'Detail'>;
  navigation: StackNavigationProp<WithAuthStackParamList, 'Detail'>;
};
export type ArchiveProps = {
  route: RouteProp<WithAuthStackParamList, 'Archive'>;
  navigation: StackNavigationProp<WithAuthStackParamList, 'Archive'>;
};

export type AddWorryProps = {
  route: RouteProp<WithAuthStackParamList, 'AddWorry'>;
  navigation: StackNavigationProp<WithAuthStackParamList, 'AddWorry'>;
};

export type ReviewProps = {
  route: RouteProp<WithAuthStackParamList, 'Review'>;
  navigation: StackNavigationProp<WithAuthStackParamList, 'Review'>;
};

export type ReviewEditProps = {
  route: RouteProp<WithAuthStackParamList, 'ReviewEdit'>;
  navigation: StackNavigationProp<WithAuthStackParamList, 'ReviewEdit'>;
};

export type ReviewChatProps = {
  route: RouteProp<WithAuthStackParamList, 'ReviewChat'>;
  navigation: StackNavigationProp<WithAuthStackParamList, 'ReviewChat'>;
};

export type SettingProps = {
  route: RouteProp<WithAuthStackParamList, 'Setting'>;
  navigation: StackNavigationProp<WithAuthStackParamList, 'Setting'>;
};

export type LoginProps = {
  route: RouteProp<RootStackParamList, 'Login'>;
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<WithAuthStackParamList, 'Home'>,
  StackNavigationProp<HomeProps>
>;

export type DetailScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<WithAuthStackParamList, 'Detail'>,
  StackNavigationProp<DetailProps>
>;

export type AddWorryScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<WithAuthStackParamList, 'AddWorry'>,
  StackNavigationProp<AddWorryProps>
>;

export type ArchiveScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<WithAuthStackParamList, 'Archive'>,
  StackNavigationProp<ArchiveProps>
>;

export type ReviewScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<WithAuthStackParamList, 'Review'>,
  StackNavigationProp<ReviewProps>
>;

export type ReviewEditScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<WithAuthStackParamList, 'ReviewEdit'>,
  StackNavigationProp<ReviewEditProps>
>;

export type ReviewChatScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<WithAuthStackParamList, 'ReviewChat'>,
  StackNavigationProp<ReviewChatProps>
>;

export type SettingScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<WithAuthStackParamList, 'Setting'>,
  StackNavigationProp<SettingProps>
>;
