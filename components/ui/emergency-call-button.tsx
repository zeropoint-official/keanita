'use client';

import { View, Text, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { IconSymbol } from './icon-symbol';

// Club emergency line — swap for the real number before release.
const EMERGENCY_NUMBER = '+35722123456';

export function EmergencyCallButton() {
  function call() {
    window.location.href = `tel:${EMERGENCY_NUMBER}`;
  }

  return (
    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
      <AnimatedPress onPress={call} accessibilityLabel="Call the club emergency line">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#E84D3D',
            borderRadius: 22,
            paddingTop: 14,
            paddingBottom: 14,
            paddingLeft: 16,
            paddingRight: 16,
            boxShadow: '0 6px 14px rgba(232,77,61,0.28)',
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'rgba(255,255,255,0.22)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconSymbol name="phone.fill" size={22} color="#FFFFFF" />
          </View>

          <View style={{ marginLeft: 14, flex: 1 }}>
            <Text style={{ ...Fonts.bodyBold, fontSize: 15, color: '#FFFFFF' }}>Emergency Call</Text>
            <Text style={{ ...Fonts.bodyBold, fontSize: 11.5, color: 'rgba(255,255,255,0.85)', marginTop: 1 }}>
              Tap to reach the club instantly
            </Text>
          </View>

          <IconSymbol name="chevron.right" size={20} color="rgba(255,255,255,0.9)" />
        </View>
      </AnimatedPress>
    </View>
  );
}
