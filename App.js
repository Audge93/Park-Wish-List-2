import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStore } from './src/store';

export default function App() {
  const { park, setPark } = useStore();

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:24 }}>Wish List ✨</Text>
      <Text>Active Park: {park}</Text>
      <View style={{ flexDirection:'row', gap:10, marginTop:20 }}>
        {['MK','EPCOT','HS','AK'].map(p => (
          <TouchableOpacity key={p} onPress={() => setPark(p)} style={{ padding:10, backgroundColor:'#C9A84C' }}>
            <Text>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
