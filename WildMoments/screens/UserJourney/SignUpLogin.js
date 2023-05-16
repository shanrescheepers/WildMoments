import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
// fonts import for systems
import { Alegreya } from "@expo-google-fonts/dev";
import { Inter } from "@expo-google-fonts/dev";
import { Roboto } from "@expo-google-fonts/dev";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const SignUpLogin = () => {
    const [fontsLoaded] = useFonts({
        'Alegreya': require('../../fonts/Alegreya.ttf'),
        'Inter': require('../../fonts/Inter.ttf'),
        'Roboto': require('../../fonts/Roboto.ttf'),
        'RobotoBold': require('../../fonts/Roboto-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (

            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}
            >
                <View style={styles.container}>
                    <Image source={require("../../assets/log.png")}
                        style={styles.logo}>
                    </Image>

                    <Text style={styles.Intro}>
                        Celebrating Wildlife Through Photography
                    </Text>

                    <Text style={styles.heading} >
                        FRAME THE UNTAMED
                    </Text>
                    <Image source={require("../../assets/line.png")}
                        style={styles.horisontalLine}>
                    </Image>
                    <Text style={styles.exploreCaptureShare}>
                        Explore  Capture  Share
                    </Text>

                     
                    
                        <View style={styles.bu
                            tonContainer}>

                                <Touchabl eOpa c ity activeOpacity={0.2} style={styles.signUpButton}>
                            <View  style={{ textAlign: 'center', padding: 7, marginTop: -2 }}>
                                <Text>Sign  Up</Text>
    w>
    </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.2} style={styles.loginButton}>
                            <View  style={{ textAlign: 'center', padding: 7, marginTop: -2 }}>
                                <Text>Sign  Up</Text>
                            </View>
                        </TouchableOpacity>
      
                    </View >  


                </View>
            </ImageBackground>
        )
    }

}
export default SignUpLogin

    // styling component
    
    yles = StyleSheet.create({
    
    ainer: {
    margin: 20,
        marginTop: 32,
        justifyContent: 'center',
    alignItems: 'center',
    
    ground: {

        resizeMode: 'contain', // or 'contain' to maintain aspect ratio
    width: windowWidth,
    height: windowHeight,
    
    ing: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
    fontWeight: 900,
        textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    
    : {
        height: 50,
    width: 80,
    alignSelf: 'center',
        marginBottom: 20,
    
    resizeMode: 'cover',
},
    horisontalLine: {
    width: 90,
    height: 1,
    
exploreCaptureShare: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 20,
    }
})