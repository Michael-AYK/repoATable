import React from 'react'
import { Text, TouchableOpacity, View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ClientAccueil from '../pages/ClientAccueil'
import { FontAwesome5 } from '@expo/vector-icons';

const ClientDrawer = createStackNavigator({
    ClientAccueil: {screen: ClientAccueil, navigationOptions: { headerShown: false }},

},

{
    initialRouteName: 'ClientAccueil',
    drawWidth: 270,
    contentComponent: props => <CustomDrawer {...props} />
})

export default createAppContainer(ClientDrawer)




const activeItemColor = '#c26'
const defaultItemColor = '#aaa'
const fullHeight = Dimensions.get('window').height
const CustomDrawer = props => {

    return(
        <ScrollView>
            <TouchableOpacity onPress={() => props.navigation.navigate('ClientAccueil')} style={props.activeItemKey === 'ClientAccueil'? styles.activeItemStyle: styles.itemsTouch} >
                <View style={{width: 30, marginRight: 5, justifyContent: 'center', alignItems: 'center'}} >
                    <FontAwesome5 style={{marginLeft: 5}} name="home" color={props.activeItemKey === 'Accueil'? activeItemColor: defaultItemColor} size={20} />
                </View>
                <Text style={props.activeItemKey === 'Accueil'? styles.activeLabelStyle: styles.label} >Accueil</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}


const styles=StyleSheet.create({
    container:{
        flex : 1
    },

    itemsTouch: { width: '100%', position: 'relative', paddingHorizontal: 5, paddingVertical: 12, alignItems: 'center', flexDirection: 'row' },
    label: { fontSize: 14, marginLeft: 20, color: '#111'},
    activeItemStyle: {backgroundColor: 'rgb(240, 240, 240)', width: '100%', paddingHorizontal: 5, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', marginTop: 3},
    activeLabelStyle: {color: activeItemColor, fontSize: 14, marginLeft: 20},

    profileViewImage : {
        borderRadius : 3,
        borderColor : 'rgb(200,230, 255)',
        paddingLeft : 10, 
        paddingRight : 10,
        padding : 1,
        width : 200,
        height : 110
    },

    profile : {
        width : 100,
        height : 100,
        
    },

    name : {
        color : '#fff',
        fontSize : 21,
        fontWeight : 'bold',
        marginTop: 15, marginBottom: 4
    },

    etab : {
        color : '#fff',
        fontSize : 14,
        marginLeft: 4
    }
})