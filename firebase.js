import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAXbEe_XGOApcPQ8EmUolUBov2sxYDdRXY",
    authDomain: "deerhacks-79aa9.firebaseapp.com",
    projectId: "deerhacks-79aa9",
    storageBucket: "deerhacks-79aa9.appspot.com",
    messagingSenderId: "577639576377",
    appId: "1:577639576377:web:6e1beb04856e8d2755aee8",
    measurementId: "G-49P9JLZ96M"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Initialize Cloud Firestore and get a reference to the service
  
export const db = getFirestore(app);
export const auth = getAuth(app)