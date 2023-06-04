import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "../firebase"

//User Collection
export const createUserInDB = async (username, email, uid) => {

    try {
        console.log("Creating user in db..." + uid)
        const docRef = await setDoc(doc(db, "users", uid), {
            username,
            email,
            role: 'normal people not admin',
            createdAt: Timestamp.now(),
            // profilepicture: '',
        })
        // console.log("User added, Doc ID: " + docRef.id)

    } catch (error) {

        console.log("Somerthing went wrong: " + error)
    }
}
