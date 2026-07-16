'use client';

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { View, Text, Img, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { events, type KeanitaEvent } from '@/data/mock/events';
import { IconSymbol } from './icon-symbol';

const H_PADDING = 20;
const CARD_GAP = 14;
// Card fills the frame width minus side padding, leaving the next card peeking.
const CARD_WIDTH = 'calc(min(100vw, 430px) - 76px)';
const MEDIA_H = 150;
const PAGE_BG = '#FFF8EB'; // must match the home screen background (ticket notches)

const TYPE_META: Record<KeanitaEvent['type'], { label: string; emoji: string }> = {
  event: { label: 'Εκδήλωση', emoji: '🎈' },
  announcement: { label: 'Νέα', emoji: '📣' },
  seminar: { label: 'Σεμινάριο', emoji: '🎓' },
};

type Filter = 'all' | KeanitaEvent['type'];

const FILTERS: { key: Filter; label: string; color: string }[] = [
  { key: 'all', label: 'Όλα', color: '#E60C10' },
  { key: 'event', label: 'Εκδηλώσεις', color: '#F5820D' },
  { key: 'seminar', label: 'Σεμινάρια', color: '#53B41A' },
  { key: 'announcement', label: 'Νέα', color: '#12AEEB' },
];

function dateParts(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: `${d.getDate()}`,
    month: d.toLocaleString('el', { month: 'short' }).toUpperCase().replace('.', ''),
  };
}

function TicketCard({ item, index }: { item: KeanitaEvent; index: number }) {
  const router = useRouter();
  const meta = TYPE_META[item.type];
  const { day, month } = dateParts(item.date);
  // Scattered-polaroid tilt: off-center tickets rest slightly rotated,
  // alternating direction.
  const restTilt = index % 2 === 0 ? 2.5 : -2.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: index * 0.07 }}
      style={{
        width: CARD_WIDTH,
        marginRight: CARD_GAP,
        flexShrink: 0,
        scrollSnapAlign: 'start',
        transform: `rotate(${restTilt}deg)`,
      }}
    >
      <AnimatedPress onPress={() => router.push(`/event/${item.id}`)}>
        <View
          style={{
            backgroundColor: item.bgColor,
            borderRadius: 26,
            border: '2.5px solid #FFFFFF',
            padding: 8,
            paddingBottom: 14,
            position: 'relative',
            boxShadow: `0 8px 16px ${item.accentColor}47`,
          }}
        >
          {/* Poster window */}
          <View
            style={{
              borderRadius: 19,
              overflow: 'hidden',
              height: MEDIA_H,
              backgroundColor: item.bgColor,
              position: 'relative',
            }}
          >
            <Img
              src={item.image}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              contentPosition="center"
            />

            {/* Type flag */}
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                backgroundColor: item.accentColor,
                borderRadius: 999,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                border: '1.5px solid #FFFFFF',
              }}
            >
              <Text style={{ fontSize: 10 }}>{meta.emoji}</Text>
              <Text style={{ ...Fonts.bodyHeavy, fontSize: 10.5, color: '#FFFFFF' }}>
                {meta.label}
              </Text>
            </View>
          </View>

          {/* Date stamp overlapping the poster edge */}
          <View
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 54,
              height: 54,
              borderRadius: 27,
              backgroundColor: item.accentColor,
              border: '2.5px solid #FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(8deg)',
              boxShadow: '0 3px 6px rgba(45,45,58,0.15)',
            }}
          >
            <Text style={{ ...Fonts.displayHeavy, fontSize: 19, color: '#FFFFFF', lineHeight: '22px' }}>
              {day}
            </Text>
            <Text
              style={{
                ...Fonts.bodyHeavy,
                fontSize: 8.5,
                letterSpacing: 0.5,
                color: '#FFFFFF',
                marginTop: -2,
              }}
            >
              {month}
            </Text>
          </View>

          {/* Floating type emoji */}
          <Text style={{ position: 'absolute', top: 14, left: 16, fontSize: 22 }}>{meta.emoji}</Text>

          {/* Ticket tear line with side notches */}
          <View style={{ height: 20, justifyContent: 'center', position: 'relative' }}>
            <View
              style={{
                marginLeft: 8,
                marginRight: 8,
                borderTop: `1.5px dashed ${item.accentColor}`,
                opacity: 0.4,
              }}
            />
            <View
              style={{
                position: 'absolute',
                left: -16,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: PAGE_BG,
              }}
            />
            <View
              style={{
                position: 'absolute',
                right: -16,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: PAGE_BG,
              }}
            />
          </View>

          {/* Ticket stub: title + details */}
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Text numberOfLines={1} style={{ ...Fonts.display, fontSize: 17, color: '#2D2D3A' }}>
              {item.title}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, flexShrink: 1, minWidth: 0 }}>
                <IconSymbol name="mappin.and.ellipse" size={12} color={item.accentColor} />
                <Text numberOfLines={1} style={{ ...Fonts.bodyBold, fontSize: 11.5, color: '#8E8E9A' }}>
                  {item.location}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <IconSymbol name="clock.fill" size={11} color={item.accentColor} />
                <Text style={{ ...Fonts.bodyBold, fontSize: 11.5, color: '#8E8E9A' }}>{item.time}</Text>
              </View>
            </View>
          </View>
        </View>
      </AnimatedPress>
    </motion.div>
  );
}

