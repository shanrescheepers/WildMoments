// Tab Bar for Home Screens
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/UserJourney/HomeScreen';
import CompsScreen from '../screens/UserJourney/CompsScreen';
import GalleryScreen from '../screens/UserJourney/GalleryScreen';
import ExploreScreen from '../screens/UserJourney/ExploreScreen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const HomeTab = ({ }) => {
    return (
        <Tab.Navigator style={styles.tabBarStyle}

            screenOptions={{
                tabBarActiveTintColor: "#FA993B",
                tabBarStyle: {
                    marginHorizontal: 0,
                    paddingTop: 10,
                    position: 'absolute',
                    backgroundColor: '#202022',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderTopWidth: 0,
                },

            }}
        >
            {/*  options={{ headerShown: false }} */}
            {/* <Tab.Screen name='Home' component={HomeScreen} style={styles.tabScreen}
                options={({ focused, size }) =>
                ({
                    tabBarIcon: ({ size, tabInfo }) => (
                        <TouchableOpacity>
                            <Image
                                style={{ width: 30, height: 30, }}
                                source={require('../assets/AppIcons/homeIcon.png')}
                            />
                        </TouchableOpacity>
                    ),
                    headerShown: false
                })}
            /> */}

            <Tab.Screen name='Competitions' component={HomeScreen} options={({ focused, size }) =>
            ({
                tabBarIcon: ({ size, tabInfo }) => (
                    <Image
                        style={{ width: size, height: size }}
                        source={require('../assets/AppIcons/compsIcon.png')}
                    />
                ),
                headerShown: false
            })} />

            <Tab.Screen name='Explore' component={ExploreScreen} options={({ focused, size }) =>
            ({
                tabBarIcon: ({ size, tabInfo }) => (
                    <Image
                        style={{ width: size, height: size }}
                        source={require('../assets/AppIcons/exploreIcon.png')}
                    />
                ),
                headerShown: false
            })} />

            <Tab.Screen name='Gallery' component={GalleryScreen} options={({ focused, size }) =>
            ({
                tabBarIcon: ({ size, tabInfo }) => (
                    <Image
                        style={{ width: size, height: size }}
                        source={require('../assets/AppIcons/galleryIcon.png')}
                    />
                ),
                headerShown: false
            })} />
        </Tab.Navigator>
    )
}

export default HomeTab

const styles = StyleSheet.create({
    tabbar: {
        height: RFPercentage(50),
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    tabBarStyle: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

    },
    tabScreen: {
        backgroundColor: 'red',
    }

})