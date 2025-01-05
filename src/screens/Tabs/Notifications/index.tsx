import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Ellipsis, Footprints} from 'lucide-react-native'
import Page from '../../../components/Page'
import CustomText from '../../../components/custom-text'
import CustomIconButton from '../../../components/custom-icon-button'

const Notifications = () => {
  return (
    <Page>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 40, paddingHorizontal: 10, marginTop: 10}}>
        <CustomText variant="heading" text="Notifications" />
        <CustomIconButton onPress={() => {}} name="Ellipsis" size={26} />
      </View>
      <View style={{flex: 1, rowGap: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 26}}>
        <Image source={require('../../../assets/images/empty-notifications.png')} resizeMode='contain' style={{width: 300, height: 200}} />
        <CustomText variant="text" text="No recent notifications" style={{fontSize: 20}} />
        <CustomText variant="text" text="Follow topics as you search to get updates on the things you care about" style={{ fontSize: 14, textAlign: 'center'}} />
      </View>
    </Page>
  )
}

export default Notifications

const styles = StyleSheet.create({})