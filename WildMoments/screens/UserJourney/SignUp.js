import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image, Platform, KeyboardAvoidingView } from 'react-native';
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
import { ScrollView } from 'react-native-gesture-handler';

// Profile Picture Images
import lion from '../../assets/ProfileImages/lion_pfp.png';
import elephant from '../../assets/ProfileImages/elephant_pfp.png';
import leopard from '../../assets/ProfileImages/leopard_pfp.png';
import buffalo from '../../assets/ProfileImages/buffalo_pfp.png';
import rhino from '../../assets/ProfileImages/rhino_pfp.png';
import photographer from '../../assets/ProfileImages/photographer_pfp.png';
// Sound
import { Audio } from 'expo-av';
// import { signInUser } from '../../services/firebaseAuth';
import { async } from '@firebase/util';
// import dings from '../../soundEffects/btn1.mp3';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = ({ navigation }) => {

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
    const [profilepicture, setProfilepicture] = React.useState("lion");

    const registerUser = () => {
        console.log("REgistering");
        console.log(email)
        registerNewUser(username, email, password, profilepicture);
        playSound()
    }
    return (
        <SafeAreaView >
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
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={styles.container}>


                            <View style={styles.introView}>
                                <Text style={styles.Intro}>
                                    Celebrating Wildlife Through Photography
                                </Text>
                                <Text style={styles.enterDetailsText}>Enter your details below & join the Ultimate Wildlife Photo Competition</Text>
                            </View>

                            <Text style={styles.pfpText}>Choose your Profile Picture</Text>
                            <View
                                style={styles.profilePictureSelectionScrollView}
                                alwaysBounceHorizontal={true}
                                contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >

                                <TouchableOpacity style={styles.profilePicture}>
                                    <Image source={lion} resizeMode="contain" style={styles.lion} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.profilePicture}>
                                    <Image source={elephant} resizeMode="contain" style={styles.elephant} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.profilePicture}>
                                    <Image source={rhino} resizeMode="contain" style={styles.rhino} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.profilePicture}>
                                    <Image source={buffalo} resizeMode="contain" style={styles.buffalo} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.profilePicture}>
                                    <Image source={leopard} resizeMode="contain" style={styles.leopard} />
                                </TouchableOpacity >
                                <TouchableOpacity style={styles.profilePicture}>
                                    <Image source={photographer} resizeMode="contain" style={styles.photographer} />
                                </TouchableOpacity>
                            </View>


                            <View style={styles.inputView}>
                                <Text style={styles.inputLabel}>Name & Surname</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='default'
                                    placeholder='Name & Surname'
                                    placeholderTextColor='#71563A'
                                    defaultValue={username}
                                    onChangeText={newValue => setUsername(newValue)}
                                >
                                </TextInput>

                                <Text style={styles.inputLabel}>Email</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='email-address'
                                    placeholder='mail@mail.com'
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



                            {/* <Toucha
                <Button style={styles.needAccountButton}
                    title="Need an account?" color={'black'}>

                </Button> */}


                        </View >
                    </ScrollView>

                    <View style={styles.buttons}>
                        {/* Validation here */}
                        <TouchableOpacity style={styles.submitButton} onPress={registerUser} >
                            <Text style={styles.submitButtonText}>SIGN UP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.needAccountButton}>Already have an Account?</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView>
    );
}
// Exporting the components
export default SignUp

// Styling of component
const styles = StyleSheet.create({
    contentContainer: {
        position: 'relative',

        zIndex: 1,

    },
    buttons: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 70 : 30,
        //   top: 
    },
    pfpText: {
        marginBottom: Platform.OS === 'ios' ? 10 : 10,
        marginTop: Platform.OS === 'ios' ? 10 : 10,
        color: '#9E9E9E',
    },
    profilePictureSelectionScrollView: {
        flexDirection: 'row',
        gap: RFValue(6),
        justifyContent: 'center',
        height: RFValue(50),
        width: windowWidth,
        alignContent: 'center',
    },
    lion: {
        width: RFValue(50),
        height: RFValue(50)
    },
    elephant: {
        width: RFValue(50),
        height: RFValue(50)
    },
    rhino: {
        width: RFValue(50),
        height: RFValue(50)
    },
    leopard: {
        width: RFValue(50),
        height: RFValue(50)
    },
    buffalo: {
        width: RFValue(50),
        height: RFValue(50)
    },
    photographer: {
        width: RFValue(50),
        height: RFValue(50)
    },
    background: {

        resizeMode: 'contain', // or 'contain' to maintain aspect ratio
        width: windowWidth,
        height: windowHeight,
    },
    container: {
        margin: 20,

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
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
    },
    introView: {
        textAlign: 'center',
        alignItems: 'center',
        padding: RFValue(4),
        bottom: Platform.OS === 'ios' ? 10 : 10,
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
        marginTop: Platform.OS === 'ios' ? 30 : 20,
        width: RFPercentage(40),
    },
    inputLabel: {
        fontSize: RFValue(14),
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
        fontSize: RFValue(14),
        padding: 10,
        color: '#A27A51',
        textDecorationLine: 'none',
        marginBottom: 10,
    },
    submitButton: {
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
    }

})