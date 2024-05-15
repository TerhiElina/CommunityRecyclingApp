import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const getUserDocument = async (uid) => {
  const firestore = getFirestore();
  const userRef = doc(firestore, 'users', uid);
  const userDoc = await getDoc(userRef);
  return userDoc;
  
};