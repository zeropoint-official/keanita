'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { IconSymbol } from './icon-symbol';

interface Props {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  tint?: string;
  transparent?: boolean;
  style?: CSSProperties;
}

export function ScreenHeader({ title, subtitle, right, tint = '#2D2D3A', transparent = false, style }: Props) {
  const router = useRouter();
  const muted = tint === '#FFFFFF' ? 'rgba(255,255,255,0.7)' : '#8E8E9A';
  const circleBg = tint === '#FFFFFF' ? 'rgba(255,255,255,0.2)' : '#FFFFFF';

  return (
    <View
      style={{
        paddingTop: 20,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: transparent ? 'transparent' : '#FAFAF7',
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }}
    >
      <AnimatedPress onPress={() => router.back()}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 13,
            backgroundColor: circleBg,
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: transparent ? 'none' : '0 1px 6px rgba(45,45,58,0.06)',
          }}
        >
          <IconSymbol name="chevron.left" size={20} color={tint} />
        </View>
      </AnimatedPress>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text numberOfLines={1} style={{ ...Fonts.bodyBold, color: tint, fontSize: 18 }}>
          {title}
        </Text>
        {subtitle ? (
          <Text numberOfLines={1} style={{ ...Fonts.body, color: muted, fontSize: 12 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {right ? <View style={{ marginLeft: 8 }}>{right}</View> : null}
    </View>
  );
}
