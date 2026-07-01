'use client';

import { motion } from 'framer-motion';
import { Text, Img, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import type { Character } from '@/data/mock/characters';

interface Props {
  character: Character;
  isActive?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
  sm: { outer: 56, border: 2.5 },
  md: { outer: 68, border: 3 },
  lg: { outer: 88, border: 3.5 },
};

export function CharacterAvatar({ character, isActive = false, onPress, size = 'md' }: Props) {
  const s = SIZES[size];

  return (
    <AnimatedPress onPress={onPress} style={{ alignItems: 'center', marginRight: 20, flexShrink: 0 }}>
      <motion.div animate={{ scale: isActive ? 1.08 : 1 }} transition={{ type: 'spring', damping: 14, stiffness: 180 }}>
        <div
          style={{
            width: s.outer,
            height: s.outer,
            borderRadius: s.outer / 2,
            border: `${s.border}px solid ${isActive ? character.accentColor : 'transparent'}`,
            backgroundColor: character.bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Img src={character.image} style={{ width: s.outer - 4, height: s.outer - 4 }} contentFit="contain" />
        </div>
      </motion.div>
      <Text
        style={{
          ...(isActive ? Fonts.bodySemiBold : Fonts.body),
          fontSize: 12,
          marginTop: 8,
          color: isActive ? '#2D2D3A' : '#B8B8C4',
        }}
      >
        {character.name}
      </Text>
    </AnimatedPress>
  );
}
