import React, { FC, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

import { responsiveWidth as wp } from '@lib/util/helper';

interface CustomeHeaderProps {
  headerRight?: ReactElement;
  headerLeft?: ReactElement;
  headerCenter?: ReactElement;
}

const CustomeHeader: FC<CustomeHeaderProps> = ({
  headerRight,
  headerLeft,
  headerCenter,
}) => {
  return (
    <Header
      containerStyle={styles.container}
      leftComponent={headerLeft}
      centerComponent={headerCenter}
      rightComponent={headerRight}
    />
  );
};

export default CustomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: 100,
    borderBottomWidth: 0,
    paddingHorizontal: wp('5%'),
  },
});
