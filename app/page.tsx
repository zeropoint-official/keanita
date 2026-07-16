'use client';

import { useRouter } from 'next/navigation';
import { View, Text, Img } from '@/lib/rn';
import { ClubCard } from '@/components/ui/club-card';
import { EmergencyCallButton } from '@/components/ui/emergency-call-button';
import { HomeHeader } from '@/components/ui/home-header';
import { HomeHeroBackdrop } from '@/components/ui/home-hero-backdrop';
import { JuiceCarousel } from '@/components/ui/juice-carousel';
import { QuickActionGrid } from '@/components/ui/quick-action-grid';
import { SectionHeader } from '@/components/ui/section-header';
import { UpcomingCarousel } from '@/components/ui/upcoming-carousel';
import { Fonts } from '@/constants/fonts';

const TRUST_CHIPS = [
  { emoji: '🍊', label: '20% φυσικός χυμός', tint: '#F5820D', border: '#FFE1C4' },
  { emoji: '✨', label: 'Έξτρα βιταμίνη C', tint: '#12AEEB', border: '#C9EDFC' },
  { emoji: '🌿', label: 'Χωρίς πρόσθετα', tint: '#53B41A', border: '#D8F0C6' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ backgroundColor: '#FFF8EB', paddingBottom: 110, position: 'relative' }}>
      {/* Red sunburst zone behind the header + club card */}
      <HomeHeroBackdrop />

      {/* Greeting + menu + bell */}
      <HomeHeader />

      {/* Hero: one statement card — balance, streak, membership */}
      <View style={{ marginTop: 18, position: 'relative' }}>
        <ClubCard />
      </View>

      {/* Quick links to places the tab bar doesn't cover */}
      <View style={{ marginTop: 16 }}>
        <QuickActionGrid />
      </View>

      {/* Always-visible way for grown-ups to reach the club fast */}
      <View style={{ marginTop: 14 }}>
        <EmergencyCallButton />
      </View>

      {/* Events, announcements & seminars in one date-sorted rail */}
      <SectionHeader title="Έρχονται σύντομα" onAction={() => router.push('/events')} />
      <UpcomingCarousel />

      {/* Drinks showcase — big animated flavor carousel */}
      <SectionHeader title="Τα ροφήματά μας" onAction={() => router.push('/products')} />
      <JuiceCarousel />

      {/* Trust chips */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 8,
          marginTop: 16,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {TRUST_CHIPS.map((chip) => (
          <View
            key={chip.label}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              backgroundColor: '#FFFFFF',
              borderRadius: 999,
              border: `1.5px solid ${chip.border}`,
              paddingLeft: 6,
              paddingRight: 6,
              paddingTop: 8,
              paddingBottom: 8,
            }}
          >
            <Text style={{ fontSize: 10 }}>{chip.emoji}</Text>
            <Text numberOfLines={1} style={{ ...Fonts.bodyHeavy, fontSize: 10.5, color: chip.tint, flexShrink: 1 }}>
              {chip.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Soft brand sign-off — characters in a white sticker frame */}
      <View
        style={{
          marginTop: 28,
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 24,
          border: '3px solid #FFFFFF',
          overflow: 'hidden',
          boxShadow: '0 6px 14px rgba(45,45,58,0.08)',
        }}
      >
        <Img
          src="/images/brand/characters-scene.png"
          style={{ width: '100%', height: 96 }}
          contentFit="cover"
          contentPosition="center"
        />
      </View>
      <Text style={{ ...Fonts.bodyBold, fontSize: 11, color: '#C9A97C', textAlign: 'center', marginTop: 12 }}>
        Φτιαγμένο με ❤️ για τα παιδιά και τους μεγάλους τους
      </Text>
    </View>
  );
}
