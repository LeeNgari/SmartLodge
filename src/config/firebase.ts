// firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAKOmrk-Db98iyMd7XWj0hSJXmcenxuHWk",
  authDomain: "classprojects-36881.firebaseapp.com",
  projectId: "classprojects-36881",
  storageBucket: "classprojects-36881.firebasestorage.app",
  messagingSenderId: "145089237262",
  appId: "1:145089237262:web:de1f8d36f04a3b0c17475f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);