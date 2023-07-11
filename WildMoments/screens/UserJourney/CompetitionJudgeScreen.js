import { StyleSheet } from 'react-native'
import { ImageBackground, SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderComponent from '../../Components/HeaderComponent';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getJudgeFromDB } from '../../services/firebseDB';
import { useState, useEffect } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image, StatusBar } from 'react-native';

// fonts import for systems
import { Alegreya } from "@expo-google-fonts/dev";
import { Inter } from "@expo-google-fonts/dev";
import { Roboto } from "@expo-google-fonts/dev";
import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { Asset } from 'expo-asset';

import CompetitionBlockComponent from '../../Components/CompetitionBlockComponent';

// images
import wildlifeImage1 from '../../assets/1.png';
import wildlifeImage2 from '../../assets/2.png';
import wildlifeImage3 from '../../assets/wildlifeImages/wildlife3.png';
// import wildlifeImage2 from '../assets/wildlifeImages/widllife2.png';
// import wildlifeImage3 from '../assets/wildlifeImages/widllife3.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const BrowseAndEnterScreen = ({ navigation, route }) => {

    const [entryCategory1, setentryCategory1] = useState([]);
    const [entryCategory2, setentryCategory2] = useState([]);
    const [cachedImages, setCachedImages] = useState(new Map());



    useEffect(() => {
        // console.log("test");
        // getJudgeFromDB(route.params.competition.id, route.params.competition.categories.category1)
        getEntrysfromDB()


    }, [])

    const getEntrysfromDB = async () => {
        const cat1 = await getJudgeFromDB(route.params.competition.id, route.params.competition.categories.category1)
        const cat2 = await getJudgeFromDB(route.params.competition.id, route.params.competition.categories.category2)

        setentryCategory1(cat1)
        setentryCategory2(cat2)
        // console.log(route.params.competition);

        // console.log("Cat2", + cat2);
        cacheImages(cat1.concat(cat2));

    }

    const cacheImages = async (entries) => {
        const cachedImagesMap = new Map();

        for (const entry of entries) {
            const imageAsset = Asset.fromURI(entry.photoURL);
            await imageAsset.downloadAsync();
            cachedImagesMap.set(entry.id, imageAsset.localUri);
        }

        setCachedImages(cachedImagesMap);
    };

    return (
        <SafeAreaView
        >

            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}
            >
                <HeaderComponent />
                <View style={styles.heading}>
                    <Text style={styles.headingText}>#PhotoCompetition</Text>
                    <Text style={styles.headingText11}>{route.params.competition.title}</Text>
                    {/* <Text style={styles.headingText2}>Judge top class wildlife images by swiping left or right</Text> */}
                </View>

                <View style={styles.comps}>

                    <View style={styles.comp1Heading}>
                        <TouchableOpacity style={styles.judgeButton} onPress={() => navigation.navigate('ImagesVotingScreen',
                            {
                                entries: entryCategory1,
                                theme: route.params.competition.theme,
                                comptitle: route.params.competition.title,
                                prize: route.params.competition.prize
                            }
                        )
                        }>
                            <Text style={styles.comp1HeadingCatergory}>JUDGE {route.params.competition.categories.category1.toUpperCase()}</Text>
                        </TouchableOpacity>
                        <Text style={{ color: '#46433E', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: Platform.OS === 'ios' ? 18 : 45 }}>Scroll left & right</Text>
                    </View>
                    <View style={styles.comp1}>
                        <ScrollView
                            alwaysBounceHorizontal={true}
                            contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={styles.comp1Scroll}
                        >
                            {/* <View style={styles.comp1ImageView}> */}

                            {entryCategory1.map((entry, i) => {
                                return (
                                    <View key={entry.id} style={styles.comp1ImageView}>
                                        <TouchableOpacity onPress={() => navigation.navigate('ImageScreenView',
                                            {
                                                entry: entry,
                                            }
                                        )
                                        }>
                                            <Text style={{ color: '#A27A51', width: RFValue(100), fontSize: RFValue(10), alignSelf: 'center', textAlign: 'center' }}> {entry.title}</Text>
                                            <Image
                                                source={{ uri: cachedImages.get(entry.id) }}
                                                resizeMode="contain"
                                                style={styles.comp1ImageViewImage}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}



                            {/* </View> */}

                        </ScrollView>
                    </View>

                    <View style={styles.comp1Heading}>
                        <TouchableOpacity style={styles.judgeButton} onPress={() => navigation.navigate('ImagesVotingScreen',
                            {
                                entries: entryCategory2,
                                theme: route.params.competition.theme,
                                comptitle: route.params.competition.title,
                                prize: route.params.competition.prize
                            }
                        )
                        }>
                            <Text style={styles.comp2HeadingCatergory}>JUDGE {route.params.competition.categories.category2.toUpperCase()}</Text>
                        </TouchableOpacity>

                        <Text style={{ color: '#46433E', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: Platform.OS === 'ios' ? 18 : 45 }}>Scroll left & right</Text>

                    </View>

                    <View style={styles.comp2}>

                        <ScrollView
                            alwaysBounceHorizontal={true}
                            contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={styles.comp1Scroll}

                        >
                            {entryCategory2.map((entry, i) => {
                                return (
                                    <View key={i} style={styles.comp2ImageView}>
                                        <TouchableOpacity key={i}  >
                                            <Text style={{ color: '#A27A51', width: RFValue(100), fontSize: RFValue(10), alignSelf: 'center', textAlign: 'center' }}> {entry.title}</Text>
                                            <Image src={entry.photoURL} resizeMode="contain" style={styles.comp2ImageViewImage} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}

                        </ScrollView>
                    </View>


                    {/* <View style={styles.comp3Heading}>
                        <TouchableOpacity style={styles.judgeButton}>
                            <Text style={styles.comp3HeadingCatergory}>JUDGE GRAZERS</Text>
                        </TouchableOpacity> */}
                    {/* <TouchableOpacity
                        style={styles.competitionsBrowse}
                        onPress={() => navigation.navigate('BrowseAndEnterScreen')} >
                        <Text style={styles.competitionsBrowseText}>JUDGE</Text>
                    </TouchableOpacity> */}

                    {/* </View> */}
                    {/* <View style={styles.comp3}>
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
                    </View> */}
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default BrowseAndEnterScreen

const styles = StyleSheet.create({

    judgeButton: {
        borderRadius: 50,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        height: RFValue(35),
        width: RFValue(170),
        borderWidth: 1.5,
        borderColor: '#F2C440',
        borderStyle: 'dashed',
        alignItems: 'center',
        paddingHorizontal: RFValue(4),
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        marginLeft: Platform.OS === 'ios' ? 30 : 50,

    },
    comp1HeadingCatergory: {
        borderRadius: 50,
        fontSize: RFValue(13),
        alignItems: 'center',
        color: '#F2C440',
        letterSpacing: RFValue(1),
        fontWeight: 'bold',
    },
    comp2HeadingCatergory: {
        alignItems: 'center',
        color: '#F2C440',
        fontSize: RFValue(13),
        fontWeight: 'bold',
    },
    comp3HeadingCatergory: {
        alignItems: 'center',
        color: '#F2C440',
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


        fontSize: RFValue(20),
    },
    headingText: {
        alignContent: 'center',
        alignSelf: 'center',
        fontWeight: Platform.OS === 'ios' ? '900' : 'bold',
        letterSpacing: Platform.OS === 'ios' ? 2 : 1.5,
        color: '#A27A51',
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
        flex: 0.8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: RFValue(320),

    },
    comp1Heading: {

        flexDirection: 'column',
        gap: 10,

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

        height: RFValue(150),
        marginTop: Platform.OS === 'ios' ? 3 : 2,
    },
    comp1Scroll: {


    },
    comp1ImageView: {
        flexDirection: 'row',

        marginTop: Platform.OS === 'ios' ? 8 : 7,
        // marginRight: Platform.OS === 'ios' ? 5 : 40,
    },
    comp1ImageViewImage: {
        // width: Platform.OS === 'ios' ? RFPercentage(30) : RFPercentage(30),
        height: Platform.OS === 'ios' ? RFValue(100) : RFValue(100),
        marginLeft: Platform.OS === 'ios' ? 10 : 10,

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
        marginTop: Platform.OS === 'ios' ? -30 : 2,
    },
    comp2Scroll: {
        width: windowWidth,
    },
    comp2ImageView: {
        flexDirection: 'row',

        marginTop: Platform.OS === 'ios' ? 8 : 7,
        // marginRight: Platform.OS === 'ios' ? 5 : 40,
    },
    comp2ImageViewImage: {
        height: Platform.OS === 'ios' ? RFValue(100) : RFValue(100),
        marginLeft: Platform.OS === 'ios' ? 10 : 10,
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
})