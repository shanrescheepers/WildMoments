import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
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

import { registerNewUser } from '../../services/firebaseAuth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = ({ navigation }) => {
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

    const registerUser = () => {
        console.log("REgistering");
        console.log(email)
        registerNewUser(email, password);

    }
    return (
        <SafeAreaView>
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
                        <Text style={styles.enterDetailsText}>Enter your details below & join the Ultimate Wildlife Photo Competition</Text>
                    </View>



                    <View style={styles.inputView}>
                        <Text style={styles.inputLabel}>Username</Text>
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType='default'
                            placeholder='John Doe'
                            placeholderTextColor='#554433'
                            defaultValue={username}
                            onChangeText={newValue => setUsername(newValue)}
                        >
                        </TextInput>

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

                    <View>
                        {/* Validation here */}
                        <TouchableOpacity style={styles.submitButton} onPress={registerUser}>
                            <Text style={styles.submitButtonText}>Create Account</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.needAccountButton}>Already have an Account?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <Toucha
                <Button style={styles.needAccountButton}
                    title="Need an account?" color={'black'}>

                </Button> */}


                </View >
            </ImageBackground>
        </SafeAreaView>
    );
}
// Exporting the components
export default SignUp

// Styling of component
const styles = StyleSheet.create({
    background: {

        resizeMode: 'contain', // or 'contain' to maintain aspect ratio
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
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
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
    }

})