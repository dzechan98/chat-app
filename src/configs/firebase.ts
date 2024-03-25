import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAu4N2bCDJnXSuglQS7EFDWgh3lYdTL0ZE",
  authDomain: "chat-app-82d21.firebaseapp.com",
  projectId: "chat-app-82d21",
  storageBucket: "chat-app-82d21.appspot.com",
  messagingSenderId: "1047197148280",
  appId: "1:1047197148280:web:477649461ac747a3c8398d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const SignOutUser = async () => await signOut(auth);
