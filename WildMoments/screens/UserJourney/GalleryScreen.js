import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { StyleSheet } from 'react-native'
import { ImageBackground, SafeAreaView } from 'react-native'

import { ScrollView } from 'react-native-gesture-handler'
import HeaderComponent from '../../Components/HeaderComponent';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { useState, useEffect } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image, StatusBar } from 'react-native';

// fonts import for systems
import { Alegreya } from "@expo-google-fonts/dev";
import { Inter } from "@expo-google-fonts/dev";
import { Roboto } from "@expo-google-fonts/dev";
import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

import CompetitionBlockComponent from '../../Components/CompetitionBlockComponent';

// images
import wildlifeImage1 from '../../assets/1.png';
import wildlifeImage2 from '../../assets/2.png';
import wildlifeImage3 from '../../assets/wildlifeImages/wildlife3.png';
import photographerIcon from '../../assets/AppIcons/PHOTOGRAPHER.png';
import iconBackdrop from '../../assets/AppIcons/iconBackdrop.png'
import galleryWinnerLogo from '../../assets/AppIcons/galleryWinners.png'
// import wildlifeImage2 from '../assets/wildlifeImages/widllife2.png';
// import wildlifeImage3 from '../assets/wildlifeImages/widllife3.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





const GalleryScreen = ({ navigation }) => {

    return (
        <SafeAreaView
        >

            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}
            >
                <HeaderComponent />
                <View style={styles.logo}>
                    <Image source={galleryWinnerLogo} resizeMode="contain" style={styles.galleryWinnerlogo} />
                </View>
                {/*  */}
                {/* 
                <View style={styles.competitionView}>
                    <ScrollView style={styles.competitionBlocks}
                        contentContainerStyle={styles.scrollViewContent}
                        showsVerticalScrollIndicator={false}
                    > */}
                {/* <TouchableOpacity onPress={() => navigation.navigate('GalleryScreenWinnersOverview')} >
                            <CompetitionBlockComponent />
                        </TouchableOpacity>
                        <View style={styles.spacer} />
                        <TouchableOpacity>
                            <CompetitionBlockComponent />
                        </TouchableOpacity>
                        <View style={styles.spacer} />
                        <TouchableOpacity>
                            <CompetitionBlockComponent />
                        </TouchableOpacity> */}
                {/* </ScrollView>
                </View> */}

            </ImageBackground>
        </SafeAreaView >
    )
}

export default GalleryScreen


