import { addDoc, collection, doc, setDoc, Timestamp, getDocs, getDoc, updateDoc, query, where } from "firebase/firestore"
import { db } from "../firebase"

//User Collection (Back-End, praat met Frontend op AddNewCompsScreen)
export const createUserInDB = async (username, email, uid, profilepicture, instagramHandle) => {
    try {
        console.log("Creating user in db..." + uid)
        const docRef = await setDoc(doc(db, "users", uid), {
            uid,
            username,
            email,
            role: 'Non-Admin',
            createdAt: Timestamp.now(),
            profilepicture,
            instagramHandle,
        })
        console.log("User added, Doc ID: " + docRef.id + docRef.username + docRef.instagramHandle)
    } catch (error) {
        console.log("Something went wrong: " + error)
    }
}


// READ User
export const getUserFromDB = async (id) => {
    try {
        const docRef = doc(db, 'users', id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const userData = { ...docSnapshot.data(), id: docSnapshot.id };
            return userData;
        } else {
            console.log('User does not exist');
            return null;
        }
    } catch (error) {
        console.log('Error getting user document: ', error);
        return null;
    }
};


//CREATE: Add A Competition to Firebase DB
export const createCompetitionInDB = async (competition) => {
    try {
        // console.log("Creating New Competition in db..." + competition)
        const docRef = await addDoc(collection(db, "competitions"), competition)
        // console.log("New Competition Added, Comp Name: " + docRef.id + "#PhotoCompetition - ")
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
        // console.log("Creating your entry into comp..." + entry)
        const docRef = await addDoc(collection(db, "entry"), entry)
        // console.log("New entry added, by: " + docRef.id)
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

        const snapshot = await getDocs(collection(db, "entry"))
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

export const getUserEntriesFromDB = async (userId) => {
    try {
        console.log(userId);
        const returnEntries = [];
        const q = query(collection(db, "entry"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            returnEntries.push({ ...doc.data(), id: doc.id });
        });
        return returnEntries;
    } catch (error) {
        console.log("Something went wrong when returning user entries: " + error);
        return [];
    }
};


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


//CREATE: Add A entry to Firebase DB
export const voteEntry = async (userId, entry, val) => {
    try {
        // console.log(userId, entry, val);
        console.log("Creating your vote into Entry..." + entry);

        const parentDocRef = doc(db, 'entry', entry);
        const subcollectionRef = collection(parentDocRef, 'vote');

        // Query the subcollection to check if the user has already voted
        const querySnapshot = await getDocs(
            query(subcollectionRef, where('userId', '==', userId))
        );

        if (!querySnapshot.empty) {
            // User has already voted, update the vote
            const voteDocRef = querySnapshot.docs[0].ref;
            await updateDoc(voteDocRef, { val });
            // console.log("Vote updated for user: " + userId);
            return true;
        }

        const newData = {
            userId,
            val,
        };

        const docRef = await addDoc(subcollectionRef, newData);

        if (docRef.id) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Something went wrong when adding/updating your entry: " + error);
        return false;
    }
};

// getVotesForEntry
export const getVotesForEntry = async (entryId) => {
    try {
        console.log("EntryId", entryId);
        const parentDocRef = doc(db, 'entry', entryId);
        const subCollectionRef = collection(parentDocRef, 'vote');

        const querySnapshot = await getDocs(subCollectionRef);

        let votesSum = 0;
        querySnapshot.forEach((doc) => {
            const voteData = doc.data();
            votesSum += voteData.val;
        });

        return votesSum;
    } catch (error) {
        console.log('Error getting votes for entry:', error);
        return 0;
    }
};

export const getEntryCountOfCompetitionFromDB = async (competitionID) => {
    try {
        const q = query(collection(db, 'entry'), where("competitionID", "==", competitionID));
        const querySnapshot = await getDocs(q);
        const entryCount = querySnapshot.size;
        // console.log("id:", competitionID);
        // console.log(`Total entries for competition ${entryCount}`);
        return entryCount;
    } catch (error) {
        console.log('Error getting filtered documents: ', error);
        return 0;
    }
};

export const getVotesByUserAndEntry = async (userId, entry) => {
    try {
        const parentDocRef = doc(db, 'entry', entry);
        const subcollectionRef = collection(parentDocRef, 'vote');

        const querySnapshot = await getDocs(
            query(subcollectionRef, where('userId', '==', userId))
        );

        if (!querySnapshot.empty) {
            // User has voted, retrieve the vote data
            const votes = querySnapshot.docs.map((doc) => doc.data());
            // console.log("Votes for user: " + userId);
            // console.log(votes);
            return votes;
        } else {
            // User has not voted
            // console.log("User has not voted for entry: " + entry);
            return [];
        }
    } catch (error) {
        console.log("Something went wrong when retrieving the votes: " + error);
        return [];
    }
};


export const getTopEntriesByVotes = async (competitionId) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, 'entry')));
        const entries = [];
        let totalVotes = 0;

        querySnapshot.forEach(async (doc) => {
            const entry = { id: doc.id, ...doc.data() };
            if (entry?.competitionID == competitionId) {
                entries.push(entry);
                const vote = await getVotesForEntry(entry.id);
                entry.vote = vote;
                totalVotes += vote || 0;
            }
        });

        entries.sort((a, b) => b.vote - a.vote); // Sort entries by votes in descending order
        const topEntries = entries.slice(0, 3); // Get only the top 3 entries

        console.log(topEntries);
        return topEntries;
    } catch (error) {
        console.log('Error getting top entries:', error);
        return [];
    }
};



export const getTop10EntriesByVotes = async () => {
    try {
        const querySnapshot = await getDocs(
            query(collection(db, 'entry'))
        );

        const entries = [];

        const promises = querySnapshot.docs.map(async (doc) => {
            const vote = await getVotesForEntry(doc.id);
            const entry = { id: doc.id, ...doc.data(), vote: vote };
            return entry;
        });

        const resolvedEntries = await Promise.all(promises);
        entries.push(...resolvedEntries);

        // Sort the entries by votes in descending order
        entries.sort((a, b) => b.vote - a.vote);

        // Get the top 10 entries
        const top10Entries = entries.slice(0, 5);

        console.log(top10Entries);
        return top10Entries;
    } catch (error) {
        console.log('Error getting top entries:', error);
        return [];
    }
};





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