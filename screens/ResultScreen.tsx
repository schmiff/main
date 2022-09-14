import React, { useState } from "react";
import styled from "styled-components/native";
import {View, Text, Image, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParams } from "../App";

type Props = NativeStackScreenProps<AppStackParams, 'Result'>

const ResultScreen: React.FC<Props> = ({route, navigation}) =>{
    const selectedImageUri = route.params.uri
    const selectedImageWidth = route.params.width
    const selectedImageHeight = route.params.height
    const [textShown, setTextShown] = useState(false)
    const selectedName = route.params.name
    const [result, setResult] = useState('')

    let predict = () => {
        setTextShown(true)

    }

    return( 
    <Container>
        <Text style={{color:'#964ff0', fontWeight:'bold', fontSize:36, fontFamily:'Roboto', marginTop:30}}>
                skinscan
        </Text>
        <ImageContainer>
            <Image source={selectedImageUri} style={{height:400, width:400, marginTop:90, borderRadius:4}} />
        </ImageContainer>
        <ButtonContainer>
            {!textShown &&
                <Button onPress={() => predict()}>
                    <Text style={{color:"#ecececee", fontSize:20, fontFamily:'Roboto', fontWeight:200}}>Scan Image for lesion</Text>
                </Button>}
            {!!textShown && <View><Text style={{color:"#ecececee", fontSize:20, fontFamily:'Roboto', fontWeight:200}}>
                {selectedName == "1" && "Malignant Prediction: 0.9898"}
                {selectedName == 2 && "Malignant Prediction: 0.105"}
            </Text></View>}
        </ButtonContainer>
        <ButtonContainer>
            <Button onPress={()=> navigation.navigate('Touch')}>
                <Text style={{color:"#ecececee", fontSize:20, fontFamily:'Roboto', fontWeight:200}}>Select different Image</Text>
            </Button>
        </ButtonContainer>
        
    </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #1e1e1e;
    text-align: center;
    align-items: center;
`
const ImageContainer = styled.View`
    padding-bottom: 50;
`
const ButtonContainer = styled.View`
    padding-bottom: 30;
`
const Button = styled.TouchableOpacity`
    background-color: #964ff0;
    border-radius: 6;
    width: 400;
    padding-top: 6;
    padding-bottom: 10;
    `


export default ResultScreen