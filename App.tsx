import React, { useEffect } from 'react'
import MainTabs from './src/navigator/root-navigator'
import { NavigationContainer } from '@react-navigation/native'
import RootPage from './src/components/Page';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from './src/config/theme';


const App = () => {

  useEffect(() => {
    StatusBar.setBackgroundColor(theme.colors.background);
  }, []);


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})