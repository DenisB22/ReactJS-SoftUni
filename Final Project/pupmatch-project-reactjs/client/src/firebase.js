// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmRGGaxPu49EFv49tx_fNFROfTMnYiSKk",
  authDomain: "pupmatch-81bc1.firebaseapp.com",
  projectId: "pupmatch-81bc1",
  storageBucket: "pupmatch-81bc1.appspot.com",
  messagingSenderId: "993489201802",
  appId: "1:993489201802:web:cf44b9c5ea989bcbe5db73"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();