import React, {useEffect, useState} from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
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
import { listeCateg } from '../services/listeCateg'
import { connect } from 'react-redux'
import ref_public from '../services/ref_public';

const fullWidth = Dimensions.get('window').width
const fullHeight = Dimensions.get('window').height

function ListeCateg(props) {
    const [categListe, setCategListe] = useState(undefined)
    const [refreshing, setRefreshing] = useState(false)

    const user = props.userConnected
    
    useEffect(() => {
        getCategForRestau()
    },[])

    function getCategForRestau(){
        setRefreshing(true)
        listeCateg(user.id, user.token).then(data => {
            console.log(data)
            setCategListe(data)
            setRefreshing(false)
        })
    }

    return (
        <View style={{flex: 1}}>
            <HeaderBox goBack={props.navigation} label="Catégories" />
            
            {
                categListe !== undefined? categListe.length > 0 ?(
                    <View style={{flex: 1}}>
                        <FlatList
                            data={categListe}
                            keyExtractor={(item, index) => index}
                            refreshing={refreshing}
                            onRefresh={getCategForRestau}
                            renderItem={({item, index}) => <CategItem details={item} />}
                        />
                    </View>
                ):
                (
                    <View style={{flex: 1}}>
                        <Image style={{width: 120, height: 120, alignSelf: 'center'}} source={require('../assets/empty.png')} />
                        <Text style={{textAlign: 'center', marginTop: 5}}> Aucune catégorie enregistrée ! </Text>
                        <TouchableOpacity style={{padding: 10}} onPress={() => getCategForRestau()}>
                            <Text style={{color: '#25a', fontSize: 15, textAlign: 'center', marginTop: 8, textDecorationLine: 'underline'}}>Rafraichir</Text>
                        </TouchableOpacity>
                    </View>
                ):(
                    <ActivityIndicator size="small" color="#25b" />
                )
            }
            
            <View style={{position: 'absolute', bottom: 10, width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', paddingHorizontal: 15}}>
                <FloatingButton onPress={props.navigation} to="SaveCateg" />
            </View>
        </View>
    )
}

function CategItem(props){
    const {details} = props
    console.log(ref_public + 'categ_imgs/' + details.img_link)
    return(
        <View style={{flexDirection: 'row', width: fullWidth, marginVertical: 10, height: 100, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#b48'}}>
            <View style={{width: fullWidth * .35}} >
                <Image style={{width: '100%', height: '100%'}} source={{uri: ref_public + 'categ_imgs/' + details.img_link}} />
            </View>

            <View style={{width: fullWidth * .4, padding: 6}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}> {details.titre} </Text>
                <Text> {details.description} </Text>
            </View>

            <View style={{width: fullWidth * .15}}>
                <TouchableOpacity style={{padding: 8, margin: 4}}>
                    <FontAwesome name="edit" size={17} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={{padding: 8, margin: 4}}>
                    <FontAwesome name="trash-o" size={17} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(ListeCateg)