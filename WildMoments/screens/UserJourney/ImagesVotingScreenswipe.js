// React Native Swipeable Card View UI like Tinder
// https://aboutreact.com/react-native-swipeable-cardview-like-tinder/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Dimensions,
    Animated,
    PanResponder,
    ImageBackground,
    Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import HeaderComponent from '../../Components/HeaderComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const SwipeableCard = ({ item, removeCard, swipedDirection }) => {
    // let xPosition = new Animated.Value(0);
    const [xPosition, setXPosition] = useState(new Animated.Value(0));
    let swipeDirection = '';
    let cardOpacity = new Animated.Value(1);
    let rotateCard = xPosition.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: ['-20deg', '0deg', '20deg'],
    });

    let panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            xPosition.setValue(gestureState.dx);
            if (gestureState.dx > SCREEN_WIDTH - 250) {
                swipeDirection = 'Right';
            } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
                swipeDirection = 'Left';
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (
                gestureState.dx < SCREEN_WIDTH - 150 &&
                gestureState.dx > -SCREEN_WIDTH + 150
            ) {
                swipedDirection('--');
                Animated.spring(xPosition, {
                    toValue: 0,
                    speed: 5,
                    bounciness: 10,
                    useNativeDriver: false,
                }).start();
            } else if (gestureState.dx > SCREEN_WIDTH - 150) {
                Animated.parallel([
                    Animated.timing(xPosition, {
                        toValue: SCREEN_WIDTH,
                        duration: 200,
                        useNativeDriver: false,
                    }),
                    Animated.timing(cardOpacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false,
                    }),
                ]).start(() => {
                    swipedDirection(swipeDirection);
                    removeCard();
                });
            } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
                Animated.parallel([
                    Animated.timing(xPosition, {
                        toValue: -SCREEN_WIDTH,
                        duration: 200,
                        useNativeDriver: false,
                    }),
                    Animated.timing(cardOpacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false,
                    }),
                ]).start(() => {
                    swipedDirection(swipeDirection);
                    removeCard();
                });
            }
        },
    });

    return (

        <View style={styles.animateCon}>
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    styles.cardStyle,
                    {
                        // backgroundColor: '#FFF',
                        marginBottom: RFValue(80),

                        ImageBackground: item.photoURL,
                        opacity: cardOpacity,
                        transform: [{ translateX: xPosition }, { rotate: rotateCard }],
                    },
                ]}>

                <ImageBackground source={{ uri: item.photoURL }} style={styles.cardImageStyle} >

                    {/* <Text style={{ width: 200, textAlign: 'center', fontSize: 24, }}> {item.title} </Text> */}

                </ImageBackground>

                <View style={styles.bottomContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../assets/pointsIcons/5points.png')} ></Image>
                        <Image source={require('../../assets/pointsIcons/10points.png')} ></Image>
                    </View>

                    <View style={styles.photographerCont}>
                        <View style={styles.photographerCont2}>
                            <Image source={require('../../assets/pointsIcons/humanIcon.png')} ></Image>
                            <Text style={{ color: '#A27A51', }}>    Photographer:  </Text>
                        </View>

                        <Text style={{ fontSize: 12 }}>
                            {item.title}
                        </Text>

                    </View>
                    <View>
                        <Text style={{ fontSize: 12 }}>
                            #PhotoCompetition - Autumn 2023
                        </Text>
                        <Text style={{ fontSize: 12 }}>
                            Theme: Big Cats of the Kruger
                        </Text>
                    </View>
                </View>
            </Animated.View>




        </View>

    );
};

