import { UserContext } from '@/context/UserContext';
import React, { useContext } from 'react';
import { Image, Switch, Text, View } from 'react-native';

export default function IntroHeader() {
    const {user} = useContext(UserContext);
    const [isEnabled, setIsEnabled] = React.useState(false);
    console.log("User in IntroHeader:", user);
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        }}>
            <Image source={{uri:user?.picture}} style={{
            width: 45,
            height: 45,
            borderRadius: 99,
            }}/>
            <Text style={{
            fontSize: 20,
            fontFamily: 'outfit-bold'
            }}>Hello, {user?.name}</Text>
        </View>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        }}>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 16,
            }}>{isEnabled ? "Veg" : "Non-Veg"}</Text>
            <Switch 
            value={isEnabled} 
            onValueChange={() => setIsEnabled(!isEnabled)}
            trackColor={{ false: '#D1D5DB', true: '#34D399' }}
  thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
  ios_backgroundColor="#D1D5DB" 
  style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}/>
        </View>
    </View>
  )
}