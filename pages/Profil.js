import React, {useEffect, useState} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
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
import { connect } from 'react-redux'

function Profil(props) {
    
    const insets = useSafeAreaInsets();
    const fullWidth = Dimensions.get('window').width
    const fullHeight = Dimensions.get('window').height
    const user = props.userConnected


    return (
        <View style={{flex: 1, paddingTop: insets.top}}>
            <ScrollView style={{flex: 1}}>
                <View style={{width: fullWidth, height: fullHeight * .4}}>
                    <Image style={{width: '100%', height: '100%'}} source={require('../assets/spag.jpeg')} />
                    <AntDesign onPress={() => props.navigation.goBack()} style={{position: 'absolute', padding: 10, left: 12, top: 22}} name="left" size={20} color="black" />
                </View>

                <View style={{flexDirection: 'row', width: '100%', paddingVertical: 10}}>
                    <View style={{width: '25%', alignItems: 'center'}}>
                        <Ionicons name="mail" size={22} color="#b18" />    
                    </View>

                    <View style={{width: '40%'}}>
                        <Text style={{fontSize: 18}}>Détails sur le restaurant</Text>
                    </View>

                    <TouchableOpacity style={{width: '25%'}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#d18'}}>Se déconnecter</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', width: '100%', paddingVertical: 10}}>
                    <View style={{width: '25%', alignItems: 'center'}} />
                    <View style={{width: '70%'}}>
                        <FloatingLabelInput editable={false} value={user.nomRestau} label="Nom du restaurant" onChangeText={e => console.log(e)} />
                    </View>
                </View>

                <View style={{flexDirection: 'row', width: '100%', paddingVertical: 10}}>
                    <View style={{width: '25%', alignItems: 'center'}} />
                    <View style={{width: '70%'}}>
                        <FloatingLabelInput editable={false} value={user.email} label="Adresse e-mail enregistrée" onChangeText={e => console.log(e)} />
                    </View>
                </View>

                <View style={{flexDirection: 'row', width: '100%', paddingVertical: 10}}>
                    <View style={{width: '25%', alignItems: 'center'}} />
                    <View style={{width: '70%'}}>
                        <FloatingLabelInput editable={false} value={user.tel_restau} label="Numéro de téléphone" onChangeText={e => console.log(e)} />
                    </View>
                </View>

                <View style={{width: '100%', height: 6, backgroundColor: '#126', marginVertical: 20}} />

                <View style={{flexDirection: 'row', width: '100%', paddingVertical: 10}}>
                    <View style={{width: '25%', alignItems: 'center'}}>
                        <FontAwesome5 name="map-marker-alt" size={22} color="#b18" />   
                    </View>

                    <View style={{width: '75%'}}>
                        <Text style={{fontSize: 18}}>Adresse du restaurant</Text>
                        <Text style={{marginVertical: 7, fontSize: 14}}> {user.adresse} </Text>
                    </View>
                </View>

                <View style={{width: '100%', height: 6, backgroundColor: '#126', marginVertical: 20}} />

                <View style={{flexDirection: 'row', width: '100%', paddingVertical: 10}}>
                    <View style={{width: '25%', alignItems: 'center'}}>
                        <MaterialIcons name="access-time" size={22} color="#b18" />
                    </View>

                    <View style={{width: '75%', marginBottom: 20}}>
                        <Text style={{fontSize: 18}}>Heures d'ouveture</Text>
                        <View style={{flexDirection: 'row', width: '100%'}}>
                            <View style={{width: '45%', marginRight: '5%'}}>
                                <FloatingLabelInput editable={false} value="{11:59}" label="Heure d'ouverture" onChangeText={e => console.log(e)} />
                            </View>

                            <View style={{width: '45%'}}>
                                <FloatingLabelInput editable={false} value="{12:01}" label="Heure de fermeture" onChangeText={e => console.log(e)} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}


const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(Profil)