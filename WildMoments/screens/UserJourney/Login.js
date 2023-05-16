import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, ImageBackground } from 'react-native';
// import { styles } from '../utils/styles';

import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
// fonts import for systems
import { Alegreya } from "@expo-google-fonts/dev";
import { Inter } from "@expo-google-fonts/dev";
import { Roboto } from "@expo-google-fonts/dev";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// sound click
import { Audio } from 'expo-av';
// import dings from '../../soundEffects/btn1.mp3';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Login = () => {

    const [sound, setSound] = React.useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../../soundEffects/btn.mp3')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    // TODO: Setup our Navigation Here. This is Center Point of App
    //TODO: Check if User is Logged In
    // Fonts
    const [fontsLoaded] = useFonts({
        'Alegreya': require('../../fonts/Alegreya.ttf'),
        'Inter': require('../../fonts/Inter.ttf'),
        'Roboto': require('../../fonts/Roboto.ttf'),
        'RobotoBold': require('../../fonts/Roboto-Bold.ttf'),
    });

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    // sound click


    return (
        <ImageBackground
            source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
            style={styles.background}
        >
            <View style={styles.container}>
                <Image source={require("../../assets/log.png")} style={styles.logo}></Image>

                <View style={styles.introView}>
                    <Text style={styles.Intro}>
                        Celebrating Wildlife Through Photography
                    </Text>
                    <Text style={styles.enterDetailsText}>Enter your details below to continue your Ultimate Wildlife Photo Competition journey</Text>

                </View>
                <Image source={require("../../assets/line.png")}
                    style={styles.horisontalLine}>
                </Image>


                <View style={styles.inputView}>


                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.inputStyle}
                        keyboardType='email-address'
                        placeholder='john@mail.com'
                        placeholderTextColor='#554433'
                        defaultValue={email}
                        onChangeText={newValue => setEmail(newValue)}
                    >
                    </TextInput>

                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        style={styles.inputStyle}
                        keyboardType='default'
                        secureTextEntry={true} //great way to show/hide password
                        placeholder='Minumim 6 characters'
                        placeholderTextColor='#554433'
                        defaultValue={password}
                        onChangeText={newValue => setPassword(newValue)}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={playSound} >
                    <Text style={styles.submitButtonText}>Log In</Text>
                </TouchableOpacity>


                {/* <Toucha
                <Button style={styles.needAccountButton}
                    title="Need an account?" color={'black'}>

                </Button> */}


            </View >
        </ImageBackground>
    );
}
// Exporting the components
export default Login

// Styling of component
const styles = StyleSheet.create({
    background: {

        resizeMode: 'contain',
        // or 'contain' to maintain aspect ratio
        width: windowWidth,
        height: windowHeight,

    },
    container: {
        margin: 20,
        marginTop: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: RFPercentage(15),
        width: RFPercentage(24),
        alignSelf: 'center',
        marginBottom: 20,

        resizeMode: 'cover',
    },
    introView: {
        textAlign: 'center',
        alignItems: 'center',
        padding: RFPercentage(2),
    },
    Intro: {
        color: '#A27A51',
        marginBottom: RFPercentage(1),

    },
    enterDetailsText: {
        fontSize: RFPercentage(3),
        textAlign: 'center',
        paddingLeft: RFPercentage(0.3),
        paddingRight: RFPercentage(0.3),
        color: '#9E9E9E'
    },
    inputView: {
        marginTop: RFPercentage(3),
        width: RFPercentage(40),
    },
    inputLabel: {
        fontSize: 14,
        marginLeft: 4,
        color: 'black',
        marginBottom: 5,
        fontWeight: 600,
    },
    inputStyle: {
        height: 40,
        borderRadius: 5,
        borderStyle: 'dashed',
        borderColor: '#71563A',
        borderWidth: 1,
        padding: 10,
        color: '#A27A51',
        textDecorationLine: 'none',
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: 'black',
        marginTop: 30,

        padding: 15,
        borderRadius: 50,
        marginBottom: 20,
        shadowColor: 'gray',
    },
    submitButtonText: {
        color: '#F2C440',
        fontSize: 20,
        textAlign: 'center',
    },
    needAccountButton: {
        alignItems: 'center',
        textAlign: 'center',
        color: 'black',
        fontSize: RFPercentage(2),
        fontWeight: 'bold',
        height: RFPercentage(2),
        width: RFPercentage(30),
    },
    horisontalLine: {
        width: 90,
        height: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },

})