import React from 'react';
import RNModal from 'react-native-modal';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../styles';

interface Props {
  visible: boolean;
  close: () => void;
}

const Modal: React.FunctionComponent<Props> = (props) => {
  const insets = useSafeAreaInsets();

  return (
    <RNModal
      isVisible={props.visible}
      onSwipeComplete={props.close}
      swipeDirection={['down']}
      backdropOpacity={0.35}
      style={styles.view}>
      <View style={[styles.body, {paddingBottom: insets.bottom + 35}]}>
        <View style={styles.centerH}>
          <View style={styles.tick} />
        </View>
        {props.children}
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  centerH:{
    alignItems: 'center',
  },
  body: {
    padding: 30,
    paddingTop:10,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tick: {
    width: 50,
    height: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
  },
});

export default Modal;
