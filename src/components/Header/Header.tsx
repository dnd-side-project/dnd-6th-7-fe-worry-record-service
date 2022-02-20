import React, { FC, ReactElement } from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface AppHeaderProps {
  title?: ReactElement;
  titlePress?: () => void;
  titleCenter?: boolean;
  rightSide?: ReactElement;
  rightSidePress?: () => void;
  leftSide?: ReactElement;
  leftSidePress?: () => void;
}

const AppHeader: FC<AppHeaderProps> = ({
  title,
  titlePress,
  titleCenter,
  rightSide,
  rightSidePress,
  leftSide,
  leftSidePress,
}) => {
  return (
    <HeaderWrapper>
      {leftSide && <LeftButton onPress={leftSidePress}>{leftSide}</LeftButton>}
      <CenterWrapper titleCenter={titleCenter}>
        <CenterButton onPress={titlePress} disabled={titlePress ? false : true}>
          {title}
        </CenterButton>
      </CenterWrapper>
      {rightSide && (
        <RightButton onPress={rightSidePress}>{rightSide}</RightButton>
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.View`
  // border: pink;
  flex-direction: row;
  height: 71px;
`;

const CenterWrapper = styled.View<AppHeaderProps>`
  justify-content: center;
  margin: 0 21px;
  flex: 1;
  ${({ titleCenter }) => titleCenter && 'align-items: center;'}
`;

const CenterButton = styled.TouchableOpacity`
  justify-content: center;
`;

const LeftButton = styled.TouchableOpacity`
  justify-content: center;
`;

const RightButton = styled.TouchableOpacity`
  justify-content: center;
`;

export default AppHeader;
