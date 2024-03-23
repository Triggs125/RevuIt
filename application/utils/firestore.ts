import { doc } from "firebase/firestore";
import { auth, firestore } from "../firebaseConfig";

export const getUserDoc = (userId?: string) => {
  let uid = userId;
  if (!uid) {
    uid = auth.currentUser?.uid ?? '-1';
  }
  return doc(firestore, `users/${userId}`);
}