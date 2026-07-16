'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useRewards } from '@/contexts/rewards';
import { Fonts } from '@/constants/fonts';

// ─── Game constants ───
const BIRD_SIZE = 60;
const GRAVITY = 0.5;
const JUMP_FORCE = -9;
const GROUND_HEIGHT = 110;
const BIRD_FLOOR_OFFSET = 45;
const TICK_MS = 16;

const OBJECT_SIZE = 44;
const BOMB_SIZE = 40;
const BASE_SPEED = 2.5;
const MAX_SPEED = 5.5;
const SPAWN_INTERVAL_BASE = 55;
const SPAWN_INTERVAL_MIN = 28;
const BOMB_CHANCE_BASE = 0.3;
const BOMB_CHANCE_MAX = 0.6;
const MAX_LIVES = 3;
const BASKETBALL_SIZE = 52;
const BASKETBALL_EVERY = 10;

type GameState = 'idle' | 'playing' | 'dead' | 'paused' | 'countdown';

interface GameObject {
  x: number;
  y: number;
  type: 'fruit' | 'bomb' | 'basketball';
  fruitIndex: number;
  hit: boolean;
}

const FRUIT_EMOJIS = ['🍊', '🥭', '🍇', '🍓', '🍏'];
const FRUIT_COUNT = 5;

const BASKETBALL_IMG = '/game/basketball.png';
const ATHLOKINISI_LOGO = '/game/athlokinish-logo.png';
const CHARACTER_IMG = '/game/charachter.png';
const BACKGROUND_IMG = '/game/backround-image.png';
const CLOUD1_IMG = '/game/cloud1.png';
const CLOUD2_IMG = '/game/cloud2.png';
const BUSH_IMG = '/game/bush.png';
const GRASS1_IMG = '/game/grass1.png';
const GRASS2_IMG = '/game/grass2.png';
const GRASS3_IMG = '/game/grass3.png';

const CONFETTI: { x: number; y: number; size: number; color: string; rotate: number; round?: boolean }[] = [
  { x: -78, y: -42, size: 9, color: '#2F80ED', rotate: 24, round: true },
  { x: -64, y: 18, size: 8, color: '#F5A623', rotate: -18 },
  { x: -88, y: -4, size: 7, color: '#E84D3D', rotate: 40 },
  { x: 72, y: -48, size: 8, color: '#27AE60', rotate: -30 },
  { x: 86, y: 2, size: 9, color: '#2F80ED', rotate: 15 },
  { x: 66, y: 30, size: 7, color: '#F5A623', rotate: -45, round: true },
  { x: -40, y: -62, size: 7, color: '#9B51E0', rotate: 60 },
  { x: 38, y: -66, size: 8, color: '#E84D3D', rotate: -12, round: true },
  { x: -10, y: -74, size: 7, color: '#27AE60', rotate: 30 },
  { x: 50, y: 52, size: 7, color: '#9B51E0', rotate: -60 },
  { x: -52, y: 48, size: 8, color: '#2F80ED', rotate: 75, round: true },
];

interface ScrollItem {
  source: string;
  w: number;
  h: number;
  duration: number;
  delay: number;
  opacity: number;
  top?: number;
  bottom?: number;
}

// ─── Scrolling decoration (clouds & bushes) ───
function ScrollingDeco({ item, screenW }: { item: ScrollItem; screenW: number }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        top: item.top,
        bottom: item.bottom,
        width: item.w,
        height: item.h,
        opacity: item.opacity,
        pointerEvents: 'none',
      }}
      initial={{ x: screenW + 40 }}
      animate={{ x: -item.w - 40 }}
      transition={{
        duration: item.duration / 1000,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
        delay: item.delay / 1000,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.source} alt="" style={{ width: item.w, height: item.h, objectFit: 'contain' }} />
    </motion.div>
  );
}

// ─── Swaying grass layer ───
function GrassLayer({
  source,
  height,
  bottom,
  opacity,
  width,
  swayAmount,
  swayDuration,
  swayDelay,
  bobAmount,
  screenW,
}: {
  source: string;
  height: number;
  bottom: number;
  opacity: number;
  width: number;
  swayAmount: number;
  swayDuration: number;
  swayDelay: number;
  bobAmount: number;
  screenW: number;
}) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: (screenW - width) / 2,
        bottom,
        width,
        height,
        opacity,
        pointerEvents: 'none',
      }}
      animate={{ x: [-swayAmount, swayAmount], y: [0, -bobAmount] }}
      transition={{
        x: { duration: swayDuration / 1000, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: swayDelay / 1000 },
        y: { duration: (swayDuration * 1.3) / 1000, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: swayDelay / 2000 },
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={source} alt="" style={{ width, height, objectFit: 'cover' }} />
    </motion.div>
  );
}

