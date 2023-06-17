import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image, ActivityIndicator, Alert, } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView } from 'react-native';
import Checkbox from 'expo-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
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
import imageHolder from '../../assets/AppIcons/imageHolder1.png';
// Sound
import { Audio } from 'expo-av';


// import { signInUser } from '../../services/firebaseAuth';
import { async } from '@firebase/util';

// import dings from '../../soundEffects/btn1.mp3';

import HeaderComponent from '../../Components/HeaderComponent';
import { getCurrentUser } from '../../services/firebaseAuth';
import { competitionEntry } from '../../services/firebseDB';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EnterCompScreen = ({ navigation, route }) => {

    // Fonts
    const [fontsLoaded] = useFonts({
        'Alegreya': require('../../fonts/Alegreya.ttf'),
        'Inter': require('../../fonts/Inter.ttf'),
        'Roboto': require('../../fonts/Roboto.ttf'),
        'RobotoBold': require('../../fonts/Roboto-Bold.ttf'),
    });


    // Adding an entry's States
    const [title, setTitle] = useState("")
    const [photographerName, setPhotographerName] = useState("")
    const [specieDetail, setSpecieDetail] = useState("")
    const [location, setLocation] = useState("")
    const [cameraDetail, setCameraDetail] = useState("")
    const [category, setCategory] = useState("")
    const [imageEntry, setImageEntry] = useState("")

    const [image, setImage] = useState()
    const [imagePlaceholder, setImagePlaceholder] = useState(false)

    const [uploading, setUploading] = useState(false)

    const filename = `${Date.now()}.jpg`;
    const storageRef = firebase.storage().ref().child(filename);
    const [isChecked, setChecked] = useState(false);
    let cat1 = route.params.competition.categories.category1;
    let cat2 = route.params.competition.categories.category2
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: cat1, value: cat1 },
        { label: cat2, value: cat2 }
    ]);

    console.log(route.params.competition.categories.category1);


    // registerNewCompetitionEntry(title, specieDetail, location, cameraDetail, category, imageEntry);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,


        });

        setImagePlaceholder(true)

        if (!result.canceled) {
            console.log("URI: ");
            console.log(result.assets[0].uri);
            setImage(result.assets[0].uri);
        }
    };
    // const response = await fetch(imageUri);
    //    const blob = await response.blob();
    handleSubmit = () => {
        Alert.alert("Error uploading, please make sure all fields are filled and checked.")
    }

    const uploadImage = async () => {


        if (title == "" || specieDetail == "" || location == "" || cameraDetail == "" || value == "" || image == "" || isChecked === false) {
            console.log("Empty Fields!");
            Alert.alert("Error uploading, please make sure all fields are filled and checked.")


        } else {
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
            const ref = firebase.storage().ref().child(`Pictures/` + title + '-' + specieDetail)
            const snapshot = ref.put(blob)
            snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
                () => {
                    setUploading(true)
                },
                (error) => {
                    setUploading(false)
                    console.log(error)
                    Alert.alert("Error uploading, please try again.")
                    blob.close()
                    return
                },
                () => {
                    snapshot.snapshot.ref.getDownloadURL().then((url) => {
                        setUploading(false)

                        var creatorInfo = getCurrentUser()

                        var entry = {
                            title,
                            species: specieDetail,
                            location,
                            cameraDetail,
                            category: value,
                            username: creatorInfo.displayName,
                            profilePhoto: creatorInfo.photoURL,
                            userId: creatorInfo.uid,
                            photoURL: url,
                            createdAt: new Date(),
                            competitionID: route.params.competition.id,
                            likes: 0,
                        }


                        const success = competitionEntry(entry)
                        if (success) {
                            setUploading(false)
                            console.log("Competition added!");

                            navigation.goBack()


                        } else {
                            setUploading(false)

                            console.log("something went wrong when adding comp")
                        }


                        console.log("Download URL: ", url)
                        Alert.alert("CONGRATULATIONS!", "Your photo was submitted. Goodluck!")

                        setImage(url)
                        blob.close()
                        navigation.goBack()


                        return url

                    })
                }
            )
        }


    }

    // console.log(route.params.competition.id);

    return (
        <SafeAreaView style={styles.homescreensafearea}>
            <HeaderComponent />
            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}
            >
                <KeyboardAvoidingView
                    keyboardVerticalOffset={120}
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled={true}
                >
                    <ScrollView>
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
                                    onChangeText={newValue => setTitle(newValue)}
                                    defaultValue={title}
                                >
                                </TextInput>


                                <View style={styles.imageComponent}>

                                    <TouchableOpacity onPress={pickImage} style={styles.imageUploadCon}>
                                        {!imagePlaceholder ?
                                            <Image source={require('../../assets/AppIcons/imageHolder.png')}
                                                style={styles.imageUpload} /> :
                                            <Image source={{ uri: image }}
                                                style={styles.imageUpload} />}
                                        {uploading && <ActivityIndicator size={'large'} color='black' style={{ zIndex: RFValue(1), position: 'absolute', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', top: RFValue(120) }}
                                        />}

                                    </TouchableOpacity>
                                </View>

                                {/* <View style={styles.container}>
                            {image && <Image source={{ uri: image }} style={{ width: 170, height: 200 }} />}
                            <Button title='Select Image' onPress={pickImage} />
                            {!uploading ? <Button title='Upload Image' onPress={uploadImage} /> : <ActivityIndicator size={'small'} color='black' />}
                        </View> */}


                                <View style={styles.Tags}>

                                    <TextInput
                                        style={styles.inputStyleTagsSpecies}
                                        keyboardType='default'
                                        placeholder='SPECIES'
                                        placeholderTextColor='#8A8A8A'
                                        onChangeText={newValue => setSpecieDetail(newValue)}
                                        defaultValue={specieDetail}
                                    ></TextInput>

                                    <TextInput
                                        style={styles.inputStyleTagsCameraType}
                                        keyboardType='default'
                                        placeholder='CAMERA TYPE'
                                        placeholderTextColor='#8A8A8A'
                                        onChangeText={newValue => setCameraDetail(newValue)}
                                        defaultValue={cameraDetail}
                                    ></TextInput>
                                </View>
                                <View style={styles.Gap}></View>
                                <View style={styles.Tags2}>
                                    <View>
                                        <TextInput
                                            style={styles.inputStyleTagsLocation}
                                            keyboardType='default'
                                            placeholder='LOCATION'
                                            placeholderTextColor='#8A8A8A'
                                            onChangeText={newValue => setLocation(newValue)}
                                            defaultValue={location}
                                            onpre
                                        ></TextInput>
                                    </View>

                                    {/* <TextInput
                                        style={styles.inputStyleTagsCategory}
                                        keyboardType='default'
                                        placeholder='CATEGORY'
                                        placeholderTextColor='#8A8A8A'
                                        onChangeText={newValue => setCategory(newValue)}
                                        defaultValue={category}

                                    ></TextInput> */}
                                    <View style={{ height: RFValue(10) }}>
                                        <DropDownPicker
                                            style={styles.inputStyleTagsCategory}
                                            open={open}
                                            value={value}
                                            items={items}
                                            setOpen={setOpen}
                                            setValue={setValue}
                                            setItems={setItems}
                                            placeholder="Category"

                                            placeholderStyle={{ fontSize: RFValue(14), flexDirection: 'row', textAlign: 'auto', color: '#8A8A8A', fontWeight: '800', }}
                                        />
                                    </View>
                                </View>
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
                                <View style={styles.buttonsCheckbox}>
                                    <Checkbox style={{
                                        borderRadius: 20, borderStyle: 'dashed',
                                        borderColor: '#FA993B', width: RFValue(30),
                                        height: RFValue(30), borderWidth: RFValue(1),
                                    }}
                                        value={isChecked} onValueChange={setChecked}
                                        color={isChecked ? '#FA993B' : undefined} />

                                    <Text style={{ fontSize: RFValue(14), justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', fontWeight: '500', color: '#FA993B' }}>I have read & agree to the competition rules</Text>
                                </View>
                                <View style={styles.buttonsSubmit}>
                                    <TouchableOpacity style={styles.submitButton} onPress={uploadImage} >
                                        <Text style={styles.submitButtonText}>SUBMIT</Text>
                                    </TouchableOpacity>
                                </View>


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
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView >
    );
}
// Exporting the components
export default EnterCompScreen

// Styling of component
const styles = StyleSheet.create({
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
    Gap: {
        height: RFValue(12),
    },
    inputStyleTagsCategory: {
        marginLeft: Platform.OS === 'ios' ? RFValue(80) : RFValue(90),
        marginTop: Platform.OS === 'ios' ? RFValue(-15) : RFValue(-15),
        height: RFValue(3),
        width: RFValue(115),
        borderRadius: 11,
        backgroundColor: '#D9D9D9',
        // fontSize: RFValue(10),
        borderWidth: 0,
        fontSize: RFValue(14),
    },
    inputStyleTagsLocation: {
        fontWeight: '800',
        marginRight: Platform.OS === 'ios' ? RFValue(-68) : RFValue(-80),
        height: 50,
        marginTop: Platform.OS === 'ios' ? RFValue(6) : RFValue(13),
        width: RFValue(190),
        paddingLeft: RFValue(8),
        borderRadius: 11,
        backgroundColor: '#D9D9D9',
        fontSize: RFValue(14),
    },
    inputStyleTagsSpecies: {
        fontWeight: '800',
        paddingLeft: RFValue(8),
        marginLeft: Platform.OS === 'ios' ? RFValue(8) : RFValue(6),

        height: 50,
        width: RFValue(160),
        borderRadius: 11,
        backgroundColor: '#D9D9D9',
        fontSize: RFValue(14),
    },
    inputStyleTagsCameraType: {
        fontWeight: '800',
        paddingLeft: RFValue(8),
        marginLeft: Platform.OS === 'ios' ? RFValue(8) : RFValue(6),
        height: 50,
        width: RFValue(140),
        borderRadius: 11,
        backgroundColor: '#D9D9D9',
        fontSize: RFValue(14),
        marginHorizontal: RFValue(2),
    },
    TagsHeading: {
        fontSize: RFValue(14),
        marginLeft: RFValue(-13),
        color: '#FA993B',
        marginBottom: 5,
        fontWeight: 600,
    },
    homescreensafearea: {
        backgroundColor: 'transparent',
    },
    Tags: {
        flexDirection: 'row',
        gap: RFValue(10),
        alignItems: 'center',
        alignSelf: 'center',
    },
    Tags2: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        height: RFValue(30),
        flex: 1,
        marginBottom: Platform.OS === 'ios' ? RFValue(8) : RFValue(24),
    },
    imageComponent: {
        height: RFValue(240),
        flexDirection: 'row',
        gap: 10,
        width: 100,        // backgroundColor: '#fff',
        borderRadius: 11,
        borderStyle: 'dashed',
        borderColor: 'yellow',
        marginBottom: RFValue(50),
    },
    imageUploadCon: {

        borderRadius: 11,
        // backgroundColor: 'white',
        borderStyle: 'dashed',
        borderColor: '#524D4E',
        borderRadius: RFValue(20),
        alignContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: RFValue(260),
        height: RFValue(270),
        marginHorizontal: RFValue(6),
        marginVertical: RFValue(10),
        marginBottom: RFValue(10),
    },
    imageUpload: {
        width: RFValue(225),
        height: Platform.OS === 'ios' ? RFValue(225) : RFValue(225),
        borderRadius: RFValue(20),
        alignContent: 'center',
        alignItems: 'center',
        marginVertical: RFValue(21),
        justifyContent: 'center',
        alignSelf: 'center',
        resizeMode: 'stretch',
    },
    heading: {
        // paddingHorizontal: RFValue(40),
        alignSelf: 'center',
        marginTop: RFValue(-20),
        color: '#fff',
        fontSize: RFValue(20),
        fontWeight: '900',
    },
    headingText: {
        alignContent: 'center',
        alignSelf: 'center',
        color: '#A27A51',
        fontSize: RFValue(18),
        fontWeight: '500',
        textAlign: 'center',
    },
    headingText2: {
        color: '#F2C440',
        fontSize: RFValue(12),
        textAlign: 'center',
        alignSelf: 'center',
    },
    buttonsCheckbox: {
        marginVertical: RFValue(10),
        flexDirection: 'row',
        gap: RFValue(10),
        justifyContent: 'center',
        alignSelf: 'center',
    },

    buttons: {

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
        color: '#FA993B',
        marginBottom: 5,
        fontWeight: 600,
    },
    inputLabelTags: {
        fontSize: RFValue(14),
        marginLeft: 4,
        color: '#FA993B',
        marginBottom: 5,
        fontWeight: 600,

    },
    inputStyle: {
        height: 40,
        borderRadius: 11,
        // borderStyle: 'dashed',
        backgroundColor: '#D9D9D9',
        // borderColor: '#D9D9D9',

        fontSize: RFValue(14),
        padding: 10,
        color: '#A27A51',
        textDecorationLine: 'none',
        marginBottom: 10,
    },
    inputStyleTags: {
        height: 40,
        width: RFValue(150),
        borderRadius: 11,
        // borderStyle: 'dashed',
        backgroundColor: '#D9D9D9',
        // borderColor: '#D9D9D9',

        fontSize: RFValue(14),
        padding: 10,
        color: '#A27A51',
        textDecorationLine: 'none',
        marginBottom: 10,
        fontWeight: '800',
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