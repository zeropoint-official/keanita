'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Img, LinearGradient } from '@/lib/rn';
import { IconSymbol } from '../icon-symbol';
import type { Character } from '@/data/mock/characters';

interface Props {
  character: Character | null;
  onClose: () => void;
}

export function CharacterModal({ character, onClose }: Props) {
  return (
    <AnimatePresence>
      {character && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 430,
            zIndex: 70,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)' }}
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'relative',
              height: '85dvh',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Hero band */}
            <LinearGradient
              colors={[character.accentColor, character.accentColor + 'CC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ paddingTop: 12, paddingBottom: 18, paddingLeft: 22, paddingRight: 22, alignItems: 'center', position: 'relative' }}
            >
              <div style={{ width: 40, height: 4, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)', marginBottom: 10 }} />
              <button
                onClick={onClose}
                style={{ position: 'absolute', right: 14, top: 16, width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, border: 'none', cursor: 'pointer' }}
              >
                <IconSymbol name="xmark" size={14} color="#FFFFFF" />
              </button>
              <Img src={character.image} style={{ width: 140, height: 140 }} contentFit="contain" />
              <span style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 900, marginTop: 6, letterSpacing: 0.8 }}>{character.name}</span>
            </LinearGradient>

            {/* Body */}
            <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: 22, paddingBottom: 40, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 14, lineHeight: '22px', color: '#2D2D3A' }}>{character.description}</span>

              {character.power && (
                <InfoRow emoji="⚡" label="Secret Power" value={character.power} bgColor={character.bgColor} color={character.accentColor} />
              )}
              <InfoRow emoji="💛" label="Best Friend" value={character.bestFriend} bgColor="#F8F8F4" color="#8E8E9A" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function InfoRow({ emoji, label, value, bgColor, color }: { emoji: string; label: string; value: string; bgColor: string; color: string }) {
  return (
    <div style={{ marginTop: 12, padding: 14, backgroundColor: bgColor, borderRadius: 16, display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: 1, textTransform: 'uppercase' }}>
        {emoji}&nbsp;&nbsp;{label}
      </span>
      <span style={{ fontSize: 13, color: '#2D2D3A', marginTop: 4, lineHeight: '19px' }}>{value}</span>
    </div>
  );
}
