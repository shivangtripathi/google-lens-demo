import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { theme } from '../config/theme'

const CustomButton = ({ children, style, onPress }: { children: React.ReactNode, style?: StyleProp<ViewStyle>, onPress: () => void } ) => {
  return (
    <TouchableOpacity style={[styles.root, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 10
  }
})