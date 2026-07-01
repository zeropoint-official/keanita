'use client';

import { usePathname } from 'next/navigation';
import { RewardsProvider } from '@/contexts/rewards';
import { CustomTabBar } from '@/components/ui/custom-tab-bar';

const TAB_ROUTES = ['/', '/events', '/games', '/characters', '/profile'];

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showTabBar = TAB_ROUTES.includes(pathname);

  return (
    <RewardsProvider>
      {children}
      {showTabBar && <CustomTabBar />}
    </RewardsProvider>
  );
}
