'use client';

import { useRouter } from 'next/navigation';
import { View, Text, Img } from '@/lib/rn';
import { ClubCard } from '@/components/ui/club-card';
import { EmergencyCallButton } from '@/components/ui/emergency-call-button';
import { HomeHeader } from '@/components/ui/home-header';
import { ProductCard } from '@/components/ui/product-card';
import { QuickActionGrid } from '@/components/ui/quick-action-grid';
import { SectionHeader } from '@/components/ui/section-header';
import { UpcomingCarousel } from '@/components/ui/upcoming-carousel';
import { Fonts } from '@/constants/fonts';
import { products } from '@/data/mock/products';

const TRUST_CHIPS = [
  { emoji: '🍊', label: '20% real juice' },
  { emoji: '✨', label: 'Extra Vitamin C' },
  { emoji: '🌿', label: 'No additives' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ backgroundColor: '#FAFAF7', paddingBottom: 110 }}>
      {/* Greeting + menu + bell */}
      <HomeHeader />

      {/* Hero: one statement card — balance, streak, membership */}
      <View style={{ marginTop: 18 }}>
        <ClubCard />
      </View>

      {/* Quick links to places the tab bar doesn't cover */}
      <View style={{ marginTop: 14 }}>
        <QuickActionGrid />
      </View>

      {/* Always-visible way for grown-ups to reach the club fast */}
      <View style={{ marginTop: 14 }}>
        <EmergencyCallButton />
      </View>

      {/* Events, announcements & seminars in one date-sorted rail */}
      <SectionHeader title="Coming up" onAction={() => router.push('/events')} />
      <UpcomingCarousel />

      {/* Drinks rail */}
      <SectionHeader title="Our drinks" onAction={() => router.push('/products')} />
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          paddingLeft: 20,
          paddingRight: 20,
          gap: 12,
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            width={150}
            onPress={() => router.push(`/product/${product.id}`)}
          />
        ))}
      </div>

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
              paddingLeft: 6,
              paddingRight: 6,
              paddingTop: 8,
              paddingBottom: 8,
            }}
          >
            <Text style={{ fontSize: 10 }}>{chip.emoji}</Text>
            <Text numberOfLines={1} style={{ ...Fonts.bodyBold, fontSize: 10.5, color: '#8E8E9A' }}>
              {chip.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Soft brand sign-off */}
      <View style={{ marginTop: 28, marginLeft: 20, marginRight: 20, borderRadius: 24, overflow: 'hidden' }}>
        <Img
          src="/images/brand/characters-scene.png"
          style={{ width: '100%', height: 96 }}
          contentFit="cover"
          contentPosition="center"
        />
      </View>
      <Text style={{ ...Fonts.bodyBold, fontSize: 11, color: '#B8B8C4', textAlign: 'center', marginTop: 12 }}>
        Made with ❤️ for kids & their grown-ups
      </Text>
    </View>
  );
}
