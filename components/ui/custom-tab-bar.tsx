'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Fonts } from '@/constants/fonts';
import { IconSymbol, type IconSymbolName } from './icon-symbol';

const TABS: { href: string; icon: IconSymbolName; label: string }[] = [
  { href: '/', icon: 'house.fill', label: 'Home' },
  { href: '/events', icon: 'calendar', label: 'Events' },
  { href: '/games', icon: 'gamecontroller.fill', label: 'Games' },
  { href: '/characters', icon: 'star.fill', label: 'Characters' },
  { href: '/profile', icon: 'person.fill', label: 'Profile' },
];

export function CustomTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingTop: 8,
        paddingBottom: 20,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        boxShadow: '0 -6px 16px rgba(45, 45, 58, 0.06)',
        zIndex: 40,
      }}
    >
      {TABS.map((tab) => {
        const isFocused = pathname === tab.href;
        return (
          <motion.button
            key={tab.href}
            onClick={() => router.push(tab.href)}
            whileTap={{ scale: 0.88 }}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 8,
              paddingBottom: 4,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div
              style={{
                width: 52,
                height: 30,
                borderRadius: 15,
                backgroundColor: isFocused ? '#FFF0EE' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconSymbol name={tab.icon} size={21} color={isFocused ? '#E84D3D' : '#B8B8C4'} />
            </div>
            <span
              style={{
                ...(isFocused ? Fonts.bodyHeavy : Fonts.bodyBold),
                fontSize: 10,
                marginTop: 3,
                color: isFocused ? '#E84D3D' : '#B8B8C4',
              }}
            >
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
