import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import AuthNavigation from './src/navigation/AuthNavigation';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1D1E1E'
  },
};


export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthNavigation />
    </NavigationContainer>
  );
}
