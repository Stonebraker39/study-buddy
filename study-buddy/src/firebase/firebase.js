// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGmWq7Qp_2FN_uxAPos38jt5JSl6C5Hyo",
    authDomain: "study-buddy-63412.firebaseapp.com",
    projectId: "study-buddy-63412",
    storageBucket: "study-buddy-63412.firebasestorage.app",
    messagingSenderId: "116737760699",
    appId: "1:116737760699:web:8dd7c22df54d674287b89e",
    measurementId: "G-5DLXZSG7ML"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;