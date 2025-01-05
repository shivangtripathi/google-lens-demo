import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { theme } from '../config/theme'

const CustomSectionBreak = ({style}: {style?: ViewStyle}) => {
  return (
    <View style={[{height: 1, marginHorizontal: -10, backgroundColor: theme.colors.borderLight, marginVertical: 20},style]} />
  )
}

export default CustomSectionBreak

const styles = StyleSheet.create({})