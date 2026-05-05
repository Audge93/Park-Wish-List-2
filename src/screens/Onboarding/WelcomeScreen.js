import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
export default function WelcomeScreen({navigation}) {
  return <SafeAreaView style={styles.screen}><View style={styles.center}><Text style={styles.sparkle}>✦</Text><Text style={styles.title}>Don’t miss a thing.</Text><Text style={styles.sub}>Plan what you want to eat, do, and experience before you arrive.</Text></View><TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('ParkSelect')}><Text style={styles.buttonText}>Let’s get started</Text></TouchableOpacity></SafeAreaView>
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:COLORS.textPrimary,padding:24},center:{flex:1,alignItems:'center',justifyContent:'center'},sparkle:{fontSize:82,color:COLORS.accentGold},title:{fontSize:40,fontWeight:'900',color:COLORS.white,textAlign:'center'},sub:{fontSize:18,color:COLORS.textSecondary,textAlign:'center',marginTop:16,lineHeight:25},button:{height:56,borderRadius:12,backgroundColor:COLORS.accentGold,alignItems:'center',justifyContent:'center',marginBottom:20},buttonText:{fontSize:17,fontWeight:'900',color:COLORS.textPrimary}});
