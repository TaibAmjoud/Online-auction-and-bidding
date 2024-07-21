// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "online-auction-and-bidding.firebaseapp.com",
  projectId: "online-auction-and-bidding",
  storageBucket: "online-auction-and-bidding.appspot.com",
  messagingSenderId: "404566505828",
  appId: "1:404566505828:web:a3868cc8697b23016be271",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
