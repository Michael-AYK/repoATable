import React, {useEffect, useState, useRef} from 'react'
import { View, Text, ScrollView, TextInput, Platform, Switch, Dimensions, TouchableOpacity, Image, ActivityIndicator, Modal } from 'react-native'
import HeaderBox from '../components/HeaderBox'
import FloatingLabelInput from '../components/FloatingLabelInput'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system'
import ref from '../services/ref'
import { connect } from 'react-redux'
import Toast from 'react-native-root-toast';
import {MaterialIcons} from '@expo/vector-icons';
import { saveClient } from '../services/clients'

export default function Inscription(props) {
    const [nomComplet, setNomComplet] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [tel, setTel] = useState('')
    const [code_pays, setCode_pays] = useState('')
    const [spinner, setSpinner] = useState(false)
    
    function onSendPressed(){
        setSpinner(true)
        saveClient(nomComplet, email, password, code_pays, tel, '')
        .then(onResponse)
    }

    function onResponse(response){
        console.log(response)
        setSpinner(false)
         if(response !== "OK"){
             let toast = Toast.show('Echec ! Veuillez réessayer ', {
                 duration: Toast.durations.LONG,
             });
         }else{
             let toast = Toast.show('Compte crée ', {
                 duration: Toast.durations.LONG,
             });
             props.navigation.goBack()
         }
    }

    return (
        <ScrollView style={{flex: 1}}>
            <HeaderBox goBack={props.navigation} label="Nouvel utilisateur ?" />

            <Text style={{marginVertical: 6, marginLeft: 30, fontSize: 14}}>Inscrivez-vous maintenant pour continuer</Text>

            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{width: 80, height: 80}} source={require('../assets/logo.png')} />            
            </View>

            <View style={{flex: 1, padding: 10}}>
                <FloatingLabelInput value={nomComplet} label="Nom complet" onChangeText={e => setNomComplet(e)}/>
                <FloatingLabelInput value={email} label="Adresse email" onChangeText={e => setEmail(e)} />
                <FloatingLabelInput value={password} label="Créer un mot de passe" onChangeText={e => setPassword(e)}/>
                <FloatingLabelInput value={confirm} label="Confirmez le mot de passe" onChangeText={e => setConfirm(e)}/>
                
                <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '30%', marginRight: '3%'}}>
                        <FloatingLabelInput value={code_pays} label="Phone Code" onChangeText={e => setCode_pays(e)}/>
                    </View>

                    <View style={{width: '65%'}}>
                        <FloatingLabelInput value={tel} label="Numéro de téléphone" onChangeText={e => setTel(e)}/>
                    </View>                    
                </View>

                <TouchableOpacity onPress={() => onSendPressed()} style={{width: '100%', backgroundColor: '#c26', padding: 15, borderRadius: 2, marginVertical: 30, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>S'inscrire maintenant</Text>
                </TouchableOpacity>

                <Text style={{textAlign: 'center'}}>Nous enverrons un code de vérification sur Adobe given_number_to_verify</Text>
            </View>

            <Modal transparent={true} visible={spinner}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, .2)'}}>
                    <ActivityIndicator color="#c26" />
                </View>
            </Modal>
        </ScrollView>
    )
}


