import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HeaderSpace(props) {

    const insets = useSafeAreaInsets();

    return (
        <View style={{marginTop: insets.top, flexDirection: 'row', width: '100%', alignItems: 'center'}}>
        </View>
    )
}
