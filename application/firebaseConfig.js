import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC_8QZQrtnMjfa3GTnB9VG1fslQE-5O_Xw",
  authDomain: "dabble-revu-it.firebaseapp.com",
  projectId: "dabble-revu-it",
  storageBucket: "dabble-revu-it.appspot.com",
  messagingSenderId: "796912386435",
  appId: "1:796912386435:web:52bc05bb6f4882178df6b6",
  measurementId: "G-9Q77433JJW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export { app, analytics, firestore }
