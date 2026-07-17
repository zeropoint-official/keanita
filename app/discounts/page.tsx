'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { View, Text, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { ScreenHeader } from '@/components/ui/screen-header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { partnerStores, storeCategories, type PartnerStore } from '@/data/mock/kids-club';

const ALL = 0;

function StoreLogo({ store, size = 56 }: { store: PartnerStore; size?: number }) {
  const maxDiscount = Math.max(...store.discounts.map((d) => d.value));
  return (
    <View style={{ width: size, height: size, borderRadius: 14, backgroundColor: '#FFF0E0', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Text style={{ ...Fonts.bodyHeavy, color: '#F5820D', fontSize: size >= 80 ? 20 : 14 }}>{maxDiscount}%</Text>
    </View>
  );
}

function StoreCard({ store, onPress }: { store: PartnerStore; onPress: () => void }) {
  const maxDiscount = Math.max(...store.discounts.map((d) => d.value));
  return (
    <AnimatedPress onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', border: '1px solid #F0F0EC', borderRadius: 18, padding: 12, marginBottom: 8 }}>
        <StoreLogo store={store} />
        <View style={{ flex: 1, marginLeft: 12, marginRight: 8, minWidth: 0 }}>
          <Text numberOfLines={1} style={{ ...Fonts.bodyHeavy, fontSize: 13.5, color: '#2D2D3A' }}>{store.name}</Text>
          <Text numberOfLines={1} style={{ ...Fonts.body, fontSize: 11, color: '#8E8E9A', marginTop: 1 }}>
            {storeCategories[store.categoryId] ?? 'Άλλο'}
            {store.discounts.length > 1 ? ` • ${store.discounts.length} προσφορές` : ''}
          </Text>
        </View>
        <View style={{ backgroundColor: '#FFF0E0', borderRadius: 999, paddingLeft: 9, paddingRight: 9, paddingTop: 4, paddingBottom: 4, marginRight: 6 }}>
          <Text style={{ ...Fonts.bodyHeavy, color: '#F5820D', fontSize: 12 }}>-{maxDiscount}%</Text>
        </View>
        <IconSymbol name="chevron.right" size={16} color="#B8B8C4" />
      </View>
    </AnimatedPress>
  );
}

function StoreDetail({ store, onBack }: { store: PartnerStore; onBack: () => void }) {
  const openUrl = (url: string) => {
    const full = url.startsWith('http') ? url : `https://${url}`;
    window.open(full, '_blank', 'noopener');
  };
  return (
    <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 24 }}>
      <AnimatedPress onPress={onBack} style={{ marginBottom: 16, alignSelf: 'flex-start' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFFFFF', paddingLeft: 12, paddingRight: 12, paddingTop: 7, paddingBottom: 7, borderRadius: 999, border: '1px solid #F0F0EC' }}>
          <IconSymbol name="chevron.left" size={14} color="#2D2D3A" />
          <Text style={{ ...Fonts.bodyBold, fontSize: 12, color: '#2D2D3A' }}>Όλα τα καταστήματα</Text>
        </View>
      </AnimatedPress>

      {/* Store identity */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <StoreLogo store={store} size={84} />
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text style={{ ...Fonts.display, fontSize: 18, color: '#2D2D3A' }}>{store.name}</Text>
          <Text style={{ ...Fonts.body, fontSize: 12, color: '#8E8E9A', marginTop: 2 }}>{storeCategories[store.categoryId] ?? 'Άλλο'}</Text>
        </View>
      </View>

      {store.description && (
        <Text style={{ ...Fonts.body, fontSize: 13, color: '#5A5A66', lineHeight: '19px', marginBottom: 16 }}>{store.description}</Text>
      )}

      <Text style={{ ...Fonts.bodyHeavy, fontSize: 11, color: '#8E8E9A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Εκπτώσεις</Text>
      {store.discounts.map((d, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF0E0', borderRadius: 16, padding: 14, marginBottom: 8 }}>
          <View style={{ backgroundColor: '#F5820D', borderRadius: 12, width: 56, height: 56, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Text style={{ ...Fonts.bodyHeavy, color: '#FFFFFF', fontSize: 18 }}>{d.value}%</Text>
            <Text style={{ ...Fonts.bodyHeavy, color: '#FFFFFF', fontSize: 8.5, letterSpacing: 0.8 }}>ΕΚΠΤΩΣΗ</Text>
          </View>
          <Text style={{ ...Fonts.bodySemiBold, flex: 1, marginLeft: 12, fontSize: 13, color: '#9B0B0E', lineHeight: '18px' }}>{d.description}</Text>
        </View>
      ))}

      {/* Membership reminder */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#E1F5FD', borderRadius: 14, padding: 12, marginTop: 4 }}>
        <IconSymbol name="creditcard.fill" size={16} color="#12AEEB" />
        <Text style={{ ...Fonts.bodySemiBold, flex: 1, fontSize: 11.5, color: '#3E7DA6', lineHeight: '16px' }}>
          Δείξε την ψηφιακή κάρτα μέλους ΚΕΑΝΙΤΑ στο ταμείο για να ισχύσει η έκπτωση.
        </Text>
      </View>

      {(store.phone || store.website) && (
        <>
          <Text style={{ ...Fonts.bodyHeavy, fontSize: 11, color: '#8E8E9A', letterSpacing: 1, textTransform: 'uppercase', marginTop: 18, marginBottom: 4 }}>Επικοινωνία</Text>
          {store.phone && (
            <AnimatedPress onPress={() => { window.location.href = `tel:${store.phone}`; }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 9, paddingBottom: 9 }}>
                <IconSymbol name="phone.fill" size={14} color="#53B41A" />
                <Text style={{ ...Fonts.bodySemiBold, fontSize: 13, color: '#2D2D3A' }}>{store.phone}</Text>
              </View>
            </AnimatedPress>
          )}
          {store.website && (
            <AnimatedPress onPress={() => openUrl(store.website!)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 9, paddingBottom: 9 }}>
                <IconSymbol name="paperplane.fill" size={14} color="#12AEEB" />
                <Text numberOfLines={2} style={{ ...Fonts.body, fontSize: 12.5, color: '#2D90DC', flex: 1 }}>{store.website}</Text>
              </View>
            </AnimatedPress>
          )}
        </>
      )}
    </View>
  );
}

export default function DiscountsScreen() {
  const [activeCat, setActiveCat] = useState<number>(ALL);
  const [selected, setSelected] = useState<PartnerStore | null>(null);

  const categories = useMemo(() => {
    const present = new Set(partnerStores.map((s) => s.categoryId));
    return [
      { id: ALL, name: 'Όλα' },
      ...Object.entries(storeCategories)
        .filter(([id]) => present.has(Number(id)))
        .map(([id, name]) => ({ id: Number(id), name })),
    ];
  }, []);

  const filtered = useMemo(() => {
    if (activeCat === ALL) return partnerStores;
    return partnerStores.filter((s) => s.categoryId === activeCat);
  }, [activeCat]);

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 110 }}>
      <ScreenHeader
        title={selected ? 'Έκπτωση συνεργάτη' : 'Λίστα εκπτώσεων'}
        subtitle={selected ? selected.name : `${partnerStores.length} καταστήματα σε όλη την Κύπρο`}
      />

      {selected ? (
        <StoreDetail store={selected} onBack={() => setSelected(null)} />
      ) : (
        <>
          {/* Category chips */}
          <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', gap: 8, paddingLeft: 20, paddingRight: 20, paddingBottom: 10, alignItems: 'center' }}>
            {categories.map((c) => {
              const isActive = c.id === activeCat;
              return (
                <AnimatedPress key={c.id} onPress={() => setActiveCat(c.id)} style={{ flexShrink: 0 }}>
                  <View style={{ backgroundColor: isActive ? '#F5820D' : '#FFFFFF', border: isActive ? 'none' : '1px solid #F0F0EC', paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, borderRadius: 999 }}>
                    <Text style={{ ...Fonts.bodyBold, color: isActive ? '#FFFFFF' : '#9B0B0E', fontSize: 12, whiteSpace: 'nowrap' }}>{c.name}</Text>
                  </View>
                </AnimatedPress>
              );
            })}
          </div>

          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            {filtered.length === 0 ? (
              <View style={{ alignItems: 'center', paddingTop: 40, paddingBottom: 40 }}>
                <Text style={{ fontSize: 32 }}>🤷‍♀️</Text>
                <Text style={{ ...Fonts.body, fontSize: 13, color: '#8E8E9A', marginTop: 6 }}>Δεν υπάρχουν καταστήματα σε αυτή την κατηγορία ακόμη.</Text>
              </View>
            ) : (
              filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index, 8) * 0.035, type: 'spring', stiffness: 120, damping: 16 }}
                >
                  <StoreCard store={item} onPress={() => setSelected(item)} />
                </motion.div>
              ))
            )}
          </View>
        </>
      )}
    </View>
  );
}
