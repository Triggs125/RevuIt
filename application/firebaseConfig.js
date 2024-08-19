import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, browserLocalPersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

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
const auth = initializeAuth(app, { persistence: Platform.OS === 'web' ? browserLocalPersistence : getReactNativePersistence(ReactNativeAsyncStorage) });

export { app, analytics, firestore, auth }
