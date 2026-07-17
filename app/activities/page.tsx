'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { View, Text, Img, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { ScreenHeader } from '@/components/ui/screen-header';
import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { onlinePuzzles, downloadActivities, type DownloadableItem } from '@/data/mock/activities';

const CARD_W = 'calc((min(100vw, 430px) - 52px) / 2)';

const TABS: { key: 'puzzles' | 'activities'; label: string; icon: IconSymbolName; tint: string }[] = [
  { key: 'puzzles', label: 'Online Puzzles', icon: 'puzzlepiece.fill', tint: '#F14E9B' },
  { key: 'activities', label: 'Δραστηριότητες', icon: 'paintbrush.fill', tint: '#12AEEB' },
];
type TabKey = (typeof TABS)[number]['key'];

function ItemCard({ item, tint, onPress }: { item: DownloadableItem; tint: string; onPress: () => void }) {
  return (
    <AnimatedPress onPress={onPress} style={{ width: CARD_W, marginBottom: 12 }}>
      <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, overflow: 'hidden', border: '1px solid #F0F0EC' }}>
        <View style={{ backgroundColor: '#F7F7F3', position: 'relative' }}>
          <Img src={item.image} style={{ width: '100%', aspectRatio: '1 / 1.15' }} contentFit="cover" contentPosition="top" />
          <View
            style={{
              position: 'absolute',
              right: 8,
              bottom: 8,
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: tint,
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(45,45,58,0.2)',
            }}
          >
            <IconSymbol name="arrow.down.circle.fill" size={17} color="#FFFFFF" />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          {item.category ? (
            <Text numberOfLines={1} style={{ ...Fonts.bodyHeavy, fontSize: 9, color: tint, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 2 }}>
              {item.category}
            </Text>
          ) : null}
          <Text numberOfLines={2} style={{ ...Fonts.bodyBold, fontSize: 12.5, color: '#2D2D3A' }}>{item.title}</Text>
        </View>
      </View>
    </AnimatedPress>
  );
}

export default function ActivitiesScreen() {
  const [tab, setTab] = useState<TabKey>('puzzles');

  const active = TABS.find((t) => t.key === tab)!;
  const items = tab === 'puzzles' ? onlinePuzzles : downloadActivities;

  const openPdf = (item: DownloadableItem) => {
    window.open(item.pdfUrl, '_blank', 'noopener');
  };

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 110 }}>
      <ScreenHeader title="Puzzles & Δραστηριότητες" subtitle="Κατέβασε, τύπωσε και διασκέδασε" />

      {/* Tabs */}
      <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, gap: 8, marginBottom: 12 }}>
        {TABS.map((t) => {
          const isActive = t.key === tab;
          return (
            <AnimatedPress key={t.key} style={{ flex: 1 }} onPress={() => setTab(t.key)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 14,
                  backgroundColor: isActive ? t.tint : '#FFFFFF',
                  border: isActive ? 'none' : '1px solid #F0F0EC',
                }}
              >
                <IconSymbol name={t.icon} size={15} color={isActive ? '#FFFFFF' : '#8E8E9A'} />
                <Text style={{ ...Fonts.bodyBold, fontSize: 12.5, color: isActive ? '#FFFFFF' : '#8E8E9A' }}>{t.label}</Text>
              </View>
            </AnimatedPress>
          );
        })}
      </View>

      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Text style={{ ...Fonts.body, fontSize: 12, color: '#8E8E9A', lineHeight: '17px', marginBottom: 12 }}>
          {tab === 'puzzles'
            ? 'Ζωγραφιές, γρίφοι και λαβύρινθοι με τους ήρωες ΚΕΑΝΙΤΑ. Πάτα μία κάρτα για να ανοίξεις το PDF.'
            : 'Φύλλα δραστηριοτήτων και κατασκευές DIY για εκτύπωση. Πάτα μία κάρτα για να ανοίξεις το PDF.'}
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {items.map((item, i) => (
            <motion.div
              key={`${tab}-${item.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i, 6) * 0.045, type: 'spring', stiffness: 120, damping: 16 }}
            >
              <ItemCard item={item} tint={active.tint} onPress={() => openPdf(item)} />
            </motion.div>
          ))}
        </View>
      </View>
    </View>
  );
}
