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
      <AnimatedPress onPress={call} accessibilityLabel="Κλήση στη γραμμή έκτακτης ανάγκης του club">
        {/* White "sticker" panel with the dashed red border from the posters */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 22,
            border: '2px dashed #E60C10',
            paddingTop: 13,
            paddingBottom: 13,
            paddingLeft: 15,
            paddingRight: 15,
            boxShadow: '0 5px 12px rgba(230,12,16,0.14)',
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#E60C10',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconSymbol name="phone.fill" size={22} color="#FFFFFF" />
          </View>

          <View style={{ marginLeft: 14, flex: 1 }}>
            <Text style={{ ...Fonts.bodyHeavy, fontSize: 15, color: '#D90408' }}>
              Κλήση έκτακτης ανάγκης
            </Text>
            <Text style={{ ...Fonts.bodyBold, fontSize: 11.5, color: '#8E8E9A', marginTop: 1 }}>
              Πάτα για άμεση επικοινωνία με το club
            </Text>
          </View>

          <IconSymbol name="chevron.right" size={20} color="#E60C10" />
        </View>
      </AnimatedPress>
    </View>
  );
}