const CLOUDS: ScrollItem[] = [
  { source: CLOUD1_IMG, w: 140, h: 80, duration: 32000, delay: 0, opacity: 0.95, top: 70 },
  { source: CLOUD2_IMG, w: 110, h: 65, duration: 40000, delay: 7000, opacity: 0.85, top: 130 },
  { source: CLOUD1_IMG, w: 95, h: 55, duration: 46000, delay: 16000, opacity: 0.7, top: 200 },
  { source: CLOUD2_IMG, w: 160, h: 95, duration: 36000, delay: 22000, opacity: 0.9, top: 50 },
  { source: CLOUD1_IMG, w: 80, h: 50, duration: 52000, delay: 30000, opacity: 0.6, top: 170 },
];

const BACK_BUSHES: ScrollItem[] = [
  { source: BUSH_IMG, w: 75, h: 48, duration: 22000, delay: 0, opacity: 0.5, bottom: GROUND_HEIGHT - 30 },
  { source: BUSH_IMG, w: 95, h: 60, duration: 18000, delay: 6000, opacity: 0.65, bottom: GROUND_HEIGHT - 40 },
  { source: BUSH_IMG, w: 110, h: 70, duration: 20000, delay: 13000, opacity: 0.6, bottom: GROUND_HEIGHT - 35 },
];

const FRONT_BUSHES: ScrollItem[] = [
  { source: BUSH_IMG, w: 130, h: 82, duration: 13000, delay: 2000, opacity: 0.95, bottom: 4 },
  { source: BUSH_IMG, w: 100, h: 65, duration: 16000, delay: 8000, opacity: 0.9, bottom: 10 },
  { source: BUSH_IMG, w: 155, h: 98, duration: 11000, delay: 15000, opacity: 1, bottom: -8 },
  { source: BUSH_IMG, w: 115, h: 72, duration: 14000, delay: 22000, opacity: 0.92, bottom: 6 },
];

