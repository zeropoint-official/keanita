'use client';

import { useMemo, useState } from 'react';
import { ModalShell } from './modal-shell';
import { AnimatedPress } from '@/lib/rn';
import { IconSymbol } from '../icon-symbol';
import { partnerStores, storeCategories, type PartnerStore } from '@/data/mock/kids-club';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ALL = 0;

function StoreCard({ store, onPress }: { store: PartnerStore; onPress: () => void }) {
  const maxDiscount = Math.max(...store.discounts.map((d) => d.value));
  return (
    <AnimatedPress onPress={onPress}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', border: '1px solid #F0F0EC', borderRadius: 16, padding: 12, marginBottom: 8 }}>
        {store.logo ? (
          <div style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: '#FFFFFF', border: '1px solid #F0F0EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={store.logo} alt={store.name} style={{ width: 40, height: 40, objectFit: 'contain' }} />
          </div>
        ) : (
          <div style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: '#FFF6E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#F5A623', fontSize: 14, fontWeight: 900 }}>{maxDiscount}%</span>
          </div>
        )}
        <div style={{ flex: 1, marginLeft: 12, marginRight: 6, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 13.5, fontWeight: 800, color: '#2D2D3A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{store.name}</span>
          <span style={{ fontSize: 11, color: '#8E8E9A', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {storeCategories[store.categoryId] ?? 'Άλλο'}
            {store.discounts.length > 1 ? ` • ${store.discounts.length} προσφορές` : ''}
          </span>
        </div>
        <IconSymbol name="chevron.right" size={16} color="#B8B8C4" />
      </div>
    </AnimatedPress>
  );
}

function StoreDetailView({ store, onBack }: { store: PartnerStore; onBack: () => void }) {
  return (
    <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', paddingLeft: 22, paddingRight: 22, paddingBottom: 20 }}>
      <AnimatedPress onPress={onBack} style={{ marginBottom: 14, alignSelf: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F4F4F0', paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6, borderRadius: 999 }}>
          <IconSymbol name="chevron.left" size={14} color="#2D2D3A" />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#2D2D3A' }}>Όλα τα καταστήματα</span>
        </div>
      </AnimatedPress>

      {store.description && <p style={{ fontSize: 13, color: '#5A5A66', lineHeight: '19px', marginBottom: 14, marginTop: 0 }}>{store.description}</p>}

      <span style={{ fontSize: 11, fontWeight: 800, color: '#8E8E9A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Εκπτώσεις</span>
      {store.discounts.map((d, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF6E8', borderRadius: 16, padding: 14, marginBottom: 8 }}>
          <div style={{ backgroundColor: '#F5A623', borderRadius: 12, width: 56, height: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 900 }}>{d.value}%</span>
            <span style={{ color: '#FFFFFF', fontSize: 8.5, fontWeight: 800, letterSpacing: 0.8 }}>ΕΚΠΤ.</span>
          </div>
          <span style={{ flex: 1, marginLeft: 12, fontSize: 13, color: '#6B2F26', lineHeight: '18px', fontWeight: 600 }}>{d.description}</span>
        </div>
      ))}

      {(store.phone || store.website) && (
        <>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#8E8E9A', letterSpacing: 1, textTransform: 'uppercase', marginTop: 12, marginBottom: 8, display: 'block' }}>Επικοινωνία</span>
          {store.phone && (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 8, paddingBottom: 8 }}>
              <IconSymbol name="phone.fill" size={14} color="#6BBF6A" />
              <span style={{ fontSize: 13, color: '#2D2D3A', fontWeight: 600 }}>{store.phone}</span>
            </div>
          )}
          {store.website && (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 8, paddingBottom: 8 }}>
              <IconSymbol name="paperplane.fill" size={14} color="#5DADE2" />
              <span style={{ fontSize: 12.5, color: '#2D90DC', flex: 1 }}>{store.website}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function DiscountsModal({ visible, onClose }: Props) {
  const [activeCat, setActiveCat] = useState<number>(ALL);
  const [selected, setSelected] = useState<PartnerStore | null>(null);

  const categories = useMemo(() => {
    const present = new Set(partnerStores.map((s) => s.categoryId));
    return [
      { id: ALL, name: 'Όλα' },
      ...Object.entries(storeCategories)
        .filter(([id]) => present.has(Number(id)))
        .map(([id, name]) => ({ id: Number(id), name })),
    ];
  }, []);

  const filtered = useMemo(() => {
    if (activeCat === ALL) return partnerStores;
    return partnerStores.filter((s) => s.categoryId === activeCat);
  }, [activeCat]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSelected(null);
      setActiveCat(ALL);
    }, 250);
  };

  return (
    <ModalShell
      visible={visible}
      onClose={handleClose}
      chip="ΕΚΠΤΩΣΕΙΣ"
      title={selected ? selected.name : 'Εκπτώσεις συνεργατών'}
      subtitle={selected ? storeCategories[selected.categoryId] : `${partnerStores.length} καταστήματα σε όλη την Κύπρο`}
      accent="#F5A623"
      toolbar={
        selected ? null : (
          <div className="no-scrollbar" style={{ paddingBottom: 10, display: 'flex', flexDirection: 'row', overflowX: 'auto', paddingLeft: 22, paddingRight: 22, gap: 8, alignItems: 'center' }}>
            {categories.map((c) => {
              const isActive = c.id === activeCat;
              return (
                <AnimatedPress key={c.id} onPress={() => setActiveCat(c.id)} style={{ flexShrink: 0 }}>
                  <div style={{ backgroundColor: isActive ? '#F5A623' : '#F4F4F0', paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, borderRadius: 999 }}>
                    <span style={{ color: isActive ? '#FFFFFF' : '#6B2F26', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>{c.name}</span>
                  </div>
                </AnimatedPress>
              );
            })}
          </div>
        )
      }
    >
      {selected ? (
        <StoreDetailView store={selected} onBack={() => setSelected(null)} />
      ) : (
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', paddingLeft: 22, paddingRight: 22, paddingBottom: 12 }}>
          {filtered.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, paddingBottom: 40 }}>
              <span style={{ fontSize: 32 }}>🤷‍♀️</span>
              <span style={{ fontSize: 13, color: '#8E8E9A', marginTop: 6 }}>Δεν υπάρχουν καταστήματα σε αυτή την κατηγορία ακόμα.</span>
            </div>
          ) : (
            filtered.map((item) => <StoreCard key={item.id} store={item} onPress={() => setSelected(item)} />)
          )}
        </div>
      )}
    </ModalShell>
  );
}
