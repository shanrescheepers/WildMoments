import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import HeaderComponent from '../../Components/HeaderComponent';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { useState, useEffect } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image, StatusBar } from 'react-native';

import leftArrow from '../../assets/AppIcons/ArrowL.png';
import rightArrow from '../../assets/AppIcons/ArrowR.png';

// fonts import for systems
import { Alegreya } from "@expo-google-fonts/dev";
import { Inter } from "@expo-google-fonts/dev";
import { Roboto } from "@expo-google-fonts/dev";
import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

import CompetitionBlockComponent from '../../Components/CompetitionBlockComponent';
import { useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { getAllCompetitionsFromCollection } from '../../services/firebseDB';
const HomeScreen = ({ navigation }) => {
    const [competitions, setCompetitions] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    // REFRESH EVERYTIME VIEWING SCREEN
    // useFocusEffect(
    //     React.useCallback(() => {
    //         getAllPCompetitionsfromDB()
    //         return () => {
    //             console.log("Not in view");
    //         }
    //     }, [])
    // );

    useEffect(() => {
        getAllCompetitionsfromDB()
    }, [])

    // Get All New Comps From DB (GET ALL COMPS)
    const getAllCompetitionsfromDB = async () => {
        setRefreshing(true)
        // console.log("Getting comps data")
        const allComps = await getAllCompetitionsFromCollection();
        setCompetitions(allComps);
        // console.log(competitions.length);
        setRefreshing(false)

    }

    return (

        <SafeAreaView style={styles.homescreensafearea}>

            <ImageBackground
                source={require('../../assets/bg2.png')}
                style={styles.background}>
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
                    <View style={styles.rulesViewwithArrows}>
                        <View >
                            <Image source={leftArrow} resizeMode="contain" style={{ width: RFValue(40), height: RFValue(30), marginTop: RFValue(-5) }} />
                        </View>
                        <View>
                            <TouchableOpacity style={styles.rulesButton} onPress={() => navigation.navigate('RulesScreen')}>
                                <Text style={styles.rulesButtonText}>RULES</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Image source={rightArrow} resizeMode="contain" style={{ width: RFValue(40), height: RFValue(30), marginTop: RFValue(-3) }} />
                        </View>
                    </View>
                </View>

                <ScrollView style={styles.homescreenscrollview}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing}
                            onRefresh={getAllCompetitionsfromDB} />
                    }>
                    <View style={styles.competitionView}>
                        <ScrollView
                            style={styles.competitionBlocks}
                            contentContainerStyle={styles.scrollViewContent}
                        >
                            {competitions.map((competition, i) => {
                                return (
                                    <View key={i}>
                                        <CompetitionBlockComponent key={i} competition={competition} />
                                        <View style={styles.spacer}></View>
                                    </View>

                                )
                                // <Text>competitions.title</Text>


                            })}

                        </ScrollView>
                    </View>


                </ScrollView>
            </ImageBackground >
        </SafeAreaView >

    );
}

export default HomeScreen

const styles = StyleSheet.create({
    rulesViewwithArrows: {
        alignSelf: 'center',
        flexDirection: 'row',
        height: RFValue(50),
    },
    homescreensafearea: {
        backgroundColor: 'transparent',
    },
    homescreenscrollview: {
        backgroundColor: 'transparent',
        height: 1000,
    },
    scrollViewContent: {
        flexGrow: 1,

    },
    competitionBlocks: {
        backgroundColor: 'transparent',
        flexGrow: 1,
        height: 1000,
        shadowColor: '#111',
        shadowOffset: { width: -2, height: 10 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        // height of content block for competitions
        height: RFValue(2000),
        // marginBottom: RFPercentage(20)
    },
    competitionView: {

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

        opacity: 0.8,
        elevation: 1,
    },
    rulesText: {
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        color: '#111',
        fontWeight: Platform.OS === 'ios' ? '700' : '700',
        shadowColor: '#111',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
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
        borderWidth: Platform.OS === 'ios' ? 1.5 : 1.5,

        color: '#0E0E0E',

        borderRadius: 50,
        marginBottom: 6,
        shadowColor: 'gray',
        alignSelf: 'center',
        justifyContent: 'center',
        // shadowColor: '#000000', // Shadow color
        // shadowOffset: { width: 0, height: -2 }, // Adjust the offset to change the direction of the shadow (inset)
        // shadowOpacity: 0.8, // Shadow opacity (1 is fully opaque)
        // shadowRadius: 4,
    },
    rulesButtonText: {
        color: '#0E0E0E',
        fontSize: Platform.OS === 'ios' ? 13 : 12,
        letterSpacing: Platform.OS === 'ios' ? 1 : 1,
        textAlign: 'center',
        fontWeight: Platform.OS === 'ios' ? '900' : 'bold',
        alignSelf: 'center',
        fontFamily: Alegreya,
    },

})