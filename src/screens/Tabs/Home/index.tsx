import { StyleSheet, Text, TouchableOpacity, View, Dimensions, TouchableHighlight, TextInput, ScrollView, NativeSyntheticEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Camera, icons, Mic, Search } from 'lucide-react-native'
import Page from '../../../components/Page'
import { theme } from '../../../config/theme'
import CustomIconButton from '../../../components/custom-icon-button'
import CustomText from '../../../components/custom-text'
import SearchBar from '../../../components/search-bar'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming, Easing, interpolate, Extrapolation } from 'react-native-reanimated'
import CustomSectionBreak from '../../../components/custom-section-break'
import InfoCards from './components/info-cards'
import { useNavigation } from '@react-navigation/native'
import RecentSearchItem from '../../../components/recent-search-item'
import { RECENT_NEWS } from '../../../utils/static-news'
import NewsCard from '../../../components/news-card'
import auth from '@react-native-firebase/auth';
import { signInWithGoogle } from '../../../utils/auth'
import FastImage from 'react-native-fast-image'
import AccountsModal from './components/accounts-modal'
import { User } from '@react-native-google-signin/google-signin'


const {width, height} = Dimensions.get('screen');

const TopBar = ({handleAccountsModal}: {handleAccountsModal: () => void}) => {

  const user = auth().currentUser;
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const handleSignIn = async () => {
    const newUser = await signInWithGoogle();
    setCurrentUser(newUser);
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, backgroundColor: theme.colors.background}}>
      <CustomIconButton name="FlaskConical" size={30} onPress={() => {}} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={{color: theme.colors.text, fontSize: 16, fontWeight: 'bold'}}>Search</Text> */}
        </View>
        {currentUser ? 
        <TouchableOpacity onPress={handleAccountsModal}>
          <FastImage source={{uri: currentUser?.photoURL}} style={{width: 30, height: 30, borderRadius: 15}} /> 
        </TouchableOpacity>
          : 
          <CustomIconButton name="User" size={30} onPress={handleSignIn} />}
    </View>
  )
}

const options = [
  {
    name: 'Image',
    icon: 'Image',
    backgroundColor: theme.colors.secondaryYellow,
    foregroundColor: theme.colors.primaryYellow,
    onPress: () => {}
  },
  {
    name: 'Translate',
    icon: 'Languages',
    backgroundColor: theme.colors.secondaryBlue,
    foregroundColor: theme.colors.primaryBlue,
    onPress: () => {}
  },
  {
    name: 'Graduation',
    icon: 'GraduationCap',
    backgroundColor: theme.colors.secondaryGreen,
    foregroundColor: theme.colors.primaryGreen,
    onPress: () => {}
  },
  {
    name: 'Music',
    icon: 'Music',
    backgroundColor: theme.colors.secondaryRed,
    foregroundColor: theme.colors.primaryRed,
    onPress: () => {}
  }
];

const RenderOptions = ({item, index, optionHeight, optionWidth}: {item: any, index: number, optionHeight: number, optionWidth: number}) => {
  const Icon = icons[item.icon as keyof typeof icons];
  
  const left = useSharedValue((optionWidth-20) * (index ));
  const top = useSharedValue(20 * index);
  const opacity = useSharedValue(0);


  useEffect(() => {
    left.value = withTiming((optionWidth + 10) * (index ), {duration: 100 * (index + 1)});
    top.value = withTiming(0, {duration: 100 * (index + 1)});
    opacity.value = withTiming(1, {duration: 100 * (index + 1)});
  },[index]);

  const animationStyle = useAnimatedStyle(() => (
    {
    position: 'absolute',
    left: left.value,
    top: top.value,
    opacity: opacity.value
  }
  ));

  return (
    <Animated.View key={index+'-'+item.name} style={[animationStyle]}>
      <TouchableHighlight 
        onPress={item.onPress}
        activeOpacity={0.8}
        underlayColor={item.backgroundColor}
        style={{
          backgroundColor: item.backgroundColor,
          padding: 15,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          width: optionWidth,
          height: optionHeight
        }}>
        {<Icon size={24} color={item.foregroundColor} />}
      </TouchableHighlight>
    </Animated.View>
  )
}

