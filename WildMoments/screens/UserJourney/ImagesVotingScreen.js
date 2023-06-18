

// import React in our code
import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Dimensions,
    ImageBackground,
    Image,
    Button,
    TouchableOpacity
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import HeaderComponent from '../../Components/HeaderComponent';
import { voteEntry } from '../../services/firebseDB';
import { getCurrentUser } from '../../services/firebaseAuth';


const SCREEN_WIDTH = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ImagesVotingScreen = ({ navigation, route }) => {
    const [entries, setEntries] = useState([])

    const [currentEntry, seCurrentEntry] = useState()
    const [position, setPosition] = useState(0)

    const [isChecked5, setChecked5] = useState(false);
    const [isChecked10, setChecked10] = useState(false);

    const [value, setValue] = useState(null);

    useEffect(() => {
        setEntries(route.params.entries)
        console.log(entries);
        seCurrentEntry(route.params.entries[0])
    }, [])


    function next(val, id) {
        // console.log(val);

        nposition = position;
        nposition++;
        console.log(nposition);
        if (val == 5) {
            setChecked5(true)

        }
        if (val == 10) {
            setChecked10(true)

        }
        const success = voteEntry(getCurrentUser().uid, id, val)

        if (success) {
            console.log("Vote added!");

        } else {

            console.log("something went wrong when adding vote")
        }
        // Wait for 2 seconds (2000 milliseconds)
        new Promise((resolve) => {
            setTimeout(() => {
                // Enable the button after the delay
                setChecked5(false);
                setChecked10(false);
                console.log('Button Pressed and changed icon after Delay');
                resolve(); // Resolve the Promise
            }, 3000);
        }).then(() => {
            seCurrentEntry(route.params.entries[nposition])

            setPosition(nposition);
        });



    }


    return (
        <SafeAreaView>
            <HeaderComponent />
            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}
            >
                <Text style={{ color: '#FAAE3B', fontSize: Platform.OS === 'ios' ? RFValue(18) : RFValue(17), fontWeight: 'bold', textAlign: 'center', marginTop: RFValue(10), }}>
                    Get ready to vote amazing wildlife photographs!
                </Text>
                <Text style={{ color: '#A27A51', fontSize: Platform.OS === 'ios' ? RFValue(16) : RFValue(16), textAlign: 'center', marginTop: RFValue(10), marginHorizontal: RFValue(10) }}>
                    We love all wildlife images, thus you can either allocate 5 or 10 points to your favorite high resolution image.
                </Text>
                {/* <View style={styles.titles}>
                    <Text style={styles.titleText1}>
                        Left Swipe = 5pts
                    </Text>
                    <Text style={styles.titleText2}>
                        Right Swipe = 10pts
                    </Text>
                </View> */}

                <Text style={{ color: '#fff', fontSize: Platform.OS === 'ios' ? RFValue(16) : RFValue(16), textAlign: 'center', marginTop: RFValue(10), marginHorizontal: RFValue(10), marginBottom: -10 }}>
                    {currentEntry?.title}
                </Text>
                <View style={styles.imageComponent}>
                    <View style={styles.container}>
                        <ImageBackground source={{ uri: currentEntry?.photoURL }} style={styles.cardImageStyle} >

                            {/* <Text style={{ width: 200, textAlign: 'center', fontSize: 24, }}> {item.title} </Text> */}
                        </ImageBackground>
                    </View>
                </View>


                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={() => next(5, currentEntry?.id)} >
                        <Image style={styles.fivepoints} source={isChecked5 ? require('../../assets/pointsIcons/5pointFilledx1.png') : require('../../assets/pointsIcons/5points.png')} ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => next(10, currentEntry?.id)}>
                        <Image style={styles.tenpoints}
                            source={isChecked10 ? require('../../assets/pointsIcons/10pointFilledx1.png')
                                : require('../../assets/pointsIcons/10points.png')} ></Image>
                    </TouchableOpacity>

                    {/* <Checkbox style={{ borderRadius: 12, width: 20, height: 20 }}></Checkbox> */}

                    {/* filled */}
                    {/* <Image onPress={() => next(5)} source={require('../../assets/pointsIcons/5pointFilledx4.png')} ></Image>
                    <Image onPress={() => next(10)} source={require('../../assets/pointsIcons/10pointFilledx4.png')} ></Image> */}
                </View>

                <View style={styles.photographerCont}>
                    <View style={styles.photographerCont2}>
                        <Image source={require('../../assets/pointsIcons/humanIcon.png')} style={styles.photographerCont2image}></Image>
                        <Text style={{ color: '#A27A51', }}>    Photographer:  </Text>
                        <Text style={{ color: '#fff', }}>    {currentEntry?.username} </Text>
                    </View>

                    <Text style={{ fontSize: 12 }}>
                        {/* {item.title} */}
                    </Text>

                </View>
                <View style={styles.detailsCont}>
                    <Text style={styles.detailsCont1}>
                        #PhotoCompetition - {route.params?.comptitle}
                    </Text>
                    <Text style={styles.detailsCont2}>
                        Theme: {route.params?.theme}
                    </Text>
                </View>

                <View style={styles.tags}>
                    <Text style={styles.tagtitle}>
                        Wildlife
                    </Text>
                    <Text style={styles.tagtitle}>
                        {currentEntry?.species}
                    </Text>
                    <Text style={styles.tagtitle}>
                        {currentEntry?.cameraDetail}

                    </Text>

                </View>
                <View style={styles.tags}>
                    <Text style={styles.tagtitle}>
                        {currentEntry?.location}

                    </Text>
                    <Text style={styles.tagtitle}>
                        {currentEntry?.category}

                    </Text>
                    <Text style={styles.tagtitle}>
                        VoteYourFavorite
                    </Text>
                </View>

            </ImageBackground>
        </SafeAreaView >
    );
};

