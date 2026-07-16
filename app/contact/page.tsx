'use client';

import { useState } from 'react';
import { View, Text, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { ScreenHeader } from '@/components/ui/screen-header';
import { PrimaryButton } from '@/components/ui/primary-button';
import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { companyContact } from '@/data/legal';

const INFO: { icon: IconSymbolName; color: string; bg: string; label: string; value: string; href?: string }[] = [
  { icon: 'phone.fill', color: '#6BBF6A', bg: '#EEFBEE', label: 'Τηλέφωνο', value: '+357 25 883100', href: `tel:${companyContact.phone}` },
  { icon: 'phone.fill', color: '#F5A623', bg: '#FFF6E8', label: 'Δωρεάν γραμμή', value: companyContact.freephone, href: `tel:${companyContact.freephone}` },
  { icon: 'envelope.fill', color: '#5DADE2', bg: '#EDF7FD', label: 'Email', value: companyContact.email, href: `mailto:${companyContact.email}` },
  { icon: 'mappin.and.ellipse', color: '#E84D3D', bg: '#FFF0EE', label: 'Διεύθυνση', value: companyContact.address },
];

const fieldStyle: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  borderRadius: 14,
  paddingLeft: 14,
  paddingRight: 14,
  paddingTop: 12,
  paddingBottom: 12,
  fontSize: 14,
  color: '#2D2D3A',
  border: '1px solid #F0F0EC',
  outline: 'none',
  width: '100%',
  fontFamily: 'var(--font-nunito), sans-serif',
};

function Label({ children }: { children: React.ReactNode }) {
  return <Text style={{ ...Fonts.bodySemiBold, fontSize: 11, color: '#8E8E9A', marginBottom: 6, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 0.6 }}>{children}</Text>;
}

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const onSend = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      window.alert('Συμπλήρωσε όλα τα πεδία για να στείλεις το μήνυμά σου.');
      return;
    }
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${companyContact.email}?subject=${encodeURIComponent(subject || 'Μήνυμα από την εφαρμογή Keanita')}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 96 }}>
      <ScreenHeader title="Επικοινωνία" subtitle="Θα χαρούμε να σε ακούσουμε" />

      {/* Company info */}
      <View style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 4 }}>
        <Text style={{ ...Fonts.displayHeavy, fontSize: 18, color: '#2D2D3A', marginBottom: 12 }}>{companyContact.name}</Text>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(45,45,58,0.05)' }}>
          {INFO.map((row, i) => (
            <AnimatedPress
              key={row.label}
              onPress={row.href ? () => { window.location.href = row.href!; } : undefined}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 14,
                paddingBottom: 14,
                borderBottom: i < INFO.length - 1 ? '1px solid #F0F0EC' : 'none',
              }}
            >
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: row.bg, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IconSymbol name={row.icon} size={17} color={row.color} />
              </View>
              <View style={{ marginLeft: 14, flex: 1, minWidth: 0 }}>
                <Text style={{ ...Fonts.body, fontSize: 11, color: '#B8B8C4' }}>{row.label}</Text>
                <Text style={{ ...Fonts.bodySemiBold, fontSize: 14, color: '#2D2D3A', marginTop: 2 }}>{row.value}</Text>
              </View>
              {row.href ? <IconSymbol name="chevron.right" size={14} color="#B8B8C4" /> : null}
            </AnimatedPress>
          ))}
        </View>
      </View>

      {/* Message form */}
      <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginLeft: 24, marginRight: 24, marginTop: 28, marginBottom: 12 }}>Στείλε μας μήνυμα</Text>
      <View style={{ paddingLeft: 24, paddingRight: 24 }}>
        <View style={{ marginBottom: 14 }}>
          <Label>Το όνομά σου</Label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Μαρία Γεωργίου" style={fieldStyle} />
        </View>
        <View style={{ marginBottom: 14 }}>
          <Label>Email</Label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={fieldStyle} />
        </View>
        <View style={{ marginBottom: 14 }}>
          <Label>Θέμα</Label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Πώς μπορούμε να βοηθήσουμε;" style={fieldStyle} />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Label>Μήνυμα</Label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Γράψε το μήνυμά σου…" rows={5} style={{ ...fieldStyle, resize: 'vertical', lineHeight: '20px' }} />
        </View>

        <PrimaryButton label={sent ? 'Άνοιγμα εφαρμογής email…' : 'Αποστολή μηνύματος'} icon="paperplane.fill" color="#E84D3D" onPress={onSend} />
      </View>
    </View>
  );
}
