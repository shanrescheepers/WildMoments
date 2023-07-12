import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { globalStylesheet, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// fonts import for systems
import { Alegreya } from "@expo-google-fonts/dev";
import { Inter } from "@expo-google-fonts/dev";
import { Roboto } from "@expo-google-fonts/dev";

import addIcon from '../../assets/AppIcons/addIcon.png';
import love from '../../assets/AppIcons/love.png';
import lovecircle from '../../assets/AppIcons/lovecircle.png';
//   <Image source={lovecircle} resizeMode="contain" style={styles.containerloveimage} />
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import HeaderComponent from '../../Components/HeaderComponent';
import wildlifeImage1 from '../../assets/1.png';
import wildlifeImage2 from '../../assets/2.png';
import wildlifeImage3 from '../../assets/wildlifeImages/wildlife3.png';
import photographerIcon from '../../assets/AppIcons/PHOTOGRAPHER.png';
import iconBackdrop from '../../assets/AppIcons/iconBackdrop.png'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { getCurrentUser } from '../../services/firebaseAuth';
import { getUserFromDB, getUserEntriesFromDB, getVotesForEntry } from '../../services/firebseDB';
// Profile Picture Images
import lion from '../../assets/ProfileImages/lion_pfp.png';
import elephant from '../../assets/ProfileImages/elephant_pfp.png';
import leopard from '../../assets/ProfileImages/leopard_pfp.png';
import buffalo from '../../assets/ProfileImages/buffalo_pfp.png';
import rhino from '../../assets/ProfileImages/rhino_pfp.png';
import photographer from '../../assets/ProfileImages/photographer_pfp.png';


const UserProfileScreen = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'Alegreya': require('../../fonts/Alegreya.ttf'),
        'Inter': require('../../fonts/Inter.ttf'),
        'Roboto': require('../../fonts/Roboto.ttf'),
        'RobotoBold': require('../../fonts/Roboto-Bold.ttf'),
    });

    const [currentUser, setcurrentUser] = useState(getCurrentUser())
    const [profileImage, setprofileImage] = useState()
    const [entries, setEntries] = useState([])
    const [entriePoints, setEntriePoints] = useState(0)


    useEffect(() => {
        // console.log(currentUser);
        getUserDB()
    }, [])

    const getUserDB = async () => {
        const user = await getUserFromDB(currentUser.uid);
        const entriesFromDb = await getUserEntriesFromDB(currentUser.uid)
        setEntries(entriesFromDb)
        // console.log("Entries", entriesFromDb[0]);
        pointsHolder = 0
        for (let i = 0; i < entriesFromDb.length; i++) {
            // const element = entries[i];
            const points = await getVotesForEntry(entriesFromDb[i].id)
            // console.log("points:", points);
            pointsHolder += points
        }
        setEntriePoints(pointsHolder)
        // console.log(user);
        if (user.profilepicture == "lion") {
            setprofileImage(lion)
        }
        else if (user.profilepicture == "elephant") {
            setprofileImage(elephant)
        }
        else if (user.profilepicture == "leopard") {
            setprofileImage(leopard)
        }
        else if (user.profilepicture == "buffalo") {
            setprofileImage(buffalo)
        }
        else if (user.profilepicture == "rhino") {
            setprofileImage(rhino)
        }
        else if (user.profilepicture == "photographer") {
            setprofileImage(photographer)
        }
        await cacheImage(imageSource);
        await cacheUserEntryImages(entries);
    }

    const cacheImage = async (imageUrl) => {
        const imageAsset = Asset.fromURI(imageUrl);
        await imageAsset.downloadAsync();
        setprofileImage(imageAsset.localUri);
    };

    const cacheUserEntryImages = async (entries) => {
        const cachedEntries = await Promise.all(
            entries.map(async (entry) => ({
                ...entry,
                photoURL: (await cacheImage(entry.photoURL)).localUri,
            }))
        );
        setEntries(cachedEntries);
    };

    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (

            <SafeAreaView>
                <ImageBackground
                    source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                    style={styles.background}
                >
                    <HeaderComponent />
                    <View style={styles.container}>
                        <View style={styles.container1}>
                            <Text style={styles.container1title}>{currentUser?.displayName}</Text>
                            <Image source={profileImage} resizeMode="contain" style={styles.container1image} />
                        </View>

                        <View style={styles.containerLove}>
                            <Image source={love} resizeMode="contain" style={styles.containerloveimage} />
                            <Text style={styles.containerlovetitle}>Total accumulated Votes</Text>
                            <Image source={lovecircle} resizeMode="contain" style={styles.containerloveimage} />
                            <Text style={styles.containerlovetitlelikes}>{entriePoints}</Text>
                        </View>
                        <View style={styles.containerLove}>
                            <Image source={love} resizeMode="contain" style={styles.containerloveimage} />
                            <Text style={styles.containerlovetitle}>Total submitted photos</Text>
                            <Image source={lovecircle} resizeMode="contain" style={styles.containerloveimage} />
                            <Text style={styles.containerlovetitleentries}>{entries.length}</Text>
                        </View>

                        <View style={styles.submittedImages}>
                            <View style={styles.submittedImagestitleborder}>
                                <Text style={styles.submittedImagestitle}>Submitted Images</Text>
                            </View>
                            <Text style={{ color: '#46433E', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: Platform.OS === 'ios' ? 18 : 20, marginTop: Platform.OS === 'ios' ? 1 : -1 }}>Scroll left & right</Text>
                            <ScrollView

                                alwaysBounceHorizontal={true}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollViewContent}
                                style={styles.sv}
                            >

                                {entries.map((entries, i) => (
                                    <TouchableOpacity key={i} onPress={() => navigation.navigate('ImageScreenView',
                                        {
                                            entry: entries,
                                        }
                                    )
                                    }>
                                        <Image source={{ uri: entries.photoURL }} resizeMode="contain" style={styles.comp1ImageViewImage} />
                                        <Text style={styles.entryTitles}>{entries.title}</Text>
                                    </TouchableOpacity>
                                ))}

                            </ScrollView>

                        </View>
                    </View>
                </ImageBackground >
            </SafeAreaView>
        )
    }

}
export default UserProfileScreen



