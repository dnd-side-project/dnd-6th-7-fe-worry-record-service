import React, { FC, useState } from 'react';
import { Switch } from 'react-native-elements';

import CustomeTabs from '@components/Tabs';
import AppLayout from '@components/AppLayout';
import Worries from '@components/Worries';

import { ArchiveProps } from '~/types/Navigation';
import { USEFUL_WORRIES, WORRIES_LEFT } from '~/constants/WorriesData';

import styled from 'styled-components/native';

import {
  responsiveFontSizeByValue as fontSizeByValue,
  getHeightDevice as heightDevice,
  responsiveWidth as wp,
} from '@lib/util/helper';
import { theme } from '@lib/styles/palette';
import IconSetting from '@assets/image/settings.svg';

const firstRoute = () => <Worries counts={4} worries={WORRIES_LEFT} />;
const secondRoute = () => <Worries counts={7} worries={USEFUL_WORRIES} />;

const DUMMY = [
  {
    id: '0',
    title: '요즘 걱정,',
    component: firstRoute,
  },
  {
    id: '1',
    title: '지난 걱정',
    component: secondRoute,
  },
];

const Home: FC<ArchiveProps> = ({ navigation }) => {
  const [tabs, setTabs] = useState(DUMMY);
  const [index, setIndex] = useState(0);

  return (
    <AppLayout noHeader name="worry">
      <CustomeTabs
        tabItems={tabs}
        index={index}
        onChangeIndex={i => setIndex(i)}
      />
    </AppLayout>
  );
};

export default Home;
