import { StyleSheet, Text, View, ImageBackground, Button, TouchableHighlight, Platform, StatusBar, SafeAreaView } from 'react-native'
import React from 'react';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity, } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const TouchableComponent = Platform.OS === 'android' ? TouchableHighlight : TouchableOpacity;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HeaderComponent = (props) => {
    // const { navigation } = props;
    const navigation = useNavigation();
    const [showBack, setShowBack] = useState(true);

    const route = useRoute();
    const routeName = route.name;
    console.log(routeName);

    // const homeRoute = route.name
    useEffect(() => {
        if (

            routeName !== 'Login' &&
            routeName !== 'SignUp' &&
            routeName !== 'SignUpLogin' &&
            routeName !== 'Competitions' &&
            routeName !== 'ExploreScreen' &&
            routeName !== 'GalleryScreen'
        ) {
            console.log("Show back button");
            setShowBack(false)

        } else {
            console.log("Hide back button");
            setShowBack(true)
        }
    }, [routeName])


    return (
        <SafeAreaView>
            < View style={{
                alignSelf: 'flex-end',
                padding: RFValue(10),
                width: windowWidth,
                backgroundColor: showBack ? 'transparent' : '#202022',
            }} >

                <View style={styles.header}>
                    {/*  */}
                    {!showBack &&
                        <TouchableComponent onPress={() => navigation.goBack()} style={styles.backbutton}>
                            <TouchableOpacity >
                                <ImageBackground source={require('../assets/AppIcons/back.png')} // Replace with the actual path to your image
                                    style={styles.back}>

                                </ImageBackground>
                            </TouchableOpacity>
                        </TouchableComponent>
                    }
                    <View style={styles.spacer} />
                    {/* Logo */}
                    <View>
                        <ImageBackground
                            source={require('../assets/AppIcons/dropdownImage.png')} // Replace with the actual path to your image
                            style={styles.logo}
                        ></ImageBackground>
                    </View>

                </View>

            </View >
        </SafeAreaView>
    );
}

export default HeaderComponent

const styles = StyleSheet.create({
    backbutton: {

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backgroundView: {


    },



    back: {

        marginRight: RFPercentage(2),
        height: RFPercentage(3),
        width: RFPercentage(7),
        alignContent: 'flex-start',
    },
    logo: {

        marginRight: RFPercentage(2),
        height: RFPercentage(4.6),
        width: RFPercentage(10),
        alignContent: 'flex-end',
    },
    spacer: {
        marginHorizontal: RFPercentage(14),
    },
})
