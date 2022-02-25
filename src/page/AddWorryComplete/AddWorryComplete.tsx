/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { View, Image, Text, Switch, StyleSheet } from 'react-native';
import { Button, ButtonGroup, withTheme } from 'react-native-elements';

import { theme } from '@lib/styles/palette';

import AddWorryComplete from '@components/AddWorryComplete';
import AppLayout from '@components/AppLayout';

const AddWorryCompletePage = ({ route, navigation }) => {
  const { worryExpiryDate } = route?.params;

  return (
    <AppLayout noBackGroundImage={false} name={'AddWorryComplete'}>
      <AddWorryComplete
        worryExpiryDate={worryExpiryDate}
        navigation={navigation}
      />
    </AppLayout>
  );
};

export default AddWorryCompletePage;
