// Tab Bar for Home Screens
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/UserJourney/HomeScreen';
import CompsScreen from '../screens/UserJourney/CompsScreen';
import GalleryScreen from '../screens/UserJourney/GalleryScreen';
import ExploreScreen from '../screens/UserJourney/ExploreScreen';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
    return (
        <Tab.Navigator style={styles.tabbar}
            screenOptions={{
                tabBarActiveTintColor: "#FA993B",
                tabBarStyle: { backgroundColor: '#202022', height: 90, borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 8 }
            }} >

            <Tab.Screen name='HomeScreen' component={HomeScreen}
                options={({ focused, size }) =>
                ({
                    tabBarIcon: ({ size, tabInfo }) => (
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={require('../assets/AppIcons/homeIcon.png')}
                        />
                    ),
                })}
            />

            <Tab.Screen name='CompsScreen' component={CompsScreen} options={({ focused, size }) =>
            ({
                tabBarIcon: ({ size, tabInfo }) => (
                    <Image
                        style={{ width: size, height: size }}
                        source={require('../assets/AppIcons/compsIcon.png')}
                    />
                ),

            })} />

            <Tab.Screen name='ExploreScreen' component={ExploreScreen} options={({ focused, size }) =>
            ({
                tabBarIcon: ({ size, tabInfo }) => (
                    <Image
                        style={{ width: size, height: size }}
                        source={require('../assets/AppIcons/exploreIcon.png')}
                    />
                ),

            })} />

            <Tab.Screen name='GalleryScreen' component={GalleryScreen} options={({ focused, size }) =>
            ({
                tabBarIcon: ({ size, tabInfo }) => (
                    <Image
                        style={{ width: size, height: size }}
                        source={require('../assets/AppIcons/galleryIcon.png')}
                    />
                ),

            })} />
        </Tab.Navigator>
    )
}

export default HomeTab

const styles = StyleSheet.create({
    tabbar: {
        height: RFPercentage(50),
    },
})