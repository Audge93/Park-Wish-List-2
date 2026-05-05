import React, {useMemo, useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../constants/colors';
import {getPark} from '../../constants/parks';
import {useParkStore} from '../../stores/parkStore';
import {useListStore} from '../../stores/listStore';
import {filterAttractions} from '../../utils/filtering';
import CategoryChipsRow from '../../components/CategoryChipsRow';
import ParkSwitcher from '../../components/ParkSwitcher';
import DetailModal from '../../components/DetailModal';

const size=Dimensions.get('window').width-32;
export default function MapScreen({myListMode=false,onBackToList}) {
  const [filter,setFilter]=useState('all'); const [detail,setDetail]=useState(null); const [myOnly,setMyOnly]=useState(myListMode);
  const activePark=useParkStore((s)=>s.activePark); const attractions=useParkStore((s)=>s.attractions); const list=useListStore((s)=>s.getListForPark(activePark)); const addItem=useListStore((s)=>s.addItem);
  const park=getPark(activePark); const listIds=new Set(list.map((i)=>i.attractionId));
  const pins=useMemo(()=>{let base=filterAttractions(attractions,{parkSlug:activePark,category:filter}); if(myOnly) base=base.filter((a)=>listIds.has(a.id)); return base;},[attractions,activePark,filter,myOnly,listIds]);
  return <SafeAreaView style={styles.screen}><View style={styles.content}><View style={styles.header}>{onBackToList?<TouchableOpacity onPress={onBackToList}><Text style={styles.link}>≡ List</Text></TouchableOpacity>:<Text style={styles.title}>Map</Text>}<TouchableOpacity onPress={()=>setMyOnly(!myOnly)} style={[styles.myOnly,myOnly&&styles.myOnlyActive]}><Text style={myOnly&&{color:COLORS.white}}>♥ My List</Text></TouchableOpacity></View><ParkSwitcher/><CategoryChipsRow value={filter} onChange={setFilter}/><View style={[styles.map,{borderColor:park.themeColor}]}><Text style={styles.mapTitle}>{park.icon} {park.name}</Text><Text style={styles.mapSub}>Placeholder map image. Replace with 2048×2048 park art.</Text>{pins.map((pin)=>{const active=listIds.has(pin.id); const color=active?COLORS[pin.category]:COLORS.pinInactive; return <TouchableOpacity key={pin.id} style={[styles.pin,{left:pin.mapX*size-16,top:pin.mapY*size-16,backgroundColor:color, width:active?42:32, height:active?42:32, borderRadius:active?21:16, zIndex:active?5:1}]} onPress={()=>setDetail(pin)}><Text>{active?'♥':'•'}</Text></TouchableOpacity>})}</View>{!list.length?<Text style={styles.banner}>Add items to your list to highlight them on the map.</Text>:null}<Text style={styles.note}>Prototype: pins are tappable. Pan/zoom and custom static maps are marked for production implementation.</Text></View><DetailModal item={detail} visible={!!detail} onClose={()=>setDetail(null)} /></SafeAreaView>
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:COLORS.background},content:{padding:16,flex:1},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},title:{fontSize:30,fontWeight:'900'},link:{color:COLORS.accentGold,fontSize:18,fontWeight:'900'},myOnly:{backgroundColor:COLORS.white,borderWidth:1,borderColor:COLORS.surface,borderRadius:18,paddingHorizontal:14,paddingVertical:8},myOnlyActive:{backgroundColor:COLORS.accentGold,borderColor:COLORS.accentGold},map:{width:size,height:size,borderRadius:24,borderWidth:3,backgroundColor:COLORS.surface,overflow:'hidden',marginTop:10,alignSelf:'center'},mapTitle:{textAlign:'center',fontSize:24,fontWeight:'900',marginTop:24,color:COLORS.textPrimary},mapSub:{textAlign:'center',color:COLORS.textSecondary,marginTop:6,paddingHorizontal:30},pin:{position:'absolute',alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:COLORS.white},banner:{backgroundColor:'rgba(26,24,20,.82)',color:COLORS.white,textAlign:'center',padding:10,borderRadius:20,marginTop:12},note:{color:COLORS.textSecondary,textAlign:'center',marginTop:12,lineHeight:20}});
