export type NotificationType = 'event' | 'reward' | 'gift' | 'system';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

export const notifications: AppNotification[] = [
  {
    id: 'n1',
    title: '🎉 Το ημερήσιο μπόνους σε περιμένει!',
    body: 'Άνοιξε την εφαρμογή και μάζεψε 5 KP για την καθημερινή σου σύνδεση.',
    time: 'πριν 5 λεπτά',
    type: 'reward',
    read: false,
  },
  {
    id: 'n2',
    title: 'Η Ημέρα διασκέδασης στο Riverland πλησιάζει',
    body: 'Η εκδήλωσή σου ξεκινά σε 2 ημέρες. Πάτα για λεπτομέρειες.',
    time: 'πριν 2 ώρες',
    type: 'event',
    read: false,
  },
  {
    id: 'n3',
    title: 'Το δώρο σου έρχεται! 🎁',
    body: 'Το Ψηφιακό παραμύθι προστέθηκε στον λογαριασμό σου.',
    time: 'πριν 1 ημέρα',
    type: 'gift',
    read: false,
  },
  {
    id: 'n4',
    title: '🔥 Σερί 4 ημερών!',
    body: 'Συνέχισε να παίζεις καθημερινά για σερί 7 ημερών και κέρδισε +30 KP.',
    time: 'πριν 1 ημέρα',
    type: 'reward',
    read: true,
  },
  {
    id: 'n5',
    title: 'Νέος χαρακτήρας έρχεται σύντομα',
    body: 'Γνώρισε τον νεότερο φίλο της Keanita στην εκδήλωση παρουσίασης του Avatar.',
    time: 'πριν 3 ημέρες',
    type: 'event',
    read: true,
  },
  {
    id: 'n6',
    title: 'Καλώς ήρθες στο Kids Club!',
    body: 'Εξερεύνησε παιχνίδια, εκδηλώσεις και τον κατάλογο δώρων. Καλή διασκέδαση!',
    time: 'πριν 5 ημέρες',
    type: 'system',
    read: true,
  },
];
