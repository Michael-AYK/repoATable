import React, {useEffect, useState} from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Switch, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import FloatingLabelInput from '../components/FloatingLabelInput'
import { MaterialIcons } from '@expo/vector-icons';
import HeaderBox from '../components/HeaderBox';
import FloatingButton from '../components/FloatingButton';
import { connect } from 'react-redux'
import ref_public from '../services/ref_public';
import { getArticles } from '../services/articles';


function ListeComplements(props) {

    return (
        <View style={{flex: 1}}>
            <Text>Liste des compléments</Text>

            <View style={{position: 'absolute', bottom: 10, width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', paddingHorizontal: 15}}>
                <FloatingButton onPress={props.navigation} to="SaveComplements" />
            </View>
        </View>
    )
}


const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(ListeComplements)
