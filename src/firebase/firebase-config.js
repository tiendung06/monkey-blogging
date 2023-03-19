import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ_02w2PtZgsMJGh9cb8T0_qBaBmvvyq0",
  authDomain: "monkey-blogging-c67c3.firebaseapp.com",
  projectId: "monkey-blogging-c67c3",
  storageBucket: "monkey-blogging-c67c3.appspot.com",
  messagingSenderId: "801110164380",
  appId: "1:801110164380:web:705f48c6fe2627427f7e59",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
