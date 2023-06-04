import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
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
import { signInUser } from '../../services/firebaseAuth';
import { async } from '@firebase/util';
import { ScrollView } from 'react-native-gesture-handler';
// import dings from '../../soundEffects/btn1.mp3';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Login = ({ navigation }) => {
    // Sound
    const [sound, setSound] = React.useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../../soundEffects/btn.mp3')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
        logOn();
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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const logOn = async () => {
        setLoading(true);
        if (!email || !password) {
            //warning alert
            Alert.alert("Try again", "Please fill in your email and password.", [
                { text: 'Try Again', onPress: () => { setLoading(false) } }
            ])
        } else {
            await signInUser(email, password)
            setLoading(false)
            // auth call

            //success alert

        }
    }

    return (
        <SafeAreaView>
            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}
            >
                <KeyboardAvoidingView
                    keyboardVerticalOffset={RFValue(80)}
                    style={{ flex: 1, }}
                    behavior="padding"
                    enabled={true}

                >
                    <Image source={require("../../assets/log.png")} style={styles.logo}></Image>
                    <ScrollView>
                        <View style={styles.container}>


                            <View style={styles.introView}>
                                <Text style={styles.Intro}>
                                    Celebrating Wildlife Through Photography
                                </Text>
                                <Text style={styles.enterDetailsText}>Enter your details below to continue your Ultimate Wildlife Photo Competition journey</Text>

                            </View>
                            {/* <Image source={require("../../assets/line.png")}
                                style={styles.horisontalLine}>
                            </Image> */}


                            <View style={styles.inputView}>


                                <Text style={styles.inputLabel}>Email</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='email-address'
                                    placeholder='john@mail.com'
                                    placeholderTextColor='#71563A'
                                    defaultValue={email}
                                    onChangeText={newValue => setEmail(newValue)}
                                >
                                </TextInput>

                                <Text style={styles.inputLabel}>Password</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='default'
                                    secureTextEntry={true} //great way to show/hide password
                                    placeholder='Minumim of 6 characters'
                                    placeholderTextColor='#71563A'
                                    defaultValue={password}
                                    onChangeText={newValue => setPassword(newValue)}
                                ></TextInput>
                            </View>


                        </View >
                    </ScrollView>
                    <View style={styles.buttons}>
                        {!loading ? (
                            <View>
                                {/* Validation here */}
                                < TouchableOpacity style={styles.submitButton} onPress={playSound} >
                                    <Text style={styles.submitButtonText}>LOG IN</Text>
                                </TouchableOpacity>
                            </View>
                        ) : <ActivityIndicator animating={loading} size={40} />}


                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                                <Text style={styles.needAccountButton}>Don't have an account?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView >
    );
}
// Exporting the components
export default Login

// Styling of component
const styles = StyleSheet.create({
    buttons: {
        alignSelf: 'center',
        textAlign: 'center',
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 70 : 30,
        //   top: 
    },
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
        height: RFPercentage(13),
        width: RFPercentage(21),
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: Platform.OS === 'ios' ? 8 : 8,
        resizeMode: 'cover',
    },
    introView: {
        textAlign: 'center',
        alignItems: 'center',
        padding: RFPercentage(2),
    },
    Intro: {
        color: '#EBEBEB',
        marginBottom: RFValue(4),
        textTransform: 'uppercase',
        textAlign: 'center',
        top: Platform.OS === 'ios' ? 1 : 1,
        fontWeight: '800',

    },
    enterDetailsText: {
        fontSize: RFValue(16),
        textAlign: 'center',
        paddingLeft: RFPercentage(0.3),
        paddingRight: RFPercentage(0.3),
        color: '#A27A51',
        top: Platform.OS === 'ios' ? 10 : 10,
    },
    inputView: {
        marginTop: RFPercentage(3),
        width: RFPercentage(40),
    },
    inputLabel: {
        fontSize: 14,
        marginLeft: 4,
        color: '#9E9E9E',
        marginBottom: 5,
        fontWeight: 600,
    },
    inputStyle: {
        height: 40,
        borderRadius: 11,
        borderStyle: 'dashed',
        borderColor: '#71563A',
        borderWidth: 1.5,
        padding: 10,
        color: '#A27A51',
        textDecorationLine: 'none',
        marginBottom: 10,
    },
    submitButton: {
        marginTop: RFValue(9),
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#A27A51',
        height: RFValue(45),
        width: RFValue(150),
        borderRadius: RFValue(50),
        // marginBottom: RFValue(5),
        shadowColor: 'gray',
    },
    submitButtonText: {
        color: '#2b2b2b',
        fontSize: RFValue(16),
        alignSelf: 'center',
        paddingVertical: RFValue(13),
        fontWeight: '800',
    },
    needAccountButton: {
        alignItems: 'center',
        textAlign: 'center',
        color: 'black',
        fontSize: RFValue(16),
        marginTop: RFValue(10),
        height: RFPercentage(4),
        width: RFPercentage(30),
        fontWeight: '400',
    },
    horisontalLine: {
        width: 90,
        height: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },

})