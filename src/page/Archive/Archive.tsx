import React, { FC, useState } from 'react';

import CustomeTabs from '@components/Tabs';
import AppLayout from '@components/AppLayout';
import Worries from '@components/Worries';

import { ArchiveProps } from '~/types/Navigation';
import { useSceneState } from '@context/ArchiveContext';

const Archive: FC<ArchiveProps> = ({ navigation }) => {
  const tag = '[Archive]';

  const { worries } = useSceneState();
  const [index, setIndex] = useState(0);

  const firstRoute = () => (
    <Worries
      counts={worries.filter(worry => !worry.isDone).length}
      worries={worries.filter(worry => !worry.isDone)}
    />
  );
  const secondRoute = () => (
    <Worries
      counts={worries.filter(worry => worry.isDone).length}
      worries={worries.filter(worry => worry.isDone)}
    />
  );

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

  return (
    <AppLayout noHeader name="worry">
      <CustomeTabs
        tabItems={DUMMY}
        index={index}
        onChangeIndex={i => setIndex(i)}
      />
    </AppLayout>
  );
};

export default Archive;
