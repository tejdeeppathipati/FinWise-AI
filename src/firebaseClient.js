// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Optional: import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// This contains the Firebase keys you already have configured.
const firebaseConfig = {
  apiKey: "xxxx",
  authDomain: "hacknc-85ef3.firebaseapp.com",
  projectId: "hacknc-85ef3",
  storageBucket: "hacknc-85ef3.appspot.com",  // Fixed storageBucket URL: firebasestorage.app should be appspot.com
  messagingSenderId: "288038326367",
  appId: "1:288038326367:web:8a5058716f5f5aeedb0bea",
  measurementId: "G-PW7XD69S3X"  // Optional, you can keep it if you need Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize Analytics if you plan to use it
// const analytics = getAnalytics(app);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export the auth and db instances for use in other parts of your app
export { auth, db };
