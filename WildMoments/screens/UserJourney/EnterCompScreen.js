import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { firebase } from '../../firebase';
// import firebase from 'firebase/app';
import 'firebase/compat/storage'
// import { auth } from '../firebase';
import 'firebase/storage';

import * as ImagePicker from 'expo-image-picker';

import { Dimensions, } from 'react-native';
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

import HeaderComponent from '../../Components/HeaderComponent';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EnterCompScreen = ({ navigation }) => {

    // const [sound, setSound] = React.useState();

    // async function playSound() {
    //     console.log('Loading Sound');
    //     const { sound } = await Audio.Sound.createAsync(require('../../soundEffects/btn.mp3')
    //     );
    //     setSound(sound);

    //     console.log('Playing Sound');
    //     await sound.playAsync();

    // }

    // React.useEffect(() => {
    //     return sound
    //         ? () => {
    //             console.log('Unloading Sound');
    //             sound.unloadAsync();
    //         }
    //         : undefined;
    // }, [sound]);
    // TODO: Setup our Navigation Here. This is Center Point of App
    //TODO: Check if User is Logged In
    // Fonts
    const [fontsLoaded] = useFonts({
        'Alegreya': require('../../fonts/Alegreya.ttf'),
        'Inter': require('../../fonts/Inter.ttf'),
        'Roboto': require('../../fonts/Roboto.ttf'),
        'RobotoBold': require('../../fonts/Roboto-Bold.ttf'),
    });

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [username, setUsername] = useState('')

    // const registerUser = () => {
    //     console.log("REgistering");
    //     console.log(email)
    //     registerNewUser(email, password);
    //     playSound()
    // }


    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const filename = `${Date.now()}.jpg`;
    const storageRef = firebase.storage().ref().child(filename);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    const uploadImage = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();


            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);

        })
        const ref = firebase.storage(filename).ref().child(filename)
        const snapshot = ref.put(blob)
        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
                setUploading(true)
            },
            (error) => {
                setUploading(false)
                console.log(error)
                blob.close()
                return
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setUploading(false)
                    console.log("Download URL: ", url)
                    setImage(url)
                    blob.close()
                    return url
                })
            }
        )
    }

    return (
        <SafeAreaView>
            <HeaderComponent />
            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}
            >
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>#PhotoCompetition - Autumn 2023 DB</Text>
                        <Text style={styles.headingText2}>Please enter all the fields before uploading your image</Text>
                    </View>



                    <View style={styles.inputView}>

                        <TextInput
                            style={styles.inputStyle}
                            keyboardType='default'
                            placeholder='ENTER IMAGE TITLE HERE'
                            placeholderTextColor='#8A8A8A'
                        // defaultValue={username}
                        /*     onChangeText={newValue => setUsername(newValue)} */
                        >
                        </TextInput>

                        <View style={styles.imageComponent}>

                            {image && <Image source={{ uri: image }} style={{ width: 170, height: 200 }} />}
                            <Button title='Select Image' onPress={pickImage} />
                            {!uploading ? <Button title='Upload Image' onPress={uploadImage} /> : <ActivityIndicator size={'small'} color='black' />}

                            <Image>

                            </Image>
                        </View>
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType='email-address'
                            placeholder='john@mail.com'
                            placeholderTextColor='#8A8A8A'
                        // defaultValue={email}
                        /*   onChangeText={newValue => setEmail(newValue)} */
                        >

                        </TextInput>

                        <Text style={styles.inputLabel}>Password</Text>
                        {/* <TextInput
                            style={styles.inputStyle}
                            keyboardType='default'
                            secureTextEntry={true} //great way to show/hide password
                            placeholder='Minumim 6 characters'
                            placeholderTextColor='#8A8A8A'
                        // defaultValue={password}
                        //                 onChangeText={newValue => setPassword(newValue)}
                        ></TextInput> */}
                    </View>

                    <View style={styles.buttons}>
                        {/* Validation here */}
                        {/* <TouchableOpacity style={styles.submitButton}  >
                            <Text style={styles.submitButtonText}>SIGN UP</Text>
                        </TouchableOpacity> */}

                        {/* <TouchableOpacity >
                            <Text style={styles.needAccountButton}>Already have an Account?</Text>
                        </TouchableOpacity> */}
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
export default EnterCompScreen

// Styling of component
const styles = StyleSheet.create({
    imageComponent: {
        height: RFValue(150),
        backgroundColor: 'yellow',
        borderRadius: 11,
        borderStyle: 'dashed',
        borderColor: 'yellow',
    },
    heading: {
        // paddingHorizontal: RFValue(40),
        alignSelf: 'center',

        color: '#fff',
        fontSize: RFValue(20),
    },
    headingText: {
        alignContent: 'center',
        alignSelf: 'center',
        color: '#A27A51',
        fontSize: RFValue(18),
    },
    headingText2: {
        color: '#F2C440',
        fontSize: RFValue(12),
        textAlign: 'center',
        alignSelf: 'center',
    },


    buttons: {
        marginVertical: RFValue(10),
    },
    pfpText: {
        marginBottom: RFValue(6),
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
        color: '#EBEBEB',
        marginBottom: RFPercentage(1),

    },
    enterDetailsText: {
        fontSize: RFValue(16),
        textAlign: 'center',
        paddingLeft: RFPercentage(0.3),
        paddingRight: RFPercentage(0.3),
        color: '#A27A51'
    },
    inputView: {
        marginTop: RFValue(8),
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