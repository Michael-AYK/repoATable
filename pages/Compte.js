import React, {useEffect, useState} from 'react'
import { View, Text, Image, ScrollView, Switch, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'

function Compte(props) {
    const [isEnabled, setIsEnabled] = useState(false)
    const insets = useSafeAreaInsets();
    const fullWidth = Dimensions.get('window').width
    const fullHeight = Dimensions.get('window').height

    const user = props.userConnected
    
    useEffect(() => {
        console.log(user)
        console.log(props.userConnected.id);
    },[])

    function toggleSwitch(){
        setIsEnabled(!isEnabled)
    }

    return (
        <View style={{flex: 1, paddingTop: insets.top}}>
            
            <View style={{width: fullWidth, height: fullHeight * .4}}>
                <Image style={{width: '100%', height: '100%'}} source={require('../assets/spag.jpeg')} />
            </View>
            <View style={{ padding: 10}}>
                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 19}}> {user.nomRestau} </Text>

                <TouchableOpacity onPress={() => props.navigation.navigate('Profil')} style={{width: '100%', flexDirection: 'row', paddingVertical: 4}}>
                    <View style={{width: '85%'}}>
                        <Text style={{fontSize: 15, color: '#000'}}>Voir le profil du Resto</Text>
                    </View>
                    <Fontisto name="angle-right" size={15} color="#b18" />
                </TouchableOpacity>
            </View>

            <ScrollView style={{flex: 1}}>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', padding: 15}}>
                    <View style={{width: '15%'}}>
                        <Entypo name="globe" size={24} color="#b18" />
                    </View>

                    <View style={{width: '85%'}}>
                        <Text style={{fontSize: 17, color: '#000', fontWeight: '700'}}>Langue</Text>
                        <Text>Sélectionnez la langue préférée</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', padding: 12}}>
                    <View style={{width: '15%'}}>
                        <FontAwesome name="comment" size={24} color="#b18" />
                    </View>

                    <View style={{width: '85%'}}>
                        <Text style={{fontSize: 17, color: '#000', fontWeight: '700'}}>Commentaires</Text>
                        <Text>Avis sur les restaurants</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate("CategStack")} style={{flexDirection: 'row', width: '100%', padding: 12}}>
                    <View style={{width: '15%'}}>
                        <MaterialCommunityIcons name="checkbox-multiple-blank" size={24} color="#b18" />
                    </View>

                    <View style={{width: '85%'}}>
                        <Text style={{fontSize: 17, color: '#000', fontWeight: '700'}}>Catégorie</Text>
                        <Text>Liste des catégories</Text>
                    </View>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', padding: 5, paddingVertical: 12}}>
                    <View style={{width: '80%'}}>
                        <Text style={{fontSize: 20, color: '#000'}}>Restaurant Disponible</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
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

export default connect(mapStateToProps)(Compte)