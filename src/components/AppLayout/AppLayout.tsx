import React, { FC, ReactElement } from 'react';
import styled from 'styled-components/native';
import Header from '@components/Header';
import { theme } from '@lib/styles/palette';
import { ImageSourcePropType } from 'react-native';

interface AppLayoutProps {
  noHeader?: boolean;
  name: 'login' | 'worry' | 'chat' | 'home' | 'review' | 'AddWorryComplete';
  headerRight?: ReactElement;
  headerRightSidePress?: () => void;
  headerLeft?: ReactElement;
  headerLeftSidePress?: () => void;
  headerTitle?: ReactElement;
  headerTitleCenter?: boolean;
  headerTitlePress?: () => void;
  noBackGroundImage?: boolean;
  children: any;
  backgroundImageURL?: string;
}

const AppLayout: FC<AppLayoutProps> = ({
  name,
  noHeader,
  headerRight,
  headerRightSidePress,
  headerLeft,
  headerLeftSidePress,
  headerTitle,
  headerTitlePress,
  headerTitleCenter,
  noBackGroundImage,
  backgroundImageURL,
  children,
}) => {
  const setImage = (): ImageSourcePropType => {
    switch (name) {
      case 'login':
        return require('@assets/image/bg_login.png');
      case 'worry':
        return require('@assets/image/bg_worry.png');
      case 'chat':
        return require('@assets/image/bg_login.png');
      case 'home':
        if (backgroundImageURL) {
          console.log('bg url in app layout', backgroundImageURL);
          return {
            uri: backgroundImageURL,
          };
        } else {
          return require('@assets/image/bg_home.png');
        }
      case 'AddWorryComplete':
        return require('@assets/image/moons/addWorryComplete.gif');
      case 'review':
        return require('@assets/image/bg_home.png');
      default:
        return require('@assets/image/bg_login.png');
    }
  };

  return (
    <RootWrapper>
      {!noBackGroundImage ? (
        <RootImageWrapper source={setImage()}>
          {!noHeader ? (
            <Header
              title={headerTitle}
              titlePress={headerTitlePress}
              leftSide={headerLeft}
              rightSide={headerRight}
              rightSidePress={headerRightSidePress}
              leftSidePress={headerLeftSidePress}
              titleCenter={headerTitleCenter}
            />
          ) : null}
          {children}
        </RootImageWrapper>
      ) : (
        <RootBox>
          {!noHeader ? (
            <Header
              title={headerTitle}
              titlePress={headerTitlePress}
              leftSide={headerLeft}
              rightSide={headerRight}
              rightSidePress={headerRightSidePress}
              leftSidePress={headerLeftSidePress}
              titleCenter={headerTitleCenter}
            />
          ) : null}
          {children}
        </RootBox>
      )}
    </RootWrapper>
  );
};

export default AppLayout;

const RootWrapper = styled.SafeAreaView`
  flex: 1;
  background: ${theme.color.black};
  font-family: 'SUIT-Regular';
`;
const RootImageWrapper = styled.ImageBackground`
  width: 100%;
  height: 100%;
  padding: 0 24px 0 24px;
  // border: pink 1px;
`;

const RootBox = styled.View`
  width: 100%;
  height: 100%;
  padding: 0 24px 0 24px;
  background: ${theme.color.black};
`;
