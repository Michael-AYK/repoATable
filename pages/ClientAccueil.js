import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image, TextInput, Dimensions, FlatList, StyleSheet } from 'react-native'
import HeaderBox from '../components/HeaderBox';
import HeaderSpace from '../components/HeaderSpace';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { getAllRestau } from '../services/restaus';
import { connect } from 'react-redux'

const fullWidth = Dimensions.get('window').width
const fullHeight = Dimensions.get('window').height

function ClientAccueil(props) {
    const [listeRestau, setListeRestau] = useState(undefined)
    const [refreshing, setRefreshing] = useState(false)
    const user = props.userConnected

    function _onDrawerCall(){
        console.log(props.navigation)
        props.navigation.toggleDrawer
        props.navigation.openDrawer()
    } 

    useEffect(() => {
        onInit()
    },[])

    function onInit(){
        setRefreshing(true)
        getAllRestau(user.token)
        .then(data => {
            setRefreshing(false)
            setListeRestau(data)
        })
    }

    return (
        <View style={{flex: 1}}>
            <HeaderSpace label="" />
            <View style={{flexDirection: 'row', width: fullWidth, padding: 10}}>
                <View style={{width: '50%', justifyContent: 'flex-start'}}>
                    <FontAwesome5 style={{padding: 8}} onPress={() => _onDrawerCall()} name="bars" size={18} color="#c26" />  
                </View>

                <View style={{width: '50%', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Entypo style={{padding: 8}} name="shopping-cart" size={18} color="black" />
                </View>
            </View>

            <View >
                <Text style={{fontSize: 24, marginHorizontal: 10, marginVertical: 10, fontWeight: '700'}}>Découvrez de nouvelles expériences de dégustation</Text>
                
                <View style={{width: '100%', flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                    <FontAwesome style={{position: 'absolute'}} name="search" size={18} color="black" />
                    <TextInput style={{fontSize: 20, borderBottomWidth: 1, padding: 8, paddingHorizontal: 20, width: '100%'}} placeholder="Recherche de restau, nourriture..." />
                </View>
            </View>

            {
                listeRestau !== undefined? listeRestau.length > 0 ?(
                    <View style={{flex: 1}}>
                        <FlatList
                            data={listeRestau}
                            keyExtractor={(item, index) => index}
                            refreshing={refreshing}
                            onRefresh={onInit}
                            renderItem={({item, index}) => <RestauItem details={item} />}
                        />
                    </View>
                ):
                (
                    <View style={{flex: 1}}>
                        <Image style={{width: 120, height: 120, alignSelf: 'center'}} source={require('../assets/empty.png')} />
                        <Text style={{textAlign: 'center', marginTop: 5}}> Aucune restaurant disponible ! </Text>
                        <TouchableOpacity style={{padding: 10}} onPress={() => onInit()}>
                            <Text style={{color: '#25a', fontSize: 15, textAlign: 'center', marginTop: 8, textDecorationLine: 'underline'}}>Rafraichir</Text>
                        </TouchableOpacity>
                    </View>
                ):(
                    <ActivityIndicator size="small" color="#25b" />
                )
            }
        </View>
    )
}


function RestauItem(props){
    const { details } = props
    console.log(details)
    return(
        <View style={{width: '90%', height: 230, backgroundColor: '#d48', borderRadius: 14, alignSelf: 'center', elevation: 5, marginVertical: 10}}>
            <View style={{width: '100%', height: '75%', borderRadius: 14, backgroundColor: 'rgb(222, 222, 222)'}}>
                <Image source={require('../assets/empty_img.png')} style={{width: '100%', height: '68%'}} />
                <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 6}}> {details.nomRestau} </Text>
                <Text style={{marginLeft: 10}}> {details.adresse} </Text>
            </View>

            <View style={{width: '100%', flexDirection: 'row', paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: '48%', marginRight: '1%'}}>
                    <Text></Text>
                    <Text style={{color: '#fff'}}>Moy. Heure de livraison</Text>
                </View>

                <View style={{width: '24%', marginRight: '1%'}}>
                    <Text style={{color: '#fff'}}>€ 15</Text>
                    <Text style={{color: '#fff'}}>Cost for two</Text>
                </View>

                <View style={{width: '25%'}}>
                    <Text style={{color: '#fff'}}>Pickup | Dine</Text>
                </View>
            </View>
        </View> 
    )
}


const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(ClientAccueil)