// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVDz6N6nsehEj3281E_Ov05PIRR-j59uM",
  authDomain: "habituo-a0c97.firebaseapp.com",
  projectId: "habituo-a0c97",
  storageBucket: "habituo-a0c97.firebasestorage.app",
  messagingSenderId: "577635474229",
  appId: "1:577635474229:web:928793a84fcbfff7a10a7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);