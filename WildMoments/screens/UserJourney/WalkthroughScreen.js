import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const slides = [
    {
        key: '1',
        title: 'Welcome to Wild Moments #TIPS',
        text: 'Here are a few tips to becoming a WildMoments pro',
        image: require('../../assets/WalkthroughScreens/Walkthrough1.png'),
        backgroundColor: '#252524',
    },
    {
        key: '2',
        title: '#TIP 2',
        text: 'ALWAYS READ THE RULES',
        image: require('../../assets/WalkthroughScreens/Walkthrough2.png'),
        backgroundColor: '#534C45',
    },
    {
        key: '3',
        title: '#TIP 3',
        text: 'Entering Competitions',
        image: require('../../assets/WalkthroughScreens/Walkthrough3.png'),
        backgroundColor: '#A1663A',
    },
    {
        key: '4',
        title: '#TIP 4',
        text: 'Judging Images',
        image: require('../../assets/WalkthroughScreens/Walkthrough4.png'),
        backgroundColor: '#A27A51',
    },
];

const WalkthroughScreen = ({ navigation }) => {
    const renderSlide = ({ item }) => (
        <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        </View>
    );

    const handleDone = () => {
        // Handle the action when the user finishes the walkthrough
        // For example, navigate to the home screen
        navigation.navigate('Home');
    };

    return (
        <AppIntroSlider
            data={slides}
            renderItem={renderSlide}
            onDone={handleDone}
            showSkipButton
            skipLabel="Skip"
            doneLabel="Done"
        />
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,

    },
    info: {
        marginTop: RFValue(-80),
        alignSelf: 'center',
    },
    image: {
        // marginTop: RFValue(-100),
        top: 2,
        position: 'absolute',
        width: 250,
        height: RFValue(600),
        resizeMode: 'contain',
    },
    title: {
        alignSelf: 'center',
        fontSize: RFValue(18),
        fontWeight: 'bold',
        color: 'white',
        bottom: 260,
        position: 'absolute',
        textAlign: 'center',
    },
    text: {
        bottom: -270,

        fontSize: RFValue(15),
        color: 'white',
        textAlign: 'center',
    },
});

export default WalkthroughScreen;
