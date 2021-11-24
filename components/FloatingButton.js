import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';

export default function FloatingButton(props) {

    return (
        <TouchableOpacity onPress={() => props.onPress.navigate(props.to)} style={{backgroundColor: '#d18', justifyContent: 'center', alignItems: 'center', width: 55, height: 55, borderRadius: 40, elevation: 10, margin: 10}}>
            <Entypo name="plus" size={22} color="#fff" />
        </TouchableOpacity>
    )
}