/**
 * "Coming up" as a book of tickets: perforated ticket cards that rest like
 * scattered polaroids, with a rotating date stamp, floating type emoji and
 * filters that re-deal the tickets with a staggered entrance.
 */
export function UpcomingCarousel() {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<Filter>('all');
  const scrollerRef = useRef<HTMLDivElement>(null);

  const upcoming = useMemo(() => {
    const sorted = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    return filter === 'all' ? sorted : sorted.filter((e) => e.type === filter);
  }, [filter]);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return;
    const step = first.offsetWidth + CARD_GAP;
    setActive(Math.round(el.scrollLeft / step));
  };

  const selectFilter = (next: Filter) => {
    if (next === filter) return;
    setFilter(next);
    setActive(0);
    scrollerRef.current?.scrollTo({ left: 0 });
  };

  return (
    <View>
      {/* Type filter chips */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          gap: 8,
          paddingLeft: H_PADDING,
          paddingRight: H_PADDING,
          paddingBottom: 12,
        }}
      >
        {FILTERS.map((f) => {
          const selected = filter === f.key;
          return (
            <AnimatedPress key={f.key} onPress={() => selectFilter(f.key)} style={{ flexShrink: 0 }}>
              <View
                style={{
                  backgroundColor: selected ? f.color : '#FFFFFF',
                  borderRadius: 999,
                  border: `1.5px solid ${selected ? f.color : '#F0E4CE'}`,
                  paddingLeft: 14,
                  paddingRight: 14,
                  paddingTop: 7,
                  paddingBottom: 7,
                  transform: selected ? 'rotate(-2deg)' : 'rotate(0deg)',
                }}
              >
                <Text
                  style={{
                    ...Fonts.bodyHeavy,
                    fontSize: 12,
                    color: selected ? '#FFFFFF' : '#8E8E9A',
                  }}
                >
                  {f.label}
                </Text>
              </View>
            </AnimatedPress>
          );
        })}
      </div>

      {/* key={filter} re-deals the tickets so the entrance stagger replays */}
      <div
        key={filter}
        ref={scrollerRef}
        onScroll={onScroll}
        className="no-scrollbar"
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingLeft: H_PADDING,
          paddingRight: H_PADDING,
          paddingTop: 6,
          paddingBottom: 6,
        }}
      >
        {upcoming.map((item, index) => (
          <TicketCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* Accent-colored pagination */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12, gap: 6 }}>
        {upcoming.map((e, i) => (
          <View
            key={e.id}
            style={{
              width: i === active ? 22 : 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: e.accentColor,
              opacity: i === active ? 1 : 0.35,
              transition: 'width 0.2s',
            }}
          />
        ))}
      </View>
    </View>
  );
}
