import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image, ActivityIndicator, Alert, } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView } from 'react-native';
import Checkbox from 'expo-checkbox';

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


// Sound
import { Audio } from 'expo-av';

// import { signInUser } from '../../services/firebaseAuth';
import { async } from '@firebase/util';

// import dings from '../../soundEffects/btn1.mp3';

import HeaderComponent from '../../Components/HeaderComponent';

import DateTimePicker from '@react-native-community/datetimepicker';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddNewCompScreen = ({ navigation }) => {

    // Fonts
    const [fontsLoaded] = useFonts({
        'Alegreya': require('../../fonts/Alegreya.ttf'),
        'Inter': require('../../fonts/Inter.ttf'),
        'Roboto': require('../../fonts/Roboto.ttf'),
        'RobotoBold': require('../../fonts/Roboto-Bold.ttf'),
    });

    // Season and Year : Title
    const [title, setTitle] = useState("")
    // Theme 
    const [theme, setTheme] = useState("");
    // Set Start Date
    const [startDate, setStartDate] = useState("")
    // Set Start Date
    const [startTime, setStartTime] = useState("")
    // Set End Date
    const [endDate, setEndDate] = useState("")
    // Set End Date
    const [endTime, setEndTime] = useState("")


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

    useEffect(() => {
        if (Platform.OS === 'ios') {
            setShow(true);
            setAndroid(false)
        }
    }, [])

    const [prize, setPrize] = useState('');

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('datetime');
    const [show, setShow] = useState(false);
    const [android, setAndroid] = useState(true)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        // setShow(false);
        if (Platform.OS === 'android') {
            setShow(false);

            // for iOS, add a button that closes the picker
        }
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false);

            // for iOS, add a button that closes the picker
        }
        // setMode(currentMode);
    };

    const showDatepicker = () => {
        // showMode('date');
        setShow(true);

        console.log("clicked")
    };

    const showTimepicker = () => {
        // showMode('time');
        setShow(true);

        console.log("clicked")
    };



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
                                <Text style={styles.headingText}>Welcome Admin!</Text>
                                <Text style={styles.headingText2}>A new competition is incoming? How exciting!</Text>
                                <Text style={styles.headingText3}>Please enter all input fields before submitting the newest competition to Wild Moments</Text>
                            </View>


                            <View>



                            </View>

                            <View style={styles.inputView}>

                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='default'
                                    placeholder='Season and Year'
                                    placeholderTextColor='#8A8A8A'
                                    onChangeText={newValue => setTitle(newValue)}
                                    defaultValue={title}
                                >
                                </TextInput>

                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='default'
                                    placeholder='Theme of the Competition'
                                    placeholderTextColor='#8A8A8A'
                                    onChangeText={newValue => setTheme(newValue)}
                                    defaultValue={theme}
                                >
                                </TextInput>

                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='default'
                                    placeholder='1st Place Prize'
                                    placeholderTextColor='#8A8A8A'
                                    onChangeText={newValue => setTheme(prize)}
                                    defaultValue={setPrize}
                                >
                                </TextInput>

                                {android && (< View style={styles.buttonContainer}>
                                    {/* <Button } title="Show date picker!" style={styles.competitionsBrowse} /> */}
                                    <View style={styles.inputStyle}>
                                        <TouchableOpacity

                                            onPress={showDatepicker} >
                                            <Text style={styles.competitionsBrowseText}> Start Time</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.inputStyle}>
                                        <TouchableOpacity

                                            onPress={showTimepicker} >
                                            <Text style={styles.competitionsBrowseText}>Select Start Date</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>)}

                                <View>
                                    <Text style={styles.headingText2}> Start Date</Text>
                                    <Text style={{ color: '#ffff', alignSelf: 'center' }}> {date.toLocaleString()}</Text>
                                    {show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={mode}
                                            display="spinner"
                                            is24Hour={true}
                                            onChange={onChange}
                                            textColor="#FFFFFF"
                                            style={styles.startdateTimePicker}
                                        // textColor={Platform.OS === 'ios' ? '#000000' : '#FFFFFF'}
                                        // {...(Platform.OS === 'android' && { theme: 'dark' })}
                                        />
                                    )}
                                </View>

                                {android && (< View style={styles.buttonContainer}>
                                    {/* <Button } title="Show date picker!" style={styles.competitionsBrowse} /> */}
                                    <View style={styles.inputStyle}>
                                        <TouchableOpacity

                                            onPress={showDatepicker} >
                                            <Text style={styles.competitionsBrowseText}> Start Time</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.inputStyle}>
                                        <TouchableOpacity

                                            onPress={showTimepicker} >
                                            <Text style={styles.competitionsBrowseText}>Select Start Date</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>)}

                                <View>
                                    <Text style={styles.headingText2}> End Date</Text>
                                    <Text style={{ color: '#ffff', alignSelf: 'center' }}> {date.toLocaleString()}</Text>
                                    {show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={mode}
                                            display="spinner"
                                            is24Hour={true}
                                            onChange={onChange}
                                            textColor="#FFFFFF"
                                            style={styles.startdateTimePicker}
                                        // textColor={Platform.OS === 'ios' ? '#000000' : '#FFFFFF'}
                                        // {...(Platform.OS === 'android' && { theme: 'dark' })}
                                        />


                                    )}
                                </View>
                            </View>
                        </View >

                    </ScrollView>
                    <View style={styles.submit}>
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} >
                            <Text style={styles.submitButtonText}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>





            </ImageBackground>

        </SafeAreaView >
    );
}
// Exporting the components
export default AddNewCompScreen


