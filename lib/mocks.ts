export interface Premiere {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface CandyStoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const MOCK_PREMIERES: Premiere[] = [
  {
    id: '1',
    title: 'Sonic 3: La Película',
    description:
      'Sonic, Knuckles y Tails se reúnen para enfrentarse a un nuevo y poderoso adversario, Shadow, un misterioso villano con poderes que nunca antes habían enfrentado.',
    image: 'https://placehold.co/400x600/0056FF/white?text=Sonic+3',
  },
  {
    id: '2',
    title: 'Mufasa: El Rey León',
    description:
      'Explora el ascenso de Mufasa al poder, desde sus humildes comienzos como un cachorro huérfano hasta convertirse en el gran rey de las Tierras del Orgullo.',
    image: 'https://placehold.co/400x600/0056FF/white?text=Mufasa',
  },
  {
    id: '3',
    title: 'Nosferatu',
    description:
      'Una historia gótica de obsesión entre una joven atormentada y el aterrador vampiro enamorado de ella, causando un horror indescriptible a su paso.',
    image: 'https://placehold.co/400x600/0056FF/white?text=Nosferatu',
  },
];

export const MOCK_CANDYSTORE: CandyStoreProduct[] = [
  {
    id: 'c1',
    name: 'Combo Dúo',
    description: '1 Canchita Gigante + 2 Bebidas Grandes',
    price: 35.5,
    image: 'https://placehold.co/200x200/0056FF/white?text=Combo+Duo',
  },
  {
    id: 'c2',
    name: 'Combo Personal',
    description: '1 Canchita Mediana + 1 Bebida Mediana',
    price: 22.0,
    image: 'https://placehold.co/200x200/0056FF/white?text=Combo+P',
  },
  {
    id: 'c3',
    name: 'Nachos con Queso',
    description: 'Deliciosos nachos con salsa de queso caliente',
    price: 15.0,
    image: 'https://placehold.co/200x200/0056FF/white?text=Nachos',
  },
];

export const mockGetPremieres = async () => {
  return new Promise<Premiere[]>((resolve) => {
    setTimeout(() => resolve(MOCK_PREMIERES), 500);
  });
};

export const mockGetCandyStore = async () => {
  return new Promise<CandyStoreProduct[]>((resolve) => {
    setTimeout(() => resolve(MOCK_CANDYSTORE), 500);
  });
};

export const mockCompleteTransaction = async (data: { success: boolean }) => {
  console.log('Completing transaction with data:', data);
  return new Promise<{ responseCode: string }>((resolve) => {
    setTimeout(() => resolve({ responseCode: '0' }), 1000);
  });
};
