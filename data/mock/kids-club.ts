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
      'Λάβε έναν ξεχωριστό φάκελο από τους φίλους σου KEANITO στα γενέθλιά σου!',
    color: '#E84D3D',
    bgColor: '#FFF0EE',
  },
  {
    id: 2,
    iconKey: 'card',
    title: 'KEANITO Member Card',
    titleGreek: 'ΚΕΑΝΙΤΟ-κάρτα μέλους',
    description:
      'Με εκπτώσεις σε διάφορα συνεργαζόμενα καταστήματα σε όλη την Κύπρο.',
    color: '#F5A623',
    bgColor: '#FFF6E8',
  },
  {
    id: 3,
    iconKey: 'seminar',
    title: 'Seminars',
    titleGreek: 'Διοργάνωση Σεμιναρίων',
    description:
      'Λάβε προσκλήσεις σε αποκλειστικά εκπαιδευτικά και δημιουργικά σεμινάρια.',
    color: '#6BBF6A',
    bgColor: '#EEFBEE',
  },
  {
    id: 4,
    iconKey: 'contest',
    title: 'KEANITO Contests',
    titleGreek: 'ΚΕΑΝΙΤΟ-διαγωνισμοί',
    description:
      'Πάρε μέρος σε διαγωνισμούς αποκλειστικά για μέλη με πλούσια δώρα.',
    color: '#5DADE2',
    bgColor: '#EDF7FD',
  },
];

