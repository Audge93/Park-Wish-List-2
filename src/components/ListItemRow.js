import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../constants/colors';
import {CATEGORY_ICONS} from '../constants/categories';
import {useListStore} from '../stores/listStore';
import {createId} from '../utils/ids';

export default function ListItemRow({item,onPress}) {
  const completeItem=useListStore((s)=>s.completeItem);
  const removeItem=useListStore((s)=>s.removeItem);
  const completeSubItem=useListStore((s)=>s.completeSubItem);
  const addSubItem=useListStore((s)=>s.addSubItem);
  const [expanded,setExpanded]=useState(false);
  const [newSub,setNewSub]=useState('');
  const color=COLORS[item.category]||COLORS.accentGold;
  return <View><TouchableOpacity style={styles.row} onPress={onPress}><View style={[styles.pin,{backgroundColor:color}]}><Text>{CATEGORY_ICONS[item.category]}</Text></View><View style={styles.middle}><Text numberOfLines={1} style={[styles.name,item.isCompleted&&styles.done]}>{item.name}</Text><Text style={styles.meta}>{item.landName}{item.priority==='must_do'?' • Must Do ⭐':''}{item.subItems?.length?` • ${item.subItems.length} items`:''}</Text>{item.category==='dining'?<TouchableOpacity onPress={()=>setExpanded(!expanded)}><Text style={styles.expand}>{expanded?'Hide items':'Show items'}</Text></TouchableOpacity>:null}</View><TouchableOpacity onPress={()=>completeItem(item.id,!item.isCompleted)} style={[styles.check,item.isCompleted&&styles.checked]}><Text style={styles.checkText}>{item.isCompleted?'✓':''}</Text></TouchableOpacity><TouchableOpacity onPress={()=>removeItem(item.id)} style={styles.remove}><Text style={styles.removeText}>×</Text></TouchableOpacity></TouchableOpacity>{expanded&&<View style={styles.subBox}>{item.subItems.map((s)=><TouchableOpacity key={s.id} style={styles.subRow} onPress={()=>completeSubItem(item.id,s.id)}><Text style={[styles.subName,s.isCompleted&&styles.done]}>{s.isCompleted?'✓':'○'} {s.name}</Text></TouchableOpacity>)}<View style={styles.addSub}><TextInput value={newSub} onChangeText={setNewSub} placeholder="Add another item" style={styles.input}/><TouchableOpacity onPress={()=>{if(newSub.trim()){addSubItem(item.id,{id:createId('sub'),name:newSub.trim()});setNewSub('')}}}><Text style={styles.addSubText}>Add</Text></TouchableOpacity></View></View>}</View>
}
const styles=StyleSheet.create({row:{minHeight:74,flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:COLORS.surface,paddingVertical:8},pin:{width:38,height:38,borderRadius:19,alignItems:'center',justifyContent:'center',marginRight:12},middle:{flex:1},name:{fontSize:16,fontWeight:'800',color:COLORS.textPrimary},meta:{fontSize:13,color:COLORS.textSecondary,marginTop:3},expand:{fontSize:12,color:COLORS.accentGold,marginTop:4,fontWeight:'700'},check:{width:30,height:30,borderRadius:15,borderWidth:2,borderColor:COLORS.pinInactive,alignItems:'center',justifyContent:'center',marginLeft:8},checked:{backgroundColor:COLORS.accentGold,borderColor:COLORS.accentGold},checkText:{color:COLORS.white,fontWeight:'900'},remove:{width:30,alignItems:'center'},removeText:{fontSize:24,color:COLORS.error},done:{textDecorationLine:'line-through',color:COLORS.textSecondary},subBox:{paddingLeft:54,paddingBottom:12,backgroundColor:COLORS.background},subRow:{paddingVertical:8},subName:{color:COLORS.textPrimary},addSub:{flexDirection:'row',alignItems:'center',gap:8},input:{flex:1,backgroundColor:COLORS.surface,borderRadius:10,paddingHorizontal:12,height:40},addSubText:{color:COLORS.accentGold,fontWeight:'800'}});
