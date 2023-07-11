

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
import { getVotesByUserAndEntry } from '../../services/firebseDB';
import { ScrollView } from 'react-native-gesture-handler';
import { Asset } from 'expo-asset';

const SCREEN_WIDTH = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ImagesScreenView = ({ navigation, route }) => {
    const [currentEntry, setCurrentEntry] = useState();
    const [cachedImage, setCachedImage] = useState();

    useEffect(() => {
        setCurrentEntry(route.params.entry);
        console.log(route.params.entry);
        cacheImage(route.params.entry.photoURL);
    }, []);

    const cacheImage = async (imageUrl) => {
        console.log(imageUrl);
        const imageAsset = Asset.fromURI(imageUrl);
        await imageAsset.downloadAsync();
        console.log(imageAsset.localUri);

        setCachedImage(imageAsset.localUri);

    };

    return (
        <SafeAreaView>

            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}
            >
                <HeaderComponent />

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
                        <ImageBackground
                            source={{ uri: cachedImage }}
                            style={styles.cardImageStyle}
                        />
                    </View>

                </View>


                <>


                    <ScrollView style={styles.homescreenscrollview}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContent}
                    >
                        <View style={styles.photographerCont}>
                            <View style={styles.photographerCont2}>
                                <Image source={require('../../assets/pointsIcons/humanIcon.png')} style={styles.photographerCont2image}></Image>
                                <Text style={{ color: '#A27A51', }}>    Photographer:  </Text>
                                <Text style={{ color: '#fff', }}>    {currentEntry?.username} </Text>

                            </View>
                            {/* 
                        <Text style={{ fontSize: 12 }}>
                            Instagram
                        </Text> */}

                        </View>

                        {/* Instagram Handle */}
                        <View style={styles.photographerCont3}>
                            <Image source={require('../../assets/pointsIcons/ig.png')} style={styles.photographerCont3image}></Image>

                            <Text style={{ color: '#fff', }}>  @{currentEntry?.username} </Text>
                        </View>
                        {/* <View style={styles.detailsCont}>
                            <Text style={styles.detailsCont1}>
                                #PhotoCompetition - {currentEntry.comptitle}
                            </Text>
                            <Text style={styles.detailsCont2}>
                                Theme: {currentEntry.theme}
                            </Text>
                        </View> */}

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
                    </ScrollView>
                </>



            </ImageBackground>
        </SafeAreaView >
    );
};

export default ImagesScreenView;

const styles = StyleSheet.create({
    tenpoints: { alignContent: 'center', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
    totalLikes: {
        padding: Platform.OS === 'ios' ? RFValue(12) : RFValue(12),
        borderRadius: 20, borderStyle: 'solid', borderColor: '#FA993B', borderWidth: 1,
        backgroundColor: '#D23C50'
    },
    contentContainer: {
        position: 'relative',

        zIndex: 1,

    },
    homescreenscrollview: {
        backgroundColor: 'transparent',
        height: 1000,
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
        alignItems: 'center',
        height: 40,
    },
    photographerCont3: {
        flexDirection: 'row',
        gap: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginLeft: -68,
        marginTop: Platform.OS === 'ios' ? RFValue(4) : RFValue(4)

    },
    photographerCont2: {
        flexDirection: 'row',
        gap: 1, justifyContent: 'center', alignItems: 'center',
        marginLeft: Platform.OS === 'ios' ? RFValue(43) : RFValue(-14),
        marginTop: Platform.OS === 'ios' ? RFValue(-10) : RFValue(-14)
    },
    photographerCont3image: {
        width: Platform.OS === 'ios' ? RFValue(30) : RFValue(30),
        height: Platform.OS === 'ios' ? RFValue(30) : RFValue(30),

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
        borderRadius: RFValue(20),
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
        borderRadius: RFValue(20),
    },

});

