import React, {useMemo, useState} from 'react';
import {SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {COLORS} from '../../constants/colors';
import {getPark} from '../../constants/parks';
import {useParkStore} from '../../stores/parkStore';
import {useListStore} from '../../stores/listStore';
import AttractionCard from '../../components/AttractionCard';
import ParkSwitcher from '../../components/ParkSwitcher';
import DetailModal from '../../components/DetailModal';

export default function HomeScreen({navigation}) {
  const [detail,setDetail]=useState(null);
  const activePark=useParkStore((s)=>s.activePark); const attractions=useParkStore((s)=>s.attractions); const addItem=useListStore((s)=>s.addItem); const list=useListStore((s)=>s.getListForPark(activePark));
  const incomplete=list.filter((i)=>!i.isCompleted); const park=getPark(activePark);
  const highlights=useMemo(()=>attractions.filter((a)=>a.parkSlug===activePark&&a.tier===1),[attractions,activePark]);
  return <SafeAreaView style={styles.screen}><ScrollView contentContainerStyle={styles.content}><View style={styles.header}><View><Text style={styles.logo}>✦ Wish List</Text><Text style={styles.tag}>Don’t miss a thing.</Text></View><TouchableOpacity onPress={()=>navigation.navigate('Settings')}><Text style={styles.gear}>⚙</Text></TouchableOpacity></View><ParkSwitcher />{incomplete.length?<Text style={styles.stat}>{incomplete.length} things planned for {park.name}</Text>:null}{incomplete.length?<><Text style={styles.section}>Your Wish List</Text><FlatList horizontal data={incomplete} keyExtractor={(i)=>i.id} showsHorizontalScrollIndicator={false} renderItem={({item})=><AttractionCard item={item} onPress={()=>setDetail(item)} />} /></>:null}<Text style={styles.section}>Park Highlights</Text><FlatList horizontal data={highlights} keyExtractor={(i)=>i.id} showsHorizontalScrollIndicator={false} renderItem={({item})=><AttractionCard item={item} onPress={()=>setDetail(item)} onAdd={()=>addItem(item)} />} /></ScrollView><DetailModal item={detail} visible={!!detail} onClose={()=>setDetail(null)} /></SafeAreaView>
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:COLORS.background},content:{padding:16,paddingBottom:24},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingTop:8},logo:{fontSize:28,fontWeight:'900',color:COLORS.textPrimary},tag:{color:COLORS.textSecondary,marginTop:2},gear:{fontSize:26,color:COLORS.textPrimary},stat:{fontSize:14,color:COLORS.textSecondary,marginTop:4},section:{fontSize:19,fontWeight:'900',color:COLORS.textPrimary,marginTop:22,marginBottom:12}});
