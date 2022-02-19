/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';

import CustomeTabs from '@components/Tabs';
import AppLayout from '@components/AppLayout';
import Worries from '@components/Worries';

import { ArchiveProps } from '~/types/Navigation';
import { useSceneState, useSceneDispatch } from '@context/ArchiveContext';

import { INIT, FILTER_TAG } from '~/context/reducer/archive';

const Archive: FC<ArchiveProps> = ({ navigation }) => {
  const tag = '[Archive]';

  const dispatch = useSceneDispatch();
  const { index } = useSceneState();

  const firstRoute = () => <Worries />;
  const secondRoute = () => <Worries />;

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

  const onPressTabs = (idx: number) => {
    console.log(tag, 'onPressTabs');
    dispatch({ type: INIT, values: { idx } });
  };

  useEffect(() => {
    dispatch({ type: INIT });
    dispatch({ type: FILTER_TAG, values: { tag: '모든걱정' } });
  }, []);

  return (
    <AppLayout noHeader name="worry">
      <CustomeTabs tabItems={DUMMY} index={index} onChangeIndex={onPressTabs} />
    </AppLayout>
  );
};

export default Archive;
