// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA1uDKUph11cE0hhy2nPBk_rXneK1bcvnI",
  authDomain: "recipe-52522.firebaseapp.com",
  projectId: "recipe-52522",
  storageBucket: "recipe-52522.firebasestorage.app",
  messagingSenderId: "106923572029",
  appId: "1:106923572029:web:8e051d2f5a57a9f1066354",
  measurementId: "G-70N52023GK",
};

// Inicjalizacja Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Eksportowanie instancji
export const auth = getAuth(app);
export const db = getFirestore(app);
