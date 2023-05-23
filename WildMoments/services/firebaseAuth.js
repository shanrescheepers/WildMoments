
// import auth instance from my app
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
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
const registerNewUser = () => {
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
const signInUser = () => {

}
// // // // // // //

// Sign out functionality
const signOutUser = () => {

}