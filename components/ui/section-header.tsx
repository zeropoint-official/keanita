'use client';

import { View, Text, Pressable } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { IconSymbol } from './icon-symbol';

interface Props {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel = 'Δες όλα', onAction }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 28,
        marginBottom: 14,
      }}
    >
      <View>
        <Text style={{ ...Fonts.displayHeavy, fontSize: 19, color: '#2D2D3A' }}>{title}</Text>
        {/* Yellow marker swoosh under the title */}
        <View
          style={{
            width: 44,
            height: 5,
            borderRadius: 3,
            backgroundColor: '#FBD40D',
            marginTop: 1,
          }}
        />
      </View>
      {onAction && (
        <Pressable onPress={onAction}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 3,
              backgroundColor: '#FBD40D',
              paddingLeft: 11,
              paddingRight: 11,
              paddingTop: 6,
              paddingBottom: 6,
              borderRadius: 999,
            }}
          >
            <Text style={{ ...Fonts.bodyHeavy, fontSize: 12, color: '#C40408' }}>{actionLabel}</Text>
            <IconSymbol name="chevron.right" size={12} color="#C40408" />
          </View>
        </Pressable>
      )}
    </View>
  );
}
