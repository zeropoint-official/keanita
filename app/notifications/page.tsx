'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { View, Text, Pressable, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { ScreenHeader } from '@/components/ui/screen-header';
import { EmptyState } from '@/components/ui/empty-state';
import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { notifications as seed, type NotificationType } from '@/data/mock/notifications';

const TYPE_STYLE: Record<NotificationType, { icon: IconSymbolName; color: string; bg: string }> = {
  event: { icon: 'calendar', color: '#F5820D', bg: '#FFF0E0' },
  reward: { icon: 'trophy.fill', color: '#FBD40D', bg: '#FFF8D9' },
  gift: { icon: 'gift.fill', color: '#E60C10', bg: '#FFECEA' },
  system: { icon: 'info.circle.fill', color: '#12AEEB', bg: '#E1F5FD' },
};

export default function NotificationsScreen() {
  const [items, setItems] = useState(seed);
  const unread = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const toggleRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 110 }}>
      <ScreenHeader
        title="Ειδοποιήσεις"
        subtitle={unread > 0 ? `${unread} μη αναγνωσμένες` : 'Είσαι πλήρως ενημερωμένος'}
        right={
          unread > 0 ? (
            <AnimatedPress onPress={markAllRead}>
              <View style={{ backgroundColor: '#FFECEA', borderRadius: 999, paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8 }}>
                <Text style={{ ...Fonts.bodyBold, fontSize: 12, color: '#E60C10' }}>Όλες ως αναγνωσμένες</Text>
              </View>
            </AnimatedPress>
          ) : undefined
        }
      />

      <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 8 }}>
        {items.length === 0 ? (
          <EmptyState emoji="🔔" title="Καμία ειδοποίηση" message="Δεν έχεις κάτι νέο προς το παρόν." />
        ) : (
          items.map((n, i) => {
            const s = TYPE_STYLE[n.type];
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 120, damping: 16 }}
              >
                <Pressable onPress={() => toggleRead(n.id)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderRadius: 16,
                      padding: 14,
                      marginBottom: 10,
                      backgroundColor: n.read ? '#FFFFFF' : '#FFFDF7',
                      border: `1px solid ${n.read ? '#F0F0EC' : '#FBE6B4'}`,
                    }}
                  >
                    <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: s.bg, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <IconSymbol name={s.icon} size={20} color={s.color} />
                    </View>
                    <View style={{ marginLeft: 12, flex: 1, minWidth: 0 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text numberOfLines={1} style={{ ...Fonts.bodyBold, fontSize: 14, color: '#2D2D3A', flex: 1 }}>
                          {n.title}
                        </Text>
                        {!n.read && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#E60C10', marginLeft: 8 }} />}
                      </View>
                      <Text style={{ ...Fonts.body, fontSize: 12, color: '#8E8E9A', marginTop: 4, lineHeight: '16px' }}>{n.body}</Text>
                      <Text style={{ ...Fonts.body, fontSize: 11, color: '#B8B8C4', marginTop: 6 }}>{n.time}</Text>
                    </View>
                  </View>
                </Pressable>
              </motion.div>
            );
          })
        )}
      </View>
    </View>
  );
}
