import { db } from '../firebase';
import { collection, getDocs, query } from '@firebase/firestore';
import { CandyStoreProduct } from '../mocks';

export async function getCandyStoreCollection(): Promise<CandyStoreProduct[]> {
  try {
    const candyRef = collection(db, 'candystore');
    const q = query(candyRef);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CandyStoreProduct[];
  } catch (error) {
    console.error('Error fetching candy store products from Firestore:', error);
    throw error;
  }
}
