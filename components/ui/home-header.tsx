'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, Img, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { IconSymbol } from './icon-symbol';
import { NavDrawer } from './nav-drawer';

function greetingForNow() {
  const h = new Date().getHours();
  if (h < 12) return 'Καλημέρα ☀️';
  if (h < 18) return 'Καλό απόγευμα 👋';
  return 'Καλησπέρα 🌙';
}

/**
 * Minimal home header: mascot avatar (opens the menu), greeting, bell.
 * Sits over the red hero backdrop, so the greeting is yellow and the
 * title is white.
 */
export function HomeHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  // Compute the time-of-day greeting on the client only, to avoid an
  // SSR/client hydration mismatch when the server clock differs.
  const [greeting, setGreeting] = useState('Καλώς ήρθες 👋');
  useEffect(() => setGreeting(greetingForNow()), []);

  return (
    <>
      <View
        style={{
          paddingTop: 24,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 4,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* Mascot avatar — opens the full menu */}
        <AnimatedPress onPress={() => setMenuOpen(true)} accessibilityLabel="Άνοιγμα μενού">
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(45,45,58,0.07)',
            }}
          >
            <Img
              src="/images/brand/mascot.png"
              style={{ width: 36, height: 36, borderRadius: 18 }}
              contentFit="cover"
            />
          </View>
        </AnimatedPress>

        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ ...Fonts.bodyHeavy, fontSize: 12, color: '#FFD84D' }}>
            {greeting}
          </Text>
          <Text style={{ ...Fonts.display, fontSize: 20, color: '#FFFFFF', marginTop: -2 }}>
            Keanita Kids Club
          </Text>
        </View>

        {/* Bell */}
        <AnimatedPress onPress={() => router.push('/notifications')} accessibilityLabel="Ειδοποιήσεις">
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 4px 10px rgba(45,45,58,0.07)',
            }}
          >
            <IconSymbol name="bell.fill" size={20} color="#2D2D3A" />
            <View
              style={{
                position: 'absolute',
                top: 12,
                right: 13,
                width: 9,
                height: 9,
                borderRadius: 5,
                backgroundColor: '#E60C10',
                border: '2px solid #FFFFFF',
              }}
            />
          </View>
        </AnimatedPress>
      </View>

      <NavDrawer visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
