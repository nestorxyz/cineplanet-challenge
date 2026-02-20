import { db } from '../lib/firebase';
import { collection, doc, setDoc } from '@firebase/firestore';
import { MOCK_PREMIERES, MOCK_CANDYSTORE } from '../lib/mocks';

async function seed() {
  console.log('Starting seeding...');

  // Seed Premieres
  console.log('Seeding premieres...');
  for (const movie of MOCK_PREMIERES) {
    await setDoc(doc(collection(db, 'premieres'), movie.id), movie);
    console.log(`- Seeded movie: ${movie.title}`);
  }

  // Seed Candy Store
  console.log('Seeding candy store...');
  for (const product of MOCK_CANDYSTORE) {
    await setDoc(doc(collection(db, 'candystore'), product.id), product);
    console.log(`- Seeded product: ${product.name}`);
  }

  console.log('Seeding completed successfully!');
}

seed().catch((error) => {
  console.error('Error seeding Firestore:', error);
  process.exit(1);
});
