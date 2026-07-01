export interface Character {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bestFriend: string;
  power?: string;
  favoriteJuice: string;
  image: string;
  /** UI accent — used for text & buttons. */
  accentColor: string;
  /** Match the halo color baked into the PNG so backgrounds blend seamlessly. */
  bgColor: string;
}

export const characters: Character[] = [
  {
    id: 1,
    slug: 'keanita',
    name: 'KEANITA',
    tagline: 'The Juice Explorer',
    description:
      'KEANITA is a carefree and natural-loving girl, emotional and compassionate. She is active and enjoys gymnastics and gardening because she adores nature! She travels through the world of computers with joy and curiosity as an explorer. At home she is welcomed by her family and the incredibly adorable dog TONI!',
    bestFriend: 'Viktoras (they complement each other)',
    favoriteJuice: 'Orange Burst',
    image: '/images/characters/character-1.png',
    accentColor: '#1E9A3D',
    bgColor: '#DCF5DC',
  },
  {
    id: 2,
    slug: 'viktoras',
    name: 'VIKTORAS',
    tagline: 'The Genius Explorer',
    description:
      'Viktoras is a quiet boy who spends his time reading. He is highly intelligent — his IQ exceeds 300. He knows every detail of the latest world news, and anything to do with how one can survive under any conditions. Although shy, he is responsible in his role and very practical. Equipped with intense investigative intuition and high-tech gadgets to help him on his missions.',
    bestFriend: 'KEANITA (he admires her and is secretly in love)',
    favoriteJuice: 'Apple Sparkle',
    image: '/images/characters/character-2.png',
    accentColor: '#E11915',
    bgColor: '#FFD9D4',
  },
  {
    id: 3,
    slug: 'magkas',
    name: 'MAGKAS',
    tagline: 'The Weather Master',
    description:
      'Magkas is a distant and tough character, yet has a protective disposition. He does not like when someone questions his leadership abilities, and loves it when his advice and opinions are heard without hesitation. He has the ability to measure anything with his straw-head.',
    bestFriend: 'Lefis (he feels like his guardian angel)',
    power:
      'Can change weather conditions and create typhoons, earthquakes, sunshine, storms etc. whenever he chooses',
    favoriteJuice: 'Frumix',
    image: '/images/characters/character-3.png',
    accentColor: '#1E9A3D',
    bgColor: '#DCF5DC',
  },
  {
    id: 4,
    slug: 'lefis',
    name: 'LEFIS',
    tagline: 'The Shapeshifter',
    description:
      "Lefis is full of charm and smiles and believes that even bad guys have some form of sensitivity, so he tries to guide everyone onto the right path without using his powers. He likes pretty and stylish girls and anything fluffy and soft. He cannot pronounce the letter S (he speaks with TH instead — e.g. 'thelo' for 'do you want to dance?').",
    bestFriend: 'Magkas (he seems to know a lot and has saved his life many times)',
    power: 'Can take any shape he wants',
    favoriteJuice: 'Mango Magic',
    image: '/images/characters/character-4.png',
    accentColor: '#E11915',
    bgColor: '#FFD9D4',
  },
];
