'use client';

import { View, Text } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { ScreenHeader } from '@/components/ui/screen-header';
import { termsBlocks } from '@/data/legal';

export default function TermsScreen() {
  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 96 }}>
      <ScreenHeader title="Terms & Conditions" />

      <View style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 4 }}>
        {termsBlocks.map((b, i) => {
          if (b.t === 'h') {
            return (
              <Text
                key={i}
                style={{ ...Fonts.bodyHeavy, fontSize: 15, color: '#2D2D3A', marginTop: i === 0 ? 0 : 20, marginBottom: 6 }}
              >
                {b.x}
              </Text>
            );
          }
          if (b.t === 'li') {
            return (
              <View key={i} style={{ flexDirection: 'row', marginTop: 6, paddingLeft: 4 }}>
                <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: '#E84D3D', marginTop: 8, marginRight: 10, flexShrink: 0 }} />
                <Text style={{ ...Fonts.body, fontSize: 13.5, color: '#5A5A66', lineHeight: '21px', flex: 1 }}>{b.x}</Text>
              </View>
            );
          }
          return (
            <Text key={i} style={{ ...Fonts.body, fontSize: 13.5, color: '#5A5A66', lineHeight: '21px', marginTop: 10 }}>
              {b.x}
            </Text>
          );
        })}
      </View>
    </View>
  );
}
