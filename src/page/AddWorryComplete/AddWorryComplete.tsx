/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { FC } from 'react';

import AddWorryComplete from '@components/AddWorryComplete';
import AppLayout from '@components/AppLayout';

const AddWorryCompletePage = ({ route, navigation }) => {
  const { worryExpiryDate } = route?.params;

  return (
    <AppLayout noBackGroundImage={false} name={'AddWorryComplete'}>
      <AddWorryComplete
        worryExpiryDate={new Date(worryExpiryDate)}
        navigation={navigation}
      />
    </AppLayout>
  );
};

export default AddWorryCompletePage;
