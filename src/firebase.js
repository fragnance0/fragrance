// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth"; // If using Firebase Authentication
import "firebase/firestore"; // If using Firestore database
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFXDDkECTfIxS6JxKmaX9N2vh3iDRMw4E",
    authDomain: "fragnance12.firebaseapp.com",
    databaseURL: "https://fragnance12-default-rtdb.firebaseio.com",
    projectId: "fragnance12",
    storageBucket: "fragnance12.firebasestorage.app",
    messagingSenderId: "1084120754135",
    appId: "1:1084120754135:web:1d13d1c2af3a6154b80d92",
    measurementId: "G-5RYT3W0ER8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth();

export { db, auth };