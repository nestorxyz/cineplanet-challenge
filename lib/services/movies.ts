import { db } from '../firebase';
import { collection, getDocs, query } from '@firebase/firestore';

import { Premiere } from '../mocks';

export async function getMoviesCollection(): Promise<Premiere[]> {
  try {
    const moviesRef = collection(db, 'premieres');
    // You can add sorting if you add a created field later, for now just get them
    const q = query(moviesRef);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Premiere[];
  } catch (error) {
    console.error('Error fetching movies from Firestore:', error);
    // Fallback? or just throw
    throw error;
  }
}
