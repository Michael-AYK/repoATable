import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView, TextInput, Platform, Dimensions, TouchableOpacity, Image, ActivityIndicator, Modal } from 'react-native'
import HeaderBox from '../components/HeaderBox'
import FloatingLabelInput from '../components/FloatingLabelInput'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system'
import ref from '../services/ref'
import { connect } from 'react-redux'
import { saveCateg } from '../services/saveCateg'
import Toast from 'react-native-root-toast';


function SaveCateg(props) {
    const [image, setImage] = useState(null)
    const [imgExtension, setImgExtension] = useState('')
    const [imgData, setImgData] = useState(null)
    const [titre, setTitre] = useState('')
    const [description, setDescription] = useState('')
    const [spinner, setSpinner] = useState(false)

    const fullWidth = Dimensions.get('window').width
    const user = props.userConnected

    useEffect( async () => {
        if(Platform.OS !== 'web'){
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if(status !== "granted"){
                alert("Permission photo non accordée !")
            }
        }

    },[])

    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        console.log(result)
        if(!result.cancelled){
            setImage(result.uri)
            const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' })
            const extension = result.uri.toString().split(".")[result.uri.toString().split(".").length - 1]
            //console.log(base64)
            setImgExtension(extension)
            setImgData(base64)
        }
    }

    function onSendPressed(){
        setSpinner(true)
        const data = new FormData()

        data.append('image', imgData, imgExtension)

        fetch(ref + 'restau/save_img_categ', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + user.token
            },
            body: data,
        }).then((response) => response.json())
            .then((responseJson) => {

                console.log("==>")
               console.log(responseJson);
               saveCateg(titre, description, responseJson, user.id, user.token).then(data => {
                   console.log(data)
                   setSpinner(false)
                    if(data !== "OK"){
                        let toast = Toast.show('Echec ! Veuillez réessayer ', {
                            duration: Toast.durations.LONG,
                        });
                    }else{
                        let toast = Toast.show('Catégorie enregistrée ', {
                            duration: Toast.durations.LONG,
                        });
                        props.navigation.goBack()
                    }
               })

            }).catch((error) => {
                console.log(error)
            //
        });
    }

    return (
        <View style={{flex: 1}}>
            <HeaderBox goBack={props.navigation} label="Ajouter une catégorie"  />
            <ScrollView style={{padding: 15}}>
                <FloatingLabelInput value={titre} label="Nom de la catégorie" onChangeText={e => setTitre(e)} />
                
                <Text style={{marginTop: 20, marginBottom: 10}}>Brève description</Text>

                <TextInput multiline={true} onChangeText={e => setDescription(e)} value={description} numberOfLines={8} placeholder="Brève description" style={{borderWidth: 1, fontSize: 16, textAlignVertical: 'top', padding: 10}} />

                <TouchableOpacity onPress={PickImage} style={{backgroundColor: '#bbb', borderRadius: 4, marginVertical: 20, height: 200, justifyContent: 'center', alignItems: 'center'}}>
                    {
                        image !== null && image !== undefined?(
                            <Image source={{uri: image}} style={{width: '100%', height: '100%'}} />
                        ):(
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <MaterialCommunityIcons name="upload" size={40} color="black" />
                                <Text style={{fontSize: 18}}>Téléchargez l'image ici</Text>
                            </View>
                        )
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onSendPressed()} style={{backgroundColor: '#d48', width: fullWidth, padding: 20, justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                    <Text style={{fontSize: 16}}>Ajouter une catégorie</Text>
                </TouchableOpacity>

                <View style={{marginTop: 20}} />

                <Modal visible={spinner} transparent={true}>
                    <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, .6)', justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator color="#25b" />
                    </View>
                </Modal>
            </ScrollView>
        </View>
    )
}


const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(SaveCateg)