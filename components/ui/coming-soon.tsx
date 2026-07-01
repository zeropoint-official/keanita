'use client';

import { useRouter } from 'next/navigation';
import { View, Text, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { IconSymbol } from './icon-symbol';

/** Temporary stub for screens not yet ported (Phase 2/3). */
export function ComingSoon({ title, tab = false }: { title: string; tab?: boolean }) {
  const router = useRouter();
  return (
    <View style={{ minHeight: '100dvh', backgroundColor: '#FAFAF7', paddingLeft: 24, paddingRight: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 24, gap: 12 }}>
        {!tab && (
          <AnimatedPress onPress={() => router.back()}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(45,45,58,0.06)' }}>
              <IconSymbol name="chevron.left" size={22} color="#2D2D3A" />
            </View>
          </AnimatedPress>
        )}
        <Text style={{ ...Fonts.display, fontSize: 24, color: '#2D2D3A' }}>{title}</Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 120, gap: 10 }}>
        <Text style={{ fontSize: 44 }}>🚧</Text>
        <Text style={{ ...Fonts.display, fontSize: 18, color: '#2D2D3A' }}>Coming soon</Text>
        <Text style={{ ...Fonts.body, fontSize: 13, color: '#8E8E9A', textAlign: 'center' }}>
          This screen is being ported from the app.
        </Text>
      </View>
    </View>
  );
}
