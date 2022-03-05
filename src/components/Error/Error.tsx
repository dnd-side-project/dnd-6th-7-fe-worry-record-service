import React, { FC } from 'react';
import styled from 'styled-components/native';
import { theme } from '~/lib/styles/palette';

const CustomeError = (props: { error: Error; resetError: any }) => {
  return (
    <ErrorWrapper>
      <ErrorText>알 수없는 오류로</ErrorText>
      <ErrorText>걱정을 불러오지 못했어요</ErrorText>
    </ErrorWrapper>
  );
};

const ErrorWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ErrorText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${theme.color.lightGray};
`;

export default CustomeError;
