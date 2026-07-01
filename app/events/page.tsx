'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { View, Text, Pressable, LinearGradient } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { EventCard } from '@/components/ui/event-card';
import { events } from '@/data/mock/events';

const FILTERS = ['All', 'Events', 'Seminars', 'Announcements'] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_COLORS: Record<Filter, { active: string; bg: string }> = {
  All: { active: '#E84D3D', bg: '#FFF0EE' },
  Events: { active: '#F5A623', bg: '#FFF6E8' },
  Seminars: { active: '#6BBF6A', bg: '#EEFBEE' },
  Announcements: { active: '#5DADE2', bg: '#EDF7FD' },
};

function FilterChip({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) {
  const colors = FILTER_COLORS[label as Filter];
  return (
    <Pressable onPress={onPress} style={{ marginRight: 8, flexShrink: 0 }}>
      <View
        style={{
          paddingLeft: 18,
          paddingRight: 18,
          paddingTop: 9,
          paddingBottom: 9,
          borderRadius: 14,
          backgroundColor: isActive ? colors.active : '#FFFFFF',
          border: isActive ? 'none' : '1px solid #F0F0EC',
        }}
      >
        <Text style={{ ...Fonts.body, fontSize: 14, color: isActive ? '#FFFFFF' : '#8E8E9A' }}>{label}</Text>
      </View>
    </Pressable>
  );
}

export default function EventsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filtered = events.filter((e) => {
    if (activeFilter === 'All') return true;
    return e.type === activeFilter.toLowerCase().slice(0, -1);
  });

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 110 }}>
      {/* Colored header */}
      <LinearGradient
        colors={['#F5A623', '#FBBF24']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 32, paddingBottom: 28, paddingLeft: 24, paddingRight: 24, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
      >
        <Text style={{ ...Fonts.displayHeavy, color: '#FFFFFF', fontSize: 24 }}>Upcoming Events</Text>
        <Text style={{ ...Fonts.body, color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 4 }}>
          Discover fun activities near you
        </Text>
      </LinearGradient>

      {/* Filters */}
      <div
        className="no-scrollbar"
        style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16 }}
      >
        {FILTERS.map((f) => (
          <FilterChip key={f} label={f} isActive={activeFilter === f} onPress={() => setActiveFilter(f)} />
        ))}
      </div>

      {/* Event list */}
      {filtered.map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 120, damping: 16 }}
        >
          <EventCard event={event} variant="full" onPress={() => router.push(`/event/${event.id}`)} />
        </motion.div>
      ))}

      {filtered.length === 0 && (
        <View style={{ alignItems: 'center', paddingTop: 80, paddingBottom: 80 }}>
          <Text style={{ ...Fonts.body, color: '#B8B8C4', fontSize: 14 }}>No events found</Text>
        </View>
      )}
    </View>
  );
}
