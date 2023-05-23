// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqMjijjWs_NzUk39w-DJuEPMHvrbCRZHI",
    authDomain: "wild-moments-app.firebaseapp.com",
    projectId: "wild-moments-app",
    storageBucket: "wild-moments-app.appspot.com",
    messagingSenderId: "488854771309",
    appId: "1:488854771309:web:e218bb7bf61ebd71181164"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Generate and export our competitions

const auth = getAuth(app)
export { app, auth }