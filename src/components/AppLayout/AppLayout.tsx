import React, { FC, ReactElement } from 'react';
import styled from 'styled-components/native';
import Header from '@components/Header';
import { theme } from '@lib/styles/palette';
import { ImageSourcePropType } from 'react-native';

interface AppLayoutProps {
  noHeader?: boolean;
  name: 'login' | 'worry' | 'chat';
  headerRight?: ReactElement;
  headerLeft?: ReactElement;
  headerCenter?: ReactElement;
  children: any;
}

const AppLayout: FC<AppLayoutProps> = ({
  name,
  noHeader,
  headerRight,
  headerLeft,
  headerCenter,
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

      default:
        return require('@assets/image/bg_login.png');
    }
  };

  return (
    <RootWrapper>
      <RootImageWrapper source={setImage()}>
        {!noHeader ? (
          <Header
            headerLeft={headerLeft}
            headerRight={headerRight}
            headerCenter={headerCenter}
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
  padding: 32px 24px 32px 24px;
`;
