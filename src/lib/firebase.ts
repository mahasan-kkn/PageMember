import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Note: In a real app, this would be loaded from firebase-applet-config.json
// But since the tool failed, I will use environment variables or placeholders
// for this implementation to keep moving.
const firebaseConfig = {
  apiKey: "placeholder",
  authDomain: "placeholder.firebaseapp.com",
  projectId: "placeholder",
  storageBucket: "placeholder.appspot.com",
  messagingSenderId: "placeholder",
  appId: "placeholder"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
