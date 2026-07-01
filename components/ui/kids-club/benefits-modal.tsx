'use client';

import { ModalShell } from './modal-shell';
import { clubBenefits } from '@/data/mock/kids-club';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ICONS: Record<string, string> = { gift: '🎁', card: '💳', seminar: '🎓', contest: '🏆' };

export function BenefitsModal({ visible, onClose }: Props) {
  return (
    <ModalShell
      visible={visible}
      onClose={onClose}
      chip="ΩΦΕΛΗΜΑΤΑ ΜΕΛΩΝ"
      title="Member Benefits"
      subtitle="What you get when you join the KEANITO family."
      accent="#E84D3D"
    >
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', paddingLeft: 22, paddingRight: 22, paddingBottom: 20 }}>
        {clubBenefits.map((b, i) => (
          <div
            key={b.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: b.bgColor,
              borderRadius: 20,
              padding: 14,
              marginBottom: i === clubBenefits.length - 1 ? 0 : 10,
            }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, fontSize: 24, flexShrink: 0 }}>
              {ICONS[b.iconKey]}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: b.color, fontSize: 14.5, fontWeight: 900 }}>{b.title}</span>
              <span style={{ color: '#6B2F26', fontSize: 11, fontWeight: 600, marginTop: 1, opacity: 0.7 }}>{b.titleGreek}</span>
              <span style={{ color: '#5A5A66', fontSize: 12.5, lineHeight: '18px', marginTop: 6 }}>{b.description}</span>
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}
