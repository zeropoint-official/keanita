'use client';

import { useRouter } from 'next/navigation';
import { View, Text, Img, LinearGradient, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { useRewards } from '@/contexts/rewards';

const MOCK_USER = {
  displayName: 'Μαρία Παπαδοπούλου',
  email: 'maria@example.com',
};

interface MenuItem {
  icon: IconSymbolName;
  label: string;
  subtitle: string;
  color: string;
  bg: string;
  href?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { icon: 'bell.fill', label: 'Ειδοποιήσεις', subtitle: '3 νέες', color: '#E84D3D', bg: '#FFF0EE', href: '/notifications' },
  { icon: 'pencil', label: 'Επεξεργασία προφίλ', subtitle: 'Όνομα, τηλέφωνο, email', color: '#5DADE2', bg: '#EDF7FD', href: '/edit-profile' },
  { icon: 'gift.fill', label: 'Κατάλογος δώρων', subtitle: 'Εξαργύρωσε τους πόντους σου', color: '#FBBF24', bg: '#FFFBEB', href: '/gifts' },
  { icon: 'person.2.fill', label: 'Τα παιδιά μου', subtitle: 'Διαχείριση παιδιών', color: '#6BBF6A', bg: '#EEFBEE', href: '/edit-profile' },
  { icon: 'lock.fill', label: 'Αλλαγή κωδικού', subtitle: 'Ρυθμίσεις ασφαλείας', color: '#9B7FD4', bg: '#F4F0FA' },
  { icon: 'phone.fill', label: 'Επικοινωνία', subtitle: 'Έλα σε επαφή μαζί μας', color: '#F5A623', bg: '#FFF6E8' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { balance, streak, lifetimeEarned } = useRewards();
  const { displayName, email } = MOCK_USER;

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 120 }}>
      {/* Colored header */}
      <LinearGradient
        colors={['#E84D3D', '#F28B7D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 32, paddingBottom: 60, paddingLeft: 24, paddingRight: 24, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
      >
        <Text style={{ ...Fonts.displayHeavy, color: '#FFFFFF', fontSize: 24 }}>Το προφίλ μου</Text>

        {/* Profile info */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 16, padding: 8 }}>
            <Img src="/images/brand/mascot.png" style={{ width: 48, height: 48 }} contentFit="contain" />
          </View>
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={{ ...Fonts.bodyBold, color: '#FFFFFF', fontSize: 18 }}>{displayName}</Text>
            <Text style={{ ...Fonts.body, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{email}</Text>
          </View>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999, paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6 }}>
            <Text style={{ ...Fonts.bodySemiBold, color: '#FFFFFF', fontSize: 12 }}>Μέλος Keanita</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Points card — overlapping header */}
      <View style={{ marginLeft: 24, marginRight: 24, marginTop: -32 }}>
        <AnimatedPress onPress={() => router.push('/rewards')}>
          <LinearGradient
            colors={['#FBBF24', '#F5A623']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 24, padding: 18, boxShadow: '0 6px 14px rgba(245,166,35,0.25)' }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ ...Fonts.bodyBold, color: 'rgba(255,255,255,0.85)', fontSize: 12, letterSpacing: 1.5 }}>ΠΟΝΤΟΙ KEANITA</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 999, paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4 }}>
                <Text style={{ fontSize: 11 }}>🔥</Text>
                <Text style={{ ...Fonts.bodyBold, color: '#FFFFFF', fontSize: 11, marginLeft: 4 }}>{streak} ημέρες σερί</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 6 }}>
              <Text style={{ ...Fonts.displayHeavy, color: '#FFFFFF', fontSize: 38, lineHeight: '42px' }}>{balance.toLocaleString()}</Text>
              <Text style={{ ...Fonts.bodyBold, color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 6, marginLeft: 6 }}>KP</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
              <Text style={{ ...Fonts.body, color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>🏆 {lifetimeEarned.toLocaleString()} KP συνολικά</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...Fonts.bodyBold, color: '#FFFFFF', fontSize: 12 }}>Δες ανταμοιβές</Text>
                <IconSymbol name="chevron.right" size={14} color="#FFFFFF" />
              </View>
            </View>
          </LinearGradient>
        </AnimatedPress>
      </View>

      {/* Membership card */}
      <View style={{ marginLeft: 24, marginRight: 24, marginTop: 16 }}>
        <AnimatedPress>
          <View style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', boxShadow: '0 4px 12px rgba(232,77,61,0.2)' }}>
            <Img src="/images/brand/membership-card.png" style={{ width: '100%', height: 180 }} contentFit="cover" />
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16 }}>
              <Text style={{ ...Fonts.bodyBold, color: '#FFFFFF', fontSize: 12, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>ΜΕΛΟΣ ΑΠΟ ΤΟ 2024</Text>
            </View>
          </View>
        </AnimatedPress>
      </View>

      {/* Menu */}
      <View style={{ marginLeft: 24, marginRight: 24, marginTop: 24 }}>
        <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginBottom: 12 }}>Ρυθμίσεις</Text>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, overflow: 'hidden', boxShadow: '0 2px 12px rgba(45,45,58,0.05)' }}>
          {MENU_ITEMS.map((item, index) => (
            <AnimatedPress
              key={item.label}
              onPress={item.href ? () => router.push(item.href!) : undefined}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 16,
                paddingBottom: 16,
                borderBottom: index < MENU_ITEMS.length - 1 ? '1px solid #F0F0EC' : 'none',
              }}
            >
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: item.bg, alignItems: 'center', justifyContent: 'center' }}>
                <IconSymbol name={item.icon} size={17} color={item.color} />
              </View>
              <View style={{ marginLeft: 14, flex: 1 }}>
                <Text style={{ ...Fonts.body, fontSize: 14, color: '#2D2D3A' }}>{item.label}</Text>
                <Text style={{ ...Fonts.body, fontSize: 12, color: '#B8B8C4', marginTop: 2 }}>{item.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={14} color="#B8B8C4" />
            </AnimatedPress>
          ))}
        </View>
      </View>

      {/* Log out */}
      <View style={{ marginLeft: 24, marginRight: 24, marginTop: 20 }}>
        <AnimatedPress onPress={() => router.push('/login')}>
          <View style={{ alignItems: 'center', paddingTop: 14, paddingBottom: 14, backgroundColor: '#FFF0EE', borderRadius: 16 }}>
            <Text style={{ ...Fonts.bodySemiBold, color: '#E84D3D', fontSize: 14 }}>Αποσύνδεση</Text>
          </View>
        </AnimatedPress>
      </View>

      {/* Bottom illustration */}
      <View style={{ marginTop: 16 }}>
        <Img src="/images/brand/characters-scene.png" style={{ width: '100%', height: 80 }} contentFit="cover" contentPosition="top" />
      </View>
    </View>
  );
}
