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
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { listeCategForSelect } from '../services/listeCategForSelect'
import {MaterialIcons} from '@expo/vector-icons';
import { saveArticle } from '../services/articles'


const fullWidth = Dimensions.get('window').width

function SaveArticle(props) {
    const [nomArticle, setNomArticle] = useState('')
    const [listeCategToFill, setListeCategToFill] = useState([])
    const [selectedCategList, setSelectedCategList] = useState([])
    const [description, setDescription] = useState('')
    const [prix, setPrix] = useState('')
    const [remise, setRemise] = useState('')
    const [depart, setDepart] = useState('')
    const [fin, setFin] = useState('')
    const [prixVente, setPrixVente] = useState('')
    const [disponible, setDisponible] = useState(true)
    const [isLegume, setIsLegume] = useState(false)
    const [isCustomizable, setIsCustomizable] = useState(false)

    const multiSelect = useRef(null)
    const user = props.userConnected
    const [image, setImage] = useState(null)
    const [imgExtension, setImgExtension] = useState('')
    const [imgData, setImgData] = useState(null)
    const [spinner, setSpinner] = useState(false)

    const fullWidth = Dimensions.get('window').width

    useEffect( async () => {
        listeCategForSelect(user.id, user.token).then(data => {
            setListeCategToFill(data)
        })
        
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
    
    function onSelectedItemsChange(selectedItems){
        console.log(selectedItems)
        setSelectedCategList(selectedItems)
    }

    function toggleSwitch(){
        setDisponible(!disponible)
    }

    function toggleLegumes(){
        setIsLegume(!isLegume)
    }
    //R-1C+2kto_/3.azst\.com

    function togglePersonnalisable(){
        setIsCustomizable(!isCustomizable)
    }

    function onSendPressed(){
        setSpinner(true)
        const data = new FormData()

        data.append('image', imgData, imgExtension)

        fetch(ref + 'restau/save_img_article', {
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

               saveArticle(nomArticle, description, prix, remise, prixVente, isCustomizable, isLegume, disponible, responseJson, user.id, selectedCategList, user.token)
               .then(onSubmitSucces)
                
            }).catch((error) => {
                console.log(error)
            //
        });
    }

    function onSubmitSucces(response){
        console.log(response)
        setSpinner(false)
         if(response !== "OK"){
             let toast = Toast.show('Echec ! Veuillez réessayer ', {
                 duration: Toast.durations.LONG,
             });
         }else{
             let toast = Toast.show('Article enregistré ', {
                 duration: Toast.durations.LONG,
             });
             props.navigation.goBack()
         }
    }

    return (
        <ScrollView style={{flex: 1}}>
            <HeaderBox goBack={props.navigation} label="" />
            
            <View style={{padding: 10}}>
                <FloatingLabelInput value={nomArticle} label="Nom de l'article" onChangeText={e => setNomArticle(e)} />
                <View style={{marginBottom: 7}} />
                {
                    listeCategForSelect !== undefined?(
                        <SectionedMultiSelect
                            items={listeCategToFill}
                            uniqueKey="id"
                            displayKey="titre"
                            selectText="Choisissez une catégorie..."
                            showDropDowns={true}
                            readOnlyHeadings={false}
                            IconRenderer={MaterialIcons}
                            onSelectedItemsChange={onSelectedItemsChange}
                            selectedItems={selectedCategList}
                            showChips={false}
                        />
                    ): null
                }
                
                <View style={{flexDirection: 'row', width: fullWidth, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: '42%', marginRight: '6%'}}>
                        <FloatingLabelInput label="Prix actuel" value={prix} onChangeText={e => setPrix(e)} />
                    </View>
                    <View style={{width: '42%'}}>
                        <FloatingLabelInput label="Remise (%)" value={remise} onChangeText={e => setRemise(e)}/>    
                    </View>
                </View>

                <View style={{flexDirection: 'row', marginVertical: 7, width: '100%', alignItems: 'baseline', justifyContent: 'center'}}>
                    <View style={{width: '42%', marginRight: '6%'}}>
                        <FloatingLabelInput label="Prix vente" value={prixVente} onChangeText={e => setPrixVente(e)} />
                    </View>
                    <View style={{flexDirection: 'row', width: '42%', alignItems: 'center'}}>
                        <Text>Disponible ? </Text>
                        <Switch
                            trackColor={{ false: '#bbb', true: '#333' }}
                            thumbColor={disponible ? '#f55d9b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={disponible}
                        />
                    </View>
                </View> 

                <View>
                    <Text style={{marginVertical: 7}}>Brève description</Text>
                    <TextInput placeholder="Brève description" value={description} onChangeText={e => setDescription(e)} multiline={true} numberOfLines={6} style={{textAlignVertical: 'top', padding: 4, borderWidth: .5, borderColor: '#444'}} />
                </View>

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

                <View>
                    
                </View>

                <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Text>Légume ? </Text>
                    <Switch
                        trackColor={{ false: '#bbb', true: '#333' }}
                        thumbColor={isLegume ? '#f55d9b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setIsLegume(!isLegume)}
                        value={isLegume}
                    />
                </View>

                <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Text>Personalisable ? </Text>
                    <Switch
                        trackColor={{ false: '#bbb', true: '#333' }}
                        thumbColor={isCustomizable ? '#f55d9b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setIsCustomizable(!isCustomizable)}
                        value={isCustomizable}
                    />
                </View>

                <TouchableOpacity onPress={() => onSendPressed()} style={{width: '100%', backgroundColor: '#ed4595', padding: 15, marginVertical: 16, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>Ajouter un article</Text>
                </TouchableOpacity>

            </View>
            
            <Modal transparent={true} visible={spinner}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, .2)'}}>
                    <ActivityIndicator color="#c26" />
                </View>
            </Modal>

        </ScrollView>
    )
}

const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(SaveArticle)