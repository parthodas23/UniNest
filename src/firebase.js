// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx37xHzLbOVEy3By4PwTCRz3b0oC_ixJA",
  authDomain: "uninest-cfb8d.firebaseapp.com",
  projectId: "uninest-cfb8d",
  storageBucket: "uninest-cfb8d.appspot.com",
  messagingSenderId: "1092089644705",
  appId: "1:1092089644705:web:bbde669237928e146f92e0",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);
