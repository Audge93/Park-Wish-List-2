import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {PARKS} from '../../constants/parks';
import {COLORS} from '../../constants/colors';
import {useParkStore} from '../../stores/parkStore';
import {useSettingsStore} from '../../stores/settingsStore';
export default function ParkSelectScreen({navigation}) {
  const setActivePark=useParkStore((s)=>s.setActivePark);
  const setLastActivePark=useSettingsStore((s)=>s.setLastActivePark);
  return <SafeAreaView style={styles.screen}><Text style={styles.title}>Which park are you planning first?</Text><Text style={styles.sub}>You can switch parks anytime.</Text><View style={styles.grid}>{PARKS.map((p)=><TouchableOpacity key={p.slug} style={[styles.tile,{backgroundColor:p.themeColor}]} onPress={()=>{setActivePark(p.slug);setLastActivePark(p.slug);navigation.navigate('FirstItem')}}><Text style={styles.icon}>{p.icon}</Text><Text style={styles.short}>{p.shortName}</Text><Text style={styles.name}>{p.name}</Text></TouchableOpacity>)}</View></SafeAreaView>
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:COLORS.background,padding:16,paddingTop:60},title:{fontSize:28,fontWeight:'900',color:COLORS.textPrimary},sub:{fontSize:16,color:COLORS.textSecondary,marginTop:8},grid:{flexDirection:'row',flexWrap:'wrap',gap:16,marginTop:28},tile:{width:'47%',height:180,borderRadius:16,padding:16,justifyContent:'flex-end'},icon:{fontSize:42},short:{fontSize:22,fontWeight:'900',color:COLORS.white,marginTop:8},name:{fontSize:14,color:'rgba(255,255,255,.75)',marginTop:2}});
