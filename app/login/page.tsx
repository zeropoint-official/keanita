'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, Img, LinearGradient, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';

const inputStyle: React.CSSProperties = {
  backgroundColor: '#FAFAF7',
  borderRadius: 16,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 14,
  paddingBottom: 14,
  color: '#2D2D3A',
  border: '1px solid #F0F0EC',
  width: '100%',
  outline: 'none',
  ...Fonts.body,
  fontSize: 15,
};

const labelStyle: React.CSSProperties = {
  ...Fonts.bodySemiBold,
  fontSize: 12,
  color: '#8E8E9A',
  marginBottom: 6,
  marginLeft: 4,
};

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email.trim() || !password) {
      setError('Συμπλήρωσε το email και τον κωδικό σου.');
      return;
    }
    setError(null);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLoading(false);
    router.push('/');
  };

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh' }}>
      {/* Branded header */}
      <LinearGradient
        colors={['#E84D3D', '#F28B7D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 48,
          paddingBottom: 56,
          paddingLeft: 24,
          paddingRight: 24,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          alignItems: 'center',
        }}
      >
        <Img src="/images/brand/mascot.png" style={{ width: 96, height: 96 }} contentFit="contain" />
        <Text style={{ ...Fonts.displayHeavy, color: '#FFFFFF', fontSize: 30, marginTop: 12 }}>
          Καλώς όρισες ξανά!
        </Text>
        <Text style={{ ...Fonts.body, color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 }}>
          Συνδέσου στο Keanita Kids Club
        </Text>
      </LinearGradient>

      {/* Form card */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          marginLeft: 24,
          marginRight: 24,
          marginTop: -32,
          borderRadius: 24,
          padding: 24,
          boxShadow: '0 4px 16px rgba(45,45,58,0.08)',
        }}
      >
        <Text style={labelStyle}>EMAIL</Text>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoCapitalize="none"
          autoComplete="email"
          disabled={loading}
          style={inputStyle}
        />

        <Text style={{ ...labelStyle, marginTop: 16 }}>ΚΩΔΙΚΟΣ</Text>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          placeholder="Ο κωδικός σου"
          autoComplete="current-password"
          disabled={loading}
          style={inputStyle}
        />

        {error ? (
          <View style={{ backgroundColor: '#FFF0EE', borderRadius: 16, paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, marginTop: 16 }}>
            <Text style={{ ...Fonts.body, color: '#E84D3D', fontSize: 14 }}>{error}</Text>
          </View>
        ) : null}

        <AnimatedPress onPress={loading ? undefined : onSubmit} style={{ marginTop: 24 }}>
          <LinearGradient
            colors={loading ? ['#F28B7D', '#F4A99E'] : ['#E84D3D', '#F28B7D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 16, paddingTop: 16, paddingBottom: 16, alignItems: 'center' }}
          >
            <Text style={{ ...Fonts.bodyBold, color: '#FFFFFF', fontSize: 16 }}>
              {loading ? 'Σύνδεση…' : 'Σύνδεση'}
            </Text>
          </LinearGradient>
        </AnimatedPress>
      </View>

      <Text style={{ ...Fonts.body, textAlign: 'center', color: '#B8B8C4', fontSize: 12, marginTop: 24, paddingLeft: 40, paddingRight: 40 }}>
        Χρησιμοποίησε το ίδιο email και κωδικό από την παλιά εφαρμογή Keanita.
      </Text>
    </View>
  );
}
