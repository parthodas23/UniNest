// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx37xHzLbOVEy3By4PwTCRz3b0oC_ixJA",
  authDomain: "uninest-cfb8d.firebaseapp.com",
  projectId: "uninest-cfb8d",
  storageBucket: "uninest-cfb8d.firebasestorage.app",
  messagingSenderId: "1092089644705",
  appId: "1:1092089644705:web:bbde669237928e146f92e0",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
