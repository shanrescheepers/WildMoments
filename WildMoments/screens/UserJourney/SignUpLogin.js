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

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const SignUpLogin = ({ navigation }) => {
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

            <SafeAreaView>
                <ImageBackground
                    source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                    style={styles.background}
                >
                    <View style={styles.container}>
                        <Image source={require("../../assets/log.png")}
                            style={styles.logo}>
                        </Image>

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.Intro}>
                                Celebrating Wildlife Through Photography
                            </Text>


                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.heading} >
                                FRAME THE UNTAMED
                            </Text>
                            <Image source={require("../../assets/line.png")}
                                style={styles.horisontalLine}>
                            </Image>
                            <Text style={styles.exploreCaptureShare}>
                                Explore  Capture  Share
                            </Text>
                        </View>



                        <View style={styles.butonContainer}>
                            {/* Button to Navigation to Signup */}
                            <TouchableOpacity activeOpacity={0.2}
                                style={styles.signUpButton}
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                <View >
                                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                                </View>
                            </TouchableOpacity >

                            <View style={{ height: RFPercentage(3) }}></View>

                            {/* Button to Navigation to Login */}
                            <TouchableOpacity activeOpacity={0.2}
                                style={styles.signInButton}

                                onPress={() => navigation.navigate('Login')}
                            >
                                <View >
                                    <Text style={styles.signInButtonText} >Login</Text>
                                </View>
                            </TouchableOpacity>

                        </View >


                    </View>
                </ImageBackground >
            </SafeAreaView>
        )
    }

}
export default SignUpLogin



const styles = StyleSheet.create({

    container: {
        margin: 20,
        marginTop: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {

        resizeMode: 'contain', // or 'contain' to maintain aspect ratio
        width: windowWidth,
        height: windowHeight,
    },
    heading: {
        marginTop: RFPercentage(3),
        fontFamily: 'RobotoBold',
        fontSize: RFPercentage(3),
        fontWeight: 900,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    logo: {
        height: RFPercentage(15),
        width: RFPercentage(24),
        alignSelf: 'center',
        marginBottom: 20,

        resizeMode: 'cover',
    },
    Intro: {
        color: '#A27A51',
    },
    horisontalLine: {
        width: 90,
        height: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    exploreCaptureShare: {
        marginTop: 10,
        fontSize: RFPercentage(4),
        fontWeight: 'bold',
    },
    butonContainer: {
        marginTop: 80,
        // display: 'flex',
        // flexDirection: 'row',
        // flexWrap: 'wrap'
        // display: 'flex',
        // flexDirection: 'column',
        // flexWrap: 'wrap'
    },
    signInButton: {
        borderRadius: 50,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        backgroundColor: '#A27A51',
        position: 'relative',
        height: RFPercentage(8),
        width: RFPercentage(16),
    },
    signInButtonText: {
        textAlign: 'center',

        padding: RFPercentage(2),
        fontSize: RFPercentage(3),
    },
    signUpButton: {
        borderRadius: 50,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        height: RFPercentage(8),
        width: RFPercentage(16),
        borderWidth: 1,
        borderColor: '#F2C440',
        borderStyle: 'dashed',
        position: 'relative',

    },
    signUpButtonText: {
        textAlign: 'center',

        padding: RFPercentage(1.9),
        fontSize: RFPercentage(3),
    }
})
