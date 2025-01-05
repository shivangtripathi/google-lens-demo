import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme } from '../config/theme';
import { Clock, Search } from 'lucide-react-native';
import CustomText from './custom-text';

interface IRecentSearchItemProps {
  search: string;
  history: boolean;
  handlePress: () => void;
}

const RecentSearchItem = ({search, history, handlePress}: IRecentSearchItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress} style={{flexDirection: 'row', columnGap: 20, alignItems:"center"}}>
      <View style={{width: 30, height: 30, backgroundColor: theme.colors.secondary, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
        {history ? <Clock size={16} color={theme.colors.secondaryLight} /> : <Search size={16} color={theme.colors.secondaryLight} />}
      </View>
      <CustomText variant="subheading" text={search} style={{fontSize: 18}} />
    </TouchableOpacity>
  )
}

export default RecentSearchItem

const styles = StyleSheet.create({})