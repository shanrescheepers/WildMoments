import { StyleSheet, Text, View, ImageBackground, Button, TouchableHighlight, Platform, StatusBar, SafeAreaView, Modal, TouchableOpacity } from 'react-native'
import React from 'react';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import { TouchableOpacity, } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { Dimensions, } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
// Sign Out FIREBASE FUNC
import { signOutUser } from '../services/firebaseAuth';
import App from '../App';

const TouchableComponent = Platform.OS === 'android' ? TouchableOpacity : TouchableOpacity;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HeaderComponent = ({ props }) => {
    // const { navigation } = props.navigation;
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

            routeName !== 'Explore' &&
            routeName !== 'Gallery'
        ) {
            console.log("Show back button");
            setShowBack(false)

        } else {
            console.log("Hide back button");
            setShowBack(true)
        }
    }, [routeName])

    // DropDown For TopRight Logo Image on Navbar
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const handleOptionSelect = (option) => {
        console.log('Selected option : ', option)
        //Closing the dropdown after option selection (have to navigate to screen too)?
        setDropdownVisible(false);
    }

    const fireSignOut = () => {
        setDropdownVisible(!dropdownVisible);
        signOutUser();
        console.log("user signed out succesfully");
    }

    const fireAddNewComp = () => {
        setDropdownVisible(!dropdownVisible);
        navigation.navigate("AddNewCompScreen")
        console.log("Went to comp screen succesfully");
    }

    return (
        <SafeAreaView style={styles.hc}>
            < View style={{
                alignSelf: 'flex-end',
                padding: RFValue(10),
                width: windowWidth,
                backgroundColor: showBack ? 'transparent' : '#202022',
            }} >

                <View style={styles.header} >
                    {/*  */}
                    {!showBack &&
                        <TouchableComponent onPress={() => navigation.goBack()} style={styles.backbutton}>
                            <ImageBackground source={require('../assets/AppIcons/back.png')} // Replace with the actual path to your image
                                style={styles.back}>

                            </ImageBackground>
                        </TouchableComponent>
                    }
                    <View style={styles.spacer} />


                    {/* Logo + Dropdown */}
                    <View>
                        <TouchableOpacity
                            onPress={() => toggleDropdown()}
                            style={styles.dropdownButton}
                        >
                            <ImageBackground
                                source={require('../assets/AppIcons/dropdownImage.png')} // Replace with the actual path to your image
                                style={styles.logo}
                            />
                        </TouchableOpacity>
                        <Modal
                            visible={dropdownVisible}
                            transparent={true}
                            animationType="fade"
                            onRequestClose={() => setDropdownVisible(false)}
                        >
                            <TouchableOpacity
                                style={styles.dropdownContainer}
                                activeOpacity={1}
                                onPressOut={() => setDropdownVisible(false)}
                            >
                                <View style={styles.dropdownMenu}>
                                    <TouchableOpacity onPress={() => handleOptionSelect('User Profile')} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>User Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleOptionSelect('Settings')} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Settings</Text>
                                    </TouchableOpacity>

                                    {/* THIS IS FOR ADMIN ONLY TO ADD NEW COMP */}
                                    <TouchableOpacity onPress={() => fireAddNewComp()} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Add New Competition</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={fireSignOut} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Logout</Text>
                                        {/* onPress={() => navigation.navigate('SignUp')}  */}
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                </View >
            </View >

        </SafeAreaView >
    );
}

export default HeaderComponent

const styles = StyleSheet.create({
    backbutton: {

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: RFValue(40),
    },
    backgroundView: {
    },
    dropdownButton: {
        padding: 8,
    },
    dropdownContainer: {
        flex: 1,
        // justifyContent: 'flex-end',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    dropdownMenu: {
        backgroundColor: '#131313',
        color: '#DFDDDB',
        borderRadius: RFValue(8),
        position: 'absolute',
        top: Platform.OS === 'ios' ? 100 : 50,
        right: RFValue(23),
        width: RFValue(200),
    },
    dropdownOption: {
        color: '#DFDDDB',
        padding: RFValue(8),
    },
    dropdownOptionText: {
        color: '#DFDDDB',
    },


    back: {
        marginTop: RFValue(13),
        marginRight: RFPercentage(2),
        height: RFPercentage(3),
        width: RFPercentage(7),
        alignContent: 'flex-start',
    },
    logo: {

        marginRight: RFPercentage(2),
        height: RFValue(35),
        width: RFValue(70),

    },
    spacer: {
        marginHorizontal: RFPercentage(14),
    },
})
