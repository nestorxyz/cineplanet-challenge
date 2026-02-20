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

/** Price per seat (ticket) in PEN */
export const TICKET_PRICE_PEN = 15;

export const MOCK_PREMIERES: Premiere[] = [
  {
    id: '1',
    title: 'Sonic 3: La Película',
    description:
      'Sonic, Knuckles y Tails se reúnen para enfrentarse a un nuevo y poderoso adversario, Shadow, un misterioso villano con poderes que nunca antes habían enfrentado.',
    image:
      'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=600&h=900&auto=format&fit=crop', // Sonic space/blue theme
  },
  {
    id: '2',
    title: 'Mufasa: El Rey León',
    description:
      'Explora el ascenso de Mufasa al poder, desde sus humildes comienzos como un cachorro huérfano hasta convertirse en el gran rey de las Tierras del Orgullo.',
    image:
      'https://images.unsplash.com/photo-1629812456605-4a044aa38fbc?q=80&w=600&h=900&auto=format&fit=crop', // Lion theme
  },
  {
    id: '3',
    title: 'Nosferatu',
    description:
      'Una historia gótica de obsesión entre una joven atormentada y el aterrador vampiro enamorado de ella, causando un horror indescriptible a su paso.',
    image:
      'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&h=900&auto=format&fit=crop', // Dark/Gothic theme
  },
  {
    id: '4',
    title: 'Paddington en Perú',
    description:
      'Paddington regresa a Perú para visitar a su amada tía Lucy, quien ahora reside en el Hogar para Osos Jubilados.',
    image:
      'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=600&h=900&auto=format&fit=crop', // Bear/Book theme
  },
  {
    id: '5',
    title: 'Gladiador II',
    description:
      'Años después de presenciar la muerte del venerado héroe Máximo a manos de su tío, Lucio se ve obligado a entrar en el Coliseo.',
    image:
      'https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?q=80&w=600&h=900&auto=format&fit=crop', // Roman/Sword theme
  },
  {
    id: '6',
    title: 'Wicked',
    description:
      'La historia no contada de las brujas de Oz. Elphaba, una joven incomprendida por su inusual piel verde, forja una amistad inesperada.',
    image:
      'https://images.unsplash.com/photo-1547891301-17482554db2a?q=80&w=600&h=900&auto=format&fit=crop', // Green/Magic theme
  },
  {
    id: '7',
    title: 'Moana 2',
    description:
      'Moana emprende un viaje épico por el océano junto a un grupo de navegantes inesperados, descubriendo un mundo de monstruos marinos y leyendas perdidas.',
    image:
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=600&h=900&auto=format&fit=crop', // Ocean/Voyage theme
  },
  {
    id: '8',
    title: 'Red One',
    description:
      'Un cazador de élite y la criminal más buscada del mundo forman una alianza improbable para rescatar a una figura icónica secuestrada en Navidad.',
    image:
      'https://images.unsplash.com/photo-1482517967863-00000021c5ca?q=80&w=600&h=900&auto=format&fit=crop', // Action/Adventure theme
  },
  {
    id: '9',
    title: 'El Planeta de los Simios: Nuevo Reino',
    description:
      'Un simio joven emprende un viaje que lo llevará a cuestionar todo lo que sabe sobre el pasado y tomar decisiones que definirán el futuro.',
    image:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&h=900&auto=format&fit=crop', // Nature/Sci-fi theme
  },
];

export const MOCK_CANDYSTORE: CandyStoreProduct[] = [
  {
    id: 'c1',
    name: 'Combo Dúo',
    description: '1 Canchita Gigante + 2 Bebidas Grandes',
    price: 35.5,
    image:
      'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=400&h=400&auto=format&fit=crop', // Popcorn
  },
  {
    id: 'c2',
    name: 'Combo Personal',
    description: '1 Canchita Mediana + 1 Bebida Mediana',
    price: 22.0,
    image:
      'https://images.unsplash.com/photo-1572177191856-324da01df828?q=80&w=400&h=400&auto=format&fit=crop', // Popcorn cup
  },
  {
    id: 'c3',
    name: 'Nachos con Queso',
    description: 'Deliciosos nachos con salsa de queso caliente',
    price: 15.0,
    image:
      'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=400&h=400&auto=format&fit=crop', // Nachos
  },
  {
    id: 'c4',
    name: 'Canchita Gigante Salada',
    description: 'El clásico sabor que no puede faltar.',
    price: 18.0,
    image:
      'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=400&h=400&auto=format&fit=crop',
  },
  {
    id: 'c5',
    name: 'Hot Dog Cineplanet',
    description: 'Salchicha parrillera con pan artesanal y salsas.',
    price: 12.0,
    image:
      'https://images.unsplash.com/photo-1541288097105-849516300e9c?q=80&w=400&h=400&auto=format&fit=crop',
  },
  {
    id: 'c6',
    name: 'Gaseosa Extra Grande',
    description: 'Refrescante bebida de 32oz para disfrutar la función.',
    price: 9.5,
    image:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400&h=400&auto=format&fit=crop',
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

export interface CompleteTransactionPayload {
  email: string;
  names: string;
  dni: string;
  operationDate: string | number;
  transactionId: string;
}

export const mockCompleteTransaction = async (
  data: CompleteTransactionPayload,
) => {
  console.log('Completing transaction with data:', data);
  return new Promise<{ responseCode: string }>((resolve) => {
    setTimeout(() => resolve({ responseCode: '0' }), 1000);
  });
};
