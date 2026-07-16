'use client';

import { useState } from 'react';
import { ModalShell } from './modal-shell';
import { AnimatedPress, LinearGradient } from '@/lib/rn';
import { IconSymbol } from '../icon-symbol';

interface Props {
  visible: boolean;
  onClose: () => void;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  childName: string;
  childDob: string;
}

const initial: FormState = { firstName: '', lastName: '', email: '', mobile: '', childName: '', childDob: '' };

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div style={{ marginBottom: 12, display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: 11, fontWeight: 800, color: '#6B2F26', marginBottom: 6, letterSpacing: 0.6, textTransform: 'uppercase' }}>{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        style={{
          backgroundColor: '#F8F8F4',
          borderRadius: 14,
          paddingLeft: 14,
          paddingRight: 14,
          paddingTop: 12,
          paddingBottom: 12,
          fontSize: 14,
          color: '#2D2D3A',
          border: '1px solid #F0F0EC',
          outline: 'none',
          fontFamily: 'var(--font-nunito), sans-serif',
        }}
      />
    </div>
  );
}

export function JoinModal({ visible, onClose }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setStep(1);
    setForm(initial);
    setSubmitting(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const validateStep1 = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      window.alert('Συμπλήρωσε το όνομα και το επώνυμό σου.');
      return false;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      window.alert('Συμπλήρωσε ένα έγκυρο email.');
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!form.childName.trim()) {
      window.alert('Πρόσθεσε το όνομα του παιδιού σου.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      window.alert(`🎉 Καλώς ήρθες στο Club!\n\nΕυχαριστούμε ${form.firstName}! Το αίτημα συνδρομής για ${form.childName} επεξεργάζεται.`);
      handleClose();
    }, 700);
  };

  return (
    <ModalShell
      visible={visible}
      onClose={handleClose}
      chip={step === 1 ? 'ΒΗΜΑ 1 ΑΠΟ 2' : 'ΒΗΜΑ 2 ΑΠΟ 2'}
      title={step === 1 ? 'Τα στοιχεία σου' : 'Το παιδί σου'}
      subtitle={step === 1 ? 'Θα σου στείλουμε την επιβεβαίωση συνδρομής με email.' : 'Πρόσθεσε τα στοιχεία του παιδιού σου για την ΚΕΑΝΙΤΟ-κάρτα.'}
      accent="#6BBF6A"
      toolbar={
        <div style={{ paddingLeft: 22, paddingRight: 22, marginBottom: 12 }}>
          <div style={{ height: 6, backgroundColor: '#F0F0EC', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: step === 1 ? '50%' : '100%', backgroundColor: '#6BBF6A', borderRadius: 4, transition: 'width 0.3s' }} />
          </div>
        </div>
      }
    >
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', paddingLeft: 22, paddingRight: 22, paddingBottom: 22, display: 'flex', flexDirection: 'column' }}>
        {step === 1 ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <Field label="Όνομα" value={form.firstName} onChange={(v) => setForm((s) => ({ ...s, firstName: v }))} placeholder="Μαρία" />
              </div>
              <div style={{ flex: 1 }}>
                <Field label="Επώνυμο" value={form.lastName} onChange={(v) => setForm((s) => ({ ...s, lastName: v }))} placeholder="Γεωργίου" />
              </div>
            </div>
            <Field label="Email" value={form.email} onChange={(v) => setForm((s) => ({ ...s, email: v }))} placeholder="parent@email.com" type="email" />
            <Field label="Κινητό" value={form.mobile} onChange={(v) => setForm((s) => ({ ...s, mobile: v }))} placeholder="+357 99 ..." type="tel" />

            <AnimatedPress onPress={() => { if (validateStep1()) setStep(2); }} style={{ marginTop: 6 }}>
              <LinearGradient
                colors={['#6BBF6A', '#5AA959']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 14, paddingTop: 14, paddingBottom: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
              >
                <span style={{ color: '#FFFFFF', fontSize: 14.5, fontWeight: 900 }}>Συνέχεια</span>
                <IconSymbol name="arrow.right" size={15} color="#FFFFFF" />
              </LinearGradient>
            </AnimatedPress>
          </>
        ) : (
          <>
            <Field label="Όνομα παιδιού" value={form.childName} onChange={(v) => setForm((s) => ({ ...s, childName: v }))} placeholder="Άννα" />
            <Field label="Γενέθλια παιδιού" value={form.childDob} onChange={(v) => setForm((s) => ({ ...s, childDob: v }))} placeholder="ΗΗ / ΜΜ / ΕΕΕΕ" />

            <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <AnimatedPress style={{ flex: 1 }} onPress={() => setStep(1)}>
                <div style={{ backgroundColor: '#F4F4F0', borderRadius: 14, paddingTop: 14, paddingBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#2D2D3A', fontSize: 14, fontWeight: 800 }}>Πίσω</span>
                </div>
              </AnimatedPress>
              <AnimatedPress style={{ flex: 2 }} onPress={submitting ? undefined : onSubmit}>
                <LinearGradient
                  colors={['#E84D3D', '#F5A623']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ borderRadius: 14, paddingTop: 14, paddingBottom: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
                >
                  <span style={{ color: '#FFFFFF', fontSize: 14.5, fontWeight: 900 }}>{submitting ? 'Αποστολή...' : 'Γίνε μέλος'}</span>
                  {!submitting && <IconSymbol name="checkmark" size={15} color="#FFFFFF" />}
                </LinearGradient>
              </AnimatedPress>
            </div>

            <span style={{ fontSize: 10.5, color: '#B8B8C4', textAlign: 'center', marginTop: 14, lineHeight: '15px' }}>
              Με την εγγραφή αποδέχεσαι τους όρους του ΚΕΑΝΙΤΟ Kids Club &amp; τη γονική συναίνεση.
            </span>
          </>
        )}
      </div>
    </ModalShell>
  );
}
