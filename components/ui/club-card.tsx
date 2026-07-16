'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { View, Text, Img, AnimatedPress, LinearGradient } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { useRewards } from '@/contexts/rewards';
import { IconSymbol } from './icon-symbol';

// Sunburst wedges around the center of a square — same motif as the
// juice carousel, spinning slowly behind the character.
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

/** Width of the phone frame (capped at 430), measured on the client. */
function useFrameWidth() {
  const [w, setW] = useState(430);
  useEffect(() => {
    const measure = () => setW(Math.min(window.innerWidth, 430));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  return w;
}

/**
 * The one statement piece on the homepage: the red club card holding
 * the KP balance and membership CTAs — styled like the juice showcase:
 * sticker border, spinning sunburst, confetti and a floating character.
 */
export function ClubCard() {
  const router = useRouter();
  const { balance } = useRewards();
  const frameW = useFrameWidth();

  const CARD_W = frameW - 40; // marginHorizontal 20 on each side
  const RAY_SIZE = CARD_W * 1.5;
  const RAY_CX = CARD_W - 70;
  const RAY_CY = 118;
  const rays = rayPaths(RAY_SIZE);

  return (
    <AnimatedPress
      onPress={() => router.push('/kids-club')}
      accessibilityLabel="Άνοιγμα συνδρομής Kids Club"
      style={{ marginLeft: 20, marginRight: 20 }}
    >
      <View
        style={{
          borderRadius: 28,
          border: '3px solid #FFFFFF',
          padding: 20,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#D50408',
          boxShadow: '0 10px 20px rgba(196,4,8,0.35)',
        }}
      >
        <LinearGradient
          colors={['#F5171B', '#D50408']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* Slowly spinning sunburst behind the character */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          style={{
            position: 'absolute',
            left: RAY_CX - RAY_SIZE / 2,
            top: RAY_CY - RAY_SIZE / 2,
            width: RAY_SIZE,
            height: RAY_SIZE,
          }}
        >
          <svg width={RAY_SIZE} height={RAY_SIZE} viewBox={`0 0 ${RAY_SIZE} ${RAY_SIZE}`}>
            {rays.map((d, i) => (
              <path key={i} d={d} fill="#FFFFFF" opacity={0.08} />
            ))}
          </svg>
        </motion.div>

        {/* Sunny glow behind the character */}
        <View
          style={{
            position: 'absolute',
            top: 44,
            right: -26,
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: 'rgba(251,212,13,0.26)',
          }}
        />

        {/* Confetti sparkles & bubbles */}
        <svg
          width={CARD_W}
          height={260}
          viewBox={`0 0 ${CARD_W} 260`}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <path d={sparklePath(CARD_W - 42, 30, 13)} fill="#FBD40D" opacity={0.95} />
          <path d={sparklePath(CARD_W - 160, 52, 9)} fill="#FFFFFF" opacity={0.7} />
          <path d={sparklePath(30, 120, 11)} fill="#FBD40D" opacity={0.85} />
          <circle cx={CARD_W - 22} cy={92} r={3.5} fill="#FFFFFF" opacity={0.7} />
          <circle cx={44} cy={38} r={3} fill="#FFFFFF" opacity={0.55} />
          <circle cx={CARD_W - 120} cy={16} r={3} fill="#FBD40D" opacity={0.8} />
        </svg>

        {/* Eyebrow */}
        <Text
          style={{
            ...Fonts.bodyHeavy,
            fontSize: 11,
            letterSpacing: 1.5,
            color: 'rgba(255,255,255,0.75)',
            position: 'relative',
          }}
        >
          ΚΑΡΤΑ KIDS CLUB
        </Text>

        {/* Balance + character */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, position: 'relative' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
              <Text style={{ ...Fonts.displayHeavy, fontSize: 42, color: '#FFFFFF', lineHeight: '50px' }}>
                {balance.toLocaleString()}
              </Text>
              <Text style={{ ...Fonts.display, fontSize: 18, color: '#FBD40D' }}>KP</Text>
            </View>
            <Text style={{ ...Fonts.bodySemiBold, fontSize: 12.5, color: 'rgba(255,255,255,0.8)', marginTop: -2 }}>
              Πόντοι Keanita για να ξοδέψεις σε δώρα
            </Text>
          </View>

          <motion.div
            animate={{ y: [2, -3, 2] }}
            transition={{ duration: 4.4, ease: 'easeInOut', repeat: Infinity }}
          >
            <Img
              src="/images/characters/character-1.png"
              style={{ width: 92, height: 92 }}
              contentFit="contain"
            />
          </motion.div>
        </View>

        {/* Actions — stacked so labels never truncate */}
        <View style={{ marginTop: 16, gap: 10, position: 'relative' }}>
          <AnimatedPress onPress={() => router.push('/gifts')}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 999,
                paddingTop: 13,
                paddingBottom: 13,
                paddingLeft: 16,
                paddingRight: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <IconSymbol name="gift.fill" size={15} color="#E60C10" />
              <Text style={{ ...Fonts.bodyHeavy, fontSize: 13.5, color: '#E60C10' }}>
                Ξόδεψε πόντους
              </Text>
            </View>
          </AnimatedPress>

          <View
            style={{
              borderRadius: 999,
              paddingTop: 13,
              paddingBottom: 13,
              paddingLeft: 16,
              paddingRight: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              border: '1.5px solid rgba(255,255,255,0.45)',
            }}
          >
            <Text style={{ ...Fonts.bodyHeavy, fontSize: 13.5, color: '#FFFFFF' }}>
              Γίνε μέλος
            </Text>
            <IconSymbol name="arrow.right" size={14} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </AnimatedPress>
  );
}
