import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import LoginScreen from './pages/LoginScreen';
import { Provider } from 'react-redux'
import Store from './redux/Store/configureStore'
import FirstStack from './navigations/FirstStack';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  LogBox.ignoreAllLogs()

  return (
    <RootSiblingParent>
      <Provider store={Store}>
        <FirstStack />
      </Provider>
    </RootSiblingParent>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