const ImagesVotingScreen = ({ navigation, route }) => {
    const [entries, setEntries] = useState([])

    const [noMoreCard, setNoMoreCard] = useState(false);
    // const [sampleCardArray, setSampleCardArray] = useState(DEMO_CONTENT);
    const [swipeDirection, setSwipeDirection] = useState('--');
    // console.log(route.params.entries);

    // const [currentTitle, setCurrentTitle] = useState("test");


    useEffect(() => {
        setEntries(route.params.entries)
    }, [])

    const removeCard = (id) => {
        // alert(id);
        console.log(id);
        entries.splice(
            entries.findIndex((item) => item.id === id),

        );
        setEntries(entries);
        if (entries.length == 0) {
            setNoMoreCard(true);
        }
    };

    const lastSwipedDirection = (swipeDirection) => {
        setSwipeDirection(swipeDirection);
    };



    return (
        <SafeAreaView
        >
            <HeaderComponent />
            <ImageBackground
                source={require('../../assets/backgroundImage.png')} // Replace with the actual path to your image
                style={styles.background}
            >
                <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center', marginTop: 10 }}>
                    Get ready to see some amazing wildlife photographs & vote for your favorites!
                </Text>
                <View style={styles.titles}>
                    <Text style={styles.titleText1}>
                        Left Swipe = 5pts
                    </Text>
                    <Text style={styles.titleText2}>
                        Right Swipe = 10pts
                    </Text>
                </View>

                <View style={styles.imageComponent}>
                    <View style={styles.container}>

                        {entries.map((item, key) => (
                            <SwipeableCard
                                key={key}
                                item={item}
                                removeCard={() => removeCard(item.id)}
                                swipedDirection={lastSwipedDirection}
                                style={styles.swipecard}
                            />
                        ))}
                        {noMoreCard ? (
                            <View >
                                <Text style={styles.thanksforvoting}>Thanks for voting! This is the end. </Text>
                                <Text style={styles.thanksforvoting}>No More Images to Vote.</Text>
                            </View>
                        ) : null}
                    </View>
                </View>

                <View style={styles.swipeTextCont}>
                    <Text style={styles.swipeText}>
                        Last Card Swipe Direction was{'\n'}
                        {swipeDirection}
                    </Text>
                </View>
                <View>

                </View>

            </ImageBackground>
        </SafeAreaView>
    );
};

export default ImagesVotingScreen;

const styles = StyleSheet.create({


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
        marginHorizontal: RFValue(6),
        padding: RFValue(6),
        paddingVertical: RFValue(20),
        // marginBottom: RFValue(10),
    },
    swipeTextCont: { marginTop: Platform.OS === 'ios' ? RFValue(-100) : RFValue(-100), },
    thanksforvoting: { fontSize: 22, color: '#FAAE3B', alignSelf: 'center', justifyContent: 'center', textAlign: 'center', width: 200 },
    swipecard: {
        width: Platform.OS === 'ios' ? RFValue(200) : RFValue(200),
        height: Platform.OS === 'ios' ? RFValue(200) : RFValue(200),

    },
    photographerCont:
        { flexDirection: 'row', gap: 40, justifyContent: 'center', marginTop: 20, alignItems: 'center' },
    imageContainer: {
        flexDirection: 'row',
        gap: 40,
        justifyContent: 'center',
        marginTop: Platform.OS === 'ios' ? RFValue(10) : RFValue(10),
    },
    photographerCont2: { flexDirection: 'row', gap: 1, justifyContent: 'center', alignItems: 'center', marginLeft: -20 },

    background: {

        resizeMode: 'contain', // or 'contain' to maintain aspect ratio
        width: SCREEN_WIDTH,
        height: windowHeight,
    },
    homescreensafearea: {
        backgroundColor: 'transparent',
    },

    container: {
        marginTop: Platform.OS === 'ios' ? RFValue(-100) : RFValue(-100),
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: Platform.OS === 'ios' ? RFValue(400) : RFValue(400),
        height: Platform.OS === 'ios' ? RFValue(400) : RFValue(400),
    },
    titleTextCont: {





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
    cardStyle: {
        width: RFValue(400),
        height: RFValue(400),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 7,
    },
    animateCon: {
        width: RFValue(400),
        height: RFValue(800),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 7,
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
    swipeText: {
        fontSize: 18,
        textAlign: 'center',
    },
});

