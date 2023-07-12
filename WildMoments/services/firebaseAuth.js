
// import auth instance from my app
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import { Alert } from 'react-native';
import { Audio } from 'expo-av';
import { async } from '@firebase/util';
import { useState, useEffect } from "react";

import 'firebase/auth';
import 'firebase/firestore';
import { createUserInDB } from "./firebseDB";


// // // // // // //

// Register a User functionality :: SIGN UP
export const registerNewUser = (username, email, password, profilepicture, instagramHandle) => {
    // this comes from register screen
    // Add registerNewUser to your Register.js!!! : registerNewUser(name,email,password)
    createUserWithEmailAndPassword(auth, email, password)
        // the then is when user was created successfully
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("New user is :" + user)
            updateAuthProfile(username);
            await createUserInDB(username, email, user.uid, profilepicture, instagramHandle)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ": " + errorMessage)
        });
}
// // // // // // //

export const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User signed in is :" + user.email)
            // playSound();
            Alert.alert("You're in!", "You have successfully logged in.", [
                { text: 'Thanks', onPress: () => { } }
            ])
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode + ":  " + errorMessage)
            Alert.alert("You're not in!", "You have not logged in." + errorMessage, [
                { text: 'try again', onPress: () => { } }
            ])
        });
}
// // // // // // //

// Sign out functionality
export const signOutUser = () => {
    signOut(auth)
        .then(() => {
            console.log("Logged out successfully")
        }).catch((error) => {
            console.log(error.errorMessage)
        })
}

const updateAuthProfile = (username, profilepicture) => {
    updateProfile(auth.currentUser, {
        displayName: username, photoURL: profilepicture,
    }).then(() => {


        //Profile Updated!!


    }).catch((error) => {

    });
}

export const getCurrentUser = () => {
    return auth.currentUser;
}
