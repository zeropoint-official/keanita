'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { View, Text, Img, LinearGradient } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { products, type Product } from '@/data/mock/products';
import { IconSymbol } from './icon-symbol';

const GAP = 14;
const POP = 58; // how far the pack's "pop zone" extends above the body
const BODY_H = 310;
const CONTAINER_H = POP + BODY_H;
const PACK_H = 288;
const PACK_TOP = 30;

// Per-flavor scene: saturated gradient, deep shade for text/shadows,
// and a fruit accent. Falls back to the product accent color.
const FLAVOR: Record<number, { gradient: [string, string]; deep: string; emoji: string }> = {
  1: { gradient: ['#FFB423', '#F5820D'], deep: '#C96200', emoji: '🍊' },
  2: { gradient: ['#8FD94E', '#53B41A'], deep: '#3D8F0F', emoji: '🥭' },
  3: { gradient: ['#47C1F5', '#12AEEB'], deep: '#0B7FBF', emoji: '🍎' },
  4: { gradient: ['#57CB8E', '#2AA968'], deep: '#1E8A52', emoji: '🍃' },
  5: { gradient: ['#FF8BB8', '#F14E9B'], deep: '#C22F76', emoji: '🍓' },
};

function flavorFor(p: Product) {
  return (
    FLAVOR[p.id] ?? {
      gradient: [p.accentColor, p.accentColor] as [string, string],
      deep: p.accentColor,
      emoji: '✨',
    }
  );
}

// Sunburst wedges around the center of a square — sits behind the pack.
function rayPaths(size: number, count = 16) {
  const c = size / 2;
  const R = size / 2;
  const step = (Math.PI * 2) / count;
  const paths: string[] = [];
  for (let i = 0; i < count; i += 2) {
    const a1 = i * step;
    const a2 = a1 + step;
    paths.push(
      `M ${c} ${c} L ${c + R * Math.cos(a1)} ${c + R * Math.sin(a1)} L ${
        c + R * Math.cos(a2)
      } ${c + R * Math.sin(a2)} Z`,
    );
  }
  return paths;
}

function sparklePath(x: number, y: number, size: number) {
  const s = size / 2;
  const k = s * 0.22;
  return (
    `M ${x} ${y - s} Q ${x + k} ${y - k} ${x + s} ${y} ` +
    `Q ${x + k} ${y + k} ${x} ${y + s} ` +
    `Q ${x - k} ${y + k} ${x - s} ${y} ` +
    `Q ${x - k} ${y - k} ${x} ${y - s} Z`
  );
}

