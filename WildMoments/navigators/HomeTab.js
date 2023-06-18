// Tab Bar for Home Screens
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/UserJourney/HomeScreen';
import CompsScreen from '../screens/UserJourney/CompsScreen';
import GalleryScreen from '../screens/UserJourney/GalleryScreen';
import ExploreScreen from '../screens/UserJourney/ExploreScreen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const HomeTab = ({ }) => {
    return (
        <Tab.Navigator style={styles.tabBarStyle}

            screenOptions={{
                tabBarActiveTintColor: "#9C7B57",
                tabBarStyle: {

                    position: 'absolute',
                    height: Platform.OS === 'ios' ? RFValue(80) : RFValue(60),
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderTopWidth: 0,
                    marginBottom: Platform.OS === 'ios' ? RFValue(-15) : RFValue(0),
                    marginTop: Platform.OS === 'ios' ? RFValue(0) : RFValue(-10),
                    backgroundColor: 'rgba(19, 19, 19, 0.97)', // Glass effect background color with opacity

                    // Glass effect styles
                    shadowColor: '#131313',

                    // 
                    shadowOpacity: Platform.OS === 'ios' ? RFValue(0.5) : RFValue(1),
                    shadowRadius: 6,
                    shadowOffset: {
                        width: Platform.OS === 'ios' ? RFValue(5) : RFValue(-9),
                        height: Platform.OS === 'ios' ? RFValue(-2) : RFValue(-9),
                    },
                    elevation: 1,


                },
            }}
        >


            <Tab.Screen name='Competitions' component={HomeScreen} options={({ focused, size }) =>
            ({
                tabBarIcon: ({ size, tabInfo }) => (
                    <View style={{ marginBottom: -5, paddingBottom: Platform.OS === 'ios' ? RFValue(0) : RFValue(5) }}>
                        <Image
                            style={{ width: Platform.OS === 'ios' ? RFValue(50) : RFValue(50), height: size, marginBottom: Platform.OS === 'ios' ? RFValue(5) : RFValue(-5), }}
                            source={require('../assets/AppIcons/compsIcon.png')}
                        />
                    </View>
                ),
                headerShown: false
            })} />

            <Tab.Screen name='Explore' component={ExploreScreen} options={({ focused, size }) =>
            ({
                tabBarIcon: ({ size, tabInfo }) => (
                    <View style={{ marginBottom: -5, paddingBottom: 0 }}>
                        <Image
                            style={{ width: size, height: size }}
                            source={require('../assets/AppIcons/exploreIcon.png')}
                        />
                    </View>
                ),
                headerShown: false
            })} />

            {/* <Tab.Screen name='Gallery' component={GalleryScreen} options={({ focused, size }) =>
            ({
                tabBarIcon: ({ size, tabInfo }) => (
                    <View style={{ marginBottom: -5, paddingBottom: 0 }}>
                        <Image
                            style={{ width: size, height: size }}
                            source={require('../assets/AppIcons/galleryIcon.png')}
                        />
                    </View>
                ),
                headerShown: false
            })} /> */}
        </Tab.Navigator>
    )
}

export default HomeTab

const styles = StyleSheet.create({
    tabbar: {


    },
    tabBarStyle: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

    },
    tabScreen: {
        backgroundColor: 'red',
    }

})