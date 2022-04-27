import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';

import CustomButton from '@components/Button';
import ChatBox from '@components/ChatBox';
import ChatBubble from '@components/ChatBubble';
import ChatBoxWithButton from '@components/ChatBoxWithButton';
import AddWorrySetting from '@components/AddWorrySetting';
import IconSchedule from '@assets/image/schedule.svg';

import { theme } from '@lib/styles/palette';
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
} from '@lib/util/helper';
import { values } from 'lodash';
import { useAuth } from '~/context/AuthContext';

interface AddWorryProps {
  navigation?: any;
}

const AddWorry: FC<AddWorryProps> = ({ navigation }) => {
  const { userInfo } = useAuth();
  const [worryText, setWorryText] = useState('');

  const [chatMode, setChatMode] = useState(0);
  // const [settingMode, setSettingMode] = useState(0);

  return (
    <>
      <>
        <WorriesWrapper>
          <View style={style.chatConatiner}>
            <ChatBubble
              value={'무슨 일 있어?'}
              width={106}
              height={42}
              editable={false}
            />
          </View>
        </WorriesWrapper>
        <KeyboardAvoidingView
          style={style.replyBoxConatiner}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={style.chatBubbleContainer}>
            {chatMode === 0 ? (
              <ChatBubble
                value={''}
                height={48}
                // padding={16}
                background={'rgba(0, 0, 0, 0.3);'}
                // editable={true}
                placeholder={'걱정이 있나요?'}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                onPressIn={() => setChatMode(1)}
              />
            ) : (
              <ChatBoxWithButton
                value={worryText}
                setValue={setWorryText}
                placeholder={''}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                onBlur={() => {
                  if (worryText.length === 0) {
                    setChatMode(0);
                  }
                }}
                onTouchStart={() =>
                  navigation.navigate('AddWorrySetting', {
                    worryText: worryText,
                  })
                }
                settingIcon={<IconSchedule />}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </>
    </>
  );
};

export default AddWorry;

const WorriesWrapper = styled.View`
  border: 0;
`;

const style = StyleSheet.create({
  addWorryContainer: {
    flexDirection: 'column',
  },
  chatConatiner: {
    margin: 0,
  },
  replyBoxConatiner: {
    flex: 1,
    width: wp(100),
    position: 'absolute',
    bottom: 0,
    marginBottom: 8,
  },
  chatBubbleContainer: {
    padding: 24,
    marginBottom: 26,
  },
});
