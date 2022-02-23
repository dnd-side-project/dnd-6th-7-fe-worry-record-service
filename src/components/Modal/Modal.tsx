import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import { responsiveWidth as wp } from '@lib/util/helper';

interface CustomeModalProps {
  children: any;
  visible: boolean;
}

const CustomeModal: FC<CustomeModalProps> = ({ visible, children }) => {
  return <Modal isVisible={visible}>{children}</Modal>;
};

export default CustomeModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: 100,
    borderBottomWidth: 0,
    paddingHorizontal: wp('5%'),
  },
});
