import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SubmittedEntryScreen = () => {
    return (
        <View>
            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}>


            </ImageBackground>
        </View>
    )
}

export default SubmittedEntryScreen

const styles = StyleSheet.create({})