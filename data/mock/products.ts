export interface NutritionFact {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  category: 'juice' | 'yogurt';
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  bgColor: string;
  servingSize: string;
  highlights: string[];
  ingredients: string[];
  nutrition: NutritionFact[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Orange',
    category: 'juice',
    tagline: '20% real juice + Vitamin C',
    description:
      'Made from the tastiest oranges, with 20% real juice and extra Vitamin C. Keanita Orange is crafted especially for kids — nutritional, energising and full of the flavours they love.',
    image: '/images/products/juice-orange-new.png',
    accentColor: '#F5A623',
    bgColor: '#FFF6E8',
    servingSize: 'per 100ml',
    highlights: ['20% Real Juice', 'Extra Vitamin C', 'No Preservatives'],
    ingredients: [
      'Water',
      '20% Orange juice from concentrate',
      'Sugar',
      'Natural orange flavour',
      'Vitamin C (Ascorbic acid)',
    ],
    nutrition: [
      { label: 'Energy', value: '184kJ / 43kcal' },
      { label: 'Fat', value: '0g' },
      { label: '— of which saturates', value: '0g' },
      { label: 'Carbohydrates', value: '10.8g' },
      { label: 'Sugars', value: '10.8g' },
      { label: 'Protein', value: '0g' },
      { label: 'Salt', value: '0g' },
      { label: 'Vitamin C', value: '12mg' },
    ],
  },
  {
    id: 2,
    name: 'Mango',
    category: 'juice',
    tagline: 'Tropical mango goodness',
    description:
      'Mango — the “king of fruits” — packed into a kid-friendly carton. Rich in fibre, with no preservatives and extra Vitamin C, Keanita Mango is the perfect thirst-quencher.',
    image: '/images/products/juice-mango.png',
    accentColor: '#6BBF6A',
    bgColor: '#EEFBEE',
    servingSize: 'per 100ml',
    highlights: ['20% Real Juice', 'Rich in Fibre', 'Extra Vitamin C'],
    ingredients: [
      'Water',
      '20% Mango puree from concentrate',
      'Sugar',
      'Natural mango flavour',
      'Vitamin C (Ascorbic acid)',
    ],
    nutrition: [
      { label: 'Energy', value: '221kJ / 52kcal' },
      { label: 'Fat', value: '0g' },
      { label: '— of which saturates', value: '0g' },
      { label: 'Carbohydrates', value: '12.8g' },
      { label: 'Sugars', value: '12.8g' },
      { label: 'Protein', value: '0g' },
      { label: 'Salt', value: '0g' },
      { label: 'Vitamin C', value: '12mg' },
    ],
  },
  {
    id: 3,
    name: 'Frumix',
    category: 'juice',
    tagline: 'A mix of 5 fruits',
    description:
      'A fruit salad packed into one little carton! With extra Vitamin C, no preservatives, more real juice and the flavour of 5 fruits — apple, orange, pineapple, peach and mango.',
    image: '/images/products/juice-frumix.png',
    accentColor: '#5DADE2',
    bgColor: '#EDF7FD',
    servingSize: 'per 100ml',
    highlights: ['5 Fruits Blend', 'Extra Vitamin C', 'No Preservatives'],
    ingredients: [
      'Water',
      'Apple juice from concentrate',
      'Orange juice from concentrate',
      'Pineapple juice from concentrate',
      'Peach puree',
      'Mango puree',
      'Sugar',
      'Vitamin C (Ascorbic acid)',
    ],
    nutrition: [
      { label: 'Energy', value: '191kJ / 45kcal' },
      { label: 'Fat', value: '0g' },
      { label: '— of which saturates', value: '0g' },
      { label: 'Carbohydrates', value: '11.3g' },
      { label: 'Sugars', value: '11.3g' },
      { label: 'Protein', value: '0g' },
      { label: 'Salt', value: '0g' },
      { label: 'Vitamin C', value: '12mg' },
    ],
  },
  {
    id: 4,
    name: 'Orange Stevia',
    category: 'juice',
    tagline: 'Less sugar, same taste',
    description:
      'The original Keanita Orange flavour with 20% real juice and extra Vitamin C — sweetened naturally with stevia leaf extract, with no added sugar.',
    image: '/images/products/juice-stevia.png',
    accentColor: '#6BBF6A',
    bgColor: '#EEFBEE',
    servingSize: 'per 100ml',
    highlights: ['No Added Sugar', 'Sweetened with Stevia', 'Extra Vitamin C'],
    ingredients: [
      'Water',
      '20% Orange juice from concentrate',
      'Natural orange flavour',
      'Steviol glycosides (from stevia leaf)',
      'Vitamin C (Ascorbic acid)',
    ],
    nutrition: [
      { label: 'Energy', value: '100kJ / 24kcal' },
      { label: 'Fat', value: '0g' },
      { label: '— of which saturates', value: '0g' },
      { label: 'Carbohydrates', value: '6.0g' },
      { label: 'Sugars', value: '5.8g' },
      { label: 'Protein', value: '0g' },
      { label: 'Salt', value: '0g' },
      { label: 'Vitamin C', value: '12mg' },
    ],
  },
  {
    id: 5,
    name: 'Strawberry Yogurt',
    category: 'yogurt',
    tagline: 'Creamy with real strawberry',
    description:
      'Tasty, strawberry-y and enriched with Calcium and Vitamin D. The perfect snack for kids — for breakfast, an afternoon pick-me-up, or even a birthday party!',
    image: '/images/products/yogurt-strawberry.png',
    accentColor: '#E84D3D',
    bgColor: '#FFF0EE',
    servingSize: 'per 100g',
    highlights: ['Rich in Calcium', 'Source of Vitamin D', 'Real Strawberry'],
    ingredients: [
      'Pasteurised cow’s milk',
      'Strawberry pieces (8%)',
      'Sugar',
      'Skimmed milk powder',
      'Chocolate sprinkles',
      'Yogurt cultures',
      'Vitamin D',
    ],
    nutrition: [
      { label: 'Energy', value: '471kJ / 112kcal' },
      { label: 'Fat', value: '3.4g' },
      { label: '— of which saturates', value: '2.1g' },
      { label: 'Carbohydrates', value: '16g' },
      { label: '— of which sugars', value: '12g' },
      { label: 'Protein', value: '4.3g' },
      { label: 'Salt', value: '0.12g' },
      { label: 'Calcium', value: '140mg (26% NRV*)' },
      { label: 'Vitamin D', value: '0.7µg (20% NRV*)' },
    ],
  },
];
