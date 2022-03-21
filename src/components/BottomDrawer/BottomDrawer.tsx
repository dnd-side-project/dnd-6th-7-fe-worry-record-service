import React, { forwardRef, memo, ReactElement } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { StyleSheet } from 'react-native';
import { theme } from '@lib/styles/palette';
import { responsiveHeight as hp } from '~/lib/util/helper';

interface BottomDrawerProps {
  children: ReactElement;
  height?: number;
}

const BottomDrawer = forwardRef<any, BottomDrawerProps>((props, ref) => {
  return (
    <RBSheet
      ref={ref}
      animationType="slide"
      closeOnDragDown={true}
      closeOnPressMask={false}
      openDuration={250}
      closeDuration={250}
      customStyles={{
        wrapper: styles.drawerContainer,
        draggableIcon: styles.drawerIcon,
        container: dynimcStyles(props.height ? props.height : 35).drawerWrapper,
      }}
    >
      {props.children}
    </RBSheet>
  );
});

export default memo(BottomDrawer);

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: 'transparent',
  },

  drawerIcon: {
    backgroundColor: theme.color.drawerIcon,
    width: 52,
  },
});

const dynimcStyles = (height: number) =>
  StyleSheet.create({
    drawerWrapper: {
      backgroundColor: '#32323F',
      height: hp(height),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: theme.color.drawerBorder,
      borderWidth: 1,
    },
  });
