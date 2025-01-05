import { StyleSheet, Text, View, Image, Platform, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera'
import {launchImageLibrary} from 'react-native-image-picker';
import {theme} from '../../config/theme'
import { ArrowLeft, ChevronLast, ChevronLeft, Ellipsis, History, Image as ImageIcon, Search, Zap, ZapOff } from 'lucide-react-native'
import CustomText from '../../components/custom-text'
import LinearGradient from 'react-native-linear-gradient'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useAppState } from '@react-native-community/hooks'
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image'
import CustomIconButton from '../../components/custom-icon-button'

const {width, height} = Dimensions.get('screen');


const RenderImage = ({url} : {url: string}) => {
  return <Image source={{uri: url}} style={[StyleSheet.absoluteFillObject, styles.previewImage]} />
}

const CameraScreen = () => {

  const [enableFlash, setEnableFlash] = useState(false);

  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    console.log(permission);
  }

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1
      });
      if(result.assets) {
        setImageUrl(result.assets[0].uri!);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const device = useCameraDevice('back')
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState("");
  const { hasPermission } = useCameraPermission();
  const camera = useRef<Camera>(null)

  const isFocused = useIsFocused()
  const appState = useAppState()
  const isActive = isFocused && appState === "active" 

  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  useLayoutEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
    }
  }, [navigation]);

  useEffect(() => {
    if(!hasPermission) {
      requestCameraPermission();
    } if(hasPermission) {
      setHasCameraPermission(true);
    }
  }, [hasPermission]);

  const takePhoto = async () => {
    if(camera.current) {
      const photo = await camera.current.takePhoto({
        flash: enableFlash ? 'on' : 'off'
      })
      const result = await fetch(`file://${photo.path}`)
      // const data = await result.blob(); 
      setImageUrl(`file://${photo.path}`);
    }
  }

  const goBack = () => {
    if(imageUrl) {
     setImageUrl("")
    } else {
      navigation.goBack()
    }
  }

  const bottomSheetRef = useRef<BottomSheet>(null);
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => ({id : index+'-'+Math.random().toString(36).substring(2), imageUrl: `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/${Math.floor(width*0.4)}/200`, text: `${Math.random().toString(36).substring(2)}`})),
    []
  );
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const showScannerFrame = useSharedValue(0);

  const handleSheetChange = useCallback((index) => {
    if(index > 0) {
      showScannerFrame.value = withTiming(0, {duration: 10});
    } else {
      showScannerFrame.value = withTiming(1, {duration: 10});
    }
  }, []);

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  
  const handleClosePress = useCallback(() => {
    setImageUrl("");
    bottomSheetRef.current?.close();
  }, []);
  
  const renderItem = 
    ({ item }: { item: { id: string; imageUrl: string; text: string } }) => {
      return (
      <View>
        <FastImage resizeMode='contain' source={{uri: item.imageUrl}} style={styles.itemImage} />
        <CustomText variant="text" text={item.text} style={styles.itemText} />
      </View>
    )};

  const animatedScannerFrame = useAnimatedStyle(() => ({
    opacity: showScannerFrame.value === 0 ? 0 : 1,
    width: withTiming(imageUrl ? 250 : 250),
    height: withTiming(imageUrl ? 250 : 250),
  }));



  //if ios simulator render an image
  if(!hasCameraPermission || !device) {
    return (
      <View style={styles.rootView}>
        <CustomText 
          variant="heading" 
          text="Camera not available" 
          style={styles.unavailableText} 
        />
      </View>
    )
  }

  const handlePanGesture = (event: PanGestureHandlerGestureEvent) => {
    console.log(event);
  }

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <View style={styles.rootView}>
        <LinearGradient
          colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.6)', 'transparent']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.linearGradient}
        >
          <View style={styles.header}>
            <View style={styles.headerLeftSection}>
              <TouchableOpacity style={styles.headerButton} onPress={goBack}>
                <ChevronLeft size={24} color={theme.colors.text} />
              </TouchableOpacity>
              {enableFlash ? (
                <CustomIconButton 
                  name="ZapOff"
                  style={{backgroundColor: "transparent"}}
                  color={theme.colors.text}
                  onPress={() => setEnableFlash(false)}
                />
              ) : (
                <CustomIconButton 
                  name="Zap"
                  style={{backgroundColor: "transparent"}}
                  color={theme.colors.text}
                  onPress={() => setEnableFlash(true)}
                />
              )}
            </View>
            <View style={styles.headerTitleSection}>
              <CustomText variant="heading" text="Google" style={styles.titleText} />
              <CustomText variant="muted" text="Lens" style={styles.subtitleText} />
            </View>
            <View style={styles.headerRightSection}>
              <History size={24} color={theme.colors.text} />
              <Ellipsis size={24} color={theme.colors.text} />
            </View>
          </View>
        </LinearGradient>
        <Animated.View style={[styles.scannerFrame, animatedScannerFrame]}>
          <View style={[styles.cornerFrame, styles.topLeftCorner]} />
          <View style={[styles.cornerFrame, styles.topRightCorner]} />
          <View style={[styles.cornerFrame, styles.bottomLeftCorner]} />
          <View style={[styles.cornerFrame, styles.bottomRightCorner]} />
        </Animated.View>


        {imageUrl ? (
         <View style={styles.rootView}>
            <Animated.View style={styles.rootView}>
              <RenderImage url={imageUrl} />
              
            </Animated.View>
            <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            handleIndicatorStyle={{backgroundColor:theme.colors.secondaryLight}}
            handleStyle={{backgroundColor: theme.colors.secondary}}
            enablePanDownToClose={true}
            onClose={handleClosePress}
            onChange={handleSheetChange}
            style={styles.bottomSheet}
            
          >
            <BottomSheetFlatList
              data={data}
              keyExtractor={(i) => i.id}
              renderItem={renderItem}
              contentContainerStyle={styles.bottomSheetFlatList}
            />
          </BottomSheet>
          </View>
        
        ) : (
          <View style={styles.rootView}>  
          <Camera
            style={StyleSheet.absoluteFill}
            ref={camera}
            device={device}
            photo={true}
            isActive={isActive}
          />
          <View style={styles.bottomControls}>
          <TouchableOpacity onPress={pickImage} style={styles.sideButton}>
            <ImageIcon size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
            <View style={styles.captureButtonInner}>
              <Search size={28} color={theme.colors.secondary} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity disabled style={[styles.sideButton, styles.invisibleButton]}>
            <Search size={30} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
          </View>
        )}


        
      </View>
    </GestureHandlerRootView>
  )
}

