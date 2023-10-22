// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyQL6ZLOr1Z8o0hoD4sj_IiTCaPKRDpac",
  authDomain: "alma-cannabica.firebaseapp.com",
  projectId: "alma-cannabica",
  storageBucket: "alma-cannabica.appspot.com",
  messagingSenderId: "1050524985544",
  appId: "1:1050524985544:web:147c55fd5ca0567aab1dfd",
  measurementId: "G-69GK8J943M"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);