import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../config/theme'

const SearchBar = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background, borderRadius: 10, padding: 10, margin: 10, borderStartColor: theme.colors.secondaryLight}}>
      <Text>SearchBar</Text>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})