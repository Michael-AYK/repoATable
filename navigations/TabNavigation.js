import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import ListeCommandes from '../pages/ListeCommandes'
import TabArticles from './TabArticles'
import Compte from '../pages/Compte'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const fullWidth = Dimensions.get('window').width


const TabNavigation = createBottomTabNavigator({
    ListeCommandes: {screen: ListeCommandes},
    TabArticles: {screen: TabArticles},
    Compte: {screen: Compte}
    
},

{
    initialRouteName: 'Compte',
    tabBarComponent: props => <CustomTabComponent {...props} />
})

export default createAppContainer(TabNavigation)

const CustomTabComponent = props => {
    
    let index = props.navigation.state.index
    return(
        <View style={{flexDirection: 'row', width: fullWidth, justifyContent: 'center', alignItems: 'center'}}>  
            <TouchableOpacity style={{width: fullWidth * .25, marginHorizontal: fullWidth * .05, justifyContent: 'center', alignItems: 'center', paddingVertical: 6, borderTopWidth: index === 0? 3: 0, borderColor: index === 0? '#b18': '#000' }}>
                <FontAwesome5 name="th-list" size={16} color={index === 0? '#b18': '#000'} />
                <Text style={{color: index === 0? '#b18': '#000'}}>Commandes</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate("TabArticles")} style={{width: fullWidth * .25, marginHorizontal: fullWidth * .05, justifyContent: 'center', alignItems: 'center', paddingVertical: 6, borderTopWidth: index === 1? 3: 0, borderColor: index === 1? '#b18': '#000' }}>
                <MaterialCommunityIcons name="food-fork-drink" size={17} color={index === 1? '#b18': '#000'} />
                <Text style={{color: index === 1? '#b18': '#000'}}>Articles</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate("Compte")} style={{width: fullWidth * .25, marginHorizontal: fullWidth * .05, justifyContent: 'center', alignItems: 'center', paddingVertical: 6, borderTopWidth: index === 2? 3: 0 , borderColor: index === 2? '#b18': '#000' }}>
                <FontAwesome name="user" size={16} color={index === 2? '#b18': '#000'} />
                <Text style={{color: index === 2? '#b18': '#000'}}>Compte</Text>
            </TouchableOpacity>
        </View>
    )
}