const HomeScreen = () => {

  const ITEM_WIDTH = (width-50) / 4;
  const ITEM_HEIGHT = ITEM_WIDTH - 20;
  const navigation = useNavigation(); 
  const searchBarTopValue = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(true);

  const searchBarAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withTiming(searchBarTopValue.value, {duration: 200})}],
      opacity: interpolate(scrollY.value, [0, 100], [1, 0]),
    }
  },[searchBarTopValue, scrollY]);



  // Handle user state changes
  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      if(searchBarTopValue.value !== 0) {
        searchBarTopValue.value = withTiming(0, {duration: 200});
      }
    });

    return () => listener();
  }, []);

  const handleScroll = (event) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  }

  const searchBarMinified = useAnimatedStyle(() => {
    return {
      zIndex: scrollY.value > 100 ? 1000 : 0,
      position: 'absolute',
      opacity: interpolate(scrollY.value, [50, 100], [0, 1], Extrapolation.EXTEND),
      top: 0,
      marginHorizontal: 10,
      left: 0,
      right: 0
    }
  });

  const [isAccountsModalVisible, setIsAccountsModalVisible] = useState(false);

  const handleSearchBarPress = () => {
    searchBarTopValue.value = withTiming(-height/2, {duration: 1400});
    navigation.navigate('SearchPage');
    
    // setIsSearchModalVisible(true);
  }
  

  return (
      <Page style={{position:'relative'}}>
        <Animated.View 
      style={[{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, zIndex: 1000, 
      backgroundColor: theme.colors.secondary, borderRadius: 40, paddingHorizontal: 30, marginTop: 40}, 
      searchBarMinified]}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20}}>
        <TouchableOpacity onPress={handleSearchBarPress} activeOpacity={0.9} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 10}}> 
        <Search size={26} color={theme.colors.text} />
          <CustomText variant="muted" text="Search" style={[{textAlign: 'left', fontSize: 26}]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('VoiceSearch')}}>
          <Mic size={26} color={theme.colors.text} />
        </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('CameraScreen')}}>
            <Camera size={26} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}} onScroll={handleScroll} scrollEventThrottle={16}>
        <TopBar handleAccountsModal={() => setIsAccountsModalVisible(true)}/>
        <CustomText variant="heading" text="Google" style={{textAlign: 'center', fontSize: 38, letterSpacing: 1}} />
      <Animated.View 
      style={[{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, zIndex: 1000, 
      backgroundColor: theme.colors.secondary, borderRadius: 40, paddingHorizontal: 30, marginTop: 40}, 
      searchBarAnimation]}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20}}>
        <TouchableOpacity onPress={handleSearchBarPress} activeOpacity={0.9} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 10}}> 
        <Search size={26} color={theme.colors.text} />
          <CustomText variant="muted" text="Search" style={[{textAlign: 'left', fontSize: 26}]} />
        </TouchableOpacity>
        <Mic size={26} color={theme.colors.text} />
          <TouchableOpacity onPress={() => {navigation.navigate('CameraScreen')}}>
            <Camera size={26} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </Animated.View>
        <Animated.View style={{flexDirection: 'row', marginTop: 14, position:'relative', alignItems: 'center'}}>
          {options.map((item, index) => (
            <RenderOptions optionHeight={ITEM_HEIGHT} optionWidth={ITEM_WIDTH}  key={index+'-'+item.name} item={item} index={index} />
          ))} 
        </Animated.View>  
      <CustomSectionBreak style={{marginTop: ITEM_HEIGHT + 14}} /> 
      <Animated.FlatList ItemSeparatorComponent={() => <CustomSectionBreak />} scrollEnabled={false} ListHeaderComponent={<InfoCards />} data={RECENT_NEWS} contentContainerStyle={{ marginTop: 10, rowGap: 20 }} renderItem={({ item }) => <NewsCard news={item} />} />
      </Animated.ScrollView> 
      {isAccountsModalVisible && <AccountsModal hideModal={() => setIsAccountsModalVisible(false)} />}
      </Page>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})