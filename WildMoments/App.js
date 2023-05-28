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


// for each nav header that we have, we need to go create it
const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // use logged in
        setLoggedIn(true)
      } else {
        setLoggedIn(true)
      }
    })
    return unsubscribe;
  }, [])
  return (
    <>
      {/* <View style={styles.container}>

      </View> */}

      <NavigationContainer>

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
              {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} /> */}
              <Stack.Screen name="Home" component={HomeTab} options={{ headerShown: false }} style={styles.hometab} />

              <Stack.Screen name="CompsScreen" component={CompsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{ headerShown: false }} />
              <Stack.Screen name="GalleryScreen" component={GalleryScreen} options={{ headerShown: false }} />
              <Stack.Screen name="RulesScreen" component={RulesScreen} options={{
                headerShown: false, title: 'Rules & Regulations',
                headerTitleStyle: { color: '#FFE4E4' },
                headerTintColor: '#9C7B57',

              }} />
              <Stack.Screen name="ImagesVotingScreen" component={ImagesVotingScreen} options={{ headerShown: false }} />

            </>

          )}

        </Stack.Navigator>

      </NavigationContainer>
    </>


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
