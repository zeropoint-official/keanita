'use client';

import { motion } from 'framer-motion';
import { View, Text, Img, LinearGradient } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { ScreenHeader } from '@/components/ui/screen-header';
import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';

interface Milestone {
  year: string;
  title: string;
  body: string;
}

interface ValueItem {
  icon: IconSymbolName;
  color: string;
  bg: string;
  title: string;
  body: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '1981',
    title: 'Το πρώτο κουτάκι',
    body: 'Η KEANITA γεννήθηκε ως το πρώτο κουτάκι χυμού για παιδιά στην Κύπρο — μια πεντανόστιμη απόλαυση φτιαγμένη με φροντίδα.',
  },
  {
    year: '1995',
    title: 'Η οικογένεια μεγαλώνει',
    body: 'Νέες γεύσεις μπήκαν στην παρέα — μάνγκο, Frumix και άλλες — σχεδιασμένες γύρω από αυτά που πραγματικά αγαπούν τα παιδιά.',
  },
  {
    year: '2010',
    title: 'Σε όλο τον κόσμο',
    body: 'Η KEANITA επεκτάθηκε σε 42 χώρες σε 5 ηπείρους — φέρνοντας τη γεύση της Κύπρου σε οικογένειες παντού.',
  },
  {
    year: 'Σήμερα',
    title: 'Ένα ταξίδι γεύσης',
    body: 'Ένα ταξίδι γεύσης, μάθησης και διασκέδασης — για τα παιδιά και όσους νιώθουν παιδιά. Η οικογένεια συνεχίζει να μεγαλώνει.',
  },
];

const VALUES: ValueItem[] = [
  {
    icon: 'leaf.fill',
    color: '#53B41A',
    bg: '#EAF7E0',
    title: 'Αγνά συστατικά',
    body: 'Φυσικός χυμός, χωρίς συντηρητικά, με τη σωστή ισορροπία ενέργειας για δραστήρια πιτσιρίκια.',
  },
  {
    icon: 'heart.fill',
    color: '#E60C10',
    bg: '#FFECEA',
    title: 'Φτιαγμένο για παιδιά',
    body: 'Κάθε γεύση και συσκευασία σχεδιάζεται για παιδιά 1–12 ετών — διασκεδαστική, ασφαλής και θρεπτική.',
  },
  {
    icon: 'sparkles',
    color: '#9C2BB4',
    bg: '#F7EAFA',
    title: 'Λίγη μαγεία',
    body: 'Μέσα από χαρακτήρες, παιχνίδια και ανταμοιβές μετατρέπουμε ένα ρόφημα σε μια μικρή περιπέτεια.',
  },
];

const STATS = [
  { value: '42', label: 'Χώρες' },
  { value: '5', label: 'Ήπειροι' },
  { value: '40+', label: 'Χρόνια' },
];

