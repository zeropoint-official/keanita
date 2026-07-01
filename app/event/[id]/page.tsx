'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { View, Text, Img, LinearGradient } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { ScreenHeader } from '@/components/ui/screen-header';
import { PrimaryButton } from '@/components/ui/primary-button';
import { EmptyState } from '@/components/ui/empty-state';
import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { useRewards } from '@/contexts/rewards';
import { events } from '@/data/mock/events';

const HIGHLIGHTS = [
  { emoji: '🎨', label: 'Fun creative workshops' },
  { emoji: '🍓', label: 'Healthy Keanita snacks' },
  { emoji: '🏅', label: 'Earn KP & win prizes' },
];

function formatLongDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long' });
}

export default function EventDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const { earn } = useRewards();
  const [rsvped, setRsvped] = useState(false);

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh' }}>
        <ScreenHeader title="Event" />
        <EmptyState emoji="📅" title="Event not found" />
      </View>
    );
  }

  const handleRsvp = () => {
    if (rsvped) return;
    setRsvped(true);
    earn(10, `RSVP — ${event.title}`, 'event');
  };

  const infoRows: { icon: IconSymbolName; label: string; value: string }[] = [
    { icon: 'calendar', label: 'Date', value: formatLongDate(event.date) },
    { icon: 'clock.fill', label: 'Time', value: event.time },
    { icon: 'mappin.and.ellipse', label: 'Location', value: event.location },
  ];

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh' }}>
      <View style={{ paddingBottom: 40 }}>
        {/* Hero image */}
        <View style={{ height: 280, position: 'relative' }}>
          <Img src={event.image} style={{ width: '100%', height: '100%' }} contentFit="cover" />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 40%, rgba(0,0,0,0.25))' }} />
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            <ScreenHeader title="" tint="#FFFFFF" transparent />
          </View>
        </View>

        {/* Card overlapping hero */}
        <View style={{ backgroundColor: '#FAFAF7', borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -28, paddingLeft: 24, paddingRight: 24, paddingTop: 24 }}>
          <View style={{ alignSelf: 'flex-start', borderRadius: 999, paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4, backgroundColor: event.accentColor }}>
            <Text style={{ ...Fonts.bodyBold, fontSize: 10, color: '#FFFFFF', textTransform: 'capitalize' }}>{event.type}</Text>
          </View>
          <Text style={{ ...Fonts.displayHeavy, fontSize: 24, color: '#2D2D3A', marginTop: 10 }}>{event.title}</Text>

          {/* RSVP reward hint */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Text style={{ fontSize: 13 }}>⭐</Text>
            <Text style={{ ...Fonts.bodyBold, fontSize: 12, color: '#F5A623', marginLeft: 4 }}>Earn 10 KP for RSVP-ing</Text>
          </View>

          {/* Info card */}
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, marginTop: 16, overflow: 'hidden', boxShadow: '0 2px 10px rgba(45,45,58,0.05)' }}>
            {infoRows.map((row, i) => (
              <View
                key={row.label}
                style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, borderBottom: i < infoRows.length - 1 ? '1px solid #F0F0EC' : 'none' }}
              >
                <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: event.bgColor, alignItems: 'center', justifyContent: 'center' }}>
                  <IconSymbol name={row.icon} size={17} color={event.accentColor} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ ...Fonts.body, fontSize: 11, color: '#B8B8C4' }}>{row.label}</Text>
                  <Text style={{ ...Fonts.bodySemiBold, fontSize: 14, color: '#2D2D3A', marginTop: 2 }}>{row.value}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* About */}
          <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginTop: 24, marginBottom: 8 }}>About this event</Text>
          <Text style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', lineHeight: '24px' }}>{event.description}</Text>

          {/* Highlights */}
          <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginTop: 24, marginBottom: 12 }}>What to expect</Text>
          {HIGHLIGHTS.map((h, i) => (
            <motion.div key={h.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, type: 'spring', stiffness: 120, damping: 16 }}>
              <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', boxShadow: '0 1px 6px rgba(45,45,58,0.04)' }}>
                <Text style={{ fontSize: 24 }}>{h.emoji}</Text>
                <Text style={{ ...Fonts.body, fontSize: 14, color: '#2D2D3A', marginLeft: 12 }}>{h.label}</Text>
              </View>
            </motion.div>
          ))}
        </View>
      </View>

      {/* Bottom CTA */}
      <View style={{ position: 'sticky', bottom: 0, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 16, backgroundColor: '#FAFAF7', borderTop: '1px solid #F0F0EC' }}>
        {rsvped ? (
          <View style={{ borderRadius: 16, paddingTop: 14, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEFBEE' }}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#6BBF6A" />
            <Text style={{ ...Fonts.bodyBold, fontSize: 14, color: '#6BBF6A', marginLeft: 8 }}>You&apos;re going! +10 KP earned</Text>
          </View>
        ) : (
          <PrimaryButton label="RSVP to this event" icon="checkmark" color={event.accentColor} onPress={handleRsvp} />
        )}
      </View>
    </View>
  );
}
