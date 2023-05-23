import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
        setLoggedIn(false)
      }
    })
    return unsubscribe;
  }, [])
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />

    // </View>

    <NavigationContainer>

      <Stack.Navigator initialRouteName='SignUpLogin'>
        {!loggedIn ? (
          <>
            <Stack.Screen name="SignUpLogin" component={SignUpLogin} options={{ headerShown: false }} />

            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Home" component={HomeTab} options={{ headerShown: false }} />

            <Stack.Screen name="CompsScreen" component={CompsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GalleryScreen" component={GalleryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RulesScreen" component={RulesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ImagesVotingScreen" component={ImagesVotingScreen} options={{ headerShown: false }} />

          </>


        )}

      </Stack.Navigator>

    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
