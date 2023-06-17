import { addDoc, collection, doc, setDoc, Timestamp, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"

//User Collection (Back-End, praat met Frontend op AddNewCompsScreen)
export const createUserInDB = async (username, email, uid) => {
    try {
        console.log("Creating user in db..." + uid)
        const docRef = await setDoc(doc(db, "users", uid), {
            username,
            email,
            role: 'Non-Admin',
            createdAt: Timestamp.now(),
            // profilepicture: '',
        })
        console.log("User added, Doc ID: " + docRef.id + docRef.username)

    } catch (error) {

        console.log("Something went wrong: " + error)
    }
}

//CREATE: Add A Competition to Firebase DB
export const createCompetitionInDB = async (competition) => {
    try {
        console.log("Creating New Competition in db..." + competition)
        const docRef = await addDoc(collection(db, "competitions"), competition)
        console.log("New Competition Added, Comp Name: " + docRef.id + "#PhotoCompetition - ")
        if (docRef.id) {
            return true;
        } else {
            return false;
        }


    } catch (error) {

        console.log("Something went wrong when adding a new competition: " + error)
    }
}

//CREATE: Add A Competition to Firebase DB
export const competitionEntry = async (entry) => {
    try {
        console.log("Creating your entry into comp..." + entry)
        const docRef = await addDoc(collection(db, "entry"), entry)
        console.log("New entry added, by: " + docRef.id)
        if (docRef.id) {
            return true;
        } else {
            return false;
        }


    } catch (error) {

        console.log("Something went wrong when adding your entry " + error)
    }
}

// READ
export const getAllCompetitionsFromCollection = async () => {
    try {
        var returnCompetitions = []

        const snapshot = await getDocs(collection(db, "competitions"))
        snapshot.forEach((doc) => {
            // console.log(doc.id, "=>", doc.data())

            returnCompetitions.push({ ...doc.data(), id: doc.id })
        });

        return returnCompetitions;
    } catch (error) {

        console.log("Something went wrong when returning collection: " + error)
        return []
    }
}

// READ
export const getAllEntriesFromDB = async () => {
    try {
        var returnEntries = []

        const snapshot = await getDocs(collection(db, "entries"))
        snapshot.forEach((doc) => {
            // console.log(doc.id, "=>", doc.data())

            returnEntries.push({ ...doc.data(), id: doc.id })
        });

        return returnEntries;
    } catch (error) {

        console.log("Something went wrong when returning Entries Collection: " + error)
        return []
    }
}

// READ
export const getJudgeFromDB = async (competitionID, category) => {
    // console.log("Test");
    // console.log("Comp Id:", competitionID);
    // console.log("Cat:", category);
    try {
        let entry = []
        const q = query(collection(db, 'entry'), where("competitionID", "==", competitionID), where("category", "==", category));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // Access the filtered documents here
            // console.log(doc.id, ' => ', doc.data());
            entry.push({ ...doc.data(), id: doc.id })

        });
        return entry;
    } catch (error) {
        console.log('Error getting filtered documents: ', error);
    }

}


// import { collection, query, where, getDocs } from 'firebase/firestore';

// const filterData = async () => {
//     const q = query(collection(db, 'your_collection'), where('field', '==', 'value'));

//     try {
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             // Access the filtered documents here
//             console.log(doc.id, ' => ', doc.data());
//         });
//     } catch (error) {
//         console.log('Error getting filtered documents: ', error);
//     }
// };

// filterData();