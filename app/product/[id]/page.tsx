'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { View, Text, Img, LinearGradient, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { ScreenHeader } from '@/components/ui/screen-header';
import { PrimaryButton } from '@/components/ui/primary-button';
import { EmptyState } from '@/components/ui/empty-state';
import { products } from '@/data/mock/products';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh' }}>
        <ScreenHeader title="Product" />
        <EmptyState emoji="🧃" title="Product not found" />
      </View>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const facts = [
    { emoji: '👶', title: 'Made for kids', body: 'A wholesome treat designed for ages 1–12.' },
    { emoji: '🥤', title: 'Just the right size', body: '200ml carton — perfect for lunchboxes.' },
    { emoji: '♻️', title: 'Recyclable pack', body: 'The carton is fully recyclable.' },
  ];

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh' }}>
      <View style={{ paddingBottom: 40 }}>
        {/* Hero */}
        <View style={{ backgroundColor: product.bgColor, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}>
          <ScreenHeader title="" transparent />
          <View style={{ alignItems: 'center', paddingBottom: 32, paddingTop: 4 }}>
            <Img src={product.image} style={{ width: 170, height: 220 }} contentFit="contain" />
          </View>
        </View>

        {/* Title */}
        <View style={{ paddingLeft: 24, paddingRight: 24, marginTop: 20 }}>
          <View style={{ alignSelf: 'flex-start', borderRadius: 999, paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4, backgroundColor: product.accentColor + '22' }}>
            <Text style={{ ...Fonts.bodyBold, fontSize: 10, textTransform: 'capitalize', color: product.accentColor }}>{product.category}</Text>
          </View>
          <Text style={{ ...Fonts.displayHeavy, fontSize: 24, color: '#2D2D3A', marginTop: 8 }}>{product.name}</Text>
          <Text style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', marginTop: 4, lineHeight: '20px' }}>{product.tagline}</Text>
          <Text style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', marginTop: 12, lineHeight: '20px' }}>{product.description}</Text>
        </View>

        {/* Highlights */}
        <View style={{ marginLeft: 24, marginRight: 24, marginTop: 20, flexDirection: 'row', borderRadius: 16, overflow: 'hidden', backgroundColor: '#FFFFFF', boxShadow: '0 1px 8px rgba(45,45,58,0.04)' }}>
          {product.highlights.map((h) => (
            <View key={h} style={{ flex: 1, alignItems: 'center', paddingTop: 12, paddingBottom: 12, paddingLeft: 4, paddingRight: 4 }}>
              <View style={{ width: 32, height: 32, borderRadius: 11, backgroundColor: product.accentColor + '22', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
                <Text style={{ color: product.accentColor, fontSize: 14, fontWeight: 800 }}>✓</Text>
              </View>
              <Text style={{ ...Fonts.body, fontSize: 10, color: '#8E8E9A', textAlign: 'center', lineHeight: '12px' }}>{h}</Text>
            </View>
          ))}
        </View>

        {/* Nutrition Facts */}
        <View style={{ marginLeft: 24, marginRight: 24, marginTop: 28 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A' }}>Nutrition Facts</Text>
            <Text style={{ ...Fonts.body, fontSize: 11, color: '#B8B8C4' }}>{product.servingSize}</Text>
          </View>
          <LinearGradient colors={[product.accentColor, product.accentColor + 'CC']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 22, padding: 4 }}>
            <View style={{ borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.08)', paddingTop: 6, paddingBottom: 6 }}>
              {product.nutrition.map((row, i) => (
                <View key={row.label} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 18, paddingRight: 18, paddingTop: 10, paddingBottom: 10, backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.14)' }}>
                  <Text numberOfLines={1} style={{ ...Fonts.body, color: '#FFFFFF', fontSize: 14, flex: 1 }}>{row.label}</Text>
                  <Text style={{ ...Fonts.bodyBold, color: '#FFFFFF', fontSize: 14 }}>{row.value}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
          <Text style={{ ...Fonts.body, fontSize: 10, color: '#B8B8C4', marginTop: 8 }}>*NRV: Nutrient Reference Value for an average adult.</Text>
        </View>

        {/* Ingredients */}
        <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginLeft: 24, marginRight: 24, marginTop: 28, marginBottom: 12 }}>Ingredients</Text>
        <View style={{ marginLeft: 24, marginRight: 24 }}>
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, boxShadow: '0 1px 6px rgba(45,45,58,0.04)' }}>
            {product.ingredients.map((ing, i) => (
              <View key={ing} style={{ flexDirection: 'row', alignItems: 'center', marginTop: i > 0 ? 8 : 0 }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: product.accentColor, marginRight: 10 }} />
                <Text style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', flex: 1 }}>{ing}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Scan to earn */}
        <View style={{ marginLeft: 24, marginRight: 24, marginTop: 28 }}>
          <View style={{ borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEB', border: '1px solid #FBE6B4' }}>
            <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: '#FBBF24', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 22 }}>📷</Text>
            </View>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ ...Fonts.bodyBold, fontSize: 14, color: '#2D2D3A' }}>Scan &amp; earn 20 KP</Text>
              <Text style={{ ...Fonts.body, fontSize: 12, color: '#8E8E9A', marginTop: 2 }}>Scan the QR on the pack to collect points.</Text>
            </View>
          </View>
        </View>

        {/* Good to know */}
        <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginLeft: 24, marginRight: 24, marginTop: 28, marginBottom: 12 }}>Good to know</Text>
        <View style={{ marginLeft: 24, marginRight: 24 }}>
          {facts.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, type: 'spring', stiffness: 120, damping: 16 }}>
              <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', boxShadow: '0 1px 6px rgba(45,45,58,0.04)' }}>
                <Text style={{ fontSize: 26 }}>{f.emoji}</Text>
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={{ ...Fonts.bodySemiBold, fontSize: 14, color: '#2D2D3A' }}>{f.title}</Text>
                  <Text style={{ ...Fonts.body, fontSize: 12, color: '#8E8E9A', marginTop: 2, lineHeight: '16px' }}>{f.body}</Text>
                </View>
              </View>
            </motion.div>
          ))}
        </View>

        {/* Related */}
        <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginLeft: 24, marginRight: 24, marginTop: 20, marginBottom: 12 }}>More to sip</Text>
        <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', paddingLeft: 24, paddingRight: 24, gap: 12 }}>
          {related.map((p) => (
            <AnimatedPress key={p.id} onPress={() => router.push(`/product/${p.id}`)} style={{ width: 120, flexShrink: 0 }}>
              <View style={{ backgroundColor: p.bgColor, borderRadius: 20, padding: 12, alignItems: 'center' }}>
                <Img src={p.image} style={{ width: '100%', height: 84 }} contentFit="contain" />
                <Text numberOfLines={1} style={{ ...Fonts.bodySemiBold, fontSize: 12, color: '#2D2D3A', marginTop: 8 }}>{p.name}</Text>
              </View>
            </AnimatedPress>
          ))}
        </div>
      </View>

      {/* Bottom CTA */}
      <View style={{ position: 'sticky', bottom: 0, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 16, backgroundColor: '#FAFAF7', borderTop: '1px solid #F0F0EC' }}>
        <PrimaryButton label="Find in stores" icon="mappin.and.ellipse" color={product.accentColor} onPress={() => router.back()} />
      </View>
    </View>
  );
}
