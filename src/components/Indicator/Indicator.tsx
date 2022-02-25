import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '~/lib/styles/palette';

const Indicator: FC = () => {
  return (
    <IndiCatorWrapper>
      <ActivityIndicator size="large" color={theme.color.white} />
    </IndiCatorWrapper>
  );
};

const IndiCatorWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Indicator;
