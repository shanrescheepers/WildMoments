// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/compat/storage';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBfTGjwj9Mbdg-SROV6qS2tLzAuKY3yFek",
    authDomain: "wildmomentsphotographycompapp.firebaseapp.com",
    projectId: "wildmomentsphotographycompapp",
    storageBucket: "wildmomentsphotographycompapp.appspot.com",
    messagingSenderId: "91334045242",
    appId: "1:91334045242:web:1acd4b213d912066964f03"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Generate and export our competitions

const auth = getAuth(app)
export { auth, firebase }

export const db = getFirestore(app)

