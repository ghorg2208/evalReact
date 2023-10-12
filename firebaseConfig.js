// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-o26mhOcmyDIKqhC9JPbO3pEKlSYTiTs",
    authDomain: "eval-react-d3047.firebaseapp.com",
    projectId: "eval-react-d3047",
    storageBucket: "eval-react-d3047.appspot.com",
    messagingSenderId: "101246039730",
    appId: "1:101246039730:web:7c49e2a855e6b7a2dc7bab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;