import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC1pKOVQKU-K-wWIxH2X_8t5ntzlJbYag4",
  authDomain: "varuna-ai.firebaseapp.com",
  databaseURL: "https://varuna-ai-default-rtdb.firebaseio.com",
  projectId: "varuna-ai",
  storageBucket: "varuna-ai.firebasestorage.app",
  messagingSenderId: "219288820014",
  appId: "1:219288820014:web:9a0faa49f5ccce0b6a42bf"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);