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
import { saveCateg } from '../services/saveCateg'
import Toast from 'react-native-root-toast';
import MultiSelect from 'react-native-multiple-select'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { listeCategForSelect } from '../services/listeCategForSelect'
import {MaterialIcons} from '@expo/vector-icons';
import { saveArticle } from '../services/articles'

export default function SaveComplements(props) {
    
    return (
        <ScrollView>
            <HeaderBox goBack={props.navigation} label="" />
            <Text></Text>
        </ScrollView>
    )
}
