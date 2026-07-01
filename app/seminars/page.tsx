'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { View, Text, LinearGradient } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { AppHeader } from '@/components/ui/app-header';
import { EventCard } from '@/components/ui/event-card';
import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { events } from '@/data/mock/events';

interface Topic {
  icon: IconSymbolName;
  color: string;
  bg: string;
  title: string;
  body: string;
}

const TOPICS: Topic[] = [
  { icon: 'leaf.fill', color: '#6BBF6A', bg: '#EEFBEE', title: 'Healthy nutrition', body: 'Hands-on workshops on balanced eating, real-fruit treats and active kids habits.' },
  { icon: 'sparkles', color: '#F5A623', bg: '#FFF6E8', title: 'Creative play', body: 'Cooking, painting and farm activities — for curious kids ages 5–11.' },
  { icon: 'person.2.fill', color: '#5DADE2', bg: '#EDF7FD', title: 'For parents too', body: 'Open sessions with experts on raising kind, energetic and confident kids.' },
];

export default function SeminarsScreen() {
  const router = useRouter();
  const seminars = events.filter((e) => e.type === 'seminar');
  const otherEvents = events.filter((e) => e.type === 'event').slice(0, 2);

  const stats = [
    { value: seminars.length.toString(), label: 'Upcoming', color: '#6BBF6A' },
    { value: '3', label: 'Themes', color: '#5DADE2' },
    { value: '12+', label: 'Cities', color: '#F5A623' },
  ];

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 96 }}>
      {/* Hero */}
      <LinearGradient colors={['#6BBF6A', '#5DADE2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}>
        <AppHeader transparent tint="light" title="Seminars" showBrand={false} />
        <View style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 40, paddingTop: 4 }}>
          <View style={{ alignSelf: 'flex-start', borderRadius: 999, paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4, marginBottom: 12, backgroundColor: 'rgba(255,255,255,0.22)' }}>
            <Text style={{ ...Fonts.bodyBold, color: '#FFFFFF', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>Learn · Grow · Play</Text>
          </View>
          <Text style={{ ...Fonts.displayHeavy, color: '#FFFFFF', fontSize: 28, lineHeight: '34px' }}>Seminars &amp; events for the whole family</Text>
          <Text style={{ ...Fonts.bodySemiBold, color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 12, lineHeight: '20px' }}>
            Hands-on workshops, fun days and open talks — all the good stuff in one place.
          </Text>
        </View>
      </LinearGradient>

      {/* Stats card */}
      <View style={{ marginLeft: 24, marginRight: 24, marginTop: -28, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, flexDirection: 'row', alignItems: 'center', boxShadow: '0 6px 16px rgba(45,45,58,0.08)' }}>
        {stats.map((s, i) => (
          <View key={s.label} style={{ flex: 1, alignItems: 'center', borderLeft: i > 0 ? '1px solid #F0F0EC' : 'none' }}>
            <Text style={{ ...Fonts.displayHeavy, fontSize: 20, color: s.color }}>{s.value}</Text>
            <Text style={{ ...Fonts.bodySemiBold, fontSize: 10, color: '#B8B8C4', marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Topics */}
      <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginLeft: 24, marginRight: 24, marginTop: 28, marginBottom: 12 }}>What we cover</Text>
      <View style={{ marginLeft: 24, marginRight: 24 }}>
        {TOPICS.map((t, i) => (
          <motion.div key={t.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, type: 'spring', stiffness: 120, damping: 16 }}>
            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', boxShadow: '0 1px 8px rgba(45,45,58,0.05)' }}>
              <View style={{ width: 46, height: 46, borderRadius: 15, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' }}>
                <IconSymbol name={t.icon} size={22} color={t.color} />
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={{ ...Fonts.bodyBold, fontSize: 16, color: '#2D2D3A' }}>{t.title}</Text>
                <Text style={{ ...Fonts.body, fontSize: 12, color: '#8E8E9A', marginTop: 2, lineHeight: '16px' }}>{t.body}</Text>
              </View>
            </View>
          </motion.div>
        ))}
      </View>

      {/* Upcoming seminars */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 24, marginRight: 24, marginTop: 28, marginBottom: 12 }}>
        <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A' }}>Upcoming seminars</Text>
        <Text style={{ ...Fonts.bodySemiBold, fontSize: 12, color: '#6BBF6A' }}>See all</Text>
      </View>

      {seminars.length === 0 ? (
        <View style={{ marginLeft: 24, marginRight: 24, alignItems: 'center', paddingTop: 40, paddingBottom: 40, backgroundColor: '#FFFFFF', borderRadius: 16 }}>
          <Text style={{ ...Fonts.body, fontSize: 14, color: '#B8B8C4' }}>No seminars scheduled — check back soon!</Text>
        </View>
      ) : (
        seminars.map((event) => <EventCard key={event.id} event={event} variant="full" onPress={() => router.push(`/event/${event.id}`)} />)
      )}

      {/* Other events */}
      {otherEvents.length > 0 && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 24, marginRight: 24, marginTop: 16, marginBottom: 12 }}>
            <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A' }}>You might also like</Text>
            <Text onClick={() => router.push('/events')} style={{ ...Fonts.bodySemiBold, fontSize: 12, color: '#F5A623', cursor: 'pointer' }}>All events</Text>
          </View>
          {otherEvents.map((event) => <EventCard key={event.id} event={event} variant="full" onPress={() => router.push(`/event/${event.id}`)} />)}
        </>
      )}

      {/* Newsletter card */}
      <View style={{ marginLeft: 24, marginRight: 24, marginTop: 12 }}>
        <LinearGradient colors={['#9B7FD4', '#5DADE2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 26, padding: 20 }}>
          <Text style={{ ...Fonts.displayHeavy, color: '#FFFFFF', fontSize: 16 }}>Don&apos;t miss the next one</Text>
          <Text style={{ ...Fonts.bodySemiBold, color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 4, lineHeight: '20px' }}>
            Subscribe to our newsletter and we&apos;ll send you updates about seminars and events.
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <View style={{ borderRadius: 12, paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, backgroundColor: 'rgba(255,255,255,0.9)' }}>
              <Text style={{ ...Fonts.bodyHeavy, fontSize: 12, color: '#5D3FA8' }}>Subscribe →</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
