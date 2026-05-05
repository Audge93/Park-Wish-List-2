import React from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {PARKS} from '../constants/parks';
import {COLORS} from '../constants/colors';
import {useParkStore} from '../stores/parkStore';
import {useSettingsStore} from '../stores/settingsStore';

export default function ParkSwitcher() {
  const activePark = useParkStore((s) => s.activePark);
  const setActivePark = useParkStore((s) => s.setActivePark);
  const setLastActivePark = useSettingsStore((s) => s.setLastActivePark);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {PARKS.map((park) => {
        const active = park.slug === activePark;
        return (
          <TouchableOpacity key={park.slug} style={[styles.pill, active && styles.active]} onPress={() => {setActivePark(park.slug); setLastActivePark(park.slug);}}>
            <Text style={[styles.text, active && styles.activeText]}>{park.shortName}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({row:{gap:8, paddingVertical:8}, pill:{height:36, paddingHorizontal:16, borderRadius:18, backgroundColor:COLORS.surface, alignItems:'center', justifyContent:'center'}, active:{backgroundColor:COLORS.accentGold}, text:{color:COLORS.textSecondary, fontWeight:'600'}, activeText:{color:COLORS.white, fontWeight:'800'}});
