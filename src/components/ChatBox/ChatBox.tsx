import React, { FC } from 'react';
import styled from 'styled-components/native';

import { theme } from '@lib/styles/palette';

interface ChatBoxProps {
  multiline?: boolean;
  editable?: boolean;
  height?: number;
  bgColor?: string;
  value: string;
}

const ChatBox: FC<ChatBoxProps> = ({
  multiline,
  editable,
  value,
  height,
  bgColor,
}) => {
  return (
    <CardTextArea
      bgColor={bgColor}
      height={height}
      multiline={multiline}
      editable={editable}
      value={value}
    />
  );
};

export default ChatBox;

const CardTextArea = styled.TextInput<ChatBoxProps>`
  height: ${({ height }) => height || 192}px;
  border-radius: 20px;
  border: 1px solid ${theme.color.lightWhite};
  color: ${theme.color.white};
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  text-align-vertical: top;
  padding: 16px 20px;
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
`;
