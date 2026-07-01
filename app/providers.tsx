'use client';

import { usePathname } from 'next/navigation';
import { RewardsProvider } from '@/contexts/rewards';
import { CustomTabBar } from '@/components/ui/custom-tab-bar';

// The bottom dock shows on every screen except the pre-login entry.
const HIDE_TAB_BAR = ['/login'];

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showTabBar = !HIDE_TAB_BAR.includes(pathname);

  return (
    <RewardsProvider>
      {children}
      {showTabBar && <CustomTabBar />}
    </RewardsProvider>
  );
}
