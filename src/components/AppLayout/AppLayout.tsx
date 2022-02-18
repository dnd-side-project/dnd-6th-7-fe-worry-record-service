import React, { FC, ReactElement } from 'react';
import styled from 'styled-components/native';
import Header from '@components/Header';
import { theme } from '@lib/styles/palette';
import { ImageSourcePropType } from 'react-native';

interface AppLayoutProps {
  noHeader?: boolean;
  name: 'login' | 'worry' | 'chat' | 'home';
  headerRight?: ReactElement;
  headerRightSidePress?: () => void;
  headerLeft?: ReactElement;
  headerLeftSidePress?: () => void;
  headerTitle?: ReactElement;
  headerTitleCenter?: boolean;
  headerTitlePress?: () => void;
  children: any;
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
        return require('@assets/image/bg_home.png');

      default:
        return require('@assets/image/bg_login.png');
    }
  };

  return (
    <RootWrapper>
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
