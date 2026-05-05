import React from 'react';
import {ScrollView} from 'react-native';
import {CATEGORIES} from '../constants/categories';
import CategoryChip from './CategoryChip';
export default function CategoryChipsRow({value, onChange}) {
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingVertical:8}}>{CATEGORIES.map((c)=><CategoryChip key={c.key} value={c.key} label={c.label} active={value===c.key} onPress={()=>onChange(c.key)} />)}</ScrollView>;
}
