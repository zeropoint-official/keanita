'use client';

import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Fonts } from '@/constants/fonts';
import { IconSymbol, type IconSymbolName } from './icon-symbol';

interface Props {
  visible: boolean;
  onClose: () => void;
}

interface NavLink {
  label: string;
  icon: IconSymbolName;
  color: string;
  bg: string;
  href: string;
}

const PRIMARY_LINKS: NavLink[] = [
  { label: 'Home', icon: 'house.fill', color: '#E84D3D', bg: '#FFF0EE', href: '/' },
  { label: 'Our Story', icon: 'sparkles', color: '#9B7FD4', bg: '#F4F0FA', href: '/about' },
  { label: 'Products', icon: 'leaf.fill', color: '#6BBF6A', bg: '#EEFBEE', href: '/products' },
  { label: 'Seminars', icon: 'newspaper.fill', color: '#5DADE2', bg: '#EDF7FD', href: '/seminars' },
  { label: 'Events', icon: 'calendar', color: '#F5A623', bg: '#FFF6E8', href: '/events' },
  { label: 'Kids Club', icon: 'star.fill', color: '#FBBF24', bg: '#FFFBEB', href: '/kids-club' },
];

const SECONDARY_LINKS: NavLink[] = [
  { label: 'Rewards', icon: 'gift.fill', color: '#E84D3D', bg: '#FFF0EE', href: '/rewards' },
  { label: 'Profile', icon: 'person.fill', color: '#2D2D3A', bg: '#F0F0EC', href: '/profile' },
  { label: 'Notifications', icon: 'bell.fill', color: '#5DADE2', bg: '#EDF7FD', href: '/notifications' },
];

export function NavDrawer({ visible, onClose }: Props) {
  const router = useRouter();

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {visible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 430,
            display: 'flex',
            flexDirection: 'row',
            zIndex: 60,
          }}
        >
          {/* Drawer panel */}
          <motion.div
            initial={{ x: '-110%' }}
            animate={{ x: 0 }}
            exit={{ x: '-110%' }}
            transition={{ duration: 0.26, ease: [0.33, 1, 0.68, 1] }}
            style={{
              width: '86%',
              backgroundColor: '#FAFAF7',
              borderTopRightRadius: 28,
              borderBottomRightRadius: 28,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 2,
            }}
          >
            {/* Brand header */}
            <div
              style={{
                backgroundImage: 'linear-gradient(135deg, #E84D3D, #F5A623)',
                paddingTop: 28,
                paddingBottom: 22,
                paddingLeft: 22,
                paddingRight: 22,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/brand/logo.png" alt="Keanita" style={{ width: 32, height: 28, objectFit: 'contain' }} />
                  </div>
                  <div>
                    <span style={{ ...Fonts.body, color: '#FFFFFF', fontSize: 12, opacity: 0.8, display: 'block' }}>
                      Welcome to
                    </span>
                    <span style={{ ...Fonts.displayHeavy, color: '#FFFFFF', fontSize: 20, display: 'block' }}>
                      KEANITA
                    </span>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    backgroundColor: 'rgba(255,255,255,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <IconSymbol name="xmark" size={18} color="#FFFFFF" />
                </motion.button>
              </div>

              <span style={{ ...Fonts.body, color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 16, lineHeight: '20px', display: 'block' }}>
                Tasty, healthy goodness for kids — since 1981 🍊
              </span>
            </div>

            {/* Links */}
            <div className="no-scrollbar" style={{ overflowY: 'auto', paddingBottom: 28, flex: 1 }}>
              <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 20 }}>
                <span style={{ ...Fonts.bodyBold, fontSize: 11, color: '#B8B8C4', textTransform: 'uppercase', letterSpacing: 1, paddingLeft: 8, marginBottom: 8, display: 'block' }}>
                  Explore
                </span>
                {PRIMARY_LINKS.map((link) => (
                  <DrawerLink key={link.label} link={link} onPress={() => go(link.href)} />
                ))}
              </div>

              <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 20 }}>
                <span style={{ ...Fonts.bodyBold, fontSize: 11, color: '#B8B8C4', textTransform: 'uppercase', letterSpacing: 1, paddingLeft: 8, marginBottom: 8, display: 'block' }}>
                  Your account
                </span>
                {SECONDARY_LINKS.map((link) => (
                  <DrawerLink key={link.label} link={link} onPress={() => go(link.href)} />
                ))}
              </div>

              <div style={{ margin: 16, marginTop: 24, padding: 16, backgroundColor: '#FFFFFF', borderRadius: 16 }}>
                <span style={{ ...Fonts.body, fontSize: 11, color: '#B8B8C4', display: 'block' }}>
                  © {new Date().getFullYear()} KEANITA
                </span>
                <span style={{ ...Fonts.body, fontSize: 11, color: '#B8B8C4', marginTop: 4, display: 'block' }}>
                  v1.0 · Made with 🧡
                </span>
              </div>
            </div>
          </motion.div>

          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ flex: 1, backgroundColor: 'rgba(20,18,28,0.45)' }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}

function DrawerLink({ link, onPress }: { link: NavLink; onPress: () => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={onPress}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 4,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 13,
          backgroundColor: link.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconSymbol name={link.icon} size={20} color={link.color} />
      </div>
      <span style={{ ...Fonts.bodySemiBold, marginLeft: 12, fontSize: 15, color: '#2D2D3A', flex: 1 }}>
        {link.label}
      </span>
      <IconSymbol name="chevron.right" size={16} color="#B8B8C4" />
    </motion.div>
  );
}
