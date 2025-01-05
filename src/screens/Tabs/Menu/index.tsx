import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Ellipsis, Footprints, Star, Grid, Music, Search, FlaskConical, Sparkles, SquareSquare } from 'lucide-react-native'
import Page from '../../../components/Page'
import CustomText from '../../../components/custom-text'
import CustomIconButton from '../../../components/custom-icon-button'
import { theme } from '../../../config/theme'

const menuItems = [
  { title: 'Gemini', icon: Sparkles },
  { title: 'Search Labs', icon: FlaskConical },
  { title: 'Search text in an image', icon: Search },
  { title: 'Song Search', icon: Music },
  { title: 'Change app icon', icon: Grid },
  { title: 'Add Search widget', icon: SquareSquare },
];  

const Menu = () => {
  return (
    <Page>
      <View style={styles.header}>
        <CustomText variant="heading" text="More" />
      </View>
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <item.icon color="#81a3f9" size={28} />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
     
    </Page>
  )
}

export default Menu

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderRadius: 40, 
    paddingHorizontal: 10, 
    marginTop: 10
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 10,
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: theme.colors.secondary,
    padding: 16,
    borderRadius: 18,
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  menuText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
  },
})