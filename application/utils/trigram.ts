import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

const GENERATION_OFFSET = new Date('5000-01-01').getTime();
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// This will generate an id in chronological reverse order.
// This means the default sort of objects added using this ID will return newest first.
// If this code survives past year 5000, you will experience Y5K.
const generateId = () => {
  let autoId = '';
  // Add some randomness to avoid data clashes.
  // If records come in that close, I don't care which one shows first, otherwise I 
  // will have to make sure the randomness is ordered correctly.
  for (let i = 0; i < 10; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return (GENERATION_OFFSET - Date.now()).toString(32) + autoId;
};

// Generates a trigram
export const triGram = (txt: string) => {
  const map: Record<string, boolean> = {};
  const s1 = (txt || '').toLowerCase();
  const n = 3;
  for (let k = 0; k <= s1.length - n; k++) map[s1.substring(k, k + n)] = true;
  return map;
};

// This will add a new firestore record enhanced with search data.
// It assumes your record has "title" and/or "desc" present. It will then
// combine the two fields (so you can search on both) and store it as _smeta.
// Note the slice, which caps the length of the string
export const addPost = async (doc: any) => {
  const id = generateId();
  const payload = {
    ...doc,
    ...triGram([doc.title || '', doc.description || ''].join(' ').slice(0, 500))
  };
  
  // We set the id manually here to ensure ordering
  const postRef = doc(firestore, 'posts', id);
  await setDoc(postRef, payload);  
};