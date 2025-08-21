// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFLdwdeY4QvhK6pv1Ziptu81g7Aw9D1xg",
  authDomain: "resume-builder-c2a24.firebaseapp.com",
  projectId: "resume-builder-c2a24",
  storageBucket: "resume-builder-c2a24.firebasestorage.app",
  messagingSenderId: "255730131213",
  appId: "1:255730131213:web:1fbd472b27ef70625e5044",
  measurementId: "G-FF5K06VJGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
