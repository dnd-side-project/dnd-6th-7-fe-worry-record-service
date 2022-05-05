import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components/native';

import AppLayout from '@components/AppLayout';

import { SettingProps } from '~/types/Navigation';

import { theme } from '@lib/styles/palette';
import ArrowLeft from '@assets/image/arrow_left.svg';
import { Switch } from 'react-native-elements/dist/switch/switch';
import { useAuth } from '~/context/AuthContext';

const Setting: FC<SettingProps> = ({ navigation }) => {
  const tag = '[Setting]';

  const [switchPush, setSwitchPush] = useState(false);
  const { logout } = useAuth();
  const onPressBack = useCallback(() => {
    console.log(tag, 'onPressBack');
    navigation.goBack();
  }, [navigation]);

  const onChangePush = useCallback(() => {
    console.log(tag, 'onChangePush');
    setSwitchPush(!switchPush);
  }, [switchPush]);

  const onPressLogout = useCallback(() => {
    console.log(tag, 'onPressLogout');

    // mutation 이용해서 업데이트
    // 홈화면으로 보내기
    logout();
  }, [logout]);

  return (
    <AppLayout
      name="review"
      noBackGroundImage={true}
      headerLeft={<ArrowLeft />}
      headerLeftSidePress={onPressBack}
      headerTitle={<Headeritle>설정</Headeritle>}
    >
      <RowFirstWrapper>
        <Label>앱 버전</Label>
        <Label>1.1.0</Label>
      </RowFirstWrapper>
      <RowWrapper>
        <Label>PUSH 설정</Label>
        <PushSwitch
          onChange={onChangePush}
          value={switchPush}
          trackColor={{
            true: 'rgba(52, 49, 165, 1)',
            false: theme.color.white,
          }}
        />
      </RowWrapper>
      <RowWrapper>
        <LogoutButton onPress={onPressLogout}>
          <Label>로그아웃</Label>
        </LogoutButton>
      </RowWrapper>
    </AppLayout>
  );
};

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 14px 0;
`;

const RowFirstWrapper = styled(RowWrapper)`
  margin-top: 44px;
`;

const Headeritle = styled.Text`
  font-size: 26px;
  color: ${theme.color.white};
  font-weight: bold;
`;

const PushSwitch = styled(Switch)`
  margin: 0;
  padding: 0;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: ${theme.color.white};
`;

const LogoutButton = styled.TouchableOpacity``;

export default Setting;
