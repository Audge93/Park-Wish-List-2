import React, {useMemo} from 'react';
import {SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {getPark} from '../../constants/parks';
import {useParkStore} from '../../stores/parkStore';
import {useListStore} from '../../stores/listStore';
import {useSettingsStore} from '../../stores/settingsStore';
import AttractionCard from '../../components/AttractionCard';
export default function FirstItemScreen({navigation}) {
  const activePark=useParkStore((s)=>s.activePark);
  const attractions=useParkStore((s)=>s.attractions);
  const addItem=useListStore((s)=>s.addItem);
  const completeOnboarding=useSettingsStore((s)=>s.completeOnboarding);
  const park=getPark(activePark);
  const highlights=useMemo(()=>attractions.filter((a)=>a.parkSlug===activePark&&a.tier===1),[attractions,activePark]);
  const finish=async()=>{await completeOnboarding(); navigation.reset({index:0,routes:[{name:'MainTabs'}]});};
  return <SafeAreaView style={styles.screen}><Text style={styles.title}>What’s the one thing you can’t miss?</Text><Text style={styles.sub}>{park.name} has so much to offer. Start with one thing.</Text><View style={styles.trip}><Text style={styles.tripTitle}>📅 When are you visiting {park.name}?</Text><Text style={styles.tripSub}>Prototype placeholder: trip date picker will be wired during native date-picker setup.</Text></View><FlatList horizontal data={highlights} keyExtractor={(i)=>i.id} showsHorizontalScrollIndicator={false} renderItem={({item})=><AttractionCard item={item} onPress={()=>{}} onAdd={()=>addItem(item)} />} contentContainerStyle={{paddingVertical:20}}/><TouchableOpacity style={styles.button} onPress={finish}><Text style={styles.buttonText}>Take me to my list ✨</Text></TouchableOpacity></SafeAreaView>
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:COLORS.background,padding:16,paddingTop:60},title:{fontSize:28,fontWeight:'900'},sub:{fontSize:16,color:COLORS.textSecondary,marginTop:8},trip:{backgroundColor:COLORS.surface,borderRadius:16,padding:16,marginTop:20},tripTitle:{fontWeight:'900',fontSize:16,color:COLORS.textPrimary},tripSub:{color:COLORS.textSecondary,marginTop:6},button:{height:56,borderRadius:12,backgroundColor:COLORS.accentGold,alignItems:'center',justifyContent:'center',marginBottom:16},buttonText:{fontWeight:'900',fontSize:16,color:COLORS.textPrimary}});
