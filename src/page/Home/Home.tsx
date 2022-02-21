import React, { FC, useCallback } from 'react';

import AppLayout from '@components/AppLayout';
import Home from '@components/Home';
import { HomeProps } from '~/types/Navigation';

import IconSetting from '@assets/image/settings.svg';

const HomePage: FC<HomeProps> = ({ navigation }) => {
  const tag = '[HomePage]';

  const onPressSetting = useCallback(() => {
    console.log(tag, 'onPressSetting');
    navigation.navigate('Setting');
  }, [navigation]);

  return (
    <AppLayout
      name="home"
      headerRight={<IconSetting />}
      headerRightSidePress={onPressSetting}
    >
      <Home username="유저" worryRatio={98} worryTerm={10} numWorries={7} />
    </AppLayout>
  );
};

export default HomePage;
