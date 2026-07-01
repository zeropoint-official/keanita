'use client';

import { View, Text, Img, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import type { Product } from '@/data/mock/products';

interface Props {
  product: Product;
  onPress?: () => void;
  /** Fixed width for horizontal rails; omit to fill available space (grids). */
  width?: number;
}

export function ProductCard({ product, onPress, width }: Props) {
  return (
    <AnimatedPress onPress={onPress} style={width ? { width, flexShrink: 0 } : { flex: 1 }}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          padding: 8,
          paddingBottom: 14,
          boxShadow: '0 4px 12px rgba(45,45,58,0.05)',
        }}
      >
        {/* Tinted media well keeps the brand pastel contained */}
        <View
          style={{
            backgroundColor: product.bgColor,
            borderRadius: 18,
            height: 110,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Img src={product.image} style={{ width: '82%', height: 92 }} contentFit="contain" />
        </View>
        <View style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 10 }}>
          <Text numberOfLines={1} style={{ ...Fonts.display, fontSize: 15, color: '#2D2D3A' }}>
            {product.name}
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.bodyBold, fontSize: 11, color: '#8E8E9A', marginTop: 1 }}>
            {product.tagline}
          </Text>
        </View>
      </View>
    </AnimatedPress>
  );
}