const styles = StyleSheet.create({
    competitionBlocks: {
        backgroundColor: 'transparent',
        flexGrow: 1,
        height: windowHeight,
        marginBottom: Platform.OS === 'ios' ? RFValue(60) : RFValue(100),

    },
    scrollViewContent: {
        flexGrow: 1,
        height: windowHeight,
        marginVertical: Platform.OS === 'ios' ? 20 : 3,
        marginBottom: Platform.OS === 'ios' ? 15 : 15,

    },
    spacer: {
        marginVertical: Platform.OS === 'ios' ? 20 : 20,
    },
    competitionView: {
        shadowColor: '#111',
        shadowOffset: {
            width: windowWidth,
            height: 26,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        flex: 1,
        padding: 10,
        backgroundColor: 'transparent',

    },
    touchableOpacity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: Platform.OS === 'ios' ? RFValue(30) : RFValue(30),
        height: Platform.OS === 'ios' ? RFValue(30) : RFValue(30),
        borderRadius: 15,
        borderWidth: 1.7,
        borderColor: '#A29085',
        borderStyle: 'dotted',
        marginTop: 5,
        marginLeft: 20, // Adjust the margin to control the spacing from the TouchableOpacity
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        color: '#A29085',
        fontWeight: 'bold',
        fontSize: Platform.OS === 'ios' ? RFValue(13) : RFValue(14),
    },
    scrollViewContent: {
        // height: Platform.OS === 'ios' ? RFPercentage(100) : RFPercentage(100),
        height: Platform.OS === 'ios' ? RFValue(740) : RFValue(710),

    }, closedcompsButton: {
        borderRadius: 7,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        height: RFValue(35),
        width: RFValue(170),
        borderWidth: 1,
        borderColor: '#A29085',
        borderStyle: 'solid',
        alignItems: 'center',
        paddingHorizontal: RFValue(4),
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        marginLeft: Platform.OS === 'ios' ? 20 : 20,
    },
    judgeButton: {
        borderRadius: 7,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        height: RFValue(35),
        width: RFValue(170),
        borderWidth: 1,
        borderColor: '#A29085',
        borderStyle: 'solid',
        alignItems: 'center',
        paddingHorizontal: RFValue(4),
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        marginLeft: Platform.OS === 'ios' ? 20 : 20,

    },
    photographersButton: {
        borderRadius: 7,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        height: RFValue(35),
        width: RFValue(210),
        borderWidth: 1.5,
        borderColor: '#A29085',
        borderStyle: 'solid',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: RFValue(4),
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        marginLeft: Platform.OS === 'ios' ? 20 : 20,
    },
    comp1HeadingCatergory: {
        borderRadius: 50,
        fontSize: RFValue(13),
        alignItems: 'center',
        color: '#A29085',
        letterSpacing: RFValue(1),
        fontWeight: 'bold',
    },
    comp2HeadingCatergory: {
        alignItems: 'center',
        color: '#A29085',
        fontSize: RFValue(13),
        fontWeight: 'bold',
    },
    comp3HeadingCatergory: {
        alignItems: 'center',
        color: '#A29085',
        fontSize: RFValue(13),
        fontWeight: 'bold',
    },
    Browse: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }, competitionsBrowse: {
        borderRadius: 50,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        height: RFValue(30),
        width: RFValue(100),
        borderWidth: 1.5,
        borderColor: '#F2C440',
        borderStyle: 'dashed',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        // elevation: 10, // Adjust the elevation value as per your preference

    },
    competitionsBrowseText: {
        color: '#F2C440',
        fontSize: RFValue(12),
        alignSelf: 'center',
        paddingVertical: RFValue(6),
        fontWeight: 'bold',
    },
    background: {
        resizeMode: 'contain',
        // or 'contain' to maintain aspect ratio
        width: windowWidth,
        height: windowHeight,

    },
    heading: {
        alignSelf: 'center',
        paddingVertical: RFValue(20),
        color: '#fff',
        // fontWeight: '900',
        height: Platform.OS === 'ios' ? 90 : 80,
        gap: Platform.OS === 'ios' ? 15 : 15,
        marginBottom: Platform.OS === 'ios' ? 15 : 15,
        fontSize: RFValue(20),
    },
    logo: {
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios' ? -15 : -15,
        color: '#fff',
        height: Platform.OS === 'ios' ? 90 : 80,
        gap: Platform.OS === 'ios' ? 15 : 15,
        marginBottom: Platform.OS === 'ios' ? 10 : -1,
        fontSize: RFValue(20),
        shadowColor: '#ffff',
        shadowOffset: {
            width: 5,
            height: 7,
        },
        shadowOpacity: 0.9,
        shadowRadius: 20,
    },
    headingText: {
        alignContent: 'center',
        alignSelf: 'center',
        fontWeight: Platform.OS === 'ios' ? '900' : 'bold',
        letterSpacing: Platform.OS === 'ios' ? 2 : 1.5,
        color: '#F5F5F5',
        fontSize: RFValue(18),
        marginTop: Platform.OS === 'ios' ? -10 : -10,
    },
    headingText11: {
        alignContent: 'center',
        alignSelf: 'center',
        color: '#A27A51',
        fontSize: RFValue(18),
        marginBottom: Platform.OS === 'ios' ? 4 : 3,
    },
    headingText2: {
        color: '#fff',
        fontSize: RFValue(12),
        textAlign: 'center',
        alignSelf: 'center',
    },
    comps: {

        flexDirection: 'column',
        justifyContent: 'space-between',
        width: RFValue(320),

    },
    comp1Heading: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    comp2Heading: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    comp3Heading: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    // COMPETITION CATEGORY 1
    comp1: {
        width: Platform.OS === 'ios' ? 435 : 415,
        height: RFValue(150),
        marginTop: Platform.OS === 'ios' ? 3 : 2,
        marginBottom: Platform.OS === 'ios' ? 12 : 18,
    },
    comp1Scroll: {
        width: windowWidth,
        marginLeft: Platform.OS === 'ios' ? -34 : -29,
    },
    comp1ImageView: {
        flexDirection: 'row',
        gap: Platform.OS === 'ios' ? -34 : -29,
        marginTop: Platform.OS === 'ios' ? 8 : 7,
    },
    galleryWinnerlogo: {
        width: Platform.OS === 'ios' ? 135 : 115,
        height: Platform.OS === 'ios' ? RFValue(100) : RFValue(100),
        marginLeft: Platform.OS === 'ios' ? 3 : 2,
    },
    comp1ImageViewImage: {
        width: Platform.OS === 'ios' ? 135 : 115,
        height: Platform.OS === 'ios' ? RFValue(100) : RFValue(100),
        marginLeft: Platform.OS === 'ios' ? 3 : 2,
    },

    // COMPETITION CATEGORY 2
    comp2Heading: {

        fontSize: RFValue(16),
        color: '#fff',
        flexWrap: 'wrap',

        marginLeft: RFValue(10),
    },
    comp2: {
        width: Platform.OS === 'ios' ? 435 : 415,
        height: RFValue(150),
        marginTop: Platform.OS === 'ios' ? 3 : 2,
        marginBottom: Platform.OS === 'ios' ? 12 : 18,
    },
    comp2Scroll: {
        width: windowWidth,
    },
    comp2ImageView: {
        flexDirection: 'row',
        gap: Platform.OS === 'ios' ? -34 : -29,
        marginTop: Platform.OS === 'ios' ? 8 : 7,
    },
    comp2ImageViewImage: {
        width: Platform.OS === 'ios' ? 135 : 115,
        height: Platform.OS === 'ios' ? RFValue(100) : RFValue(100),
        marginLeft: Platform.OS === 'ios' ? 3 : 2,
    },

    // COMPETITION CATEGORY 3
    comp3: {
        width: Platform.OS === 'ios' ? 435 : 415,
        height: RFValue(150),
        marginTop: Platform.OS === 'ios' ? 3 : 2,
    },
    comp3Scroll: {

        width: windowWidth,
    },
    comp3ImageView: {
        flexDirection: 'row',
        gap: Platform.OS === 'ios' ? -34 : -29,
        marginTop: Platform.OS === 'ios' ? 8 : 7,

    },
    comp3ImageViewImage: {
        width: Platform.OS === 'ios' ? 135 : 115,
        height: Platform.OS === 'ios' ? RFValue(100) : RFValue(100),
        marginLeft: Platform.OS === 'ios' ? 3 : 2,

    },
    comp3ImageViewImage2: {
        width: Platform.OS === 'ios' ? 80 : 70,
        height: Platform.OS === 'ios' ? RFValue(100) : RFValue(100),
        marginLeft: Platform.OS === 'ios' ? 3 : 2,

    },
    overlayContainer: {
        position: 'absolute',
        top: '50%',
        left: Platform.OS === 'ios' ? 67 : 63,
        transform: [{ translateX: -39 }, { translateY: -3 }],
        justifyContent: 'center',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? RFValue(5) : RFValue(5),
    },

})