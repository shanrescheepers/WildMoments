// import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { SplashScreen } from 'expo';
import SignUpLogin from './screens/UserJourney/SignUpLogin';
import SignUp from './screens/UserJourney/SignUp';
import Login from './screens/UserJourney/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/UserJourney/HomeScreen';
import ExploreScreen from './screens/UserJourney/ExploreScreen';
import CompsScreen from './screens/UserJourney/CompsScreen';
import RulesScreen from './screens/UserJourney/RulesScreen';
import GalleryScreen from './screens/UserJourney/GalleryScreen';
import ImagesVotingScreen from './screens/UserJourney/ImagesVotingScreen';
import HomeTab from './navigators/HomeTab';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { set } from 'react-hook-form';
import { auth } from './firebase';
import BrowseAndEnterScreen from './screens/UserJourney/CompetitionJudgeScreen';
import HeaderComponent from './Components/HeaderComponent';
import EnterCompScreen from './screens/UserJourney/EnterCompScreen';
import WalkthroughScreen from './screens/UserJourney/WalkthroughScreen';
import GalleryScreenWinnersOverview from './screens/GalleryScreenWinnersOverview';
import AddNewCompScreen from './screens/UserJourney/AddNewCompScreen';
import UserProfileScreen from './screens/UserJourney/UserProfileScreen';

// for each nav header that we have, we need to go create it
const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User Changed");
      if (user) {
        // use logged in
        console.log("User Login");

        setLoggedIn(true)

      } else {
        console.log("User logout");

        setLoggedIn(false)
      }
    })
    return unsubscribe;
  }, [])
  return (

    <NavigationContainer >

      <Stack.Navigator initialRouteName='SignUpLogin' style={styles.stacknav} screenOptions={{
        headerStyle: { backgroundColor: '#202022' },
        headerTintColor: '#9C7B57'
      }}>
        {!loggedIn ? (
          <>
            <Stack.Screen name="SignUpLogin" component={SignUpLogin} options={{ headerShown: false }} />

            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />


          </>
        ) : (
          <>
            {/* OVER AND BEYOOOOOND */}

            {/* <Stack.Screen name="WalkthroughScreen" component={WalkthroughScreen} options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Home" component={HomeTab} options={{ headerShown: false }} style={styles.hometab} />

            <Stack.Screen name="Competitions" component={CompsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GalleryScreen" component={GalleryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RulesScreen" component={RulesScreen} options={{
              headerShown: false, title: 'Rules & Regulations',
              headerTitleStyle: { color: '#FFE4E4' },
              headerTintColor: '#9C7B57',

            }} />
            <Stack.Screen name="ImagesVotingScreen" component={ImagesVotingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BrowseAndEnterScreen" component={BrowseAndEnterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EnterCompScreen" component={EnterCompScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GalleryScreenWinnersOverview" component={GalleryScreenWinnersOverview} options={{ headerShown: false }} />
            {/* <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="AddNewCompScreen" component={AddNewCompScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
          </>

        )}

      </Stack.Navigator>

    </NavigationContainer>




  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  hometab: {
    backgroundColor: 'transparent',
  },
  stacknav: {

  }
});
