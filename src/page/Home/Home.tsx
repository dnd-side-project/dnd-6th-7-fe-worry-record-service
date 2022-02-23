import React, { FC } from 'react';

import AppLayout from '@components/AppLayout';
import Home from '@components/Home';
import { HomeProps } from '~/types/Navigation';

import IconSetting from '@assets/image/settings.svg';

const HomePage: FC<HomeProps> = ({ navigation }) => {
  return (
    <AppLayout
      name="home"
      headerRight={<IconSetting />}
      noBackGroundImage={false}
    >
      <Home username="유저" worryRatio={98} worryTerm={10} numWorries={7} />
    </AppLayout>
  );
};

export default HomePage;
