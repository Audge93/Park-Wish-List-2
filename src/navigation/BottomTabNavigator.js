import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import MyListScreen from '../screens/MyList/MyListScreen';
import MapScreen from '../screens/Map/MapScreen';
import {COLORS} from '../constants/colors';

const Tab = createBottomTabNavigator();
const icons = {Home:'⌂', Search:'⌕', 'My List':'♡', Map:'⌖'};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={({route})=>({
      headerShown:false,
      tabBarStyle:{height:64,backgroundColor:COLORS.background,borderTopColor:COLORS.surface},
      tabBarActiveTintColor:COLORS.accentGold,
      tabBarInactiveTintColor:COLORS.textSecondary,
      tabBarIcon:({color})=><Text style={{fontSize:22,color}}>{icons[route.name]}</Text>,
      tabBarLabelStyle:{fontWeight:'700', marginBottom:6},
    })}>
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Search" component={SearchScreen}/>
      <Tab.Screen name="My List" component={MyListScreen}/>
      <Tab.Screen name="Map" component={MapScreen}/>
    </Tab.Navigator>
  );
}
