import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {theme} from '../config/theme'


const Page = ({ children, style }: { children: React.ReactNode, style?: StyleProp<ViewStyle> }) => {
  return (
    <SafeAreaView style={[styles.root, style]}>
      {children}
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 10
  }
})