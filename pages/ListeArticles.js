import React, {useEffect, useState} from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Switch, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
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
import { connect } from 'react-redux'
import ref_public from '../services/ref_public';
import { getArticles } from '../services/articles';

function ListeArticles(props) {
    const [listeArticles, setListeArticles] = useState(undefined)
    const [refreshing, setRefreshing] = useState(false)

    const user = props.userConnected

    useEffect(() => {
        onRefresh()
    },[])

    function onRefresh(){
        setRefreshing(true)
        getArticles(user.id, user.token)
        .then(onArticleGet)
    }

    function onArticleGet(data){
        setRefreshing(false)
        setListeArticles(data)
    }

    return (
        <View style={{flex: 1}}>
            
            {
                listeArticles !== undefined? listeArticles.length > 0? (
                    <View style={{flex: 1}}>
                        <FlatList
                            data={listeArticles}
                            keyExtractor={(item, index) => index}
                            renderItem={({item}) => <ArticleItem article={item} />}
                        />
                    </View>
                ):(
                    <View style={{flex: 1}}>
                        <Image style={{width: 120, height: 120, alignSelf: 'center'}} source={require('../assets/empty.png')} />
                        <Text style={{textAlign: 'center', marginTop: 5}}> Aucune catégorie enregistrée ! </Text>
                        <TouchableOpacity style={{padding: 10}} onPress={() => onArticleGet()}>
                            <Text style={{color: '#25a', fontSize: 15, textAlign: 'center', marginTop: 8, textDecorationLine: 'underline'}}>Rafraichir</Text>
                        </TouchableOpacity>
                    </View>
                ):(
                    <ActivityIndicator size="small" color="#25b" />
                )
            }


            <View style={{position: 'absolute', bottom: 10, width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', paddingHorizontal: 15}}>
                <FloatingButton onPress={props.navigation} to="SaveArticle" />
            </View>
        </View>
    )
}

const ArticleItem = props => {
    const {article} = props
    const [disponible, setDisponible] = useState(true)
    
    function toggleSwitch(){
        setDisponible(!disponible)
    }

    return(
        <View style={{flexDirection: 'row', width: '100%', marginVertical: 10, borderColor: '#c36', borderWidth: .5}}>
            <View style={{width: '30%'}}>
                <Image style={{width: '100%', height: 100}} source={{uri: ref_public + 'articles_img/' + article.lien_img}} />
            </View>

            <View style={{width: '70%'}}>
                <View style={{width: '100%', flexDirection: 'row'}}>
                    <View style={{width: '75%'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}> {article.nom} </Text>
                        <Text style={{fontSize: 14}}> {article.description} </Text>
                    </View>
                    <View style={{width: '25%', justifyContent: 'center'}}>
                        <FontAwesome name="edit" style={{paddingHorizontal: 10, paddingVertical: 4}} size={20} color="black" />
                        <Ionicons name="trash-outline" style={{paddingHorizontal: 10, paddingVertical: 4}} size={20} color="black" />
                    </View>
                </View>

                <View style={{width: '100%', flexDirection: 'row',  alignItems: 'center'}}>
                    <View style={{width: '20%'}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}> € {article.prix_vente} </Text>   
                    </View>

                    <View style={{flexDirection: 'row', width: '75%', alignItems: 'center', justifyContent: 'flex-end', marginRight: '5%'}}>
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
            </View>
        </View>
    )
}


const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(ListeArticles)