function lerp(t: number, a: number, b: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

interface SlideProps {
  product: Product;
  index: number;
  scrollLeft: number;
  step: number;
  cardW: number;
}

function JuiceSlide({ product, index, scrollLeft, step, cardW }: SlideProps) {
  const router = useRouter();
  const { gradient, deep, emoji } = flavorFor(product);

  const RAY_SIZE = cardW * 1.7;
  const PACK_W = cardW * 0.8;
  const rays = rayPaths(RAY_SIZE);

  // Distance from centered position, normalised to [-1, 1] over one step.
  const d = (scrollLeft - index * step) / step;
  const ad = Math.min(1, Math.abs(d));
  const cardScale = lerp(ad, 1, 0.92);
  const cardY = lerp(ad, 0, 14);
  const packX = -d * 36; // subtle parallax while swiping

  return (
    <div
      style={{
        width: cardW,
        height: CONTAINER_H,
        marginRight: GAP,
        flexShrink: 0,
        scrollSnapAlign: 'center',
        transform: `translateY(${cardY}px) scale(${cardScale})`,
        cursor: 'pointer',
      }}
      role="button"
      aria-label={`Άνοιγμα προϊόντος ${product.name}`}
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Card body */}
        <View
          style={{
            position: 'absolute',
            top: POP,
            left: 0,
            right: 0,
            height: BODY_H,
            borderRadius: 32,
            border: '3px solid #FFFFFF',
            overflow: 'hidden',
            backgroundColor: gradient[1],
            boxShadow: `0 10px 18px ${deep}66`,
          }}
        >
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />

          {/* Slowly spinning sunburst behind the pack */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
            style={{
              position: 'absolute',
              left: cardW / 2 - RAY_SIZE / 2,
              top: PACK_TOP + PACK_H / 2 - POP - RAY_SIZE / 2,
              width: RAY_SIZE,
              height: RAY_SIZE,
            }}
          >
            <svg width={RAY_SIZE} height={RAY_SIZE} viewBox={`0 0 ${RAY_SIZE} ${RAY_SIZE}`}>
              {rays.map((dd, i) => (
                <path key={i} d={dd} fill="#FFFFFF" opacity={0.12} />
              ))}
            </svg>
          </motion.div>

          {/* Confetti sparkles & bubbles */}
          <svg
            width={cardW}
            height={BODY_H}
            viewBox={`0 0 ${cardW} ${BODY_H}`}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <path d={sparklePath(26, 40, 13)} fill="#FFFFFF" opacity={0.9} />
            <path d={sparklePath(cardW - 30, 130, 11)} fill="#FBD40D" opacity={0.95} />
            <path d={sparklePath(cardW - 58, 36, 8)} fill="#FFFFFF" opacity={0.6} />
            <circle cx={20} cy={110} r={4} fill="#FFFFFF" opacity={0.5} />
            <circle cx={cardW - 18} cy={70} r={3} fill="#FFFFFF" opacity={0.7} />
            <circle cx={36} cy={168} r={3} fill="#FBD40D" opacity={0.8} />
          </svg>

          {/* Name, tagline & CTA */}
          <View style={{ position: 'absolute', left: 18, right: 18, bottom: 16 }}>
            <Text numberOfLines={1} style={{ ...Fonts.displayHeavy, fontSize: 25, color: '#FFFFFF' }}>
              {product.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.bodyBold, fontSize: 12.5, color: 'rgba(255,255,255,0.9)', marginTop: 1 }}
            >
              {product.tagline}
            </Text>
            <View
              style={{
                marginTop: 12,
                alignSelf: 'flex-start',
                backgroundColor: '#FFFFFF',
                borderRadius: 999,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 10,
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Text style={{ ...Fonts.bodyHeavy, fontSize: 13, color: deep }}>Δες το προϊόν</Text>
              <IconSymbol name="arrow.right" size={13} color={deep} />
            </View>
          </View>
        </View>

        {/* The pack — peeks above the card, centered on the body */}
        <motion.div
          animate={{ y: [2, -3, 2] }}
          transition={{ duration: 4.4, ease: 'easeInOut', repeat: Infinity }}
          style={{
            position: 'absolute',
            top: PACK_TOP,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            transform: `translateX(${packX}px)`,
          }}
        >
          <Img
            src={product.image}
            style={{ width: PACK_W, height: PACK_H }}
            contentFit="contain"
          />
        </motion.div>

        {/* Vitamin C badge — clean yellow pill, like the claim on the packs */}
        <View
          style={{
            position: 'absolute',
            top: POP + 14,
            right: 12,
            backgroundColor: '#FBD40D',
            borderRadius: 999,
            border: '2px solid #FFFFFF',
            paddingLeft: 11,
            paddingRight: 11,
            paddingTop: 6,
            paddingBottom: 6,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
            transform: 'rotate(-4deg)',
            boxShadow: '0 3px 5px rgba(176,3,6,0.2)',
          }}
        >
          <Text style={{ ...Fonts.bodyHeavy, fontSize: 11, color: '#B00306' }}>+ Βιταμίνη</Text>
          <Text style={{ ...Fonts.displayHeavy, fontSize: 14, color: '#D90408' }}>C</Text>
        </View>

        {/* Fruit accent */}
        <Text style={{ position: 'absolute', top: POP + 22, left: 18, fontSize: 26 }}>{emoji}</Text>
      </div>
    </div>
  );
}

/**
 * The drinks showcase: a big center-snapping carousel where every flavor
 * gets its own sunburst scene. The center card grows, packs float and the
 * sunburst spins slowly behind them.
 */
export function JuiceCarousel() {
  const [frameW, setFrameW] = useState(430);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => setFrameW(Math.min(window.innerWidth, 430));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const cardW = frameW - 84; // big card, neighbours peek on both sides
  const step = cardW + GAP;
  const side = (frameW - cardW) / 2;
  const active = Math.round(scrollLeft / step);

  const onScroll = () => {
    if (scrollerRef.current) setScrollLeft(scrollerRef.current.scrollLeft);
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
          paddingLeft: side,
          paddingRight: side - GAP,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        {products.map((product, index) => (
          <JuiceSlide
            key={product.id}
            product={product}
            index={index}
            scrollLeft={scrollLeft}
            step={step}
            cardW={cardW}
          />
        ))}
      </div>

      {/* Flavor-colored pagination */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 14, gap: 6 }}>
        {products.map((p, i) => (
          <View
            key={p.id}
            style={{
              width: i === active ? 22 : 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: flavorFor(p).gradient[1],
              opacity: i === active ? 1 : 0.35,
              transition: 'width 0.2s',
            }}
          />
        ))}
      </View>
    </View>
  );
}
