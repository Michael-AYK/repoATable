import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import ListeComplements from '../pages/ListeComplements'
import ListeArticles from '../pages/ListeArticles'
import Compte from '../pages/Compte'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const fullWidth = Dimensions.get('window').width


const TabArticles = createMaterialTopTabNavigator({
    ListeArticles: {screen: ListeArticles},
    ListeComplements: {screen: ListeComplements}
    
},

{
    initialRouteName: 'ListeArticles',
    tabBarComponent: props => <CustomTabComponent {...props} />
})

export default createAppContainer(TabArticles)

const CustomTabComponent = props => {

    const insets = useSafeAreaInsets();
    console.log(props.navigation)
    let index = props.navigation.state.index
    return(
        <View style={{width: fullWidth}}>  
            <Text style={{fontSize: 22, fontWeight: 'bold', marginTop: insets.top + 15, marginBottom: 15, padding: 10}}>Articles</Text>

            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => props.navigation.navigate('ListeArticles')} style={{padding: 7, margin: 6, justifyContent: 'center', alignItems: 'center', borderBottomWidth: index === 0? 3: 0, borderColor: '#c36'}}>
                    <Text style={{fontWeight: index === 0? 'bold': 'normal', color: index === 0? '#c36': '#222'}}>Articles</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => props.navigation.navigate('ListeComplements')}  style={{padding: 7, margin: 6, justifyContent: 'center', alignItems: 'center', borderBottomWidth: index === 1? 3: 0, borderColor: '#c36'}}>
                    <Text style={{fontWeight: index === 1? 'bold': 'normal', color: index === 1? '#c36': '#222'}}>Compléments</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}