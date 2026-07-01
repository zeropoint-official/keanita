// ─── Real data from old KEANITO Kids Club app ───
// Benefits: from img_kids_club_ofelimata_dialog.jpg (in-app dialog)
// Stores & discounts: from old SQL database (`stores` + `store_discounts` tables)

export interface ClubBenefit {
  id: number;
  iconKey: 'gift' | 'card' | 'seminar' | 'contest';
  title: string;
  titleGreek: string;
  description: string;
  color: string;
  bgColor: string;
}

export const clubBenefits: ClubBenefit[] = [
  {
    id: 1,
    iconKey: 'gift',
    title: 'Birthday Gift',
    titleGreek: 'Δωράκι Γενεθλίων',
    description:
      'Receive a special envelope from your KEANITO friends on your birthday!',
    color: '#E84D3D',
    bgColor: '#FFF0EE',
  },
  {
    id: 2,
    iconKey: 'card',
    title: 'KEANITO Member Card',
    titleGreek: 'ΚΕΑΝΙΤΟ-κάρτα μέλους',
    description:
      'With discounts at various partner stores across Cyprus.',
    color: '#F5A623',
    bgColor: '#FFF6E8',
  },
  {
    id: 3,
    iconKey: 'seminar',
    title: 'Seminars',
    titleGreek: 'Διοργάνωση Σεμιναρίων',
    description:
      'Get invited to exclusive educational and creative seminars.',
    color: '#6BBF6A',
    bgColor: '#EEFBEE',
  },
  {
    id: 4,
    iconKey: 'contest',
    title: 'KEANITO Contests',
    titleGreek: 'ΚΕΑΝΙΤΟ-διαγωνισμοί',
    description:
      'Take part in member-only contests with rich gifts.',
    color: '#5DADE2',
    bgColor: '#EDF7FD',
  },
];

// ─── Categories (from `categories` table) ───
export const storeCategories: Record<number, string> = {
  3: 'Kids / Baby / Toys',
  4: 'Sports',
  5: 'Clothing / Footwear',
  6: 'Bookstores',
  7: 'Electronics',
  8: 'Entertainment / Restaurants',
  12: 'Confectionery',
  13: 'Home / Decor',
  14: 'Travel & Bags',
  15: 'Services',
  16: 'Optical',
  19: 'Home Goods',
};

// ─── Stores (real data, `stores` + `store_discounts` JOIN) ───
export interface PartnerStore {
  id: number;
  name: string;
  categoryId: number;
  phone?: string;
  description?: string;
  website?: string;
  discounts: { value: number; description: string }[];
}

