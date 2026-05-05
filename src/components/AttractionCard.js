import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {CATEGORY_ICONS, CATEGORY_LABELS} from '../constants/categories';
import {useListStore} from '../stores/listStore';

export default function AttractionCard({item, onPress, onAdd}) {
  const isOnList = useListStore((s) => item?.id ? s.isOnList(item.id, item.parkSlug) : false);
  const color = COLORS[item.category] || COLORS.accentGold;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.image, {backgroundColor: color}]}><Text style={styles.bigIcon}>{CATEGORY_ICONS[item.category]}</Text></View>
      <View style={styles.body}>
        <View style={[styles.badge,{backgroundColor: color}]}><Text style={styles.badgeText}>{CATEGORY_LABELS[item.category] || item.category}</Text></View>
        <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.land}>{item.landName}</Text>
        {onAdd ? <TouchableOpacity onPress={onAdd} style={styles.add}><Text style={styles.addText}>{isOnList ? '✓ Added' : '+ Add'}</Text></TouchableOpacity> : null}
      </View>
    </TouchableOpacity>
  );
}
const styles=StyleSheet.create({card:{width:164,height:220,borderRadius:16,backgroundColor:COLORS.white,overflow:'hidden',marginRight:12,elevation:2,shadowOpacity:.08,shadowRadius:8},image:{height:88,alignItems:'center',justifyContent:'center'},bigIcon:{fontSize:40},body:{padding:12,flex:1},badge:{alignSelf:'flex-start',paddingHorizontal:8,paddingVertical:3,borderRadius:10,marginBottom:8},badgeText:{color:COLORS.white,fontSize:11,fontWeight:'700'},name:{fontSize:15,fontWeight:'800',color:COLORS.textPrimary},land:{fontSize:12,color:COLORS.textSecondary,marginTop:4},add:{marginTop:'auto'},addText:{color:COLORS.accentGold,fontWeight:'800'}});
