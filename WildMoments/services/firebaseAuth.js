
// import auth instance from my app
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase';
import { Alert } from 'react-native';
import { useState, useEffect } from "react";

import 'firebase/auth';
import 'firebase/firestore';
import { Audio } from 'expo-av';

import { async } from '@firebase/util';
// Sign in Existing Users:
// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//     });

// // // // // // //

// Register a User functionality
export const registerNewUser = (email, password) => {
    // this comes from register screen
    // Add registerNewUser to your Register.js!!! : registerNewUser(name,email,password)

    createUserWithEmailAndPassword(auth, email, password)
        // the then is when user was created successfully
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("New user is :" + user)
            // To Do: Create user in our DB

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ": " + errorMessage)
            // ..
        });
}
// // // // // // //

// Sign in functionality
// const [sound, setSound] = useState();

// async function playSound() {
//     console.log('Loading Sound');
//     const { sound } = await Audio.Sound.createAsync(require('../soundEffects/btn.mp3')
//     );
//     setSound(sound);

// console.log('Playing Sound');
// await sound.playAsync();
// logOn();
// useEffect(() => {
//     return sound
//         ? () => {
//             console.log('Unloading Sound');

//         }
//         : undefined;
// }, [sound]);
// }


export const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User signed in is :" + user.email)
            // playSound();
            Alert.alert("You're in!", "You hace successfully logged in.", [
                { text: 'Thanks', onPress: () => { } }
            ])
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ":  " + errorMessage)

            Alert.alert("You're not in!", "You hace not logged in." + errorMessage, [
                { text: 'try again', onPress: () => { } }
            ])
        });
}
// // // // // // //

// Sign out functionality
export const signOutUser = () => {
    signOut(auth).then(() => {
        console.log("Logged out successfully")
    }).catch((error) => {
        console.log(error.errorMessage)
    })
}