// ─── Categories (from `categories` table) ───
export const storeCategories: Record<number, string> = {
  3: 'Παιδικά / Βρεφικά / Παιχνίδια',
  4: 'Αθλητικά',
  5: 'Ένδυση / Υπόδηση',
  6: 'Βιβλιοπωλεία',
  7: 'Ηλεκτρονικά',
  8: 'Ψυχαγωγία / Εστιατόρια',
  12: 'Ζαχαροπλαστεία',
  13: 'Σπίτι / Διακόσμηση',
  14: 'Ταξίδια & Τσάντες',
  15: 'Υπηρεσίες',
  16: 'Οπτικά',
  19: 'Είδη σπιτιού',
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
  { id: 1, name: 'Paperworks Philippides', categoryId: 6, phone: '22879222', description: 'Εξαιρούνται τα οπτικά είδη', discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 2, name: 'ΑΘΛΟΚΙΝΗΣΗ', categoryId: 4, phone: '25822414', discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 4, name: 'Okaidi', categoryId: 3, phone: '23740835', description: 'Παιδικά είδη ένδυσης υπόδησης', discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 5, name: 'Allforkids', categoryId: 3, phone: '25384844', description: 'Παιδικά Είδη Υπόδησης', website: 'https://www.allforkidsshop.com/', discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 6, name: 'De Ninos', categoryId: 3, phone: '25581896', description: 'Παιδικά είδη', website: 'https://www.facebook.com/DeNinosCy', discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 9, name: 'Engino', categoryId: 3, phone: '25821960', description: 'Online — χρησιμοποίησε τον κωδικό «keanitakidsclub» στο ταμείο', website: 'www.enginotoys.com', discounts: [{ value: 15, description: 'Ηλεκτρονικό κατάστημα (Inventor & QBoidz)' }] },
  { id: 10, name: 'KBV', categoryId: 3, phone: '24665202', description: 'Παιδικά Είδη Ένδυσης', discounts: [{ value: 20, description: 'Πλήρες πακέτο βάπτισης' }] },
  { id: 12, name: 'Mikellides Sports', categoryId: 4, phone: '25371918', website: 'www.mikellides-sports.com', discounts: [{ value: 15, description: 'Παιδικά' }, { value: 10, description: 'Γυναικεία & Ανδρικά' }] },
  { id: 13, name: 'M. Pamboris Sports', categoryId: 4, phone: '24651551', website: 'www.pamboris@cytanet.com.cy', discounts: [{ value: 15, description: 'Όλα τα είδη' }, { value: 10, description: 'Nike' }] },
  { id: 14, name: 'AWOL', categoryId: 4, phone: '22106367', discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 15, name: 'Biker Bike shop', categoryId: 4, discounts: [{ value: 20, description: 'Έκπτωση' }] },
  { id: 16, name: 'Υδάτινος Κόσμος — Είδη Κολύμβησης', categoryId: 4, discounts: [{ value: 20, description: 'Έκπτωση' }] },
  { id: 17, name: 'No Name', categoryId: 5, discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 18, name: 'Camel Active', categoryId: 5, discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 19, name: 'Hyper', categoryId: 5, discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 20, name: 'Emporio Sportivo', categoryId: 5, discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 21, name: 'Parga Bookstore', categoryId: 6, discounts: [{ value: 15, description: 'Ηλεκτρονικό κατάστημα' }] },
  { id: 22, name: 'Επιλογή', categoryId: 6, discounts: [{ value: 20, description: 'Χαρτικά & σχολικά είδη' }] },
  { id: 24, name: 'ΒΙΒΛΙΟΧΩΡΑ', categoryId: 6, discounts: [{ value: 35, description: 'Είδη βιβλιοπωλείου' }, { value: 22, description: 'Παιδικά βιβλία, χαρτικά' }, { value: 10, description: 'Εκπαιδευτικά παιχνίδια (καθαρή τιμή)' }] },
  { id: 25, name: 'Bricks 4 Kids Club', categoryId: 8, discounts: [{ value: 15, description: 'Dine in & Play / μαθήματα LEGO Robotics' }] },
  { id: 26, name: 'PUZZLES Children Center', categoryId: 8, discounts: [{ value: 15, description: 'Είσοδος' }] },
  { id: 28, name: 'PLAY 4 ALL', categoryId: 8, discounts: [{ value: 15, description: 'Μόνο Bowling & Jungle' }] },
  { id: 29, name: 'MASTER LAND', categoryId: 8, discounts: [{ value: 20, description: 'Είσοδος' }] },
  { id: 30, name: 'PAFOS LOUNA PARK', categoryId: 8, discounts: [{ value: 20, description: 'Σύνολο φαγητού / ποτού (εξαιρούνται τα πάρτι)' }] },
  { id: 31, name: 'PIZZA EXPRESS', categoryId: 8, discounts: [{ value: 10, description: 'Δευ–Κυρ στο κατάστημα (μεσημέρι ή βράδυ)' }] },
  { id: 32, name: 'GARDEN CENTER', categoryId: 19, discounts: [{ value: 15, description: 'Όλα τα φυτά & κατασκευές κήπου' }, { value: 10, description: 'Διακοσμήσεις γάμου / βάπτισης' }] },
  { id: 33, name: 'English, Robotics & Computer Lessons', categoryId: 15, discounts: [{ value: 20, description: 'Δίδακτρα (ένα ακαδημαϊκό έτος)' }] },
  { id: 34, name: 'Costas Theodorou Ltd', categoryId: 14, discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 35, name: 'KYRANTO', categoryId: 16, discounts: [{ value: 20, description: 'Σκελετοί οράσεως & γυαλιά ηλίου' }, { value: 15, description: 'Oakley & Maui Jim' }] },
  { id: 36, name: 'THEOFANIDES EYE WORD', categoryId: 16, discounts: [{ value: 30, description: 'Σκελετοί οράσεως & γυαλιά ηλίου' }] },
  { id: 38, name: 'THEMA collection', categoryId: 5, discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 39, name: 'Trapped In Limassol Escape Rooms', categoryId: 8, discounts: [{ value: 20, description: '1 ώρα Escape Room' }, { value: 10, description: 'Πάρτι γενεθλίων' }] },
  { id: 42, name: 'Boobooideas by I.S.', categoryId: 15, discounts: [{ value: 15, description: 'Online παραγγελία μέσω Instagram' }] },
  { id: 43, name: 'E.C. NetTech Solutions Ltd', categoryId: 7, discounts: [{ value: 15, description: 'Αφαίρεση ιών, αναλώσιμα & επισκευές' }] },
  { id: 44, name: 'Fouskotopia Bouncy Castle', categoryId: 15, discounts: [{ value: 20, description: 'Κάθε φουσκωτό κάστρο' }] },
  { id: 45, name: 'Famous Sports', categoryId: 4, discounts: [{ value: 15, description: 'Έκπτωση' }] },
  { id: 46, name: 'Paradox Museum Limassol', categoryId: 8, discounts: [{ value: 30, description: 'Είσοδος' }] },
  { id: 47, name: 'Marzano', categoryId: 8, discounts: [{ value: 10, description: 'Έκπτωση' }] },
  { id: 48, name: 'LE TRONE NOIR', categoryId: 3, discounts: [{ value: 15, description: 'Πλήρες πακέτο βάπτισης' }, { value: 10, description: 'Ρούχα / παπούτσια' }] },
  { id: 49, name: 'SAKURA by Loizos Loizou / Flower Shop', categoryId: 13, discounts: [{ value: 15, description: 'Στο κατάστημα' }, { value: 15, description: 'Online — κωδικός KEAN15' }] },
];
