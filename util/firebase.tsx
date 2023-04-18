// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7RIgcqs4j5jBgt1odQGE1toveNVbDldc",
  authDomain: "clubweekevent.firebaseapp.com",
  projectId: "clubweekevent",
  storageBucket: "clubweekevent.appspot.com",
  messagingSenderId: "914313497118",
  appId: "1:914313497118:web:e15c7f57fa23ac27363c0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);