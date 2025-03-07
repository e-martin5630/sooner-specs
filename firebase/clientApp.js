import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcoJ_Q_HSe1NJCJ2pDMrrtV_vOAzlbwyw",
  authDomain: "sooner-specs.firebaseapp.com",
  projectId: "sooner-specs",
  storageBucket: "sooner-specs.firebasestorage.app",
  messagingSenderId: "462442108583",
  appId: "1:462442108583:web:5ce8efc95de90274442d82",
  measurementId: "G-D6QKWNWCQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;