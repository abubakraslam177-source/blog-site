import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD17pUC9JhpS_r3gFBDWXzxJygV6jO2_5s",
  authDomain: "blogsite-6deab.firebaseapp.com",
  projectId: "blogsite-6deab",
  storageBucket: "blogsite-6deab.firebasestorage.app",
  messagingSenderId: "378732039452",
  appId: "1:378732039452:web:20bd0b378275755f18bed9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;