import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabs from './BottomTabNavigator';
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import ParkSelectScreen from '../screens/Onboarding/ParkSelectScreen';
import FirstItemScreen from '../screens/Onboarding/FirstItemScreen';
import AddCustomItemScreen from '../screens/AddCustomItem/AddCustomItemScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import {useSettingsStore} from '../stores/settingsStore';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const hasSeenOnboarding = useSettingsStore((s) => s.hasSeenOnboarding);
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      {!hasSeenOnboarding ? (
        <Stack.Group>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="ParkSelect" component={ParkSelectScreen} />
          <Stack.Screen name="FirstItem" component={FirstItemScreen} />
        </Stack.Group>
      ) : null}
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="AddCustomItem" component={AddCustomItemScreen} options={{presentation:'modal'}} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
