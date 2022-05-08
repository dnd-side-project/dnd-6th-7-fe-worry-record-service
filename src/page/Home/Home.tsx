import React, { FC, useCallback, useState } from 'react';

import AppLayout from '@components/AppLayout';
import Home from '@components/Home';
import { HomeProps } from '~/types/Navigation';

import IconSetting from '@assets/image/settings.svg';
import { CHANGE_MODE_SETTING } from '~/context/reducer/archive';
import { useSceneDispatch } from '~/context/ArchiveContext';

const HomePage: FC<HomeProps> = ({ navigation }) => {
  const tag = '[HomePage]';
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const dispatch = useSceneDispatch();
  const onPressSetting = useCallback(() => {
    console.log(tag, 'onPressSetting');
    dispatch({ type: CHANGE_MODE_SETTING, values: { isSetting: true } });
    navigation.navigate('Setting');
  }, [navigation, dispatch]);

  return (
    <AppLayout
      name="home"
      headerRight={<IconSetting />}
      backgroundImageURL={backgroundImageUrl}
      headerRightSidePress={onPressSetting}
    >
      <Home setBackgroundImageUrl={setBackgroundImageUrl} />
    </AppLayout>
  );
};

export default HomePage;
