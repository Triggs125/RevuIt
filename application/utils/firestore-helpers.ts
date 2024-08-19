import { doc } from "firebase/firestore";
import { auth, firestore } from "../firebaseConfig";

export const getUserDoc = (userId?: string) => {
  let uid = userId;
  if (!uid) {
    uid = auth.currentUser?.uid ?? 'xPID1s7EBLSThSmWb09vSBiQUQ43';
  }
  return doc(firestore, `users/${uid}`);
}