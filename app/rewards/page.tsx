'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { View, Text, LinearGradient } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { ScreenHeader } from '@/components/ui/screen-header';
import { PrimaryButton } from '@/components/ui/primary-button';
import { useRewards, type KPIcon } from '@/contexts/rewards';

const ICON_EMOJI: Record<KPIcon, string> = {
  game: '🎮',
  event: '🎟️',
  login: '☀️',
  gift: '🎁',
  qr: '📷',
  bonus: '✨',
  streak: '🔥',
};

const EARN_WAYS = [
  { emoji: '🎮', label: 'Παίξε Φρουτοτρέλα', value: 'Έως 150 KP / ημέρα', bg: '#FFF0EE' },
  { emoji: '☀️', label: 'Άνοιγε την εφαρμογή καθημερινά', value: '5 KP + μπόνους σερί', bg: '#FFF6E8' },
  { emoji: '🎟️', label: 'Δήλωσε συμμετοχή σε εκδηλώσεις', value: 'Έως 250 KP / εκδήλωση', bg: '#EEFBEE' },
  { emoji: '📷', label: 'Σκάναρε QR κωδικούς προϊόντων', value: '20 KP το καθένα', bg: '#EDF7FD' },
];

export default function RewardsScreen() {
  const router = useRouter();
  const { balance, streak, lifetimeEarned, history } = useRewards();

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 96 }}>
      {/* Gradient header */}
      <LinearGradient
        colors={['#FBBF24', '#F5A623']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32, paddingBottom: 28 }}
      >
        <ScreenHeader title="Οι πόντοι μου" tint="#FFFFFF" transparent />

        <View style={{ alignItems: 'center', marginTop: 8 }}>
          <Text style={{ ...Fonts.bodyBold, color: 'rgba(255,255,255,0.8)', fontSize: 12, letterSpacing: 1.5 }}>ΤΟ ΥΠΟΛΟΙΠΟ ΣΟΥ</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 4 }}>
            <Text style={{ ...Fonts.displayHeavy, color: '#FFFFFF', fontSize: 56, lineHeight: '60px' }}>{balance.toLocaleString()}</Text>
            <Text style={{ ...Fonts.bodyBold, color: 'rgba(255,255,255,0.8)', fontSize: 18, marginBottom: 10, marginLeft: 6 }}>KP</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999, paddingLeft: 14, paddingRight: 14, paddingTop: 6, paddingBottom: 6 }}>
              <Text style={{ fontSize: 14 }}>🔥</Text>
              <Text style={{ ...Fonts.bodyBold, color: '#FFFFFF', fontSize: 12, marginLeft: 6 }}>{streak} ημέρες σερί</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999, paddingLeft: 14, paddingRight: 14, paddingTop: 6, paddingBottom: 6 }}>
              <Text style={{ fontSize: 14 }}>🏆</Text>
              <Text style={{ ...Fonts.bodyBold, color: '#FFFFFF', fontSize: 12, marginLeft: 6 }}>{lifetimeEarned.toLocaleString()} συνολικά</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Spend CTA */}
      <View style={{ marginLeft: 24, marginRight: 24, marginTop: 20 }}>
        <PrimaryButton label="Ξόδεψε πόντους στον Κατάλογο δώρων" icon="gift.fill" color="#E84D3D" onPress={() => router.push('/gifts')} />
      </View>

      {/* Ways to earn */}
      <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginLeft: 24, marginRight: 24, marginTop: 28, marginBottom: 12 }}>Τρόποι να κερδίσεις</Text>
      <View style={{ marginLeft: 24, marginRight: 24 }}>
        {EARN_WAYS.map((w, i) => (
          <motion.div key={w.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, type: 'spring', stiffness: 120, damping: 16 }}>
            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', boxShadow: '0 1px 6px rgba(45,45,58,0.04)' }}>
              <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: w.bg, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22 }}>{w.emoji}</Text>
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={{ ...Fonts.bodySemiBold, fontSize: 14, color: '#2D2D3A' }}>{w.label}</Text>
                <Text style={{ ...Fonts.body, fontSize: 12, color: '#8E8E9A', marginTop: 2 }}>{w.value}</Text>
              </View>
            </View>
          </motion.div>
        ))}
      </View>

      {/* Activity history */}
      <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginLeft: 24, marginRight: 24, marginTop: 20, marginBottom: 12 }}>Πρόσφατη δραστηριότητα</Text>
      <View style={{ marginLeft: 24, marginRight: 24, backgroundColor: '#FFFFFF', borderRadius: 24, overflow: 'hidden', boxShadow: '0 2px 12px rgba(45,45,58,0.05)' }}>
        {history.map((entry, i) => {
          const earned = entry.amount > 0;
          return (
            <View
              key={entry.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 14,
                paddingBottom: 14,
                borderBottom: i < history.length - 1 ? '1px solid #F0F0EC' : 'none',
              }}
            >
              <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: earned ? '#EEFBEE' : '#FFF0EE', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>{ICON_EMOJI[entry.icon]}</Text>
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text numberOfLines={1} style={{ ...Fonts.body, fontSize: 14, color: '#2D2D3A' }}>{entry.label}</Text>
                <Text style={{ ...Fonts.body, fontSize: 12, color: '#B8B8C4', marginTop: 2 }}>{entry.date}</Text>
              </View>
              <Text style={{ ...Fonts.bodyHeavy, fontSize: 14, color: earned ? '#6BBF6A' : '#E84D3D' }}>
                {earned ? '+' : ''}
                {entry.amount} KP
              </Text>
            </View>
          );
        })}
      </View>

      <Text style={{ ...Fonts.body, fontSize: 12, color: '#B8B8C4', textAlign: 'center', marginTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: '16px' }}>
        Οι πόντοι λήγουν 12 μήνες μετά την απόκτησή τους. Η εξαργύρωση δώρων άνω των 500 KP χρειάζεται έγκριση γονέα.
      </Text>
    </View>
  );
}