// Styling of component
const styles = StyleSheet.create({
    startdateTimePicker: {
        height: RFPercentage(13),
        marginBottom: RFValue(15),
    },
    competitionsBrowse: {
        borderRadius: 50,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        height: RFValue(35),
        width: RFValue(120),
        borderWidth: 1.5,
        borderColor: '#F2C440',
        borderStyle: 'dashed',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: RFValue(10),
    },
    selectedText: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
        color: 'ffff',
    },
    dateTimePicker: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginTop: RFValue(15),
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
    },
    submit: {
        top: Platform.OS === 'ios' ? RFValue(550) : RFValue(560),
        left: Platform.OS === 'ios' ? RFValue(100) : RFValue(130),
        position: 'absolute',
    },
    submitButton: {
        elevation: 1,
        backgroundColor: '#A27A51',

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
    Gap: { height: RFValue(10), },
    inputStyleTagsCategory: {
        fontWeight: '800',
        paddingLeft: RFValue(8),
        height: 40,
        width: RFValue(120),
        borderRadius: 11,
        backgroundColor: '#D9D9D9',
    },
    inputStyleTagsLocation: {
        fontWeight: '800',
        paddingLeft: RFValue(8),
        height: 40,
        width: RFValue(190),
        borderRadius: 11,
        backgroundColor: '#D9D9D9',
    },
    inputStyleTagsSpecies: {
        fontWeight: '800',
        paddingLeft: RFValue(8),
        height: 40,
        width: RFValue(160),
        borderRadius: 11,
        backgroundColor: '#D9D9D9',
    },
    inputStyleTagsCameraType: {
        fontWeight: '800',
        paddingLeft: RFValue(8),
        height: 40,
        width: RFValue(155),
        borderRadius: 11,
        backgroundColor: '#D9D9D9',
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
        width: windowWidth,
        height: windowHeight,
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
        gap: RFValue(20),

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
        height: RFValue(225),
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
        fontWeight: '900',
        textAlign: 'center',
    },
    headingText2: {
        alignContent: 'center',
        alignSelf: 'center',
        color: '#A27A51',
        fontSize: RFValue(18),
        fontWeight: '500',
        textAlign: 'center',
        paddingBottom: RFValue(5)
    },
    headingText3: {
        color: '#ffff',
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