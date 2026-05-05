import React, {useMemo, useState} from 'react';
import {SafeAreaView, View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {COLORS} from '../../constants/colors';
import {useParkStore} from '../../stores/parkStore';
import {useListStore} from '../../stores/listStore';
import {filterAttractions} from '../../utils/filtering';
import CategoryChipsRow from '../../components/CategoryChipsRow';
import SearchResultRow from '../../components/SearchResultRow';
import AttractionCard from '../../components/AttractionCard';
import ParkSwitcher from '../../components/ParkSwitcher';
import DetailModal from '../../components/DetailModal';

export default function SearchScreen({navigation}) {
  const [query,setQuery]=useState(''); const [filter,setFilter]=useState('all'); const [mode,setMode]=useState('search'); const [detail,setDetail]=useState(null);
  const activePark=useParkStore((s)=>s.activePark); const attractions=useParkStore((s)=>s.attractions); const addItem=useListStore((s)=>s.addItem);
  const results=useMemo(()=>filterAttractions(attractions,{parkSlug:activePark,query,category:filter}),[attractions,activePark,query,filter]);
  const collections=useMemo(()=>[
    ['Must-Do Rides', results.filter((a)=>a.category==='ride'&&a.tier===1)],
    ['Iconic Eats', results.filter((a)=>a.category==='dining'&&a.tier===1)],
    ['Meet Your Favorites', results.filter((a)=>a.category==='meet_greet')],
    ['Don’t Miss the Shows', results.filter((a)=>a.category==='show')],
    ['Only Here Experiences', results.filter((a)=>a.category==='experience')],
  ].filter(([,items])=>items.length),[results]);
  const onAdd=async(item)=>{const added=await addItem(item); if(item.category==='dining') setDetail(item);};
  return <SafeAreaView style={styles.screen}><View style={styles.content}><Text style={styles.title}>Search</Text><TextInput value={query} onChangeText={setQuery} placeholder="Search rides, food, experiences..." style={styles.search}/><ParkSwitcher/><CategoryChipsRow value={filter} onChange={setFilter}/><View style={styles.toggle}><TouchableOpacity onPress={()=>setMode('search')}><Text style={[styles.toggleText,mode==='search'&&styles.activeToggle]}>Browse</Text></TouchableOpacity><TouchableOpacity onPress={()=>setMode('discover')}><Text style={[styles.toggleText,mode==='discover'&&styles.activeToggle]}>Discover</Text></TouchableOpacity></View>{mode==='search'?<FlatList data={results} keyExtractor={(i)=>i.id} renderItem={({item})=><SearchResultRow item={item} onPress={()=>setDetail(item)} onAdd={()=>onAdd(item)} />} ListEmptyComponent={<Text style={styles.empty}>No results. Try another search or category.</Text>} />:<ScrollView>{collections.map(([title,items])=><View key={title}><Text style={styles.section}>{title}</Text><FlatList horizontal data={items} keyExtractor={(i)=>i.id} showsHorizontalScrollIndicator={false} renderItem={({item})=><AttractionCard item={item} onPress={()=>setDetail(item)} onAdd={()=>onAdd(item)} />} /></View>)}</ScrollView>}</View><TouchableOpacity style={styles.fab} onPress={()=>navigation.navigate('AddCustomItem')}><Text style={styles.fabText}>+</Text></TouchableOpacity><DetailModal item={detail} visible={!!detail} onClose={()=>setDetail(null)} /></SafeAreaView>
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:COLORS.background},content:{flex:1,padding:16},title:{fontSize:30,fontWeight:'900'},search:{height:48,borderRadius:12,backgroundColor:COLORS.surface,paddingHorizontal:14,marginTop:14,fontSize:16},toggle:{flexDirection:'row',justifyContent:'flex-end',gap:18,marginVertical:4},toggleText:{color:COLORS.textSecondary,fontWeight:'800'},activeToggle:{color:COLORS.accentGold},empty:{color:COLORS.textSecondary,textAlign:'center',marginTop:40},section:{fontSize:18,fontWeight:'900',marginVertical:12},fab:{position:'absolute',right:16,bottom:24,width:56,height:56,borderRadius:28,backgroundColor:COLORS.accentGold,alignItems:'center',justifyContent:'center',elevation:4},fabText:{fontSize:34,color:COLORS.textPrimary,fontWeight:'300'}});
