import React, { forwardRef, memo, ReactElement } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { StyleSheet } from 'react-native';
import { theme } from '@lib/styles/palette';

interface BottomDrawerProps {
  children: ReactElement;
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
        container: styles.drawerWrapper,
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
  drawerWrapper: {
    backgroundColor: '#32323F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: theme.color.drawerBorder,
    borderWidth: 1,
  },
  drawerIcon: {
    backgroundColor: theme.color.drawerIcon,
    width: 52,
  },
});
