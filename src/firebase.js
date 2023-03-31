// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1ttHiX8uTGdzZzWkrWJiKaTnAipJhGCE",
  authDomain: "realtor-clone-react-5afc3.firebaseapp.com",
  projectId: "realtor-clone-react-5afc3",
  storageBucket: "realtor-clone-react-5afc3.appspot.com",
  messagingSenderId: "145597863492",
  appId: "1:145597863492:web:e607a817a85f40e5f10e11"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
