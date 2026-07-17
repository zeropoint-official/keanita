// ─── Real data from the old KEANITA app backend ───
// Online puzzles: `drawings` table (colouring pages / riddles, status=enabled)
// Activities: `newsletters` table (downloadable PDF sheets, status=enabled)
// Preview images are bundled in public/; PDFs open from the backend (media library URLs).

export interface DownloadableItem {
  id: number;
  title: string;
  /** Bundled preview image (public/ path) */
  image: string;
  /** Remote PDF opened in a new tab */
  pdfUrl: string;
  category?: string;
}

const MEDIA = 'https://www.evenziademo3.com/media';

export const onlinePuzzles: DownloadableItem[] = [
  {
    id: 18,
    title: 'Χρωμοσελίδα ΚΕΑΝΙΤΑ',
    image: '/images/puzzles/drawing-18-image.jpg',
    pdfUrl: `${MEDIA}/1195/KEANITA-COLOURINGPAGE-KEANITA-1.pdf`,
  },
  {
    id: 19,
    title: 'Μαθηματικά με χρώμα',
    image: '/images/puzzles/drawing-19-image.jpg',
    pdfUrl: `${MEDIA}/1197/KEANITA-COLOURINGPAGE-maths.pdf`,
  },
  {
    id: 20,
    title: 'Λαβύρινθος',
    image: '/images/puzzles/drawing-20-image.jpg',
    pdfUrl: `${MEDIA}/1201/KEANITA-COLOURINGPAGE-maze2.pdf`,
  },
  {
    id: 17,
    title: 'Πασχαλινή πεταλούδα',
    image: '/images/puzzles/drawing-17-image.jpg',
    pdfUrl: `${MEDIA}/1397/KEANITA-Easter_butterfly.pdf`,
  },
  {
    id: 7,
    title: 'Γρίφος 1',
    image: '/images/puzzles/drawing-7-image.jpg',
    pdfUrl: `${MEDIA}/1419/diagonismos-trapped_1-2.pdf`,
  },
  {
    id: 14,
    title: 'Γρίφος 2',
    image: '/images/puzzles/drawing-14-image.jpg',
    pdfUrl: `${MEDIA}/1421/diagonismos-trapped_1-3.pdf`,
  },
  {
    id: 15,
    title: 'Γρίφος 3',
    image: '/images/puzzles/drawing-15-image.jpg',
    pdfUrl: `${MEDIA}/1423/diagonismos-trapped_1-4.pdf`,
  },
  {
    id: 16,
    title: 'Γρίφος 4',
    image: '/images/puzzles/drawing-16-image.jpg',
    pdfUrl: `${MEDIA}/1425/diagonismos-trapped_1-5.pdf`,
  },
];

export const downloadActivities: DownloadableItem[] = [
  {
    id: 26,
    title: 'Back 2 School Δραστηριότητες',
    category: 'Δραστηριότητες',
    image: '/images/activities/newsletter-26-image.png',
    pdfUrl: `${MEDIA}/1427/Back-to-school2022.pdf`,
  },
  {
    id: 27,
    title: 'Τα Πάντα για Μένα',
    category: 'Δραστηριότητες',
    image: '/images/activities/newsletter-27-image.jpg',
    pdfUrl: `${MEDIA}/1429/Black-and-white-all-about-me-back-to-school-worksheet-(1).pdf`,
  },
  {
    id: 28,
    title: 'Σελιδοδείκτης ΚΕΑΝΙΤΑ',
    category: 'Κατασκευές DIY',
    image: '/images/activities/newsletter-28-image.jpg',
    pdfUrl: `${MEDIA}/1431/bookmark-keanita.pdf`,
  },
  {
    id: 29,
    title: 'Σχολικό Πρόγραμμα ΚΕΑΝΙΤΑ',
    category: 'Κατασκευές DIY',
    image: '/images/activities/newsletter-29-image.jpg',
    pdfUrl: `${MEDIA}/1433/Programma_colour.pdf`,
  },
  {
    id: 4,
    title: 'Ανοιξιάτικες ΚΕΑΝΙΤΟ-δραστηριότητες',
    category: 'Δραστηριότητες',
    image: '/images/activities/newsletter-4-image.jpg',
    pdfUrl: `${MEDIA}/1252/Spring_KEANITA2024.pdf`,
  },
  {
    id: 5,
    title: 'Γιρλάντα Λουλουδιών DIY',
    category: 'Κατασκευές DIY',
    image: '/images/activities/newsletter-5-image.jpg',
    pdfUrl: `${MEDIA}/1253/MAY_KEANITA_2024.pdf`,
  },
  {
    id: 11,
    title: "Παιχνίδι 1980's Retro",
    category: 'Κατασκευές DIY',
    image: '/images/activities/newsletter-11-image.jpg',
    pdfUrl: `${MEDIA}/1259/game-retro.pdf`,
  },
  {
    id: 12,
    title: 'Οικολογικές Δραστηριότητες',
    category: 'Δραστηριότητες',
    image: '/images/activities/newsletter-12-image.jpg',
    pdfUrl: `${MEDIA}/1258/Eco-KEANITA_conv2024.pdf`,
  },
  {
    id: 13,
    title: 'Γωνιακοί Σελιδοδείκτες ORIGAMI',
    category: 'Κατασκευές DIY',
    image: '/images/activities/newsletter-13-image.jpg',
    pdfUrl: `${MEDIA}/1255/bookmark-origami-1.pdf`,
  },
  {
    id: 14,
    title: 'Μαθαίνω Αγγλικά!',
    category: 'Δραστηριότητες',
    image: '/images/activities/newsletter-14-image.jpg',
    pdfUrl: `${MEDIA}/1257/Alphabet_KEANITA2024.pdf`,
  },
];
