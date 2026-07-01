'use client';

import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, Img, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { NavDrawer } from './nav-drawer';

interface Props {
  greeting?: string;
  title?: string;
  right?: ReactNode;
  transparent?: boolean;
  tint?: 'dark' | 'light';
  showBrand?: boolean;
}

export function AppHeader({
  greeting,
  title = 'KEANITA',
  right,
  transparent = false,
  tint = 'dark',
  showBrand = true,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const titleColor = tint === 'light' ? '#FFFFFF' : '#2D2D3A';
  const mutedColor = tint === 'light' ? 'rgba(255,255,255,0.75)' : '#8E8E9A';
  const burgerColor = tint === 'light' ? '#FFFFFF' : '#2D2D3A';
  const burgerBg = tint === 'light' ? 'rgba(255,255,255,0.18)' : '#FFFFFF';

  return (
    <>
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 14,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: transparent ? 'transparent' : '#FAFAF7',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Burger */}
        <AnimatedPress onPress={() => setOpen(true)} accessibilityLabel="Open menu">
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: burgerBg,
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: transparent ? 'none' : '0 1px 6px rgba(45,45,58,0.05)',
            }}
          >
            <View style={{ width: 18, gap: 4 }}>
              <View style={{ height: 2, borderRadius: 2, backgroundColor: burgerColor }} />
              <View style={{ height: 2, borderRadius: 2, backgroundColor: burgerColor, width: 13 }} />
              <View style={{ height: 2, borderRadius: 2, backgroundColor: burgerColor }} />
            </View>
          </View>
        </AnimatedPress>

        {/* Brand block */}
        {showBrand ? (
          <AnimatedPress onPress={() => router.push('/')} style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Img src="/images/brand/logo.png" style={{ width: 34, height: 30 }} contentFit="contain" />
              <View>
                {greeting ? <Text style={{ ...Fonts.body, color: mutedColor, fontSize: 10 }}>{greeting}</Text> : null}
                <Text style={{ ...Fonts.displayHeavy, color: titleColor, fontSize: 16 }}>{title}</Text>
              </View>
            </View>
          </AnimatedPress>
        ) : (
          <View style={{ flex: 1 }} />
        )}

        {/* Right slot */}
        <View style={{ minWidth: 44, alignItems: 'flex-end' }}>{right}</View>
      </View>

      <NavDrawer visible={open} onClose={() => setOpen(false)} />
    </>
  );
}
