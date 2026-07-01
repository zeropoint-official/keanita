'use client';

import { View, Text } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';

interface Props {
  emoji?: string;
  title: string;
  message?: string;
}

export function EmptyState({ emoji = '🍃', title, message }: Props) {
  return (
    <View style={{ alignItems: 'center', paddingLeft: 40, paddingRight: 40, paddingTop: 64, paddingBottom: 64 }}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 28,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 38,
          boxShadow: '0 2px 10px rgba(45,45,58,0.05)',
        }}
      >
        <Text style={{ fontSize: 38 }}>{emoji}</Text>
      </View>
      <Text style={{ ...Fonts.bodyBold, fontSize: 16, color: '#2D2D3A', marginTop: 16, textAlign: 'center' }}>{title}</Text>
      {message ? (
        <Text style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', marginTop: 4, textAlign: 'center', lineHeight: '20px' }}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}
