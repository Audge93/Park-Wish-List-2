import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {CATEGORY_ICONS} from '../constants/categories';
export default function CategoryChip({label, value, active, onPress}) {
  const color = value === 'all' ? COLORS.accentGold : COLORS[value] || COLORS.accentGold;
  return <TouchableOpacity onPress={onPress} style={[styles.chip, active && {backgroundColor: color}]}><Text style={[styles.text, active && styles.activeText]}>{CATEGORY_ICONS[value]} {label}</Text></TouchableOpacity>;
}
const styles=StyleSheet.create({chip:{height:36,paddingHorizontal:14,borderRadius:18,backgroundColor:COLORS.surface,alignItems:'center',justifyContent:'center',marginRight:8}, text:{color:COLORS.textSecondary,fontWeight:'600'}, activeText:{color:COLORS.white}});
