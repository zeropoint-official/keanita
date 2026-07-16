export interface KeanitaEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'event' | 'seminar' | 'announcement';
  image: string;
  accentColor: string;
  bgColor: string;
}

export const events: KeanitaEvent[] = [
  // ─── Events ───
  {
    id: 1,
    title: 'Ημέρα διασκέδασης στο Riverland',
    description: 'Εργαστήρι κηπουρικής, μάθημα μαγειρικής & δραστηριότητες φάρμας για παιδιά 5-11!',
    date: '2026-04-15',
    time: '11:00 - 13:00',
    location: 'Riverland Bio Farm',
    type: 'event',
    image: '/images/events/event-riverland.jpg',
    accentColor: '#E84D3D',
    bgColor: '#FFF0EE',
  },
  {
    id: 3,
    title: 'Πάρτι γενεθλίων Keanita',
    description: 'Έλα στη μεγάλη γιορτή γενεθλίων της Keanita με παιχνίδια και δώρα!',
    date: '2026-05-01',
    time: '15:00 - 20:00',
    location: 'Εργοστάσιο KEAN, Λεμεσός',
    type: 'event',
    image: '/images/events/event-birthday.jpg',
    accentColor: '#F5A623',
    bgColor: '#FFF6E8',
  },
  // ─── Announcements ───
  {
    id: 4,
    title: 'Πασχαλινός διαγωνισμός',
    description: 'Κέρδισε ένα πασχαλινό σετ Keanita με λιχουδιές και εκπλήξεις!',
    date: '2026-05-10',
    time: 'Όλη μέρα',
    location: 'Διαδικτυακή εκδήλωση',
    type: 'announcement',
    image: '/images/events/event-easter.jpg',
    accentColor: '#9B7FD4',
    bgColor: '#F4F0FA',
  },
  {
    id: 5,
    title: 'Παρουσίαση του Keanita Avatar',
    description: 'Γνώρισε το νέο μας avatar που προωθεί τη θετική ενέργεια και τον αγώνα κατά του bullying!',
    date: '2026-05-18',
    time: '12:00',
    location: 'Διαδικτυακή εκδήλωση',
    type: 'announcement',
    image: '/images/events/event-avatar.jpg',
    accentColor: '#5DADE2',
    bgColor: '#EDF7FD',
  },
  // ─── Seminars ───
  {
    id: 2,
    title: 'Σεμινάριο «Getting Nutty»',
    description: 'Μια διασκεδαστική πειραματική ημέρα για τη διατροφή και την υγιεινή ζωή.',
    date: '2026-04-22',
    time: '11:00 - 13:00',
    location: 'Λευκωσία',
    type: 'seminar',
    image: '/images/events/event-nutty.jpg',
    accentColor: '#6BBF6A',
    bgColor: '#EEFBEE',
  },
  {
    id: 6,
    title: 'Εργαστήρι υγιεινών συνηθειών',
    description: 'Μάθε πώς να χτίζεις υγιεινές καθημερινές συνήθειες με παιχνίδια και διασκεδαστικά μαθήματα.',
    date: '2026-06-05',
    time: '10:00 - 12:00',
    location: 'Λεμεσός',
    type: 'seminar',
    image: '/images/events/event-nutty.jpg',
    accentColor: '#6BBF6A',
    bgColor: '#EEFBEE',
  },
];
