import { initializeApp } from 'firebase/app';

import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "",
    authDomains: "",


};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);