export default function FruitFrenzy() {
  const { earn } = useRewards();

  // Measured play-area size (the game fills the phone frame).
  const rootRef = useRef<HTMLDivElement>(null);
  const wRef = useRef(0);
  const hRef = useRef(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [birdScreenY, setBirdScreenY] = useState(0);
  const [birdRot, setBirdRot] = useState(0);
  const [flash, setFlash] = useState(0);
  const [countdown, setCountdown] = useState(3);

  const birdY = useRef(0);
  const vel = useRef(0);
  const objectsRef = useRef<GameObject[]>([]);
  const scoreRef = useRef(0);
  const livesRef = useRef(MAX_LIVES);
  const stateRef = useRef<GameState>('idle');
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickCount = useRef(0);
  const nextSpawnAt = useRef(30);
  const gameTime = useRef(0);
  const nextBasketballAt = useRef(BASKETBALL_EVERY);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const playAreaTop = () => 60;
  const playAreaBottom = () => hRef.current - GROUND_HEIGHT;
  const birdX = () => wRef.current * 0.3;

  // Measure the container and keep it in sync with resize.
  useLayoutEffect(() => {
    const measure = () => {
      const el = rootRef.current;
      if (!el) return;
      wRef.current = el.clientWidth;
      hRef.current = el.clientHeight;
      setDims({ w: el.clientWidth, h: el.clientHeight });
      if (stateRef.current === 'idle') {
        birdY.current = playAreaBottom() / 2;
        setBirdScreenY(birdY.current);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  const stopLoop = useCallback(() => {
    if (loopRef.current) {
      clearInterval(loopRef.current);
      loopRef.current = null;
    }
  }, []);

  const getCurrentSpeed = useCallback(() => {
    const t = Math.min(gameTime.current / 3600, 1);
    return BASE_SPEED + (MAX_SPEED - BASE_SPEED) * t;
  }, []);

  const getBombChance = useCallback(() => {
    const t = Math.min(gameTime.current / 3600, 1);
    return BOMB_CHANCE_BASE + (BOMB_CHANCE_MAX - BOMB_CHANCE_BASE) * t;
  }, []);

  const getSpawnInterval = useCallback(() => {
    const t = Math.min(gameTime.current / 3600, 1);
    return Math.round(SPAWN_INTERVAL_BASE - (SPAWN_INTERVAL_BASE - SPAWN_INTERVAL_MIN) * t);
  }, []);

  const spawnObject = useCallback(() => {
    const margin = 60;
    const top = playAreaTop();
    const bottom = playAreaBottom();
    const y = top + margin + Math.random() * (bottom - top - margin * 2);

    let type: GameObject['type'];
    if (scoreRef.current >= nextBasketballAt.current) {
      type = 'basketball';
      nextBasketballAt.current += BASKETBALL_EVERY;
    } else {
      type = Math.random() < getBombChance() ? 'bomb' : 'fruit';
    }

    objectsRef.current.push({
      x: wRef.current + 30,
      y,
      type,
      fruitIndex: Math.floor(Math.random() * FRUIT_COUNT),
      hit: false,
    });
  }, [getBombChance]);

  const onCollectFruit = useCallback((obj: GameObject) => {
    obj.hit = true;
    scoreRef.current += 1;
    setScore(scoreRef.current);
  }, []);

  const onCollectBasketball = useCallback(
    (obj: GameObject) => {
      obj.hit = true;
      stateRef.current = 'paused';
      setGameState('paused');
      stopLoop();
      setBirdScreenY(birdY.current);
      setObjects([...objectsRef.current]);
    },
    [stopLoop],
  );

  const onHitBomb = useCallback(
    (obj: GameObject) => {
      obj.hit = true;
      livesRef.current -= 1;
      setLives(livesRef.current);
      vel.current += 4;

      setFlash(0.4);
      setTimeout(() => setFlash(0), 300);

      if (livesRef.current <= 0) {
        stateRef.current = 'dead';
        setGameState('dead');
        setBestScore((prev) => Math.max(prev, scoreRef.current));
        stopLoop();
        setBirdScreenY(birdY.current);
        const earned = scoreRef.current + 5;
        earn(earned, `Φρουτοτρέλα — ${scoreRef.current} φρούτα`, 'game');
      }
    },
    [stopLoop, earn],
  );

  const tick = useCallback(() => {
    if (stateRef.current !== 'playing') return;

    const top = playAreaTop();
    const bottom = playAreaBottom();

    tickCount.current += 1;
    gameTime.current += 1;
    const speed = getCurrentSpeed();

    vel.current += GRAVITY;
    birdY.current += vel.current;

    setBirdRot(Math.min(Math.max(vel.current * 4, -30), 70));

    if (birdY.current > bottom - BIRD_SIZE / 2 - BIRD_FLOOR_OFFSET) {
      birdY.current = bottom - BIRD_SIZE / 2 - BIRD_FLOOR_OFFSET;
      vel.current = -2;
    }
    if (birdY.current < top + BIRD_SIZE / 2) {
      birdY.current = top + BIRD_SIZE / 2;
      vel.current = Math.max(vel.current, 1);
    }

    if (tickCount.current >= nextSpawnAt.current) {
      spawnObject();
      const jitter = Math.floor(Math.random() * 10) - 5;
      nextSpawnAt.current = tickCount.current + getSpawnInterval() + jitter;
    }

    const birdCX = birdX();
    const birdCY = birdY.current;
    const birdR = BIRD_SIZE / 2 - 6;

    const current = objectsRef.current;
    for (let i = current.length - 1; i >= 0; i--) {
      const obj = current[i];
      obj.x -= speed;

      if (obj.x < -60) {
        current.splice(i, 1);
        continue;
      }
      if (obj.hit) continue;

      const objR =
        obj.type === 'bomb'
          ? BOMB_SIZE / 2 - 4
          : obj.type === 'basketball'
            ? BASKETBALL_SIZE / 2 - 4
            : OBJECT_SIZE / 2 - 4;
      const dx = birdCX - obj.x;
      const dy = birdCY - obj.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < birdR + objR) {
        if (obj.type === 'fruit') {
          onCollectFruit(obj);
        } else if (obj.type === 'basketball') {
          onCollectBasketball(obj);
          return;
        } else {
          onHitBomb(obj);
          if (livesRef.current <= 0) return;
        }
      }
    }

    objectsRef.current = current;
    setBirdScreenY(birdY.current);
    setObjects([...current]);
  }, [getCurrentSpeed, getSpawnInterval, spawnObject, onCollectFruit, onCollectBasketball, onHitBomb]);

  const startLoop = useCallback(() => {
    stopLoop();
    loopRef.current = setInterval(tick, TICK_MS);
  }, [tick, stopLoop]);

  const stopCountdown = useCallback(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  const resumeFromPause = useCallback(() => {
    stopCountdown();
    setCountdown(3);
    setGameState('countdown');
    stateRef.current = 'countdown';

    let n = 3;
    countdownRef.current = setInterval(() => {
      n -= 1;
      if (n > 0) {
        setCountdown(n);
      } else {
        stopCountdown();
        setGameState('playing');
        stateRef.current = 'playing';
        startLoop();
      }
    }, 1000);
  }, [startLoop, stopCountdown]);

  useEffect(() => {
    return () => {
      stopLoop();
      stopCountdown();
    };
  }, [stopLoop, stopCountdown]);

  const handleTap = useCallback(() => {
    if (stateRef.current === 'paused' || stateRef.current === 'countdown') return;

    const bottom = playAreaBottom();

    if (stateRef.current === 'idle') {
      birdY.current = bottom / 2;
      vel.current = JUMP_FORCE;
      objectsRef.current = [];
      scoreRef.current = 0;
      livesRef.current = MAX_LIVES;
      tickCount.current = 0;
      nextSpawnAt.current = 30;
      gameTime.current = 0;
      nextBasketballAt.current = BASKETBALL_EVERY;
      setScore(0);
      setLives(MAX_LIVES);
      setObjects([]);
      setBirdScreenY(bottom / 2);
      setBirdRot(0);
      setFlash(0);
      setGameState('playing');
      stateRef.current = 'playing';
      startLoop();
      return;
    }

    if (stateRef.current === 'dead') {
      birdY.current = bottom / 2;
      vel.current = 0;
      objectsRef.current = [];
      scoreRef.current = 0;
      livesRef.current = MAX_LIVES;
      tickCount.current = 0;
      nextSpawnAt.current = 30;
      gameTime.current = 0;
      nextBasketballAt.current = BASKETBALL_EVERY;
      setBirdRot(0);
      setFlash(0);
      setScore(0);
      setLives(MAX_LIVES);
      setObjects([]);
      setBirdScreenY(bottom / 2);
      setGameState('idle');
      stateRef.current = 'idle';
      return;
    }

    vel.current = JUMP_FORCE;
  }, [startLoop]);

  const { w: SCREEN_W } = dims;

  const overlayCardShadow = '0 12px 32px rgba(0,0,0,0.2)';
  const hudPill: CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  return (
    <div
      ref={rootRef}
      onPointerDown={handleTap}
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        backgroundColor: '#87CEEB',
        touchAction: 'manipulation',
        userSelect: 'none',
      }}
    >
      {/* Background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BACKGROUND_IMG}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {SCREEN_W > 0 && (
        <>
          {/* Scrolling clouds */}
          {CLOUDS.map((c, i) => (
            <ScrollingDeco key={`cloud-${i}`} item={c} screenW={SCREEN_W} />
          ))}

          {/* Distant bushes (behind grass) */}
          {BACK_BUSHES.map((b, i) => (
            <ScrollingDeco key={`bush-back-${i}`} item={b} screenW={SCREEN_W} />
          ))}
        </>
      )}

      {/* Game objects */}
      {objects.map((obj, i) => {
        if (obj.hit) return null;
        if (obj.type === 'basketball') {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`obj-${i}`}
              src={BASKETBALL_IMG}
              alt=""
              style={{
                position: 'absolute',
                left: obj.x - BASKETBALL_SIZE / 2,
                top: obj.y - BASKETBALL_SIZE / 2,
                width: BASKETBALL_SIZE,
                height: BASKETBALL_SIZE,
                objectFit: 'contain',
                pointerEvents: 'none',
              }}
            />
          );
        }
        const size = obj.type === 'fruit' ? OBJECT_SIZE : BOMB_SIZE;
        return (
          <div
            key={`obj-${i}`}
            style={{
              position: 'absolute',
              left: obj.x - size / 2,
              top: obj.y - size / 2,
              width: size,
              height: size,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: obj.type === 'fruit' ? 30 : 28,
              pointerEvents: 'none',
            }}
          >
            {obj.type === 'fruit' ? FRUIT_EMOJIS[obj.fruitIndex] : '💣'}
          </div>
        );
      })}

      {/* Hit flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#E84D3D',
          opacity: flash,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }}
      />

      {/* Grass layers */}
      {SCREEN_W > 0 && (
        <>
          <GrassLayer source={GRASS1_IMG} width={SCREEN_W + 40} height={70} bottom={GROUND_HEIGHT - 55} opacity={0.55} swayAmount={4} swayDuration={2600} swayDelay={0} bobAmount={2} screenW={SCREEN_W} />
          <GrassLayer source={GRASS2_IMG} width={SCREEN_W + 60} height={95} bottom={GROUND_HEIGHT - 90} opacity={0.85} swayAmount={6} swayDuration={1900} swayDelay={300} bobAmount={3} screenW={SCREEN_W} />
          <GrassLayer source={GRASS3_IMG} width={SCREEN_W + 80} height={130} bottom={-20} opacity={1} swayAmount={8} swayDuration={1500} swayDelay={600} bobAmount={4} screenW={SCREEN_W} />

          {/* Foreground bushes */}
          {FRONT_BUSHES.map((b, i) => (
            <ScrollingDeco key={`bush-front-${i}`} item={b} screenW={SCREEN_W} />
          ))}
        </>
      )}

      {/* Character */}
      <div
        style={{
          position: 'absolute',
          left: birdX() - BIRD_SIZE / 2,
          top: birdScreenY - BIRD_SIZE / 2,
          width: BIRD_SIZE,
          height: BIRD_SIZE,
          transform: `rotate(${birdRot}deg)`,
          pointerEvents: 'none',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CHARACTER_IMG} alt="Character" style={{ width: BIRD_SIZE, height: BIRD_SIZE, objectFit: 'contain' }} />
      </div>

      {/* HUD */}
      {(gameState === 'playing' || gameState === 'paused' || gameState === 'countdown') && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20,
            pointerEvents: 'none',
          }}
        >
          <div style={{ ...hudPill, gap: 8 }}>
            <span style={{ ...Fonts.bodyBold, fontSize: 18, color: '#8E8E9A' }}>ΣΚΟΡ</span>
            <span style={{ ...Fonts.displayHeavy, fontSize: 24, color: '#2D2D3A' }}>{score}</span>
          </div>
          <div style={{ ...hudPill, gap: 6 }}>
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <div
                key={`life-${i}`}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: i < lives ? '#E84D3D' : '#E0E0E0',
                  border: i < lives ? 'none' : '1px solid #CCC',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Basketball prize popup */}
      {gameState === 'paused' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.35)' }}>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: 28,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: SCREEN_W - 64,
              boxShadow: overlayCardShadow,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ATHLOKINISI_LOGO} alt="Athlokinisi" style={{ width: 120, height: 48, marginBottom: 10, objectFit: 'contain' }} />
            <span style={{ ...Fonts.displayHeavy, fontSize: 22, color: '#1E63B5', textAlign: 'center' }}>
              Έπιασες το δώρο!
            </span>
            <span style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', marginTop: 6, textAlign: 'center', lineHeight: '20px', whiteSpace: 'pre-line' }}>
              {'Είναι ένα δώρο από την Αθλοκίνηση.\nΜπορείς να το παραλάβεις από το κατάστημα!'}
            </span>

            <div style={{ position: 'relative', width: 170, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
              {CONFETTI.map((c, i) => (
                <div
                  key={`confetti-${i}`}
                  style={{
                    position: 'absolute',
                    left: 85 + c.x * 0.75 - c.size / 2,
                    top: 65 + c.y * 0.75 - c.size / 2,
                    width: c.size,
                    height: c.round ? c.size : c.size * 1.8,
                    borderRadius: c.round ? c.size / 2 : 2,
                    backgroundColor: c.color,
                    transform: `rotate(${c.rotate}deg)`,
                  }}
                />
              ))}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BASKETBALL_IMG} alt="" style={{ width: 80, height: 80, objectFit: 'contain' }} />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                resumeFromPause();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              style={{ marginTop: 12, alignSelf: 'stretch', border: 'none', padding: 0, background: 'transparent', cursor: 'pointer' }}
            >
              <div
                style={{
                  borderRadius: 999,
                  paddingTop: 15,
                  paddingBottom: 15,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: 'linear-gradient(180deg, #3D8BF2, #1E63B5)',
                  boxShadow: '0 6px 12px rgba(30,99,181,0.35)',
                }}
              >
                <span style={{ ...Fonts.displayHeavy, color: 'white', fontSize: 17 }}>Παραλαβή δώρου</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Resume countdown */}
      {gameState === 'countdown' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.15)', pointerEvents: 'none' }}>
          <div style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
            <span style={{ ...Fonts.displayHeavy, fontSize: 64, color: '#E84D3D' }}>{countdown}</span>
          </div>
        </div>
      )}

      {/* Idle screen */}
      {gameState === 'idle' && SCREEN_W > 0 && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.15)' }}>
          <div style={{ backgroundColor: 'white', borderRadius: 28, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', width: SCREEN_W - 80, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CHARACTER_IMG} alt="" style={{ width: 96, height: 96, marginBottom: 16, objectFit: 'contain' }} />
            <span style={{ ...Fonts.displayHeavy, fontSize: 24, color: '#2D2D3A', textAlign: 'center' }}>Φρουτοτρέλα</span>
            <span style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', marginTop: 6, textAlign: 'center', lineHeight: '20px', whiteSpace: 'pre-line' }}>
              {'Πάτα για να πετάξεις! Μάζεψε φρούτα 🍊 και απόφυγε τις βόμβες 💣\nΈχεις 3 ζωές!'}
            </span>

            <div style={{ display: 'flex', flexDirection: 'row', gap: 16, marginTop: 20, marginBottom: 8 }}>
              {FRUIT_EMOJIS.slice(0, 4).map((emoji, i) => (
                <div
                  key={`preview-${i}`}
                  style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFF5E8', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #F5E6D0', fontSize: 22 }}
                >
                  {emoji}
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: '#E84D3D', borderRadius: 16, paddingLeft: 32, paddingRight: 32, paddingTop: 14, paddingBottom: 14, marginTop: 16 }}>
              <span style={{ ...Fonts.bodyBold, color: 'white', fontSize: 16 }}>Πάτα για να ξεκινήσεις</span>
            </div>
            {bestScore > 0 && <span style={{ ...Fonts.body, fontSize: 13, color: '#B8B8C4', marginTop: 12 }}>Ρεκόρ: {bestScore}</span>}
          </div>
        </div>
      )}

      {/* Game over */}
      {gameState === 'dead' && SCREEN_W > 0 && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div style={{ backgroundColor: 'white', borderRadius: 28, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', width: SCREEN_W - 80, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
            <span style={{ ...Fonts.displayHeavy, fontSize: 28, color: '#E84D3D' }}>Τέλος παιχνιδιού!</span>
            <span style={{ ...Fonts.body, fontSize: 14, color: '#8E8E9A', marginTop: 6 }}>3 βόμβες σε πέτυχαν. Δοκίμασε ξανά!</span>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 24, marginTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ ...Fonts.body, fontSize: 13, color: '#8E8E9A' }}>Σκορ</span>
                <span style={{ ...Fonts.displayHeavy, fontSize: 36, color: '#2D2D3A' }}>{score}</span>
              </div>
              <div style={{ width: 1, backgroundColor: '#F0F0EC' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ ...Fonts.body, fontSize: 13, color: '#8E8E9A' }}>Ρεκόρ</span>
                <span style={{ ...Fonts.displayHeavy, fontSize: 36, color: '#F5A623' }}>{Math.max(bestScore, score)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FFFBEB', borderRadius: 999, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, marginTop: 20, border: '1px solid #FBBF24' }}>
              <span style={{ fontSize: 14 }}>⭐</span>
              <span style={{ ...Fonts.displayHeavy, fontSize: 13, color: '#B8860B' }}>+{score + 5} KP κερδισμένοι</span>
            </div>

            <div style={{ backgroundColor: '#E84D3D', borderRadius: 16, paddingLeft: 32, paddingRight: 32, paddingTop: 14, paddingBottom: 14, marginTop: 16 }}>
              <span style={{ ...Fonts.bodyBold, color: 'white', fontSize: 16 }}>Πάτα για να ξαναπαίξεις</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
