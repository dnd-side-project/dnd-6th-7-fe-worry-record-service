import React, { FC } from 'react';
import styled from 'styled-components/native';
import { View, Image, Text, StyleSheet } from 'react-native';

import CustomButton from '@components/Button';
import ChatBox from '@components/ChatBox';
import ChatBubble from '@components/ChatBubble';

import { theme } from '@lib/styles/palette';
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
} from '@lib/util/helper';

interface AddWorryProps {
  navigation?: any;
}

const AddWorry: FC<AddWorryProps> = ({ navigation }) => {
  return (
    <WorriesWrapper>
      <View style={style.addWorryContainer}>
        <View style={style.chatConatiner}>
          <ChatBubble
            value="무슨 일 있어?"
            width={106}
            height={42}
            editable={false}
          />
        </View>
        <View style={style.replyBoxConatiner}>
          <ChatBubble
            value="걱정이 있ssssssasdasdsadasdsss s나요?"
            height={42}
            editable={true}
          />
        </View>
      </View>
    </WorriesWrapper>
  );
};

export default AddWorry;

const WorriesWrapper = styled.View`
  border: 0;
`;

const style = StyleSheet.create({
  addWorryContainer: {
    flexDirection: 'column',
    height: '100%',
  },
  chatConatiner: {
    margin: 0,
  },
  replyBoxConatiner: {
    width: '100%',
    position: 'absolute',
    bottom: 300,
  },
});
