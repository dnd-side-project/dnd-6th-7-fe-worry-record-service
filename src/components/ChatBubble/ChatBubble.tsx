import React, { FC } from 'react';
import styled from 'styled-components/native';
import { View, Image, Text, TextInputProps } from 'react-native';

import { theme } from '@lib/styles/palette';
import IconSchedule from '@assets/image/schedule.svg';

type ChatBubbleProps = ChatViewProps & ChatTextAreaProps & TextInputProps;

interface ChatViewProps {
  width?: number;
}

interface ChatTextAreaProps {
  value: string;
  multiline?: boolean;
  editable?: boolean;
  height?: number;
}

const ChatBubble: FC<ChatBubbleProps> = ({
  value,
  width,
  height,
  multiline,
  editable,
  placeholder,
  placeholderTextColor,
  onPressIn,
}) => {
  return (
    <ChatView width={width}>
      <ChatTextArea
        height={height}
        multiline={multiline}
        editable={editable}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onPressIn={onPressIn}
      />
    </ChatView>
  );
};

export default ChatBubble;

const ChatView = styled.View<ChatViewProps>`
  ${({ width }) => {
    if (width) {
      return 'width:' + width + 'px';
    }
  }}
`;

const ChatTextArea = styled.TextInput<ChatTextAreaProps>`
  background: rgba(255, 255, 255, 0.01);
  color: ${theme.color.white};
  height: ${({ height }) => height || 192}px;
  border-radius: 10px;
  border: 1px solid ${theme.color.lightWhite};
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  padding: 14px;
`;
