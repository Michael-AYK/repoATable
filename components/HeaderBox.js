import React from 'react'
import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HeaderBox(props) {

    const insets = useSafeAreaInsets();

    function iconPressed(){
        console.log("Pressed")
        props.goBack.goBack(null)
    }

    return (
        <View style={{height: 55, marginTop: insets.top, flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <AntDesign onPress={() => iconPressed()} style={{ padding: 10 }} name="left" size={20} color="#b18" />
            <Text style={{fontSize: 22}}> {props.label} </Text>
        </View>
    )
}
