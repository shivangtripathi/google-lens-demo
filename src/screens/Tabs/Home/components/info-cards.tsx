import { StyleSheet, Text,Dimensions, TouchableHighlight, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import { theme } from '../../../../config/theme'
import CustomText from '../../../../components/custom-text';
import { Settings } from 'lucide-react-native';

const {width} = Dimensions.get('screen');

interface InfoCard {
  type: string
  title: string
  description: string
  value?: number
  min?: number
  max?: number
}

const infoCards: InfoCard[] = [
  {
    type: 'AQI',
    title: 'Air quality',
    description: 'Very poor',
    value: 348
  },{
    type: 'Weather',
    title: 'Gurugram',
    description: 'Sunny',
    min: 20,
    max: 30,
    value: 25
  },{
    type: 'Settings',
    title: 'Settings',
    description: 'Customize your space',
  }]

const RenderInfoCards = ({card, index, itemWidth, itemHeight}: {card: InfoCard, index: number, itemWidth: number, itemHeight: number}) => {

  const cardStyle = {
    ...styles.card,
    height: itemHeight,
    width: itemWidth
  };

  const commonProps = {
    style: cardStyle,
    underlayColor: theme.colors.secondary,
    activeOpacity: 0.8,
    onPress: () => {}
  };

  const renderCardContent = () => {
    switch (card.type) {
      case 'Settings':
        return (
          <View style={{justifyContent: 'space-between', gap: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 14}}>
              <Settings size={20} color={theme.colors.primaryBlue} />
              <CustomText variant="subheading" text={card.title} style={{fontSize: 14, color: theme.colors.primaryBlue}} />
            </View>
            <CustomText variant="heading" text={card.description} style={{fontSize: 12, color: theme.colors.secondaryLight}} />
          </View>
        );

      case 'AQI':
        return (
          <View style={{alignItems: 'flex-start', justifyContent: 'space-between', gap: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <CustomText variant="subheading" text={card.title} style={{fontSize: 14}} />
              <View style={{width: 3, height: 3, borderRadius: 3, backgroundColor: theme.colors.text, marginHorizontal: 4}} />
              <CustomText variant="heading" text={card.value!.toString()} style={{fontSize: 14}} />
            </View>
            <View>
            <CustomText variant="heading" text={card.description} style={{fontSize: 16}} />
            </View>
          </View>
        );

      default:
        return (
          <View style={{justifyContent: 'space-between', gap: 20}}>
            <CustomText variant="subheading" text={card.title} style={{fontSize: 14}} />
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <CustomText variant="heading" text={card.value!.toString() + '°'} style={{fontSize: 18, marginRight: 4}} />
              <CustomText variant="heading" text={card.max!.toString() + '°'} style={{fontSize: 12, color: theme.colors.secondaryLight }} />
              <CustomText variant="heading" text={'/ '+card.min!.toString() + '°'} style={{fontSize: 12, color: theme.colors.secondaryLight}} />
            </View>
          </View>
        );
    }
  };

  return (
    <TouchableHighlight {...commonProps}>
      {renderCardContent()}
    </TouchableHighlight>
  );
}

const InfoCards = () => {
  const ITEM_WIDTH = (width-70) / 2;
  const ITEM_HEIGHT = 90;
  return (
    <Animated.FlatList bounces={false} scrollToOverflowEnabled={false} showsHorizontalScrollIndicator={false} horizontal entering={FadeIn.duration(100).delay(150)} contentContainerStyle={{gap: 12}} data={infoCards} renderItem={({item, index}) => <RenderInfoCards itemWidth={ITEM_WIDTH} itemHeight={ITEM_HEIGHT} card={item} index={index} />} />
  )
}

export default InfoCards

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    alignSelf: 'flex-start'
  }
})