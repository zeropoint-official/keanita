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
    name: 'Πορτοκάλι',
    category: 'juice',
    tagline: '20% φυσικός χυμός + βιταμίνη C',
    description:
      'Φτιαγμένο από τα πιο νόστιμα πορτοκάλια, με 20% φυσικό χυμό και έξτρα βιταμίνη C. Το Keanita Πορτοκάλι είναι φτιαγμένο ειδικά για παιδιά — θρεπτικό, τονωτικό και γεμάτο τις γεύσεις που αγαπούν.',
    image: '/images/products/juice-orange-new.png',
    accentColor: '#F5A623',
    bgColor: '#FFF6E8',
    servingSize: 'ανά 100ml',
    highlights: ['20% Φυσικός χυμός', 'Έξτρα βιταμίνη C', 'Χωρίς συντηρητικά'],
    ingredients: [
      'Νερό',
      '20% Χυμός πορτοκαλιού από συμπυκνωμένο',
      'Ζάχαρη',
      'Φυσικό άρωμα πορτοκαλιού',
      'Βιταμίνη C (ασκορβικό οξύ)',
    ],
    nutrition: [
      { label: 'Ενέργεια', value: '184kJ / 43kcal' },
      { label: 'Λιπαρά', value: '0g' },
      { label: '— εκ των οποίων κορεσμένα', value: '0g' },
      { label: 'Υδατάνθρακες', value: '10.8g' },
      { label: 'Σάκχαρα', value: '10.8g' },
      { label: 'Πρωτεΐνη', value: '0g' },
      { label: 'Αλάτι', value: '0g' },
      { label: 'Βιταμίνη C', value: '12mg' },
    ],
  },
  {
    id: 2,
    name: 'Μάνγκο',
    category: 'juice',
    tagline: 'Τροπική απόλαυση μάνγκο',
    description:
      'Το μάνγκο — ο «βασιλιάς των φρούτων» — μέσα σε ένα παιδικό κουτάκι. Πλούσιο σε φυτικές ίνες, χωρίς συντηρητικά και με έξτρα βιταμίνη C, το Keanita Μάνγκο είναι ο τέλειος ξεδιψαστής.',
    image: '/images/products/juice-mango.png',
    accentColor: '#6BBF6A',
    bgColor: '#EEFBEE',
    servingSize: 'ανά 100ml',
    highlights: ['20% Φυσικός χυμός', 'Πλούσιο σε φυτικές ίνες', 'Έξτρα βιταμίνη C'],
    ingredients: [
      'Νερό',
      '20% Πουρές μάνγκο από συμπυκνωμένο',
      'Ζάχαρη',
      'Φυσικό άρωμα μάνγκο',
      'Βιταμίνη C (ασκορβικό οξύ)',
    ],
    nutrition: [
      { label: 'Ενέργεια', value: '221kJ / 52kcal' },
      { label: 'Λιπαρά', value: '0g' },
      { label: '— εκ των οποίων κορεσμένα', value: '0g' },
      { label: 'Υδατάνθρακες', value: '12.8g' },
      { label: 'Σάκχαρα', value: '12.8g' },
      { label: 'Πρωτεΐνη', value: '0g' },
      { label: 'Αλάτι', value: '0g' },
      { label: 'Βιταμίνη C', value: '12mg' },
    ],
  },
  {
    id: 3,
    name: 'Frumix',
    category: 'juice',
    tagline: 'Ένα μείγμα 5 φρούτων',
    description:
      'Μια φρουτοσαλάτα μέσα σε ένα μικρό κουτάκι! Με έξτρα βιταμίνη C, χωρίς συντηρητικά, περισσότερο φυσικό χυμό και τη γεύση 5 φρούτων — μήλο, πορτοκάλι, ανανάς, ροδάκινο και μάνγκο.',
    image: '/images/products/juice-frumix.png',
    accentColor: '#5DADE2',
    bgColor: '#EDF7FD',
    servingSize: 'ανά 100ml',
    highlights: ['Μείγμα 5 φρούτων', 'Έξτρα βιταμίνη C', 'Χωρίς συντηρητικά'],
    ingredients: [
      'Νερό',
      'Χυμός μήλου από συμπυκνωμένο',
      'Χυμός πορτοκαλιού από συμπυκνωμένο',
      'Χυμός ανανά από συμπυκνωμένο',
      'Πουρές ροδάκινου',
      'Πουρές μάνγκο',
      'Ζάχαρη',
      'Βιταμίνη C (ασκορβικό οξύ)',
    ],
    nutrition: [
      { label: 'Ενέργεια', value: '191kJ / 45kcal' },
      { label: 'Λιπαρά', value: '0g' },
      { label: '— εκ των οποίων κορεσμένα', value: '0g' },
      { label: 'Υδατάνθρακες', value: '11.3g' },
      { label: 'Σάκχαρα', value: '11.3g' },
      { label: 'Πρωτεΐνη', value: '0g' },
      { label: 'Αλάτι', value: '0g' },
      { label: 'Βιταμίνη C', value: '12mg' },
    ],
  },
  {
    id: 4,
    name: 'Πορτοκάλι Στέβια',
    category: 'juice',
    tagline: 'Λιγότερη ζάχαρη, ίδια γεύση',
    description:
      'Η αυθεντική γεύση Keanita Πορτοκάλι με 20% φυσικό χυμό και έξτρα βιταμίνη C — γλυκαμένη φυσικά με εκχύλισμα φύλλων στέβιας, χωρίς προσθήκη ζάχαρης.',
    image: '/images/products/juice-stevia.png',
    accentColor: '#6BBF6A',
    bgColor: '#EEFBEE',
    servingSize: 'ανά 100ml',
    highlights: ['Χωρίς προσθήκη ζάχαρης', 'Γλυκαμένο με στέβια', 'Έξτρα βιταμίνη C'],
    ingredients: [
      'Νερό',
      '20% Χυμός πορτοκαλιού από συμπυκνωμένο',
      'Φυσικό άρωμα πορτοκαλιού',
      'Γλυκοζίτες στεβιόλης (από φύλλα στέβιας)',
      'Βιταμίνη C (ασκορβικό οξύ)',
    ],
    nutrition: [
      { label: 'Ενέργεια', value: '100kJ / 24kcal' },
      { label: 'Λιπαρά', value: '0g' },
      { label: '— εκ των οποίων κορεσμένα', value: '0g' },
      { label: 'Υδατάνθρακες', value: '6.0g' },
      { label: 'Σάκχαρα', value: '5.8g' },
      { label: 'Πρωτεΐνη', value: '0g' },
      { label: 'Αλάτι', value: '0g' },
      { label: 'Βιταμίνη C', value: '12mg' },
    ],
  },
  {
    id: 5,
    name: 'Γιαούρτι Φράουλα',
    category: 'yogurt',
    tagline: 'Βελούδινο με αληθινή φράουλα',
    description:
      'Νόστιμο, φραουλένιο και εμπλουτισμένο με ασβέστιο και βιταμίνη D. Το τέλειο σνακ για παιδιά — για πρωινό, απογευματινή τόνωση, ή ακόμη και για πάρτι γενεθλίων!',
    image: '/images/products/yogurt-strawberry.png',
    accentColor: '#E84D3D',
    bgColor: '#FFF0EE',
    servingSize: 'ανά 100g',
    highlights: ['Πλούσιο σε ασβέστιο', 'Πηγή βιταμίνης D', 'Αληθινή φράουλα'],
    ingredients: [
      'Παστεριωμένο αγελαδινό γάλα',
      'Κομμάτια φράουλας (8%)',
      'Ζάχαρη',
      'Αποβουτυρωμένο γάλα σε σκόνη',
      'Τρούφα σοκολάτας',
      'Καλλιέργειες γιαουρτιού',
      'Βιταμίνη D',
    ],
    nutrition: [
      { label: 'Ενέργεια', value: '471kJ / 112kcal' },
      { label: 'Λιπαρά', value: '3.4g' },
      { label: '— εκ των οποίων κορεσμένα', value: '2.1g' },
      { label: 'Υδατάνθρακες', value: '16g' },
      { label: '— εκ των οποίων σάκχαρα', value: '12g' },
      { label: 'Πρωτεΐνη', value: '4.3g' },
      { label: 'Αλάτι', value: '0.12g' },
      { label: 'Ασβέστιο', value: '140mg (26% NRV*)' },
      { label: 'Βιταμίνη D', value: '0.7µg (20% NRV*)' },
    ],
  },
];
