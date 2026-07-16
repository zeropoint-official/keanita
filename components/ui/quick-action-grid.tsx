'use client';

import { useRouter } from 'next/navigation';
import { View, Text, AnimatedPress, LinearGradient } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { IconSymbol, type IconSymbolName } from './icon-symbol';

const GAP = 10;
const TILE_H = 96;

interface QuickAction {
  label: string;
  icon: IconSymbolName;
  /** Solid coin + ghost icon color */
  tint: string;
  /** Darker shade for the label */
  deep: string;
  /** Pastel gradient background */
  gradient: [string, string];
  href: string;
}

// Only destinations that are NOT already in the tab bar.
// Candy tiles: pastel gradient + white sticker border + tilted icon coin
// + an oversized ghost icon peeking from the corner.
const actions: QuickAction[] = [
  {
    label: 'Ανταμοιβές',
    icon: 'trophy.fill',
    tint: '#E60C10',
    deep: '#C40408',
    gradient: ['#FFEFED', '#FFD8D4'],
    href: '/rewards',
  },
  {
    label: 'Δώρα',
    icon: 'gift.fill',
    tint: '#F5820D',
    deep: '#D96A00',
    gradient: ['#FFF4E5', '#FFE1BD'],
    href: '/gifts',
  },
  {
    label: 'Εκπτώσεις',
    icon: 'percent',
    tint: '#9C2BB4',
    deep: '#7E2094',
    gradient: ['#F9EEFC', '#EDD5F5'],
    href: '/discounts',
  },
  {
    label: 'Προϊόντα',
    icon: 'leaf.fill',
    tint: '#53B41A',
    deep: '#3D8F0F',
    gradient: ['#EFF9E6', '#D9F0C4'],
    href: '/products',
  },
  {
    label: 'Δραστηριότητες',
    icon: 'paintbrush.fill',
    tint: '#F14E9B',
    deep: '#D13580',
    gradient: ['#FEF1F7', '#FBD7E9'],
    href: '/activities',
  },
  {
    label: 'Η ιστορία μας',
    icon: 'sparkles',
    tint: '#12AEEB',
    deep: '#0B7FBF',
    gradient: ['#EAF7FE', '#CFECFB'],
    href: '/about',
  },
];

function ActionTile({ action }: { action: QuickAction }) {
  const router = useRouter();
  return (
    <AnimatedPress style={{ flex: 1 }} onPress={() => router.push(action.href)}>
      <View
        style={{
          height: TILE_H,
          borderRadius: 24,
          border: '2.5px solid #FFFFFF',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: action.gradient[0],
          boxShadow: `0 5px 10px ${action.tint}40`,
        }}
      >
        <LinearGradient
          colors={action.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* Oversized ghost icon peeking from the corner */}
        <View
          style={{
            position: 'absolute',
            bottom: -14,
            right: -10,
            opacity: 0.16,
            transform: 'rotate(12deg)',
          }}
        >
          <IconSymbol name={action.icon} size={64} color={action.tint} />
        </View>

        {/* Icon coin + label */}
        <View
          style={{
            flex: 1,
            padding: 12,
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 15,
              backgroundColor: action.tint,
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #FFFFFF',
              transform: 'rotate(-6deg)',
              boxShadow: `0 3px 5px ${action.deep}4D`,
            }}
          >
            <IconSymbol name={action.icon} size={19} color="#FFFFFF" />
          </View>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.bodyHeavy, fontSize: 13.5, color: action.deep }}
          >
            {action.label}
          </Text>
        </View>
      </View>
    </AnimatedPress>
  );
}

export function QuickActionGrid() {
  const rows = [actions.slice(0, 2), actions.slice(2, 4), actions.slice(4)];
  return (
    <View style={{ paddingLeft: 20, paddingRight: 20, gap: GAP }}>
      {rows.map((row, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: GAP }}>
          {row.map((action) => (
            <ActionTile key={action.label} action={action} />
          ))}
        </View>
      ))}
    </View>
  );
}
