import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwiLFWfz0qgt2v6tRtJpQocW1K9JFMyWc",
  authDomain: "react-hacathon.firebaseapp.com",
  projectId: "react-hacathon",
  storageBucket: "react-hacathon.firebasestorage.app",
  messagingSenderId: "149466481392",
  appId: "1:149466481392:web:ec3ed1f8cb90fa1902b835",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
