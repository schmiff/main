import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import React, { useEffect, useState } from 'react'
import { View, Text, Modal, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import {Fontisto, Feather, AntDesign} from '@expo/vector-icons'
import OptionModal from '../components/OptionModal'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackParams } from '../App'
import TFlite from 'tflite-react-native'
import { delay } from 'react-native-reanimated/lib/types/lib/reanimated2/animation/delay'
/*import * as tf from '@tensorflow/tfjs'
import { bundleResourceIO } from '@tensorflow/tfjs-react-native'*/


export default function TouchScreen({}){
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>()
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedImage, setSelectedImage] = useState("")
    const [model, setModel] = useState()
    const [modelLoaded, setModelLoaded] = useState(false)



    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permissionResult.granted === false){
            alert('Permission to access Gallery is required!')
            return
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
            base64: true
        })
        if(pickerResult.cancelled === true){
            return
        }    
        navigation.navigate('Result', {
           uri: pickerResult.uri,
           width: pickerResult.width,
           height: pickerResult.height,
           name: "1"
        })
        setModalVisible(false)
    }
    let openCamera = async () => {
        ImagePicker.requestCameraPermissionsAsync()
        const imageresult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            base64: true
        })
        if(imageresult.cancelled == true){
            return
        }
        navigation.navigate('Result', {
            uri: imageresult.uri,
            width: imageresult.width,
            height: imageresult.height,
            name: 2
        })
        setModalVisible(false)
    }
    useEffect(() => {
        async function fetchModel() {
            setTimeout(()=>{
                setModelLoaded(true)
            }, 2500)
        }
            fetchModel()
        }, [])

    /* WIP useEffect for loading model when first starting the app 
    useEffect(() => {
        async function fetchModel() {
            await tf.ready()
            const modelJSON = require('../model/model.json')
            const modelWeights = require('../model/weights.bin')
            const loaded_model = await tf.loadGraphModel(modelJSON, {weightPathPrefix: modelWeights})
            //const loaded_model = await tf.loadGraphModel(modelJSON)
            setModelLoaded(true)
        }
        fetchModel()
    }, [])
    */


    return(
            <Container>
            <Modal visible={modalVisible} transparent={true} animationType='slide'>
                    <CloseModal>
                        <TouchableWithoutFeedback style={{padding:1500,flex:1}} onPress={()=> setModalVisible(false)}/>      
                    </CloseModal>
                    <PopUp>
                        <ModalContainer>
                            <Title>Add from</Title>
                            <OptionContainer>
                                <GaleryContainer onPress={openImagePickerAsync}>
                                    <AntDesign name='folder1' size={30} color="#ecececee"/>
                                    <Text style={{paddingTop:5, color:'#ecececee', fontFamily:'Roboto', fontWeight:500}}>Gallery</Text>
                                </GaleryContainer>
                                <View style={{paddingHorizontal:40}}></View>
                                <CameraContainer onPress={openCamera}>
                                    <AntDesign name='camerao' size={32} color="#ecececee"/>
                                    <Text style={{paddingTop:5, color:'#ecececee', fontFamily:'Roboto', fontWeight:500}}>Kamera</Text>
                                </CameraContainer>
                            </OptionContainer>
                        </ModalContainer>
                    </PopUp>
            </Modal>
                <Text style={{color:'#964ff0', fontWeight:'bold', fontSize:36, fontFamily:'Roboto', marginTop:30}}>
                    skinscan
                </Text>
                <Touch onPress={() => {!!modelLoaded && setModalVisible(true)}}>
                {!modelLoaded &&
                    <View>
                        <ActivityIndicator size={32} style={{paddingBottom:20}}/>  
                        <Text style={{color:"#ecececee", fontSize:15, fontFamily:'Roboto', fontWeight:'bold'}}>Loading Model</Text>        
                    </View>
                }
                {!!modelLoaded && 
                    <Circle bgColor='#1e1e1e'>
                        <Circle bgColor='#5196F405'>
                            <Circle bgColor='#5196F410'>
                                <Circle bgColor='#954ff022'>
                                    <TouchButton>
                                        <Feather name='plus' size={50} color="#ecececee"/>
                                    </TouchButton>
                                </Circle>
                            </Circle>
                        </Circle>
                    </Circle>
                }
                </Touch>

            {!!modelLoaded &&<Text style={{color:"#ecececee", fontSize:20, fontFamily:'Roboto', fontWeight:'bold'}}>
            {`Add a picture of the skin lesion`}
            </Text> }
            {!!modelLoaded && <Text  style={{paddingTop:60,color:"#ecececee", fontSize:17, fontFamily:'Roboto', fontWeight:'bold'}}>
            {` This is no medical advice!`}
            </Text>}
            {!!modelLoaded && <Text  style={{paddingTop:5,paddingBottom:50,color:"#ecececee", fontSize:15, fontFamily:'Roboto', fontWeight:100}}>
            {`Contact a dermatologist
 for a safe diagnosis `}
            </Text>}
        
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #1e1e1e;
    text-align: center;
`
const Touch = styled.TouchableOpacity`
    
    flex: 1;
    align-items: center;
    justify-content: center ;
`
const Circle = styled.View`
    background-color: ${props => props.bgColor};
    padding: 20px;
    border-radius: 1000px;
`
const TouchButton = styled.View`
    background-color: #964ff0;
    padding: 12px;
    border-radius: 1200px;
`
const ModalView = styled.View`
    height: 400;
    width: 400;
    background-color: rebeccapurple;
    align-items: center;
    justify-content: center;
    align-self: center;
`


const PopUp = styled.View`
    border-top-left-radius: 5;
    border-top-right-radius: 5;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 25%;
    background-color: #292929fd;
    z-index: 1000;
    
`
const ModalContainer = styled.View`
    align-items: center;
    justify-content: center;
`
const Title = styled.Text`
    color: #ecececee;
    font-size: 20;
    font-weight: 500;
    font-family: 'Roboto';
    padding-top: 20;
    padding-bottom: 20;
`
const OptionContainer = styled.View`
    padding-top:1 ;
    flex-direction: row;
`
const GaleryContainer = styled.TouchableOpacity`
    background-color: #5196f4;
    padding-top: 18;
    padding-left: 33;
    padding-right: 33;
    padding-bottom: 18;
    border-radius: 16;
    align-items: center;
    justify-content: center;
`
const CameraContainer = styled.TouchableOpacity`
    background-color: #5196f4;
    padding-top: 15;
    padding-left: 30;
    padding-right: 30;
    padding-bottom: 15;
    border-radius: 16;
    align-items: center;
    justify-content: center;
`
const CloseModal = styled.View`
    background-color: transparent;
    flex: 1;
    justify-content: center;
    align-items: center;


`

