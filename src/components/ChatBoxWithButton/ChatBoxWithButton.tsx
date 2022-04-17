import React, { FC } from 'react';
import styled from 'styled-components/native';
import { View, Image, Text, TextInputProps, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

import { theme } from '@lib/styles/palette';
import IconSchedule from '@assets/image/schedule.svg';
import { placeholderName } from '~/../template.config';

interface ChatBoxWithButtonProps {
  value: string;
  placeholder: string;
  placeholderTextColor: string;
  setValue: (text: string) => void;
  onBlur: () => void;
  setSettingMode: (a: number) => void;
  settingIcon?: SVGRectElement;
}

const ChatBoxWithButton: FC<ChatBoxWithButtonProps> = ({
  value,
  placeholder,
  placeholderTextColor,
  setValue,
  onBlur,
  setSettingMode,
  settingIcon,
}) => {
  return (
    <ChatView>
      {/* <ChatTextArea
        multiline={true}
        value={value}
        onTextInput={text => setValue(text)}
        onBlur={onBlur}
      /> */}
      <MaskedView maskElement={<ChatTextArea multiline={true} value={value} />}>
        <GradientView colors={['#ffffff00', '#ffffff']}>
          <ChatTextAreaTransparent
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            multiline={true}
            value={value}
            onChangeText={text => setValue(text)}
            onBlur={onBlur}
          />
        </GradientView>
      </MaskedView>
      {settingIcon && (
        <IconView onTouchStart={() => setSettingMode(1)}>
          {settingIcon}
        </IconView>
      )}
    </ChatView>
  );
};

export default ChatBoxWithButton;

const IconView = styled.View`
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: 1px solid ${theme.color.lightWhite};
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  width: 45px;
  height: 45px;
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const ChatView = styled.View`
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: 1px solid ${theme.color.lightWhite};
  justify-content: space-between;
  flex-direction: row;
`;

const ChatTextArea = styled.TextInput`
  // 디버깅용으로 테두리 해놨음 지워야함
  z-index: 10;
  width: 250px;
  color: ${theme.color.white};
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  min-height: 45px;
  max-height: 88px;
`;

const ChatTextAreaTransparent = styled.TextInput`
  // 디버깅용으로 테두리 해놨음 지워야함
  // border: 1px solid ${theme.color.lightWhite};
  // background: #ff0000;
  opacity: 0;
  z-index: 10;
  width: 250px;
  color: ${theme.color.white};
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  min-height: 45px;
  max-height: 88px;
`;

const GradientView = styled(LinearGradient)`
  width: 250px;
  min-height: 45px;
  max-height: 88px;
`;
