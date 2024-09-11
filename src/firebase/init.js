
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCnRHGSsbbf-DpSs8OkQ0a2vg7k6gYOyRg",
    authDomain: "week7-moco.firebaseapp.com",
    projectId: "week7-moco",
    storageBucket: "week7-moco.appspot.com",
    messagingSenderId: "300996656062",
    appId: "1:300996656062:web:32b300e5638e9725b557ef"
};


initializeApp(firebaseConfig);
const db = getFirestore();
export default db;