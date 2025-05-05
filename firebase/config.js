// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvYXCO85izEAyfqcd3PYTdmfKnLAX_bP8",
  authDomain: "docudiocesis.firebaseapp.com",
  projectId: "docudiocesis",
  storageBucket: "docudiocesis.appspot.com",
  messagingSenderId: "935069986751",
  appId: "1:935069986751:web:dfe80b1bb72424ca507b0a",
  measurementId: "G-H2Y9GWJGXY"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
//const analytics = getAnalytics(FirebaseApp);



