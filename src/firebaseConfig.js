// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzaT094Wyhz9AzMTbUx3ClMo8nF5mdIU0",
  authDomain: "onestopshop-83d6a.firebaseapp.com",
  projectId: "onestopshop-83d6a",
  storageBucket: "onestopshop-83d6a.firebasestorage.app",
  messagingSenderId: "179641545633",
  appId: "1:179641545633:web:162f46a0f0d1640fa191e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);