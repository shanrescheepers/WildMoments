import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderComponent from '../../Components/HeaderComponent';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { useState, useEffect } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image, StatusBar } from 'react-native';

// import { styles } from '../utils/styles';



// fonts import for systems
import { Alegreya } from "@expo-google-fonts/dev";
import { Inter } from "@expo-google-fonts/dev";
import { Roboto } from "@expo-google-fonts/dev";
import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

import CompetitionBlockComponent from '../../Components/CompetitionBlockComponent';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const HomeScreen = ({ navigation }) => {
    return (

        <SafeAreaView style={styles.homescreensafearea}>
            <ImageBackground
                source={require('../../assets/bg2.png')}
                style={styles.background}>

                <ScrollView style={styles.homescreenscrollview} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>


                    <View style={styles.headercomponent}>
                        <HeaderComponent navigation={navigation} />
                    </View>
                    <View style={styles.headingsView}>
                        {/* <Text style={styles.headingsView_h1}>Are you ready?</Text> */}
                        <Text style={styles.headingsView_h2}>The premier of amazing wildlife photos & conservation.</Text>
                        <Text style={styles.headingsView_h3}>Put your images out into the world by entering our competitions & stand a chance to win exclusive prizes.</Text>
                        {/* <Text style={styles.headingsView_h4}>Vote for your most favourite photo. </Text>
                        <Text style={styles.headingsView_h5}>Winners stand a chance to win spectacular prizes.</Text> */}
                    </View>
                    <View style={styles.rulesView}>
                        <Text style={styles.rulesText}>PLEASE READ THE RULES BEFORE ENTERING COMPETITIONS</Text>
                        <View>
                            <TouchableOpacity style={styles.rulesButton} onPress={() => navigation.navigate('RulesScreen')}>
                                <Text style={styles.rulesButtonText}>RULES</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.competitionView}>
                        <ScrollView style={styles.competitionBlocks} contentContainerStyle={styles.scrollViewContent}>
                            <CompetitionBlockComponent />
                            <View style={styles.spacer} />
                            <CompetitionBlockComponent />
                            <View style={styles.spacer} />
                            <CompetitionBlockComponent />
                        </ScrollView>
                    </View>


                </ScrollView>
            </ImageBackground>
        </SafeAreaView >

    );
}

export default HomeScreen

const styles = StyleSheet.create({
    homescreensafearea: {
        backgroundColor: 'transparent',
    },
    homescreenscrollview: {
        backgroundColor: 'transparent',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    competitionBlocks: {

        backgroundColor: 'transparent',
        flexGrow: 1,
        // height: windowHeight,
        marginBottom: RFPercentage(20)
    },
    competitionView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'transparent',
    },
    spacer: {
        marginVertical: RFPercentage(1),
    },
    headercomponent: {

    },
    background: {
        resizeMode: 'contain',
        // or 'contain' to maintain aspect ratio
        width: windowWidth,
        height: RFPercentage(120),

    },
    headingsView: {
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    headingsView_h1: {
        fontSize: RFValue(14),
        alignSelf: 'center',
        marginTop: RFValue(5)
    },
    headingsView_h2: {
        fontSize: RFValue(16),
        paddingLeft: RFPercentage(5),
        paddingRight: RFPercentage(5),
        textAlign: 'center',
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    headingsView_h3: {
        marginTop: RFValue(3),
        textAlign: 'center',
        fontSize: RFValue(14),

        paddingLeft: RFPercentage(3),
        paddingRight: RFPercentage(3),
        color: '#111',
        fontWeight: '400',

    },
    headingsView_h4: {
        marginTop: RFValue(3),
        textAlign: 'center',
        fontSize: RFPercentage(1.8),

        paddingLeft: RFPercentage(3),
        paddingRight: RFPercentage(3)
    },
    headingsView_h5: {
        marginTop: RFValue(3),
        textAlign: 'center',
        color: '#fff',
        fontSize: RFPercentage(2),

        paddingLeft: RFPercentage(3),
        paddingRight: RFPercentage(3),
        fontWeight: 'bold',
    },

    rulesView: {
        marginTop: RFPercentage(3),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    rulesText: {
        fontSize: RFPercentage(1.6),
        color: '#F2C440',
        textTransform: 'lowercase',
        marginTop: -2,
        marginBottom: 6,
        fontFamily: Roboto,
    },
    rulesButton: {

        marginTop: RFValue(3),
        height: RFPercentage(5),
        width: RFPercentage(11),
        padding: RFValue(1),
        // backgroundColor: '#C89E7B',

        borderStyle: 'dotted',
        borderColor: '#0E0E0E',
        borderWidth: 2,

        color: '#0E0E0E',

        borderRadius: 50,
        marginBottom: 6,
        shadowColor: 'gray',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    rulesButtonText: {
        color: '#0E0E0E',
        fontSize: RFValue(10),
        textAlign: 'center',
        fontWeight: '900',
        alignSelf: 'center',
        fontFamily: Alegreya,
    },

})