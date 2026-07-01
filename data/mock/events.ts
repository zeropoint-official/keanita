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
    title: 'Riverland Fun Day',
    description: 'Gardening workshop, cooking class & farm activities for kids 5-11!',
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
    title: 'Keanita Birthday Party',
    description: 'Join the big Keanita birthday celebration with games and prizes!',
    date: '2026-05-01',
    time: '15:00 - 20:00',
    location: 'KEAN Factory, Limassol',
    type: 'event',
    image: '/images/events/event-birthday.jpg',
    accentColor: '#F5A623',
    bgColor: '#FFF6E8',
  },
  // ─── Announcements ───
  {
    id: 4,
    title: 'Easter Giveaway',
    description: 'Win a Keanita Easter set with goodies and surprises!',
    date: '2026-05-10',
    time: 'All day',
    location: 'Online Event',
    type: 'announcement',
    image: '/images/events/event-easter.jpg',
    accentColor: '#9B7FD4',
    bgColor: '#F4F0FA',
  },
  {
    id: 5,
    title: 'Keanita Avatar Launch',
    description: 'Meet our new avatar promoting positive energy and anti-bullying!',
    date: '2026-05-18',
    time: '12:00',
    location: 'Online Event',
    type: 'announcement',
    image: '/images/events/event-avatar.jpg',
    accentColor: '#5DADE2',
    bgColor: '#EDF7FD',
  },
  // ─── Seminars ───
  {
    id: 2,
    title: 'Getting Nutty Seminar',
    description: 'A fun experimental day about nutrition and healthy living.',
    date: '2026-04-22',
    time: '11:00 - 13:00',
    location: 'Nicosia',
    type: 'seminar',
    image: '/images/events/event-nutty.jpg',
    accentColor: '#6BBF6A',
    bgColor: '#EEFBEE',
  },
  {
    id: 6,
    title: 'Healthy Habits Workshop',
    description: 'Learn how to build healthy daily habits with games and fun lessons.',
    date: '2026-06-05',
    time: '10:00 - 12:00',
    location: 'Limassol',
    type: 'seminar',
    image: '/images/events/event-nutty.jpg',
    accentColor: '#6BBF6A',
    bgColor: '#EEFBEE',
  },
];
