import { StyleSheet } from 'react-native'
import { ImageBackground, SafeAreaView, Text, View } from 'react-native'
import React from 'react'
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
// import wildlifeImage2 from '../assets/wildlifeImages/widllife2.png';
// import wildlifeImage3 from '../assets/wildlifeImages/widllife3.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





const BrowseAndEnterScreen = ({ navigation }) => {

    return (
        <SafeAreaView
        >
            <HeaderComponent />
            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}
            >
                <View style={styles.heading}>
                    <Text style={styles.headingText}>#PhotoCompetition - Autumn 2023 DB</Text>
                    <Text style={styles.headingText2}>Here you can judge by categories for your convenience</Text>
                </View>

                <View style={styles.comps}>

                    <View style={styles.comp1Heading}>
                        <Text style={styles.comp1HeadingCatergory}>JUDGE PREDATORS</Text>

                    </View>
                    <View style={styles.comp1}>
                        <ScrollView
                            alwaysBounceHorizontal={true}
                            contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}

                        >
                            <View style={styles.comp1ImageView}>
                                <TouchableOpacity>
                                    <Image source={wildlifeImage1} resizeMode="contain" style={styles.comp1ImageViewImage} />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image source={wildlifeImage2} resizeMode="contain" style={styles.comp1ImageViewImage} />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image source={wildlifeImage3} resizeMode="contain" style={styles.comp1ImageViewImage} />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image source={wildlifeImage1} resizeMode="contain" style={styles.comp1ImageViewImage} />
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>

                    <View style={styles.comp1Heading}>
                        <Text style={styles.comp2HeadingCatergory}>JUDGE BROWSERS</Text>


                    </View>
                    <View style={styles.comp2}>
                        <ScrollView
                            alwaysBounceHorizontal={true}
                            contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}

                        >
                            <View style={styles.comp2ImageView}>
                                <TouchableOpacity>
                                    <Image source={wildlifeImage1} resizeMode="contain" style={styles.comp2ImageViewImage} />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image source={wildlifeImage2} resizeMode="contain" style={styles.comp2ImageViewImage} />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image source={wildlifeImage3} resizeMode="contain" style={styles.comp2ImageViewImage} />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image source={wildlifeImage1} resizeMode="contain" style={styles.comp2ImageViewImage} />
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>


                    <View style={styles.comp3Heading}>
                        <Text style={styles.comp3HeadingCatergory}>JUDGE GRAZERS</Text>


                    </View>
                    <View style={styles.comp3}>
                        <ScrollView
                            alwaysBounceHorizontal={true}
                            contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            <View style={styles.comp3ImageView}>
                                <TouchableOpacity>
                                    <Image source={wildlifeImage1} resizeMode="contain" style={styles.comp3ImageViewImage} />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image source={wildlifeImage2} resizeMode="contain" style={styles.comp3ImageViewImage} />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image source={wildlifeImage3} resizeMode="contain" style={styles.comp3ImageViewImage} />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image source={wildlifeImage1} resizeMode="contain" style={styles.comp3ImageViewImage} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default BrowseAndEnterScreen

const styles = StyleSheet.create({
    comp1HeadingCatergory: {
        borderRadius: 50,

        shadowRadius: RFPercentage(8),
        height: RFValue(30),
        width: RFValue(150),
        borderWidth: 1.5,
        borderColor: 'transparent',
        paddingLeft: RFValue(4),
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'left',
        color: '#A27A51',
        fontSize: RFValue(15),
        alignSelf: 'center',
        paddingVertical: RFValue(6),
        fontWeight: 'bold',
    },
    comp2HeadingCatergory: {
        borderRadius: 50,

        shadowRadius: RFPercentage(8),
        height: RFValue(30),
        width: RFValue(150),
        borderWidth: 1.5,
        borderColor: 'transparent',
        paddingLeft: RFValue(4),
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'left',
        color: '#A27A51',
        fontSize: RFValue(15),
        alignSelf: 'center',
        paddingVertical: RFValue(6),
        fontWeight: 'bold',
    },
    comp3HeadingCatergory: {
        borderRadius: 50,

        shadowRadius: RFPercentage(8),
        height: RFValue(30),
        width: RFValue(150),
        borderWidth: 1.5,
        borderColor: 'transparent',
        paddingLeft: RFValue(4),
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'left',
        color: '#A27A51',
        fontSize: RFValue(15),
        alignSelf: 'center',
        paddingVertical: RFValue(6),
        fontWeight: 'bold',
    },
    Browse: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }, competitionsBrowse: {
        // borderWidth: 2,
        // borderColor: '#598059',
        // // borderStyle: 'dashed',
        // height: RFPercentage(5),
        // width: RFPercentage(12),
        // backgroundColor: '#598059',
        // borderRadius: 50,
        // marginBottom: 20,
        // // shadowColor: 'gray',

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
        // paddingHorizontal: RFValue(40),
        alignSelf: 'center',
        paddingVertical: RFValue(20),
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
    comps: {
        flex: 0.8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: RFValue(320),

        marginLeft: RFValue(15),
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
        width: RFValue(380),
        height: RFValue(150),
        flexDirection: 'row',
        marginBottom: RFValue(8),
    },
    comp1Scroll: {
        width: windowWidth,
    },
    comp1ImageView: {
        flexDirection: 'row',
        gap: RFValue(10),
        marginTop: RFValue(8),
    },
    comp1ImageViewImage: {
        width: RFPercentage(19),
        height: RFPercentage(19),

    },

    // COMPETITION CATEGORY 2
    comp2Heading: {
        marginBottom: RFValue(-20),
        fontSize: RFValue(16),
        color: '#fff',
        flexWrap: 'wrap',

        marginLeft: RFValue(10),
    },
    comp2: {
        width: RFValue(380),
        height: RFValue(150),
        marginBottom: RFValue(8),
    },
    comp2Scroll: {
        width: windowWidth,
    },
    comp2ImageView: {
        flexDirection: 'row',
        gap: RFValue(10),
        marginTop: RFValue(8),
    },
    comp2ImageViewImage: {
        width: RFPercentage(19),
        height: RFPercentage(19),
    },

    // COMPETITION CATEGORY 3
    comp3: {
        width: RFValue(380),
        height: RFValue(150),
        marginTop: RFValue(8),
    },
    comp3Scroll: {

        width: windowWidth,
    },
    comp3ImageView: {
        flexDirection: 'row',
        gap: RFValue(10),

    },
    comp3ImageViewImage: {
        width: RFPercentage(19),
        height: RFPercentage(19),
    },
})