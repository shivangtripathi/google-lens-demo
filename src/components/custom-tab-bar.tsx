import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Home, Clock, Bell, Menu } from 'lucide-react-native'
import Animated, { withSpring } from 'react-native-reanimated';
import { theme } from '../config';

const CustomTabBar = ({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIcon = () => {
          switch (route.name) {
            case 'Home':
              return isFocused ? <Home size={24} color={theme.colors.tabBarActive} /> : <Home size={24} color={theme.colors.tabBarInactive} />;
            case 'Recents':
              return isFocused ? <Clock size={24} color={theme.colors.tabBarActive} /> : <Clock size={24} color={theme.colors.tabBarInactive} />;
            case 'Notifications':
              return isFocused ? <Bell size={24} fill={theme.colors.tabBarActive} color={theme.colors.tabBarActive} /> : <Bell size={24} color={theme.colors.tabBarInactive} />;
            case 'Menu':
              return isFocused ? <Menu size={24} color={theme.colors.tabBarActive} /> : <Menu size={24} color={theme.colors.tabBarInactive} />;
            default:
              return null;
          }
        };

        return (
          <Pressable
            key={index}
            onPress={onPress}
            style={[
              styles.tabButton,
              isFocused && styles.focusedTab
            ]}
            android_ripple={{ color: '#ddd', borderless: true }}
          >
            {getIcon()}
          </Pressable>
        );
      })}
    </View>
  );
};

export default CustomTabBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  tabButton: {
    alignItems: 'center',
    width: 80,
    height: 36,
    borderRadius: 20,
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#000',
  },
  focusedTab: {
    backgroundColor: theme.colors.tabBarActiveBackground,
  },
  focusedText: {
    color: '#fff',
  },
})