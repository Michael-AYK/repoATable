import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { tokening } from '../services/tokening'
import { login } from '../services/login'
import FloatingLabelInput from '../components/FloatingLabelInput'
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import Toast from 'react-native-root-toast';


const fullWidth = Dimensions.get('window').width
const fullHeight = Dimensions.get('window').height

function LoginScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formReady, setFormReady] = useState(false)
    const [loginResponse, setLoginResponse] = useState(undefined)
    const deviceName = Device.deviceName;

    function onEmailChanged(text){
        setEmail(text)
        checkFormReady()
    }

    function onPasswordChanged(text){
        setPassword(text)
        checkFormReady()
    }

    function checkFormReady(){
        if(email !== '' && password !== ''){
            if(email.includes("@") && email.includes(".")){
                setFormReady(true)
            }else{
                setFormReady(false)
            }
        }else{
            setFormReady(false)
        }
    }

    function onLoginPressed(){
        if(email !== '' && password !== '' && formReady){
            console.log(deviceName)
            tokening(email, password, deviceName).then(token => {
                console.log(token)
               
                if(token !== ''){
                    storeToken(token)
                    login(email, password, token).then(data => {
                        if(data !== undefined){
                            console.log("connecté")
                            data.token = token
                            
                            const destination = data.type_user === "restau"? "TabNavigation": "ClientDrawer"
                            const action = {type: "AJOUTER", value: data}
                            props.dispatch(action)
                            props.navigation.navigate(destination)


                        }else{
                            let toast = Toast.show('Echec d\'authentification', {
                                duration: Toast.durations.LONG,
                            });
                        }
                    })
                }else{
                    let toast = Toast.show('Echec d\'authentification', {
                        duration: Toast.durations.LONG,
                    });
                }
              
            })  
        }
    }

    const storeToken = async (value) => {
        try {
          await AsyncStorage.setItem('token', value)
        } catch (e) {
          // saving error
        }
      }

    return (
        <View style={styles.globalContainer}>
            <ScrollView style={{}}>
                <View style={{width: fullWidth, height: fullHeight * .4, position: 'relative', backgroundColor: '#999'}}>
                    <Image style={styles.img} source={require('../assets/pizza.jpeg')} />

                    <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(255, 255, 255, .4)'}}>
                        <Image style={{width: '40%', height: '40%'}} source={require('../assets/logo.png')} />
                    </View>
                </View>

                <View style={{width: fullWidth, padding: 18}}>
                    <FloatingLabelInput value={email} label="Adresse électronique" onChangeText={e => onEmailChanged(e)} />
                    <FloatingLabelInput secureTextEntry={true} value={password} label="Mot de passe" onChangeText={e => onPasswordChanged(e)} />

                    <View style={{marginTop: 20}}>
                        <TouchableOpacity onPress={() => onLoginPressed()} style={[styles.btn, {backgroundColor: formReady?'#d92a65': '#ea94b1'}]} disabled={!formReady}>
                            <Text style={[styles.btn_text, {color: formReady? '#eee': '#777'}]}>Se connecter</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate("Inscription")} style={[styles.btn, {borderColor: '#d92a65', borderWidth: 1, backgroundColor: '#222'}]}>
                            <Text style={[styles.btn_text, {color: '#fff'}]}>Nouvel utilisateur ?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
    },
    img: {
        width: '100%', height: '100%',
    },
    btn: {
        borderRadius: 4, padding: 15, justifyContent: 'center', alignItems: 'center', marginVertical: 10
    },

    btn_text: {
        fontSize: 14
    }
})
//ea94b1

const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(LoginScreen)