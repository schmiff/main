import React, { useState } from 'react'
import { View, Text, Modal, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import {Fontisto, Feather} from '@expo/vector-icons'

const OptionModal = ({ visible }: {visible: boolean}) => {
    return <>
        <StatusBar hidden={true}/>
        
        <Modal visible={visible} transparent={true} animationType='slide'>
            <CloseModal></CloseModal>
            <PopUp>
                <Container>
                    <Title>Add from</Title>
                    <OptionContainer>
                        <GaleryContainer>
                            <Text>Gallery</Text>
                        </GaleryContainer>
                        <CameraContainer>
                            <Text>Kamera</Text>
                        </CameraContainer>
                    </OptionContainer>
                </Container>
            </PopUp>
            
        </Modal>
    </>
}

const PopUp = styled.View`
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 25%;
    background-color: #5e5e5e;
    z-index: 1000;
    
`
const Container = styled.View`
    align-items: center;
    justify-content: center;
`
const Title = styled.Text`
    padding-top: 20;
    padding-bottom: 20;
`
const OptionContainer = styled.View`
    flex-direction: row;

`
const GaleryContainer = styled.View`
    padding-right: 80;
`
const CameraContainer = styled.View`

`
const CloseModal = styled.View`
    background-color: transparent;
    flex: 1;

`


export default OptionModal