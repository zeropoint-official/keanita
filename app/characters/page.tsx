'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { View, Text, Img, LinearGradient, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { CharacterAvatar } from '@/components/ui/character-avatar';
import { characters } from '@/data/mock/characters';

export default function CharactersScreen() {
  const [activeId, setActiveId] = useState(characters[0].id);
  const active = characters.find((c) => c.id === activeId)!;

  const facts = [
    { icon: '/images/icons/activity.png', label: `Ο/Η ${active.name} γεννήθηκε στους ηλιόλουστους οπωρώνες της Κύπρου` },
    { icon: '/images/icons/vitamin-icon.png', label: 'Γεμάτο βιταμίνη C για σούπερ ενέργεια!' },
    { icon: '/images/icons/no-preservatives.png', label: 'Χωρίς συντηρητικά — μόνο καθαρή φρουτένια διασκέδαση' },
  ];

  return (
    <View style={{ backgroundColor: '#FAFAF7', minHeight: '100dvh', paddingBottom: 120 }}>
      {/* Colored header */}
      <LinearGradient
        colors={['#9B7FD4', '#C4B5FD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 32, paddingBottom: 28, paddingLeft: 24, paddingRight: 24, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
      >
        <Text style={{ ...Fonts.displayHeavy, color: '#FFFFFF', fontSize: 24 }}>Χαρακτήρες</Text>
        <Text style={{ ...Fonts.body, color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 4 }}>
          Γνώρισε τους φρουτένιους φίλους της Keanita
        </Text>
      </LinearGradient>

      {/* Character selector */}
      <div
        className="no-scrollbar"
        style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', paddingLeft: 24, paddingRight: 24, paddingTop: 20, paddingBottom: 8 }}
      >
        {characters.map((c) => (
          <CharacterAvatar key={c.id} character={c} isActive={c.id === activeId} onPress={() => setActiveId(c.id)} size="lg" />
        ))}
      </div>

      {/* Profile card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ marginLeft: 24, marginRight: 24, marginTop: 16 }}
        >
          <View style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 6px 20px rgba(45,45,58,0.1)' }}>
            {/* Colored top with character */}
            <LinearGradient
              colors={[active.accentColor, active.accentColor + '99']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ alignItems: 'center', paddingTop: 28, paddingBottom: 40 }}
            >
              <View style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 999, padding: 12 }}>
                <Img src={active.image} style={{ width: 100, height: 100 }} contentFit="contain" />
              </View>
            </LinearGradient>

            {/* White info section */}
            <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -20, paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 }}>
              <Text style={{ ...Fonts.displayHeavy, fontSize: 20, color: '#2D2D3A', textAlign: 'center' }}>{active.name}</Text>
              <Text style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', textAlign: 'center', marginTop: 4 }}>{active.tagline}</Text>

              {/* Favorite juice pill */}
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: active.bgColor,
                  borderRadius: 12,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 8,
                  paddingBottom: 8,
                }}
              >
                <Img src="/images/icons/juice-icon.png" style={{ width: 20, height: 20 }} contentFit="contain" />
                <Text style={{ ...Fonts.bodySemiBold, fontSize: 12, color: active.accentColor }}>
                  Αγαπά: {active.favoriteJuice}
                </Text>
              </View>

              {/* Description */}
              <Text style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', lineHeight: '20px', marginTop: 20, textAlign: 'center' }}>
                {active.description}
              </Text>

              {/* CTA */}
              <AnimatedPress style={{ marginTop: 20 }}>
                <View style={{ backgroundColor: active.accentColor, borderRadius: 16, paddingTop: 14, paddingBottom: 14, alignItems: 'center' }}>
                  <Text style={{ ...Fonts.bodySemiBold, color: '#FFFFFF', fontSize: 14 }}>Δες σελίδες ζωγραφικής</Text>
                </View>
              </AnimatedPress>
            </View>
          </View>
        </motion.div>
      </AnimatePresence>

      {/* Fun facts */}
      <View style={{ marginLeft: 24, marginRight: 24, marginTop: 32 }}>
        <Text style={{ ...Fonts.displayMedium, fontSize: 18, color: '#2D2D3A', marginBottom: 12 }}>Διασκεδαστικά στοιχεία</Text>
        {facts.map((fact, i) => (
          <motion.div
            key={`${active.id}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 120, damping: 16 }}
          >
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 16,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                boxShadow: '0 1px 6px rgba(45,45,58,0.04)',
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: active.bgColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Img src={fact.icon} style={{ width: 24, height: 24 }} contentFit="contain" />
              </View>
              <Text style={{ ...Fonts.body, fontSize: 14, color: '#2D2D3A', flex: 1 }}>{fact.label}</Text>
            </View>
          </motion.div>
        ))}
      </View>

      {/* Bottom characters illustration */}
      <View style={{ marginTop: 16 }}>
        <Img src="/images/brand/characters-scene.png" style={{ width: '100%', height: 80 }} contentFit="cover" contentPosition="top" />
      </View>
    </View>
  );
}
