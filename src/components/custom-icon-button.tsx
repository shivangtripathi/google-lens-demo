import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import {icons} from 'lucide-react-native';
import { theme } from '../config/theme'

const CustomIconButton = ({ name, style, onPress, color, size }: { name: keyof typeof icons, style?: StyleProp<ViewStyle>, onPress: () => void, color?: string, size?: number } ) => {

  const Icon = icons[name];

  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.root, style]} onPress={onPress}>
      <Icon size={size || 24} color={color || theme.colors.secondaryLight} />
    </TouchableOpacity>
  )
}

export default CustomIconButton

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.background,
    padding: 10,
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
})