import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image, ActivityIndicator, Alert, } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { createCompetitionInDB } from '../../services/firebseDB';
import { firebase } from '../../firebase';
// import firebase from 'firebase/app';
import 'firebase/compat/storage'
// import { auth } from '../firebase';
import 'firebase/storage';
import { getCurrentUser } from '../../services/firebaseAuth';

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

    const [android, setAndroid] = useState(true);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            setShowstartDate(true);
            setShowEndDate(true);

            setAndroid(false)
        }
    }, [])


    const [loading, setLoading] = useState(false);

    handleSubmit = async () => {
        console.log(title);
        console.log(theme);
        console.log(prize);


        setLoading(true);
        if (!title || !theme || !prize) {
            //warning alert
            Alert.alert("Try again", "Please fill in all the fields", [
                { text: 'Try again', onPress: () => { setLoading(false) } }])
        } else {
            //firebase CRUD ADD call:
            var creatorInfo = getCurrentUser()
            let categories = {
                category1, category2
            }
            var competition = { title, theme, prize, startDate, endDate, categories }
            const success = await createCompetitionInDB(competition)
            if (success) {
                setLoading(false)
                console.log("Competition added!");
                {
                    Alert.alert("Successfully", "added a new Competition!", [
                        { text: 'Home', onPress: () => { navigation.goBack() } }
                    ])
                }
            } else {
                setLoading(false)
                console.log("something went wrong when adding comp")
            }
        }
    }



    const [prize, setPrize] = useState("");

    const [category1, setCategory1] = useState();
    const [category2, setCategory2] = useState();
    const [category3, setCategory3] = useState();


    const [mode, setMode] = useState('datetime');

    const [showstartDate, setShowstartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);


    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const onStartChange = (event, selectedDate) => {
        const startDate = selectedDate;
        if (Platform.OS === 'android') {
            setShowstartDate(false);
        }
        setstartDate(startDate);
    };

    const onEndChange = (event, selectedDate) => {
        const startDate = selectedDate;
        if (Platform.OS === 'android') {
            setShowEndDate(false);
        }
        setEndDate(startDate);
    };

    const showstartDatepicker = () => {
        setMode("date")
        setShowstartDate(true);
        console.log("clicked")
    };

    const showstartTimepicker = () => {
        setMode("time")

        setShowstartDate(true);
        console.log("clicked")
    };


    const showendDatepicker = () => {
        setMode("date")
        setShowEndDate(true);
        console.log("clicked")
    };

    const showendTimepicker = () => {
        setMode("time")
        setShowEndDate(true);
        console.log("clicked")
    };




    return (
        <SafeAreaView style={styles.homescreensafearea}>



            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}
            >
                <HeaderComponent />
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
                                    onChangeText={val => setTheme(val)}
                                    defaultValue={theme}
                                >
                                </TextInput>

                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='default'
                                    placeholder='1st Place Prize'
                                    placeholderTextColor='#8A8A8A'
                                    onChangeText={val2 => setPrize(val2)}
                                    defaultValue={prize}
                                >
                                </TextInput>
                                <View style={styles.categoriesInput}>
                                    <View style={{ width: RFValue(96), alignContent: 'center' }}>
                                        <TextInput
                                            style={styles.inputStyle}
                                            keyboardType='default'
                                            placeholder='Category 1'
                                            placeholderTextColor='#8A8A8A'
                                            onChangeText={val2 => setCategory1(val2)}
                                            defaultValue={category1}
                                        >
                                        </TextInput>
                                    </View>

                                    <View style={{ width: RFValue(96), alignContent: 'center' }}><TextInput
                                        style={styles.inputStyle}
                                        keyboardType='default'
                                        placeholder='Category 2'
                                        placeholderTextColor='#8A8A8A'
                                        onChangeText={val2 => setCategory2(val2)}
                                        defaultValue={category2}
                                    >
                                    </TextInput>
                                    </View>

                                </View>

                                {android && (< View style={styles.buttonContainer}>
                                    {/* <Button } title="Show date picker!" style={styles.competitionsBrowse} /> */}
                                    <View style={styles.inputStyle}>
                                        <TouchableOpacity

                                            onPress={showstartTimepicker} >
                                            <Text style={styles.competitionsBrowseText}> Start Time</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.inputStyle}>
                                        <TouchableOpacity

                                            onPress={showstartDatepicker} >
                                            <Text style={styles.competitionsBrowseText}>Select Start Date</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>)}

                                <View>
                                    <Text style={styles.headingText2}> Start Date</Text>
                                    <Text style={{ color: '#ffff', alignSelf: 'center' }}> {startDate.toLocaleString()}</Text>
                                    {showstartDate && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={startDate}
                                            mode={mode}
                                            display="spinner"
                                            is24Hour={true}
                                            onChange={onStartChange}
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

                                            onPress={showendTimepicker} >
                                            <Text style={styles.competitionsBrowseText}> Start Time</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.inputStyle}>
                                        <TouchableOpacity

                                            onPress={showendDatepicker} >
                                            <Text style={styles.competitionsBrowseText}>Select Start Date</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>)}

                                <View>
                                    <Text style={styles.headingText2}> End Date</Text>
                                    <Text style={{ color: '#ffff', alignSelf: 'center' }}> {endDate.toLocaleString()}</Text>
                                    {showEndDate && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={endDate}
                                            mode={mode}
                                            display="spinner"
                                            is24Hour={true}
                                            onChange={onEndChange}
                                            textColor="#FFFFFF"
                                            style={styles.startdateTimePicker}
                                        // textColor={Platform.OS === 'ios' ? '#000000' : '#FFFFFF'}
                                        // {...(Platform.OS === 'android' && { theme: 'dark' })}
                                        />


                                    )}
                                </View>
                            </View >
                        </View>
                    </ScrollView>

                    <View style={styles.submit}>

                        {!loading ? (
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} >
                                <Text style={styles.submitButtonText}>SUBMIT</Text>
                            </TouchableOpacity>
                        ) : <ActivityIndicator animating={loading} size={70} style={{ alignSelf: 'center', justifyContent: 'center', position: 'absolute', left: RFValue(50) }} />}
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
        top: Platform.OS === 'ios' ? RFValue(590) : RFValue(590),
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
    categoriesInput: {
        flex: 1,
        flexDirection: 'row',
        gap: RFValue(10),
        height: RFValue(50),
        alignSelf: 'center',

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
        color: '#F2C440',
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
        width: RFPercentage(46),
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