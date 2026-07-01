'use client';

import { View, Text, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';

interface Props {
  amount: number;
  onPress?: () => void;
  tone?: 'light' | 'solid';
  size?: 'sm' | 'md';
}

/** A small badge showing a Keanita Points balance with a coin glyph. */
export function KpPill({ amount, onPress, tone = 'solid', size = 'md' }: Props) {
  const isLight = tone === 'light';
  const isSm = size === 'sm';

  return (
    <AnimatedPress onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingTop: isSm ? 5 : 7,
          paddingBottom: isSm ? 5 : 7,
          paddingLeft: isSm ? 9 : 11,
          paddingRight: isSm ? 9 : 11,
          borderRadius: 999,
          backgroundColor: isLight ? 'rgba(255,255,255,0.22)' : '#FFFFFF',
          boxShadow: isLight ? 'none' : '0 3px 8px rgba(45,45,58,0.06)',
        }}
      >
        <View
          style={{
            width: isSm ? 16 : 20,
            height: isSm ? 16 : 20,
            borderRadius: 999,
            backgroundColor: '#FBBF24',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isSm ? 9 : 11,
          }}
        >
          <Text style={{ fontSize: isSm ? 9 : 11 }}>⭐</Text>
        </View>
        <Text style={{ ...Fonts.bodyHeavy, color: isLight ? '#FFFFFF' : '#2D2D3A', fontSize: isSm ? 12 : 14 }}>
          {amount.toLocaleString()}
        </Text>
        <Text style={{ ...Fonts.bodyHeavy, color: isLight ? 'rgba(255,255,255,0.8)' : '#B8860B', fontSize: isSm ? 9 : 10 }}>
          KP
        </Text>
      </View>
    </AnimatedPress>
  );
}
