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
    title: '🎉 Daily bonus ready!',
    body: 'Open the app and collect 5 KP for your daily login.',
    time: '5m ago',
    type: 'reward',
    read: false,
  },
  {
    id: 'n2',
    title: 'Riverland Fun Day is soon',
    body: 'Your event starts in 2 days. Tap to see the details.',
    time: '2h ago',
    type: 'event',
    read: false,
  },
  {
    id: 'n3',
    title: 'Gift on its way! 🎁',
    body: 'Your Digital Storybook has been added to your account.',
    time: '1d ago',
    type: 'gift',
    read: false,
  },
  {
    id: 'n4',
    title: '🔥 4-day streak!',
    body: 'Keep playing daily to reach a 7-day streak and earn +30 KP.',
    time: '1d ago',
    type: 'reward',
    read: true,
  },
  {
    id: 'n5',
    title: 'New character coming soon',
    body: 'Meet the newest Keanita friend at the Avatar Launch event.',
    time: '3d ago',
    type: 'event',
    read: true,
  },
  {
    id: 'n6',
    title: 'Welcome to the Kids Club!',
    body: 'Explore games, events and the gift catalog. Have fun!',
    time: '5d ago',
    type: 'system',
    read: true,
  },
];
