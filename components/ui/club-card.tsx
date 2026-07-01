'use client';

import { useRouter } from 'next/navigation';
import { View, Text, Img, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { useRewards } from '@/contexts/rewards';
import { IconSymbol } from './icon-symbol';

/**
 * The one statement piece on the homepage: a flat red club card holding
 * the KP balance, streak and membership CTA.
 */
export function ClubCard() {
  const router = useRouter();
  const { balance, streak } = useRewards();

  return (
    <AnimatedPress
      onPress={() => router.push('/kids-club')}
      accessibilityLabel="Open Kids Club membership"
      style={{ marginLeft: 20, marginRight: 20 }}
    >
      <View
        style={{
          backgroundColor: '#E84D3D',
          borderRadius: 28,
          padding: 22,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 10px 20px rgba(232,77,61,0.25)',
        }}
      >
        {/* Soft decorative circles for depth */}
        <View
          style={{
            position: 'absolute',
            top: -70,
            right: -50,
            width: 190,
            height: 190,
            borderRadius: 95,
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: -90,
            left: -40,
            width: 170,
            height: 170,
            borderRadius: 85,
            backgroundColor: 'rgba(255,255,255,0.06)',
          }}
        />

        {/* Eyebrow row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ ...Fonts.bodyHeavy, fontSize: 11, letterSpacing: 1.5, color: 'rgba(255,255,255,0.75)' }}>
            KIDS CLUB CARD
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: 'rgba(255,255,255,0.16)',
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 999,
            }}
          >
            <Text style={{ fontSize: 11 }}>🔥</Text>
            <Text style={{ ...Fonts.bodyHeavy, fontSize: 11.5, color: '#FFFFFF' }}>{streak}-day streak</Text>
          </View>
        </View>

        {/* Balance + character */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
              <Text style={{ ...Fonts.displayHeavy, fontSize: 42, color: '#FFFFFF', lineHeight: '50px' }}>
                {balance.toLocaleString()}
              </Text>
              <Text style={{ ...Fonts.display, fontSize: 18, color: 'rgba(255,255,255,0.85)' }}>KP</Text>
            </View>
            <Text style={{ ...Fonts.bodySemiBold, fontSize: 12.5, color: 'rgba(255,255,255,0.8)', marginTop: -2 }}>
              Keanita Points to spend on gifts
            </Text>
          </View>

          <Img
            src="/images/characters/character-1.png"
            style={{ width: 92, height: 92 }}
            contentFit="contain"
          />
        </View>

        {/* Actions */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 10 }}>
          <AnimatedPress onPress={() => router.push('/gifts')} style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 999,
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 8,
                paddingRight: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                overflow: 'hidden',
              }}
            >
              <IconSymbol name="gift.fill" size={14} color="#E84D3D" />
              <Text numberOfLines={1} style={{ ...Fonts.bodyHeavy, fontSize: 12.5, color: '#E84D3D' }}>
                Spend points
              </Text>
            </View>
          </AnimatedPress>

          <View
            style={{
              flex: 1.15,
              borderRadius: 999,
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 8,
              paddingRight: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              border: '1.5px solid rgba(255,255,255,0.45)',
              overflow: 'hidden',
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.bodyHeavy, fontSize: 12.5, color: '#FFFFFF' }}>
              Become a member
            </Text>
            <IconSymbol name="arrow.right" size={13} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </AnimatedPress>
  );
}
