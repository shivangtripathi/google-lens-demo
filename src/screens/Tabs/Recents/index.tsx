import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Ellipsis, Footprints} from 'lucide-react-native'
import Page from '../../../components/Page'
import CustomText from '../../../components/custom-text'
import CustomIconButton from '../../../components/custom-icon-button'

const Recents = () => {
  return (
    <Page>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 40, paddingHorizontal: 10, marginTop: 10}}>
        <CustomText variant="heading" text="History" />
        <CustomIconButton onPress={() => {}} name="Ellipsis" size={26} />
      </View>
      <View style={{flex: 1, rowGap: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 26}}>
        {/* <Image source={require('../../../assets/images/empty-notifications.png')} resizeMode='contain' style={{width: 300, height: 200}} /> */}
        <CustomText variant="text" text="No recent activity" style={{fontSize: 20}} />
        <CustomText variant="text" text="" style={{ fontSize: 14, textAlign: 'center'}} />
      </View>
    </Page>
  )
}

export default Recents

const styles = StyleSheet.create({})