export default ImagesVotingScreen;

const styles = StyleSheet.create({
    tenpoints: { alignContent: 'center', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
    totalLikes: {
        padding: Platform.OS === 'ios' ? RFValue(12) : RFValue(12),
        borderRadius: 20, borderStyle: 'solid', borderColor: '#FA993B', borderWidth: 1,
        backgroundColor: '#D23C50'
    },
    tags: {
        flexDirection: 'row', gap: Platform.OS === 'ios' ? RFValue(30) : RFValue(30),
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'flex-start',
        textAlign: 'center',
        alignSelf: 'flex-start',
        marginLeft: Platform.OS === 'ios' ? RFValue(70) : RFValue(90),
        width: Platform.OS === 'ios' ? RFValue(200) : RFValue(200),
    },
    tagtitle: {
        padding: Platform.OS === 'ios' ? RFValue(8) : RFValue(8),
        borderRadius: 12, borderStyle: 'solid', borderColor: '#FA993B', borderWidth: 1,
    },
    detailsCont: {
        flexDirection: 'column',
        gap: 4, justifyContent: 'center',
        marginTop: Platform.OS === 'ios' ? RFValue(6) : RFValue(6),
        alignItems: 'flex-start', textAlign: 'left', alignSelf: 'center',

    },
    detailsCont1: {
        fontSize: 14,
        color: '#fff'
    },
    detailsCont2: {

        fontSize: 14, color: '#fff'
    },
    bottomContainer: {
        position: 'absolute',
        top: 284,
        backgroundColor: '#4F4A42',
        borderRadius: 12,
        width: Platform.OS === 'ios' ? RFValue(300) : RFValue(320),
        padding: Platform.OS === 'ios' ? RFValue(10) : RFValue(10),
        height: Platform.OS === 'ios' ? RFValue(200) : RFValue(200),
    },
    imageComponent: {
        borderRadius: 11,
        // backgroundColor: 'white',
        borderStyle: 'dashed',
        borderColor: '#524D4E',
        borderRadius: RFValue(20),
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: RFValue(260),
        height: RFValue(230),
        marginTop: RFValue(20),
        padding: RFValue(6),

        // marginBottom: RFValue(10),
    },
    swipeTextCont: {
        marginTop: Platform.OS === 'ios' ? RFValue(-100) : RFValue(-100),
    },
    thanksforvoting: {
        fontSize: 22,
        color: '#FAAE3B',
        alignSelf: 'center', justifyContent: 'center',
        textAlign: 'center', width: 200
    },
    swipecard: {
        width: Platform.OS === 'ios' ? RFValue(200) : RFValue(200),
        height: Platform.OS === 'ios' ? RFValue(200) : RFValue(200),

    },
    photographerCont:
    {
        flexDirection: 'row',
        gap: 40,
        justifyContent: 'center',
        marginTop: 20, alignItems: 'center'
    },
    imageContainer: {
        flexDirection: 'row',
        gap: 70,
        justifyContent: 'center',
        marginTop: Platform.OS === 'ios' ? RFValue(10) : RFValue(10),
        alignSelf: 'center',
        alignItems: 'center'
    },
    photographerCont2: {
        flexDirection: 'row',
        gap: 1, justifyContent: 'center', alignItems: 'center',
        marginLeft: Platform.OS === 'ios' ? RFValue(43) : RFValue(-14),
        marginTop: Platform.OS === 'ios' ? RFValue(-10) : RFValue(-14)
    },
    photographerCont2image: {
        width: Platform.OS === 'ios' ? RFValue(30) : RFValue(30),
        height: Platform.OS === 'ios' ? RFValue(30) : RFValue(30),
    },
    background: {

        resizeMode: 'contain', // or 'contain' to maintain aspect ratio
        width: SCREEN_WIDTH,
        height: windowHeight,
    },
    homescreensafearea: {
        backgroundColor: 'transparent',
    },

    container: {
        marginTop: Platform.OS === 'ios' ? RFValue(-88) : RFValue(-85),
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: Platform.OS === 'ios' ? RFValue(400) : RFValue(400),
        height: Platform.OS === 'ios' ? RFValue(400) : RFValue(400),
    },

    titles: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: Platform.OS === 'ios' ? RFValue(40) : RFValue(30),
    },
    titleText1: {
        marginTop: Platform.OS === 'ios' ? RFValue(10) : 10,
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
        marginVertical: 10,
    },
    titleText2: {

        fontSize: 14,
        color: '#D23C50',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },


    cardTitleStyle: {
        color: '#fff',
        fontSize: 24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        margin: 20,
    },
    cardImageStyle: {
        width: RFValue(200),
        height: RFValue(200),
        marginBottom: 10,
    },

});

