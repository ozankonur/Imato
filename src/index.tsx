import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import './styles';
import App from './modules/app/screens/home';
import {ToastComponent, ToastProvider} from './hooks/useToast';
import {ScrollView} from 'react-native-gesture-handler';

const Main = () => (
  <SafeAreaProvider >
    <ToastProvider>
      <ToastComponent />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <App />
      </ScrollView>
    </ToastProvider>
  </SafeAreaProvider>
);

export default Main;