export const partnerStores: PartnerStore[] = [
  { id: 1, name: 'Paperworks Philippides', categoryId: 6, phone: '22879222', description: 'Excluding optical items', discounts: [{ value: 15, description: 'Discount' }] },
  { id: 2, name: 'ΑΘΛΟΚΙΝΗΣΗ', categoryId: 4, phone: '25822414', discounts: [{ value: 15, description: 'Discount' }] },
  { id: 4, name: 'Okaidi', categoryId: 3, phone: '23740835', description: 'Παιδικά είδη ένδυσης υπόδησης', discounts: [{ value: 15, description: 'Discount' }] },
  { id: 5, name: 'Allforkids', categoryId: 3, phone: '25384844', description: 'Παιδικά Είδη Υπόδησης', website: 'https://www.allforkidsshop.com/', discounts: [{ value: 15, description: 'Discount' }] },
  { id: 6, name: 'De Ninos', categoryId: 3, phone: '25581896', description: 'Παιδικά είδη', website: 'https://www.facebook.com/DeNinosCy', discounts: [{ value: 15, description: 'Discount' }] },
  { id: 9, name: 'Engino', categoryId: 3, phone: '25821960', description: 'Online — use code "keanitakidsclub" at checkout', website: 'www.enginotoys.com', discounts: [{ value: 15, description: 'Online shop (Inventor & QBoidz)' }] },
  { id: 10, name: 'KBV', categoryId: 3, phone: '24665202', description: 'Παιδικά Είδη Ένδυσης', discounts: [{ value: 20, description: 'Complete baptism package' }] },
  { id: 12, name: 'Mikellides Sports', categoryId: 4, phone: '25371918', website: 'www.mikellides-sports.com', discounts: [{ value: 15, description: 'Kids' }, { value: 10, description: 'Women & Men' }] },
  { id: 13, name: 'M. Pamboris Sports', categoryId: 4, phone: '24651551', website: 'www.pamboris@cytanet.com.cy', discounts: [{ value: 15, description: 'All items' }, { value: 10, description: 'Nike' }] },
  { id: 14, name: 'AWOL', categoryId: 4, phone: '22106367', discounts: [{ value: 15, description: 'Discount' }] },
  { id: 15, name: 'Biker Bike shop', categoryId: 4, discounts: [{ value: 20, description: 'Discount' }] },
  { id: 16, name: 'Υδάτινος Κόσμος — Είδη Κολύμβησης', categoryId: 4, discounts: [{ value: 20, description: 'Discount' }] },
  { id: 17, name: 'No Name', categoryId: 5, discounts: [{ value: 15, description: 'Discount' }] },
  { id: 18, name: 'Camel Active', categoryId: 5, discounts: [{ value: 15, description: 'Discount' }] },
  { id: 19, name: 'Hyper', categoryId: 5, discounts: [{ value: 15, description: 'Discount' }] },
  { id: 20, name: 'Emporio Sportivo', categoryId: 5, discounts: [{ value: 15, description: 'Discount' }] },
  { id: 21, name: 'Parga Bookstore', categoryId: 6, discounts: [{ value: 15, description: 'Online shop' }] },
  { id: 22, name: 'Επιλογή', categoryId: 6, discounts: [{ value: 20, description: 'Stationery & school items' }] },
  { id: 24, name: 'ΒΙΒΛΙΟΧΩΡΑ', categoryId: 6, discounts: [{ value: 35, description: 'Bookstore items' }, { value: 22, description: "Children's books, stationery" }, { value: 10, description: 'Net educational toys' }] },
  { id: 25, name: 'Bricks 4 Kids Club', categoryId: 8, discounts: [{ value: 15, description: 'Dine in & Play / LEGO Robotics classes' }] },
  { id: 26, name: 'PUZZLES Children Center', categoryId: 8, discounts: [{ value: 15, description: 'Entrance' }] },
  { id: 28, name: 'PLAY 4 ALL', categoryId: 8, discounts: [{ value: 15, description: 'Bowling & Jungle only' }] },
  { id: 29, name: 'MASTER LAND', categoryId: 8, discounts: [{ value: 20, description: 'Entrance' }] },
  { id: 30, name: 'PAFOS LOUNA PARK', categoryId: 8, discounts: [{ value: 20, description: 'Food / drink total (excludes parties)' }] },
  { id: 31, name: 'PIZZA EXPRESS', categoryId: 8, discounts: [{ value: 10, description: 'Mon–Sun dine-in (lunch or dinner)' }] },
  { id: 32, name: 'GARDEN CENTER', categoryId: 19, discounts: [{ value: 15, description: 'All plants & garden constructions' }, { value: 10, description: 'Wedding / baptism decorations' }] },
  { id: 33, name: 'English, Robotics & Computer Lessons', categoryId: 15, discounts: [{ value: 20, description: 'Tuition fees (one academic year)' }] },
  { id: 34, name: 'Costas Theodorou Ltd', categoryId: 14, discounts: [{ value: 15, description: 'Discount' }] },
  { id: 35, name: 'KYRANTO', categoryId: 16, discounts: [{ value: 20, description: 'Optical frames & sunglasses' }, { value: 15, description: 'Oakley & Maui Jim' }] },
  { id: 36, name: 'THEOFANIDES EYE WORD', categoryId: 16, discounts: [{ value: 30, description: 'Optical frames & sunglasses' }] },
  { id: 38, name: 'THEMA collection', categoryId: 5, discounts: [{ value: 15, description: 'Discount' }] },
  { id: 39, name: 'Trapped In Limassol Escape Rooms', categoryId: 8, discounts: [{ value: 20, description: '1 hour Escape Room' }, { value: 10, description: 'Birthday Parties' }] },
  { id: 42, name: 'Boobooideas by I.S.', categoryId: 15, discounts: [{ value: 15, description: 'Instagram online order' }] },
  { id: 43, name: 'E.C. NetTech Solutions Ltd', categoryId: 7, discounts: [{ value: 15, description: 'Virus removal, consumables & repairs' }] },
  { id: 44, name: 'Fouskotopia Bouncy Castle', categoryId: 15, discounts: [{ value: 20, description: 'Each bouncy castle' }] },
  { id: 45, name: 'Famous Sports', categoryId: 4, discounts: [{ value: 15, description: 'Discount' }] },
  { id: 46, name: 'Paradox Museum Limassol', categoryId: 8, discounts: [{ value: 30, description: 'Entrance' }] },
  { id: 47, name: 'Marzano', categoryId: 8, discounts: [{ value: 10, description: 'Discount' }] },
  { id: 48, name: 'LE TRONE NOIR', categoryId: 3, discounts: [{ value: 15, description: 'Complete baptism package' }, { value: 10, description: 'Clothing / shoes' }] },
  { id: 49, name: 'SAKURA by Loizos Loizou / Flower Shop', categoryId: 13, discounts: [{ value: 15, description: 'At the shop' }, { value: 15, description: 'Online — code KEAN15' }] },
];
