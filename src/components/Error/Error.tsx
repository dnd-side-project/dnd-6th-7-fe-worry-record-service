import React, { FC } from 'react';
import styled from 'styled-components/native';
import { theme } from '~/lib/styles/palette';

const CustomeError: any = (props: { error: Error; resetError: any }) => {
  return (
    <ErrorWrapper>
      <ErrorText>{props.error.message}</ErrorText>
      <ErrorText>알 수 없는 오류로</ErrorText>
      <ErrorText>걱정을 불러오지 못했어요</ErrorText>
    </ErrorWrapper>
  );
};

const ErrorWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${theme.color.black};
`;
const ErrorText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${theme.color.lightGray};
`;

export default CustomeError;
