import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {CATEGORY_ICONS} from '../constants/categories';
import {useListStore} from '../stores/listStore';
export default function SearchResultRow({item,onPress,onAdd}) {
  const isOnList = useListStore((s)=>s.isOnList(item.id,item.parkSlug));
  const color=COLORS[item.category]||COLORS.accentGold;
  return <TouchableOpacity style={styles.row} onPress={onPress}><View style={[styles.pin,{backgroundColor:color}]}><Text>{CATEGORY_ICONS[item.category]}</Text></View><View style={styles.middle}><Text style={styles.name}>{item.name}</Text><Text style={styles.meta}>{item.landName}{item.lightningLane?' • ⚡ Lightning Lane':''}</Text></View><TouchableOpacity onPress={onAdd} style={styles.add}><Text style={[styles.addText,isOnList&&{color:COLORS.accentGold}]}>{isOnList?'✓':'+'}</Text></TouchableOpacity></TouchableOpacity>
}
const styles=StyleSheet.create({row:{height:68,flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:COLORS.surface},pin:{width:36,height:36,borderRadius:18,alignItems:'center',justifyContent:'center',marginRight:12},middle:{flex:1},name:{fontSize:16,fontWeight:'800',color:COLORS.textPrimary},meta:{fontSize:13,color:COLORS.textSecondary,marginTop:3},add:{width:42,height:42,alignItems:'center',justifyContent:'center'},addText:{fontSize:28,color:COLORS.textSecondary,fontWeight:'300'}});
