import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SplashScreen } from 'expo';
import SignUpLogin from './screens/UserJourney/SignUpLogin';
import SignUp from './screens/UserJourney/SignUp';
export default function App() {

  // // Prevent the app from rendering until the splash screen is hidden
  // SplashScreen.preventAutoHideAsync()
  //   .then(() => {
  //     // Perform any async tasks or initialize app state
  //   })
  //   .catch(console.warn)
  //   .finally(() => {
  //     // Hide the splash screen once your app is ready
  //     SplashScreen.hideAsync();
  //   });

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>

    <SafeAreaView>
      {/* <SignUpLogin /> */}
      <SignUp />
    </SafeAreaView>
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