export default CameraScreen

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  previewImage: {
    marginBottom: '20%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  bottomSheet: {
    backgroundColor: theme.colors.secondary,
    borderTopLeftRadius: 40,

    borderTopRightRadius: 40
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 80,
    zIndex: 1
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 0
  },
  headerLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  headerRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  headerTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  headerButton: {
    padding: 5
  },
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    color: theme.colors.text
  },
  subtitleText: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: -16,
    color: theme.colors.text
  },
  unavailableText: {
    textAlign: 'center',
    fontSize: 20,
    color: theme.colors.text
  },
  scannerFrame: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{translateX: -125}, {translateY: -125}],
    zIndex: 1
  },
  cornerFrame: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: theme.colors.text,
    opacity: 0.8
  },
  topLeftCorner: {
    top: 0,
    left: 0,
    borderTopLeftRadius: 36,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  topRightCorner: {
    top: 0,
    right: 0,
    borderTopRightRadius: 36,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bottomLeftCorner: {
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: 36,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bottomRightCorner: {
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 36,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  bottomControls: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 40,
    marginBottom: 20,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    alignItems: 'center'
  },
  sideButton: {
    backgroundColor: theme.colors.primary,
    opacity: 0.8,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  invisibleButton: {
    opacity: 0
  },
  captureButton: {
    height: 76,
    width: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.text
  },
  captureButtonInner: {
    backgroundColor: theme.colors.text,
    height: 68,
    width: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: theme.colors.primary
  },
  bottomSheetFlatList: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 20,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  itemText: {
    textAlign: 'center',
    fontSize: 16,
    color: theme.colors.text
  },
  itemImage: {
    width: width * 0.4,
    height: 200,
    borderRadius: 10
  }
})
