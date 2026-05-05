import React from 'react';
import {Text} from 'react-native';
import {COLORS} from '../constants/colors';
export default function AppText({children, style, ...props}) {
  return <Text style={[{color: COLORS.textPrimary}, style]} {...props}>{children}</Text>;
}
