'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

export type KPIcon = 'game' | 'event' | 'login' | 'gift' | 'qr' | 'bonus' | 'streak';

export interface KPEntry {
  id: string;
  label: string;
  amount: number; // positive = earned, negative = spent
  date: string;
  icon: KPIcon;
}

interface RewardsState {
  balance: number;
  streak: number;
  lifetimeEarned: number;
  history: KPEntry[];
  earn: (amount: number, label: string, icon?: KPIcon) => void;
  spend: (amount: number, label: string) => boolean;
}

const SEED_HISTORY: KPEntry[] = [
  { id: 's1', label: 'Μπόνους ημερήσιας σύνδεσης', amount: 5, date: 'Σήμερα, 08:12', icon: 'login' },
  { id: 's2', label: 'Φρουτοτρέλα — 32 φρούτα', amount: 32, date: 'Σήμερα, 08:15', icon: 'game' },
  { id: 's3', label: 'Μπόνους σερί 4 ημερών', amount: 10, date: 'Σήμερα, 08:12', icon: 'streak' },
  { id: 's4', label: 'Σκανάρισμα QR χυμού Πορτοκάλι', amount: 20, date: 'Χθες', icon: 'qr' },
  { id: 's5', label: 'Δήλωση συμμετοχής — Ημέρα διασκέδασης στο Riverland', amount: 10, date: 'Χθες', icon: 'event' },
  { id: 's6', label: 'Μπόνους ολοκλήρωσης παιχνιδιού', amount: 5, date: 'πριν 2 ημέρες', icon: 'game' },
  { id: 's7', label: 'Συμπλήρωσες το προφίλ σου', amount: 50, date: 'πριν 3 ημέρες', icon: 'bonus' },
];

const RewardsContext = createContext<RewardsState | null>(null);

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<KPEntry[]>(SEED_HISTORY);
  const [balance, setBalance] = useState(1240);
  const [lifetimeEarned, setLifetimeEarned] = useState(1480);
  const [streak] = useState(4);

  const earn = useCallback((amount: number, label: string, icon: KPIcon = 'bonus') => {
    if (amount <= 0) return;
    setBalance((b) => b + amount);
    setLifetimeEarned((l) => l + amount);
    setHistory((prev) => [
      { id: `e${Date.now()}`, label, amount, date: 'Μόλις τώρα', icon },
      ...prev,
    ]);
  }, []);

  const spend = useCallback(
    (amount: number, label: string) => {
      if (balance < amount) return false;
      setBalance((b) => b - amount);
      setHistory((prev) => [
        { id: `x${Date.now()}`, label, amount: -amount, date: 'Μόλις τώρα', icon: 'gift' },
        ...prev,
      ]);
      return true;
    },
    [balance],
  );

  const value = useMemo<RewardsState>(
    () => ({ balance, streak, lifetimeEarned, history, earn, spend }),
    [balance, streak, lifetimeEarned, history, earn, spend],
  );

  return <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>;
}

export function useRewards() {
  const ctx = useContext(RewardsContext);
  if (!ctx) throw new Error('useRewards must be used within a RewardsProvider');
  return ctx;
}
