import React, { FC, useCallback, useState } from 'react';

import AppLayout from '@components/AppLayout';
import Home from '@components/Home';
import { HomeProps } from '~/types/Navigation';

import IconSetting from '@assets/image/settings.svg';

const HomePage: FC<HomeProps> = ({ navigation }) => {
  const tag = '[HomePage]';
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  const onPressSetting = useCallback(() => {
    console.log(tag, 'onPressSetting');
    navigation.navigate('Setting');
  }, [navigation]);

  return (
    <AppLayout
      name='home'
      headerRight={<IconSetting />}
      backgroundImageURL={backgroundImageUrl}
      headerRightSidePress={onPressSetting}
    >
      <Home setBackgroundImageUrl={setBackgroundImageUrl} />
    </AppLayout>
  );
};

export default HomePage;
