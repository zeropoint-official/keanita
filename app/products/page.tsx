'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { View, Text, Img, Pressable, LinearGradient, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { AppHeader } from '@/components/ui/app-header';
import { products, type Product } from '@/data/mock/products';

const FILTERS = ['All', 'Juices', 'Yogurt'] as const;
type Filter = (typeof FILTERS)[number];

function FilterChip({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ marginRight: 8, flexShrink: 0 }}>
      <View style={{ paddingLeft: 18, paddingRight: 18, paddingTop: 9, paddingBottom: 9, borderRadius: 14, backgroundColor: isActive ? '#2D2D3A' : '#FFFFFF', border: isActive ? 'none' : '1px solid #F0F0EC' }}>
        <Text style={{ ...Fonts.bodySemiBold, fontSize: 14, color: isActive ? '#FFFFFF' : '#8E8E9A' }}>{label}</Text>
      </View>
    </Pressable>
  );
}

function ProductTile({ product, index }: { product: Product; index: number }) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 120, damping: 16 }}
      style={{ flex: 1, marginBottom: 12, display: 'flex' }}
    >
      <AnimatedPress onPress={() => router.push(`/product/${product.id}`)} style={{ flex: 1 }}>
        <View style={{ backgroundColor: product.bgColor, borderRadius: 24, padding: 16 }}>
          <View style={{ alignSelf: 'flex-start', borderRadius: 999, paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4, backgroundColor: product.accentColor + '22' }}>
            <Text style={{ ...Fonts.bodyHeavy, fontSize: 9, textTransform: 'capitalize', letterSpacing: 1, color: product.accentColor }}>{product.category}</Text>
          </View>
          <Img src={product.image} style={{ width: '100%', height: 130, marginTop: 6 }} contentFit="contain" />
          <Text numberOfLines={1} style={{ ...Fonts.bodyBold, fontSize: 14, color: '#2D2D3A', marginTop: 8 }}>{product.name}</Text>
          <Text numberOfLines={2} style={{ ...Fonts.body, fontSize: 11, color: '#8E8E9A', marginTop: 2 }}>{product.tagline}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, borderRadius: 12, paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6, backgroundColor: 'rgba(255,255,255,0.65)' }}>
            <Text style={{ ...Fonts.bodySemiBold, fontSize: 10, color: '#B8B8C4' }}>Energy</Text>
            <Text style={{ ...Fonts.bodyHeavy, fontSize: 11, color: product.accentColor }}>{product.nutrition[0]?.value.split(' / ')[1] ?? '—'}</Text>
          </View>
        </View>
      </AnimatedPress>
    </motion.div>
  );
}

export default function ProductsScreen() {
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return products;
    if (filter === 'Juices') return products.filter((p) => p.category === 'juice');
    return products.filter((p) => p.category === 'yogurt');
  }, [filter]);

  const rows: Product[][] = [];
  for (let i = 0; i < filtered.length; i += 2) rows.push(filtered.slice(i, i + 2));

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 96 }}>
      {/* Hero */}
      <LinearGradient colors={['#F5A623', '#FBBF24']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <AppHeader transparent tint="light" title="Products" showBrand={false} />
        <View style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 28, paddingTop: 4 }}>
          <Text style={{ ...Fonts.displayHeavy, color: '#FFFFFF', fontSize: 24 }}>Our Products</Text>
          <Text style={{ ...Fonts.bodySemiBold, color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4, lineHeight: '20px' }}>
            Tasty juices and creamy yogurts — made with love for kids.
          </Text>
        </View>
      </LinearGradient>

      {/* Filters */}
      <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16 }}>
        {FILTERS.map((f) => (
          <FilterChip key={f} label={f} isActive={filter === f} onPress={() => setFilter(f)} />
        ))}
      </div>

      {/* Grid */}
      <View style={{ paddingLeft: 24, paddingRight: 24 }}>
        {rows.map((row, rIdx) => (
          <View key={rIdx} style={{ flexDirection: 'row', gap: 12 }}>
            {row.map((p, cIdx) => (
              <ProductTile key={p.id} product={p} index={rIdx * 2 + cIdx} />
            ))}
            {row.length === 1 ? <View style={{ flex: 1 }} /> : null}
          </View>
        ))}
        {filtered.length === 0 ? (
          <View style={{ alignItems: 'center', paddingTop: 64, paddingBottom: 64 }}>
            <Text style={{ ...Fonts.body, color: '#B8B8C4', fontSize: 14 }}>No products in this category.</Text>
          </View>
        ) : null}
      </View>

      {/* Why Keanita strip */}
      <View style={{ marginLeft: 24, marginRight: 24, marginTop: 12 }}>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, boxShadow: '0 2px 12px rgba(45,45,58,0.06)' }}>
          <Text style={{ ...Fonts.bodyBold, fontSize: 16, color: '#2D2D3A' }}>Why Keanita?</Text>
          <Text style={{ ...Fonts.body, fontSize: 12, color: '#8E8E9A', marginTop: 4, lineHeight: '20px' }}>
            20% real juice, extra Vitamin C, no preservatives — designed for active kids and approved by parents.
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
            {['20% Juice', 'Vitamin C', 'No Additives'].map((tag) => (
              <View key={tag} style={{ borderRadius: 999, paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6, backgroundColor: '#FFF6E8' }}>
                <Text style={{ ...Fonts.bodyBold, fontSize: 10, color: '#F5A623' }}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
