'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { View, Text, Pressable, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { ScreenHeader } from '@/components/ui/screen-header';
import { PrimaryButton } from '@/components/ui/primary-button';
import { KpPill } from '@/components/ui/kp-pill';
import { useRewards } from '@/contexts/rewards';
import { gifts, type Gift } from '@/data/mock/gifts';

const CARD_W = 'calc((min(100vw, 430px) - 60px) / 2)';

const FILTERS = ['All', 'Digital', 'Physical'] as const;
type Filter = (typeof FILTERS)[number];

function GiftCard({ gift, onPress }: { gift: Gift; onPress: () => void }) {
  return (
    <AnimatedPress onPress={onPress} style={{ width: CARD_W, marginBottom: 12 }}>
      <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, overflow: 'hidden', boxShadow: '0 2px 10px rgba(45,45,58,0.05)' }}>
        <View style={{ backgroundColor: gift.bg, alignItems: 'center', paddingTop: 24, paddingBottom: 24, position: 'relative' }}>
          <Text style={{ fontSize: 46, opacity: gift.inStock ? 1 : 0.4 }}>{gift.emoji}</Text>
          {!gift.inStock && (
            <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(45,45,58,0.7)', borderRadius: 999, paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4 }}>
              <Text style={{ ...Fonts.bodyBold, color: '#FFFFFF', fontSize: 9 }}>Back soon</Text>
            </View>
          )}
        </View>
        <View style={{ padding: 12 }}>
          <Text numberOfLines={2} style={{ ...Fonts.bodySemiBold, fontSize: 14, color: '#2D2D3A', minHeight: 36 }}>{gift.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={{ fontSize: 12 }}>⭐</Text>
              <Text style={{ ...Fonts.bodyHeavy, fontSize: 14, color: gift.color }}>{gift.cost.toLocaleString()}</Text>
            </View>
            {gift.requiresApproval && <Text style={{ ...Fonts.bodyBold, fontSize: 9, color: '#B8B8C4' }}>PARENT OK</Text>}
          </View>
        </View>
      </View>
    </AnimatedPress>
  );
}

export default function GiftsScreen() {
  const { balance, spend } = useRewards();
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Gift | null>(null);
  const [redeemed, setRedeemed] = useState(false);

  const visible = useMemo(() => {
    if (filter === 'All') return gifts;
    return gifts.filter((g) => g.category === filter.toLowerCase());
  }, [filter]);

  const closeSheet = () => {
    setSelected(null);
    setRedeemed(false);
  };

  const handleRedeem = () => {
    if (!selected) return;
    const ok = spend(selected.cost, `Redeemed: ${selected.name}`);
    if (ok) setRedeemed(true);
  };

  const canAfford = selected ? balance >= selected.cost : false;

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh' }}>
      <ScreenHeader title="Gift Catalog" subtitle="Turn your points into gifts" right={<KpPill amount={balance} size="sm" />} />

      {/* Filters */}
      <View style={{ flexDirection: 'row', paddingLeft: 24, paddingRight: 24, gap: 8, marginBottom: 4 }}>
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <Pressable key={f} onPress={() => setFilter(f)}>
              <View style={{ paddingLeft: 18, paddingRight: 18, paddingTop: 8, paddingBottom: 8, borderRadius: 12, backgroundColor: active ? '#E84D3D' : '#FFFFFF', border: active ? 'none' : '1px solid #F0F0EC' }}>
                <Text style={{ ...Fonts.body, fontSize: 14, color: active ? '#FFFFFF' : '#8E8E9A' }}>{f}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Grid */}
      <View style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 96, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {visible.map((g, i) => (
          <motion.div key={g.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, type: 'spring', stiffness: 120, damping: 16 }}>
            <GiftCard gift={g} onPress={() => setSelected(g)} />
          </motion.div>
        ))}
      </View>

      {/* Redeem sheet */}
      <AnimatePresence>
        {selected && (
          <div style={{ position: 'fixed', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, zIndex: 70, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} onClick={closeSheet} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{ position: 'relative', backgroundColor: '#FFFFFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24, display: 'flex', flexDirection: 'column' }}
            >
              {redeemed ? (
                <View style={{ alignItems: 'center', paddingBottom: 8 }}>
                  <View style={{ width: 88, height: 88, borderRadius: 30, backgroundColor: selected.bg, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 44 }}>🎉</Text>
                  </View>
                  <Text style={{ ...Fonts.displayHeavy, fontSize: 20, color: '#2D2D3A', marginTop: 16 }}>
                    {selected.category === 'physical' ? 'Sent for approval!' : 'Gift unlocked!'}
                  </Text>
                  <Text style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', textAlign: 'center', marginTop: 6, lineHeight: '20px' }}>
                    {selected.category === 'physical'
                      ? `A request for your ${selected.name} was sent to your parent. You'll be notified once it's approved.`
                      : `Your ${selected.name} has been added to your account. Enjoy!`}
                  </Text>
                  <View style={{ width: '100%', marginTop: 20 }}>
                    <PrimaryButton label="Done" onPress={closeSheet} />
                  </View>
                </View>
              ) : (
                <View style={{ paddingBottom: 4 }}>
                  <View style={{ alignItems: 'center' }}>
                    <View style={{ width: 96, height: 96, borderRadius: 32, backgroundColor: selected.bg, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 50 }}>{selected.emoji}</Text>
                    </View>
                    <Text style={{ ...Fonts.displayHeavy, fontSize: 20, color: '#2D2D3A', marginTop: 16, textAlign: 'center' }}>{selected.name}</Text>
                    <Text style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', textAlign: 'center', marginTop: 4, lineHeight: '20px' }}>{selected.description}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FAFAF7', borderRadius: 16, paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, marginTop: 20 }}>
                    <Text style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A' }}>Cost</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={{ fontSize: 14 }}>⭐</Text>
                      <Text style={{ ...Fonts.displayHeavy, fontSize: 16, color: '#2D2D3A' }}>{selected.cost.toLocaleString()} KP</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 16, marginTop: 10 }}>
                    <Text style={{ ...Fonts.body, fontSize: 12, color: '#B8B8C4' }}>Your balance after</Text>
                    <Text style={{ ...Fonts.bodyBold, fontSize: 12, color: canAfford ? '#6BBF6A' : '#E84D3D' }}>
                      {canAfford ? (balance - selected.cost).toLocaleString() + ' KP' : 'Not enough KP'}
                    </Text>
                  </View>

                  {selected.requiresApproval && (
                    <Text style={{ ...Fonts.body, fontSize: 12, color: '#B8B8C4', textAlign: 'center', marginTop: 12, paddingLeft: 8, paddingRight: 8, lineHeight: '16px' }}>
                      🛡️ This gift needs a parent&apos;s approval before it&apos;s sent.
                    </Text>
                  )}

                  <View style={{ marginTop: 16 }}>
                    <PrimaryButton
                      label={
                        !selected.inStock
                          ? 'Out of stock'
                          : !canAfford
                            ? `Need ${(selected.cost - balance).toLocaleString()} more KP`
                            : selected.requiresApproval
                              ? 'Request from parent'
                              : 'Redeem now'
                      }
                      color={selected.color}
                      disabled={!canAfford || !selected.inStock}
                      onPress={handleRedeem}
                    />
                  </View>
                  <Pressable onPress={closeSheet} style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 12, marginTop: 4 }}>
                    <Text style={{ ...Fonts.body, fontSize: 14, color: '#B8B8C4' }}>Maybe later</Text>
                  </Pressable>
                </View>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </View>
  );
}
