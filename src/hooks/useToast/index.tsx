import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Platform, StyleSheet, View, Text} from 'react-native';
import {colors} from '../../styles';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Toast {
  title: string;
  message: string;
  type: string;
}

interface Context {
  data: Toast;
  change: (toast: Toast) => void;
}

const ToastContext = React.createContext<Context>({
  data: {
    title: '',
    message: '',
    type: '',
  },
  change: () => {},
});

export const ToastProvider: React.FunctionComponent = ({children}) => {
  const [toast, setToast] = useState({
    title: '',
    message: '',
    type: '',
  });

  return (
    <ToastContext.Provider value={{data: toast, change: setToast}}>
      {children}
    </ToastContext.Provider>
  );
};

const ANIMATION_OUT_DURATION = 500;

export const ToastComponent: React.FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const context = useContext(ToastContext);
  const [visible, setVisible] = useState(false);

  const clearToast = useCallback(() => {
    context.change({
      title: '',
      message: '',
      type: '',
    });
  }, [context]);

  useEffect(() => {
    if (context.data.title) {
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 2500);
    }
  }, [context.data.title, clearToast]);

  return (
    <Modal
      animationIn="slideInDown"
      animationOut="slideOutUp"
      animationOutTiming={ANIMATION_OUT_DURATION}
      coverScreen={false}
      hasBackdrop={false}
      isVisible={visible}
      onModalHide={clearToast}
      onSwipeComplete={() => setVisible(false)}
      style={[styles.root, {marginTop: insets.top + 20}]}
      swipeDirection={['up']}
      swipeThreshold={30}
      useNativeDriver>
      <View
        style={[
          styles.snackbar,
          context.data.type === 'success' && styles.snackbarSuccess,
        ]}>
        <Text defaultBold white>
          {context.data.title}
        </Text>
        <Text extraSmall white>
          {context.data.message}
        </Text>
      </View>
    </Modal>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);

  return (
    title: string,
    message: string,
    type: 'success' | 'error' = 'error',
  ) => {
    context.change({
      title,
      message,
      type,
    });
  };
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
    marginHorizontal: 35,
  },
  snackbar: {
    borderRadius: 15,
    padding: 15,
    color: 'white',
    backgroundColor: colors.error,
  },
  snackbarSuccess: {
    backgroundColor: colors.mainGreen,
  },
});

export default useToast;
