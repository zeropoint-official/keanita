'use client';

import { useRouter } from 'next/navigation';
import { View, Text, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { IconSymbol, type IconSymbolName } from './icon-symbol';

interface QuickAction {
  label: string;
  icon: IconSymbolName;
  tint: string;
  bg: string;
  href: string;
}

// Only destinations that are NOT already in the tab bar.
const actions: QuickAction[] = [
  { label: 'Rewards', icon: 'trophy.fill', tint: '#E84D3D', bg: '#FFF0EE', href: '/rewards' },
  { label: 'Gifts', icon: 'gift.fill', tint: '#F5A623', bg: '#FFF6E8', href: '/gifts' },
  { label: 'Products', icon: 'leaf.fill', tint: '#6BBF6A', bg: '#EEFBEE', href: '/products' },
  { label: 'Our Story', icon: 'sparkles', tint: '#5DADE2', bg: '#EDF7FD', href: '/about' },
];

function ActionTile({ action }: { action: QuickAction }) {
  const router = useRouter();
  return (
    <AnimatedPress style={{ flex: 1 }} onPress={() => router.push(action.href)}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 22,
          alignItems: 'center',
          paddingTop: 14,
          paddingBottom: 14,
          boxShadow: '0 4px 12px rgba(45,45,58,0.05)',
        }}
      >
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: action.bg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconSymbol name={action.icon} size={19} color={action.tint} />
        </View>
        <Text style={{ ...Fonts.bodyBold, fontSize: 11.5, color: '#2D2D3A', marginTop: 8 }}>
          {action.label}
        </Text>
      </View>
    </AnimatedPress>
  );
}

export function QuickActionGrid() {
  return (
    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, gap: 10 }}>
      {actions.map((action) => (
        <ActionTile key={action.label} action={action} />
      ))}
    </View>
  );
}
