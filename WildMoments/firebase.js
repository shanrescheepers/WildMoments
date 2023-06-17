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
// const firebaseConfig = {
//     apiKey: "AIzaSyBqMjijjWs_NzUk39w-DJuEPMHvrbCRZHI",
//     authDomain: "wild-moments-app.firebaseapp.com",
//     projectId: "wild-moments-app",
//     storageBucket: "wild-moments-app.appspot.com",
//     messagingSenderId: "488854771309",
//     appId: "1:488854771309:web:e218bb7bf61ebd71181164"
// };
const firebaseConfig = {
    apiKey: "AIzaSyBN1FP7DnDSGQswypt55Pt0HTedNp4R21U",
    authDomain: "wildmomentscompapp.firebaseapp.com",
    projectId: "wildmomentscompapp",
    storageBucket: "wildmomentscompapp.appspot.com",
    messagingSenderId: "1035584368316",
    appId: "1:1035584368316:web:f746d374a3da34c42caab9"
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

