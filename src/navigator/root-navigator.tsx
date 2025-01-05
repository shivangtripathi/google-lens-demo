import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Tabs/Home';
import Recents from '../screens/Tabs/Recents';
import Notifications from '../screens/Tabs/Notifications';
import Menu from '../screens/Tabs/Menu';
import CustomTabBar from '../components/custom-tab-bar';
import CameraScreen from '../screens/Camera';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchPage from '../screens/Search';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator tabBar={CustomTabBar} screenOptions={{headerShown: false, tabBarShowLabel: false}} >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Recents" component={Recents} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} options={{animation:'fade'}} />
      <Stack.Screen name="SearchPage" component={SearchPage} options={{animation:'slide_from_bottom'}} />
    </Stack.Navigator>
  );
}