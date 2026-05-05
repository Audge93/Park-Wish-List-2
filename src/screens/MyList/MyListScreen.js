import React, {useMemo, useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, SectionList, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {CATEGORY_LABELS} from '../../constants/categories';
import {useParkStore} from '../../stores/parkStore';
import {useListStore} from '../../stores/listStore';
import {groupBy} from '../../utils/filtering';
import ParkSwitcher from '../../components/ParkSwitcher';
import ListItemRow from '../../components/ListItemRow';
import DetailModal from '../../components/DetailModal';
import MapScreen from '../Map/MapScreen';

export default function MyListScreen() {
  const [view,setView]=useState('list'); const [grouping,setGrouping]=useState('category'); const [detail,setDetail]=useState(null); const [showDone,setShowDone]=useState(false);
  const activePark=useParkStore((s)=>s.activePark); const list=useListStore((s)=>s.getListForPark(activePark));
  const sections=useMemo(()=>{const incomplete=list.filter((i)=>!i.isCompleted); const grouped=groupBy(incomplete,(i)=>grouping==='category'?(CATEGORY_LABELS[i.category]||i.category):i.landName); return Object.keys(grouped).sort().map((title)=>({title,data:grouped[title]}));},[list,grouping]);
  const done=list.filter((i)=>i.isCompleted);
  if(view==='map') return <MapScreen myListMode onBackToList={()=>setView('list')} />;
  return <SafeAreaView style={styles.screen}><View style={styles.content}><View style={styles.header}><Text style={styles.title}>My Wish List</Text><TouchableOpacity onPress={()=>setView('map')}><Text style={styles.link}>Map ⊞</Text></TouchableOpacity></View><ParkSwitcher/><View style={styles.group}><TouchableOpacity onPress={()=>setGrouping('category')} style={[styles.groupBtn,grouping==='category'&&styles.groupActive]}><Text>By Category</Text></TouchableOpacity><TouchableOpacity onPress={()=>setGrouping('land')} style={[styles.groupBtn,grouping==='land'&&styles.groupActive]}><Text>By Land</Text></TouchableOpacity></View>{list.length===0?<Text style={styles.empty}>Your list is empty. Use Search or Map to add reminders.</Text>:<SectionList sections={sections} keyExtractor={(i)=>i.id} renderSectionHeader={({section})=><Text style={styles.section}>{section.title} ({section.data.length})</Text>} renderItem={({item})=><ListItemRow item={item} onPress={()=>setDetail(item)} />} ListFooterComponent={done.length?<View><TouchableOpacity onPress={()=>setShowDone(!showDone)}><Text style={styles.doneHeader}>Done ({done.length}) {showDone?'⌃':'⌄'}</Text></TouchableOpacity>{showDone?done.map((item)=><ListItemRow key={item.id} item={item} onPress={()=>setDetail(item)} />):null}</View>:null} />}</View><DetailModal item={detail} visible={!!detail} onClose={()=>setDetail(null)} /></SafeAreaView>
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:COLORS.background},content:{flex:1,padding:16},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},title:{fontSize:30,fontWeight:'900'},link:{color:COLORS.accentGold,fontWeight:'900',fontSize:16},group:{flexDirection:'row',alignSelf:'center',backgroundColor:COLORS.surface,borderRadius:14,padding:4,marginVertical:10},groupBtn:{paddingVertical:8,paddingHorizontal:18,borderRadius:12},groupActive:{backgroundColor:COLORS.white},section:{fontSize:17,fontWeight:'900',marginTop:16,marginBottom:4,color:COLORS.textPrimary},empty:{textAlign:'center',color:COLORS.textSecondary,marginTop:60,lineHeight:22},doneHeader:{fontSize:17,fontWeight:'900',color:COLORS.textSecondary,marginTop:24,paddingVertical:12}});