const styles = StyleSheet.create({
    entryTitles: {
        color: '#9C7B57', justifyContent: 'center',
        fontSize: Platform.OS === 'ios' ? 10 : 10,
        alignContent: 'center', alignItems: 'center', alignSelf: 'center',

    },
    sv: {
        width: Platform.OS === 'ios' ? 300 : 300,
        // width: windowWidth,
        marginTop: Platform.OS === 'ios' ? 30 : 30,
        paddingHorizontal: 20,

        // flexDirection: 'row',
        // flexGrow: 1,
        // height: 100, // Adjust the height according to your needs


    },
    submittedImagestitle: {
        padding: Platform.OS === 'ios' ? 9 : 5,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        color: '#ffff',
        textAlign: 'center',
        alignSelf: 'center',
    },

    submittedImagestitleborder: {
        borderRadius: 7,
        height: RFValue(35),
        width: RFValue(170),
        borderWidth: 1,
        borderColor: '#A29085',
        borderStyle: 'solid',
        marginLeft: 10,
        textAlign: 'center',
        alignSelf: 'center',
    },

    submittedImages: {
        marginTop: 40,
    },
    containerLove: {
        alignContent: 'center',
        flexDirection: 'row', // Align children vertically
        marginTop: Platform.OS === 'ios' ? 30 : 30,
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerlovetitle: {
        color: '#A27A51',
        fontSize: Platform.OS === 'ios' ? 16 : 16,
        letterSpacing: 0.5,

    },
    containerlovetitlelikes: {
        color: '#fff',
        fontSize: Platform.OS === 'ios' ? 12 : 12,
        marginLeft: Platform.OS === 'ios' ? -35 : -32,
    },
    containerlovetitleentries: {
        color: '#fff',
        fontSize: Platform.OS === 'ios' ? 12 : 12,
        marginLeft: Platform.OS === 'ios' ? -29 : -29,
    },
    containerloveimage: {

        width: Platform.OS === 'ios' ? 30 : 30,
        height: Platform.OS === 'ios' ? 30 : 30,
    },
    container1title: {
        marginBottom: 8,
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: Platform.OS === 'ios' ? 20 : 20,
    },
    container1image: {
        width: Platform.OS === 'ios' ? 90 : 90,
        height: Platform.OS === 'ios' ? 90 : 90,
    },
    container1: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column', // Align children vertically
        alignItems: 'center',
        gap: 10,
    },
    container: {
        margin: 20,
        marginTop: 140,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {

        resizeMode: 'contain', // or 'contain' to maintain aspect ratio
        width: windowWidth,
        height: windowHeight,
    },
    heading: {
        marginTop: RFPercentage(3),
        fontFamily: 'RobotoBold',
        fontSize: RFPercentage(3),
        fontWeight: 900,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
        color: '#A27A51',
    },
    logo: {
        height: RFPercentage(15),
        width: RFPercentage(24),
        alignSelf: 'center',
        marginBottom: 20,

        resizeMode: 'cover',
    },
    Intro: {
        color: '#A27A51',
    },
    horisontalLine: {
        width: 90,
        height: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    exploreCaptureShare: {
        marginTop: 10,
        fontSize: RFPercentage(4),
        fontWeight: 'bold',
        color: '#EBEBEB',
    },
    butonContainer: {
        marginTop: 80,
        // display: 'flex',
        // flexDirection: 'row',
        // flexWrap: 'wrap'
        // display: 'flex',
        // flexDirection: 'column',
        // flexWrap: 'wrap'
    },
    signInButton: {
        borderRadius: 50,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        backgroundColor: '#A27A51',
        position: 'relative',
        height: RFPercentage(8),
        width: RFPercentage(16),
    },
    signInButtonText: {
        textAlign: 'center',
        fontWeight: '800',
        padding: RFPercentage(2),
        fontSize: RFPercentage(3),
    },
    signUpButton: {
        borderRadius: 50,
        shadowColor: 'gray',
        shadowRadius: RFPercentage(8),
        height: RFPercentage(8),
        width: RFPercentage(16),
        borderWidth: 1.5,
        borderColor: '#F2C440',
        borderStyle: 'dashed',
        position: 'relative',

    },
    signUpButtonText: {
        textAlign: 'center',
        color: '#F2C440',
        padding: RFPercentage(1.9),
        fontSize: RFPercentage(3),
    },
    comp1Scroll: {
        width: windowWidth,
        // marginLeft: Platform.OS === 'ios' ? -34 : -29,
    },
    comp1ImageView: {
        width: Platform.OS === 'ios' ? RFValue(300) : RFValue(300),
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        // gap: Platform.OS === 'ios' ? -34 : -29,
        marginTop: Platform.OS === 'ios' ? 60 : 60,
    },
    comp1ImageViewImage: {
        width: Platform.OS === 'ios' ? 135 : 115,
        height: Platform.OS === 'ios' ? RFValue(100) : RFValue(100),
        marginLeft: Platform.OS === 'ios' ? 3 : 2,
    },
})
