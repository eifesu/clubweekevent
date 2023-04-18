import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function fetchCategories() {
	const collectionRef = collection(db, "categories"); // Replace with your collection name
	const querySnapshot = await getDocs(collectionRef);
	const data = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
    console.log("Fetched categories : ", data)
	return data as Category[];
}

export async function fetchVotes() {
	const collectionRef = collection(db, "votes"); // Replace with your collection name
	const querySnapshot = await getDocs(collectionRef);
	const data = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
    console.log("Fetched votes : ", data)
	return data as Category[];
}

export async function fetchClubs(categoryId: string) {
    const collectionRef = collection(db, "clubs");
    const q = query(collectionRef, where('category', '==', categoryId));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    console.log("Fetched clubs : ", data)
    return data as Club[];
}

export async function fetchCategory(id: string) {
    const query = await getDoc(doc(db, "categories", id))
    if (query.exists()) {
        console.log("Fetched category", id, ": ", query.data())
        return query.data() as Category;
    } else {
        return Promise.reject("No such document!");
    }
}

export async function addVote(vote: Vote) {
    //  If it does not add it if it does return false
    const collectionRef = collection(db, "votes"); // Replace with your collection name
    // Create a query that checks if the user has already voted in this category
    const q = query(collectionRef, where('userId', '==', vote.userId), where('category', '==', vote.category));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
        return false
    } else {
        const docRef = await addDoc(collectionRef, vote);
        console.log("Document written with ID: ", docRef.id);
        return true
    }

}

export async function fetchUserVotes() {
    const collectionRef = collection(db, "votes"); 
    // Replace with your collection name
    if(auth.currentUser?.uid != null) {
        const q = query(collectionRef, where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Fetched votes : ", data)
        return data as Vote[];
    } else return []
}
