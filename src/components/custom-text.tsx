//create different text styles
import { StyleSheet, Text, TextProps, TextStyle, View } from 'react-native'
import React from 'react'
import { theme } from '../config/theme'

interface Variants {
  text: string
  heading: string
  subheading: string
  small: string
  muted: string
  mutedSmall: string
  bold: string
}


const CustomText = ({ variant, text, style, ...props }: { variant: keyof Variants; text: string; style?: any; props?: any }) => {
  return (
      <Text style={[styles[variant], style]} {...props}>{text}</Text>
  )
}

export default CustomText

const styles: { [key in keyof Variants]: TextStyle } = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text
  },
  small: {
    fontSize: 14,
    color: theme.colors.text
  },
  muted: {
    fontSize: 16,
    color: theme.colors.textSecondary
  },
  mutedSmall: {
    fontSize: 14,
    color: theme.colors.textSecondary
  },
  bold: {
    fontWeight: 'bold'
  }
})