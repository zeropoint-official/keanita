'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, Img, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { ScreenHeader } from '@/components/ui/screen-header';
import { PrimaryButton } from '@/components/ui/primary-button';

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ ...Fonts.bodyBold, fontSize: 11, color: '#5A5A66', marginBottom: 6, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 0.6 }}>{label}</Text>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 14,
          paddingBottom: 14,
          fontSize: 15,
          color: '#2D2D3A',
          border: `1.5px solid ${focused ? '#E60C10' : '#F0F0EC'}`,
          outline: 'none',
          width: '100%',
          fontFamily: 'var(--font-nunito), sans-serif',
        }}
      />
    </View>
  );
}

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('Χρήστης Keanita');
  const [phone, setPhone] = useState('+357 99 123 456');
  const [email, setEmail] = useState('parent@keanita.com');
  const [childName, setChildName] = useState('Σοφία');
  const [childBirthday, setChildBirthday] = useState('14 Μαρτίου 2018');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => router.back(), 700);
  };

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 110 }}>
      <ScreenHeader title="Επεξεργασία προφίλ" subtitle="Κράτα τα στοιχεία σου ενημερωμένα" />

      <View style={{ paddingLeft: 24, paddingRight: 24 }}>
        {/* Avatar */}
        <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 24 }}>
          <View style={{ backgroundColor: '#FFECEA', borderRadius: 999, padding: 12 }}>
            <Img src="/images/brand/mascot.png" style={{ width: 72, height: 72 }} contentFit="contain" />
          </View>
          <AnimatedPress onPress={() => {}}>
            <Text style={{ ...Fonts.bodyBold, fontSize: 12, color: '#E60C10', marginTop: 10 }}>Αλλαγή φωτογραφίας</Text>
          </AnimatedPress>
        </View>

        <Text style={{ ...Fonts.bodyBold, fontSize: 14, color: '#2D2D3A', marginBottom: 12 }}>Στοιχεία γονέα</Text>
        <Field label="ΟΝΟΜΑΤΕΠΩΝΥΜΟ" value={name} onChange={setName} />
        <Field label="ΤΗΛΕΦΩΝΟ" value={phone} onChange={setPhone} type="tel" />
        <Field label="EMAIL" value={email} onChange={setEmail} type="email" />

        <Text style={{ ...Fonts.bodyBold, fontSize: 14, color: '#2D2D3A', marginBottom: 12, marginTop: 12 }}>Στοιχεία παιδιού</Text>
        <Field label="ΟΝΟΜΑ ΠΑΙΔΙΟΥ" value={childName} onChange={setChildName} />
        <Field label="ΓΕΝΕΘΛΙΑ ΠΑΙΔΙΟΥ" value={childBirthday} onChange={setChildBirthday} />

        <View style={{ marginTop: 12 }}>
          <PrimaryButton
            label={saved ? 'Αποθηκεύτηκε!' : 'Αποθήκευση αλλαγών'}
            icon={saved ? 'checkmark' : undefined}
            color={saved ? '#53B41A' : '#E60C10'}
            onPress={handleSave}
          />
        </View>
      </View>
    </View>
  );
}
