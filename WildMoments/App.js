import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SplashScreen } from 'expo';
import SignUpLogin from './screens/UserJourney/SignUpLogin';
import SignUp from './screens/UserJourney/SignUp';
import Login from './screens/UserJourney/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// for each nav header that we have, we need to go create it
const Stack = createNativeStackNavigator();

export default function App() {


  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />

    // </View>

    <NavigationContainer>

      <Stack.Navigator initialRouteName='SignUpLogin'>

        <Stack.Screen name="SignUpLogin" component={SignUpLogin} options={{ headerShown: false }} ></Stack.Screen>

        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} ></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} ></Stack.Screen>
      </Stack.Navigator>
      {/*  */}
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