export default function AboutScreen() {
  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 110 }}>
      {/* Hero */}
      <LinearGradient
        colors={['#E60C10', '#F5820D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}
      >
        <ScreenHeader title="Η ιστορία μας" tint="#FFFFFF" transparent />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
          <View style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 40, paddingTop: 8 }}>
            <View style={{ alignSelf: 'flex-start', borderRadius: 999, paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4, marginBottom: 12, backgroundColor: 'rgba(255,255,255,0.22)' }}>
              <Text style={{ ...Fonts.bodyBold, color: '#FFFFFF', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>Από το 1981</Text>
            </View>
            <Text style={{ ...Fonts.displayHeavy, color: '#FFFFFF', fontSize: 28, lineHeight: '36px' }}>Καλώς ήρθες στην οικογένεια KEANITA</Text>
            <Text style={{ ...Fonts.bodySemiBold, color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 12, lineHeight: '20px' }}>
              Ένα ταξίδι γεύσης, διασκέδασης και καλής διάθεσης — μέσα σε κάθε κουτάκι.
            </Text>
          </View>
        </motion.div>
      </LinearGradient>

      {/* Intro card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 16 }}>
        <View style={{ marginLeft: 24, marginRight: 24, marginTop: -28, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, boxShadow: '0 6px 16px rgba(45,45,58,0.08)' }}>
          <Text style={{ ...Fonts.body, fontSize: 14, color: '#5A5A66', lineHeight: '24px' }}>
            Από το 1981, όταν εμφανίστηκε το πρώτο κουτάκι χυμού KEANITA, μέχρι σήμερα, η οικογένεια KEANITA δεν σταμάτησε ποτέ να μεγαλώνει.{'\n\n'}Συνδυάζοντας την κληρονομιά του χθες με τις απαιτήσεις του αύριο — και μένοντας πάντα πιστή στις αξίες της — η KEANITA κρατά μια ξεχωριστή θέση στις καρδιές μικρών και μεγάλων.{'\n\n'}
            <Text style={{ ...Fonts.bodySemiBold, color: '#2D2D3A' }}>
              Χιλιάδες άνθρωποι σε 42 χώρες σε 5 ηπείρους απολαμβάνουν την αγαπημένη τους KEANITA κάθε μέρα.
            </Text>
          </Text>
        </View>
      </motion.div>

      {/* Stats strip */}
      <View style={{ marginLeft: 24, marginRight: 24, marginTop: 20, flexDirection: 'row', gap: 12 }}>
        {STATS.map((stat) => (
          <View key={stat.label} style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, paddingTop: 16, paddingBottom: 16, boxShadow: '0 2px 8px rgba(45,45,58,0.05)' }}>
            <Text style={{ ...Fonts.displayHeavy, fontSize: 24, color: '#2D2D3A' }}>{stat.value}</Text>
            <Text style={{ ...Fonts.bodySemiBold, fontSize: 11, color: '#B8B8C4', marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Values */}
      <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginLeft: 24, marginRight: 24, marginTop: 32, marginBottom: 12 }}>Οι αξίες μας</Text>
      <View style={{ marginLeft: 24, marginRight: 24 }}>
        {VALUES.map((v, i) => (
          <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, type: 'spring', stiffness: 120, damping: 16 }}>
            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', boxShadow: '0 1px 8px rgba(45,45,58,0.05)' }}>
              <View style={{ width: 46, height: 46, borderRadius: 15, backgroundColor: v.bg, alignItems: 'center', justifyContent: 'center' }}>
                <IconSymbol name={v.icon} size={22} color={v.color} />
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={{ ...Fonts.bodyBold, fontSize: 16, color: '#2D2D3A' }}>{v.title}</Text>
                <Text style={{ ...Fonts.body, fontSize: 12, color: '#5A5A66', marginTop: 2, lineHeight: '16px' }}>{v.body}</Text>
              </View>
            </View>
          </motion.div>
        ))}
      </View>

      {/* Timeline */}
      <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginLeft: 24, marginRight: 24, marginTop: 32, marginBottom: 12 }}>Το ταξίδι μας</Text>
      <View style={{ marginLeft: 24, marginRight: 24 }}>
        {MILESTONES.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.09, type: 'spring', stiffness: 120, damping: 16 }}
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 12 }}
          >
            {/* Year column */}
            <View style={{ width: 64, alignItems: 'center' }}>
              <View style={{ borderRadius: 999, paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6, backgroundColor: '#FFF0E0' }}>
                <Text style={{ ...Fonts.displayHeavy, fontSize: 11, color: '#F5820D' }}>{m.year}</Text>
              </View>
              {i < MILESTONES.length - 1 ? <View style={{ width: 2, flex: 1, backgroundColor: '#F0E2C5', marginTop: 4 }} /> : null}
            </View>
            {/* Card */}
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, boxShadow: '0 1px 6px rgba(45,45,58,0.04)' }}>
              <Text style={{ ...Fonts.bodyBold, fontSize: 14, color: '#2D2D3A' }}>{m.title}</Text>
              <Text style={{ ...Fonts.body, fontSize: 12, color: '#5A5A66', marginTop: 4, lineHeight: '16px' }}>{m.body}</Text>
            </View>
          </motion.div>
        ))}
      </View>

      {/* Closing quote */}
      <View style={{ marginLeft: 24, marginRight: 24, marginTop: 24 }}>
        <LinearGradient colors={['#12AEEB', '#9C2BB4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 26, padding: 22 }}>
          <Text style={{ ...Fonts.bodySemiBold, color: '#FFFFFF', fontSize: 16, lineHeight: '24px' }}>
            Η KEANITA είναι ένα ταξίδι γεύσης, γνώσης και διασκέδασης — που μπορεί να μας πάει μέχρι το φεγγάρι. 🌙
          </Text>
        </LinearGradient>
      </View>

      {/* Characters scene */}
      <View style={{ marginTop: 32, marginLeft: 24, marginRight: 24 }}>
        <View style={{ borderRadius: 24, overflow: 'hidden', position: 'relative' }}>
          <Img src="/images/brand/characters-scene.png" style={{ width: '100%', height: 110 }} contentFit="cover" contentPosition="center" />
        </View>
      </View>
    </View>
  );
}
