'use client';

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, Img, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { events, type KeanitaEvent } from '@/data/mock/events';
import { IconSymbol } from './icon-symbol';

const H_PADDING = 20;
const CARD_GAP = 12;
// Card fills the frame width minus side padding, leaving the next card peeking.
const CARD_WIDTH = 'calc(min(100vw, 430px) - 76px)';

const TYPE_LABEL: Record<KeanitaEvent['type'], string> = {
  event: 'Event',
  announcement: 'News',
  seminar: 'Seminar',
};

function formatDateChip(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getDate()} ${d.toLocaleString('en', { month: 'short' }).toUpperCase()}`;
}

function UpcomingCard({ item }: { item: KeanitaEvent }) {
  const router = useRouter();
  return (
    <AnimatedPress
      onPress={() => router.push(`/event/${item.id}`)}
      style={{ width: CARD_WIDTH, marginRight: CARD_GAP, flexShrink: 0, scrollSnapAlign: 'start' }}
    >
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 28,
          padding: 8,
          paddingBottom: 16,
          boxShadow: '0 6px 16px rgba(45,45,58,0.06)',
        }}
      >
        {/* Inset media */}
        <View style={{ borderRadius: 21, overflow: 'hidden', height: 150, backgroundColor: item.bgColor, position: 'relative' }}>
          <Img src={item.image} style={{ width: '100%', height: '100%' }} contentFit="cover" contentPosition="center" />
          <View
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: 'rgba(255,255,255,0.95)',
              borderRadius: 999,
              paddingLeft: 11,
              paddingRight: 11,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <Text style={{ ...Fonts.bodyHeavy, fontSize: 11, color: item.accentColor }}>
              {formatDateChip(item.date)}
            </Text>
          </View>
        </View>

        {/* Content below the image */}
        <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 12 }}>
          <Text style={{ ...Fonts.bodyHeavy, fontSize: 10, letterSpacing: 1.2, color: item.accentColor, textTransform: 'uppercase' }}>
            {TYPE_LABEL[item.type]}
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.display, fontSize: 17, color: '#2D2D3A', marginTop: 2 }}>
            {item.title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, flexShrink: 1, minWidth: 0 }}>
              <IconSymbol name="mappin.and.ellipse" size={12} color="#B8B8C4" />
              <Text numberOfLines={1} style={{ ...Fonts.bodyBold, fontSize: 11.5, color: '#8E8E9A' }}>
                {item.location}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <IconSymbol name="clock.fill" size={11} color="#B8B8C4" />
              <Text style={{ ...Fonts.bodyBold, fontSize: 11.5, color: '#8E8E9A' }}>{item.time}</Text>
            </View>
          </View>
        </View>
      </View>
    </AnimatedPress>
  );
}

export function UpcomingCarousel() {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const upcoming = useMemo(
    () => [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [],
  );

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return;
    const step = first.offsetWidth + CARD_GAP;
    setActive(Math.round(el.scrollLeft / step));
  };

  return (
    <View>
      <div
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
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        {upcoming.map((item) => (
          <UpcomingCard key={item.id} item={item} />
        ))}
      </div>

      {/* Dots */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12, gap: 5 }}>
        {upcoming.map((e, i) => (
          <View
            key={e.id}
            style={{
              width: i === active ? 18 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === active ? '#E84D3D' : '#E5E5E0',
              transition: 'width 0.2s',
            }}
          />
        ))}
      </View>
    </View>
  );
}
