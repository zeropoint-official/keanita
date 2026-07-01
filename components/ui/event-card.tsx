'use client';

import { View, Text, Img, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import type { KeanitaEvent } from '@/data/mock/events';

interface Props {
  event: KeanitaEvent;
  onPress?: () => void;
  variant?: 'compact' | 'full';
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.getDate().toString(),
    month: d.toLocaleString('en', { month: 'short' }).toUpperCase(),
  };
}

export function EventCard({ event, onPress, variant = 'compact' }: Props) {
  const { day, month } = formatDate(event.date);

  if (variant === 'full') {
    return (
      <AnimatedPress onPress={onPress} style={{ marginLeft: 24, marginRight: 24, marginBottom: 16 }}>
        <View
          style={{
            borderRadius: 24,
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 16px rgba(45,45,58,0.08)',
          }}
        >
          {/* Event image */}
          <View style={{ height: 160, position: 'relative' }}>
            <Img src={event.image} style={{ width: '100%', height: '100%' }} contentFit="cover" />
            {/* Date badge */}
            <View
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 56,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              <Text style={{ ...Fonts.displayHeavy, color: event.accentColor, fontSize: 18, lineHeight: '20px' }}>{day}</Text>
              <Text style={{ ...Fonts.bodySemiBold, color: event.accentColor, fontSize: 10, opacity: 0.7 }}>{month}</Text>
            </View>
            {/* Type badge */}
            <View
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                borderRadius: 999,
                backgroundColor: event.accentColor,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <Text style={{ ...Fonts.bodyHeavy, color: '#FFFFFF', fontSize: 10, textTransform: 'capitalize' }}>{event.type}</Text>
            </View>
          </View>

          {/* Info */}
          <View style={{ padding: 16 }}>
            <Text style={{ ...Fonts.bodyBold, fontSize: 16, color: '#2D2D3A' }}>{event.title}</Text>
            <Text numberOfLines={2} style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', marginTop: 4 }}>{event.description}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: event.accentColor }} />
                <Text style={{ ...Fonts.body, fontSize: 12, color: '#8E8E9A' }}>{event.location}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: event.accentColor }} />
                <Text style={{ ...Fonts.body, fontSize: 12, color: '#8E8E9A' }}>{event.time}</Text>
              </View>
            </View>
          </View>
        </View>
      </AnimatedPress>
    );
  }

  // Compact — horizontal card with image
  return (
    <AnimatedPress onPress={onPress} style={{ marginRight: 12, width: 220, flexShrink: 0 }}>
      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          height: 180,
          boxShadow: '0 2px 8px rgba(45,45,58,0.06)',
        }}
      >
        <View style={{ height: 100, position: 'relative' }}>
          <Img src={event.image} style={{ width: '100%', height: '100%' }} contentFit="cover" />
          <View
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 44,
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            <Text style={{ ...Fonts.displayHeavy, color: event.accentColor, fontSize: 14, lineHeight: '16px' }}>{day}</Text>
            <Text style={{ ...Fonts.bodySemiBold, color: event.accentColor, fontSize: 8, opacity: 0.7 }}>{month}</Text>
          </View>
        </View>
        <View style={{ padding: 12, flex: 1, justifyContent: 'space-between' }}>
          <Text numberOfLines={1} style={{ ...Fonts.bodyBold, fontSize: 14, color: '#2D2D3A' }}>{event.title}</Text>
          <Text style={{ ...Fonts.body, fontSize: 12, color: '#B8B8C4' }}>{event.location}</Text>
        </View>
      </View>
    </AnimatedPress>
  );
}
