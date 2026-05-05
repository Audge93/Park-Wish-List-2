import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {COLORS} from './src/constants/colors';
import RootNavigator from './src/navigation/RootNavigator';
import {useParkStore} from './src/stores/parkStore';
import {useListStore} from './src/stores/listStore';
import {useSettingsStore} from './src/stores/settingsStore';
import {bootstrapAppData} from './src/services/bootstrap';

export default function App() {
  const [ready, setReady] = useState(false);
  const loadParks = useParkStore((s) => s.loadData);
  const loadLists = useListStore((s) => s.loadFromStorage);
  const loadSettings = useSettingsStore((s) => s.loadFromStorage);

  useEffect(() => {
    async function boot() {
      await bootstrapAppData();
      await loadSettings();
      await loadParks();
      await loadLists();
      setReady(true);
    }
    boot();
  }, [loadParks, loadLists, loadSettings]);

  if (!ready) {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background}}>
          <ActivityIndicator color={COLORS.accentGold} />
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
