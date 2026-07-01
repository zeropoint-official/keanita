'use client';

import { useState } from 'react';
import { View, Text, Img, LinearGradient, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { ScreenHeader } from '@/components/ui/screen-header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BenefitsModal } from '@/components/ui/kids-club/benefits-modal';
import { DiscountsModal } from '@/components/ui/kids-club/discounts-modal';
import { JoinModal } from '@/components/ui/kids-club/join-modal';
import { CharacterModal } from '@/components/ui/kids-club/character-modal';
import { characters, type Character } from '@/data/mock/characters';

type ActiveModal = 'benefits' | 'discounts' | 'join' | null;

const ACTIONS: { key: 'benefits' | 'discounts' | 'join'; label: string; caption: string; image: string; bgColor: string; color: string }[] = [
  { key: 'benefits', label: 'Benefits', caption: 'What you get', image: '/images/club/benefits.png', bgColor: '#FFF0EE', color: '#E84D3D' },
  { key: 'discounts', label: 'Discounts', caption: '40+ stores', image: '/images/club/discounts.png', bgColor: '#E8F6FB', color: '#5DADE2' },
  { key: 'join', label: 'Join now', caption: '2 quick steps', image: '/images/club/register.png', bgColor: '#FFF6E8', color: '#F5A623' },
];

export default function KidsClubScreen() {
  const [modal, setModal] = useState<ActiveModal>(null);
  const [activeChar, setActiveChar] = useState<Character | null>(null);

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 96 }}>
      <ScreenHeader title="Kids Club" />

      {/* Hero banner */}
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 4 }}>
        <LinearGradient
          colors={['#E84D3D', '#C8392B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 28, padding: 22, overflow: 'hidden', minHeight: 168, justifyContent: 'space-between', position: 'relative' }}
        >
          <View style={{ position: 'absolute', right: -20, bottom: -24, opacity: 0.95 }}>
            <Img src="/images/characters/character-1.png" style={{ width: 180, height: 180 }} contentFit="contain" />
          </View>

          <View style={{ backgroundColor: 'rgba(255,255,255,0.22)', paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4, borderRadius: 999, alignSelf: 'flex-start' }}>
            <Text style={{ ...Fonts.bodyHeavy, color: '#FFFFFF', fontSize: 10, letterSpacing: 1.2 }}>KEANITO KIDS CLUB</Text>
          </View>

          <View style={{ marginTop: 12, maxWidth: '62%' }}>
            <Text style={{ ...Fonts.displayHeavy, color: '#FFFFFF', fontSize: 22, lineHeight: '26px' }}>The fun side of growing up.</Text>
            <Text style={{ ...Fonts.body, color: 'rgba(255,255,255,0.92)', fontSize: 12.5, marginTop: 6, lineHeight: '17px' }}>
              Gifts, discounts and events for the whole family.
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* 3 action tiles */}
      <View style={{ flexDirection: 'row', gap: 10, marginLeft: 20, marginRight: 20, marginTop: 14 }}>
        {ACTIONS.map((a) => (
          <View key={a.key} style={{ flex: 1 }}>
            <AnimatedPress onPress={() => setModal(a.key)}>
              <View style={{ backgroundColor: a.bgColor, borderRadius: 20, paddingTop: 10, paddingBottom: 12, paddingLeft: 8, paddingRight: 8, alignItems: 'center', overflow: 'hidden' }}>
                <Img src={a.image} style={{ width: 64, height: 64 }} contentFit="contain" />
                <Text style={{ color: a.color, fontSize: 13, marginTop: 6, ...Fonts.displayHeavy }}>{a.label}</Text>
                <Text numberOfLines={1} style={{ color: '#8E8E9A', fontSize: 10.5, marginTop: 1, ...Fonts.bodySemiBold }}>{a.caption}</Text>
              </View>
            </AnimatedPress>
          </View>
        ))}
      </View>

      {/* Characters section */}
      <View style={{ marginTop: 26, paddingLeft: 20, paddingRight: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <View>
            <Text style={{ ...Fonts.displayHeavy, fontSize: 16, color: '#2D2D3A' }}>Meet the family</Text>
            <Text style={{ ...Fonts.body, fontSize: 11.5, color: '#8E8E9A', marginTop: 1 }}>Tap a character to learn their story</Text>
          </View>
          <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFF0EE', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 14 }}>✨</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: -5, marginRight: -5 }}>
          {characters.map((c) => (
            <View key={c.id} style={{ width: '50%', paddingLeft: 5, paddingRight: 5, marginBottom: 10 }}>
              <AnimatedPress onPress={() => setActiveChar(c)}>
                <View style={{ backgroundColor: c.bgColor, borderRadius: 22, paddingTop: 14, paddingBottom: 14, paddingLeft: 8, paddingRight: 8, alignItems: 'center', overflow: 'hidden' }}>
                  <Img src={c.image} style={{ width: 96, height: 96 }} contentFit="contain" />
                  <Text style={{ color: c.accentColor, fontSize: 14, marginTop: 8, letterSpacing: 0.5, ...Fonts.displayHeavy }}>{c.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 6, backgroundColor: '#FFFFFF', paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4, borderRadius: 999 }}>
                    <Text style={{ fontSize: 10.5, color: c.accentColor, ...Fonts.bodyHeavy }}>Details</Text>
                    <IconSymbol name="arrow.right" size={11} color={c.accentColor} />
                  </View>
                </View>
              </AnimatedPress>
            </View>
          ))}
        </View>
      </View>

      {/* Footer CTA */}
      <AnimatedPress onPress={() => setModal('join')} style={{ marginLeft: 20, marginRight: 20, marginTop: 22 }}>
        <LinearGradient
          colors={['#E84D3D', '#F5A623']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 18, paddingTop: 15, paddingBottom: 15, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 15, letterSpacing: 0.4, ...Fonts.displayHeavy }}>Sign up your child</Text>
          <IconSymbol name="arrow.right" size={16} color="#FFFFFF" />
        </LinearGradient>
      </AnimatedPress>

      {/* Sub-modals */}
      <BenefitsModal visible={modal === 'benefits'} onClose={() => setModal(null)} />
      <DiscountsModal visible={modal === 'discounts'} onClose={() => setModal(null)} />
      <JoinModal visible={modal === 'join'} onClose={() => setModal(null)} />
      <CharacterModal character={activeChar} onClose={() => setActiveChar(null)} />
    </View>
  );
}
