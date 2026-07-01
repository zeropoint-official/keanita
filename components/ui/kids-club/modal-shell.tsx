'use client';

import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Fonts } from '@/constants/fonts';
import { IconSymbol } from '../icon-symbol';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  accent?: string;
  chip?: string;
  toolbar?: ReactNode;
  /** Sheet height as a fraction of the frame height. Defaults to 0.85. */
  heightFraction?: number;
}

export function ModalShell({
  visible,
  onClose,
  title,
  subtitle,
  children,
  accent = '#E84D3D',
  chip,
  toolbar,
  heightFraction = 0.85,
}: Props) {
  return (
    <AnimatePresence>
      {visible && (
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
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)' }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'relative',
              height: `${heightFraction * 100}dvh`,
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              overflow: 'hidden',
              paddingTop: 10,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Drag handle */}
            <div style={{ alignSelf: 'center', width: 40, height: 4, borderRadius: 4, backgroundColor: '#E4E4DE', marginBottom: 8 }} />

            {/* Header */}
            <div style={{ paddingLeft: 22, paddingRight: 22, paddingTop: 8, paddingBottom: 14, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, marginRight: 10, display: 'flex', flexDirection: 'column' }}>
                {chip && (
                  <div style={{ backgroundColor: accent + '22', alignSelf: 'flex-start', paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3, borderRadius: 999, marginBottom: 6 }}>
                    <span style={{ ...Fonts.bodyHeavy, color: accent, fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase' }}>{chip}</span>
                  </div>
                )}
                <span style={{ ...Fonts.displayHeavy, fontSize: 20, color: '#2D2D3A' }}>{title}</span>
                {subtitle && <span style={{ ...Fonts.body, fontSize: 12.5, color: '#8E8E9A', marginTop: 2 }}>{subtitle}</span>}
              </div>
              <button
                onClick={onClose}
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F4F4F0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', flexShrink: 0 }}
              >
                <IconSymbol name="xmark" size={16} color="#2D2D3A" />
              </button>
            </div>

            {toolbar}

            {/* Body fills remaining space */}
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
