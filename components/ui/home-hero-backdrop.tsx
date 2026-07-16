'use client';

import { useEffect, useState } from 'react';
import { LinearGradient } from '@/lib/rn';

// Sunburst wedges radiating from a sun point above the screen — the same
// ray motif that sits behind the logo on the packs and event posters.
function rayPaths(cx: number, cy: number, count = 14, R = 900) {
  const paths: string[] = [];
  const step = (Math.PI * 2) / count;
  for (let i = 0; i < count; i += 2) {
    const a1 = i * step;
    const a2 = a1 + step;
    paths.push(
      `M ${cx} ${cy} L ${cx + R * Math.cos(a1)} ${cy + R * Math.sin(a1)} L ${
        cx + R * Math.cos(a2)
      } ${cy + R * Math.sin(a2)} Z`,
    );
  }
  return paths;
}

// Four-point sparkle, like the confetti stars on the birthday banner.
function sparklePath(x: number, y: number, size: number) {
  const s = size / 2;
  const k = s * 0.22;
  return (
    `M ${x} ${y - s} Q ${x + k} ${y - k} ${x + s} ${y} ` +
    `Q ${x + k} ${y + k} ${x} ${y + s} ` +
    `Q ${x - k} ${y + k} ${x - s} ${y} ` +
    `Q ${x - k} ${y - k} ${x} ${y - s} Z`
  );
}

function Cloud({ x, y, scale = 1, opacity = 0.16 }: { x: number; y: number; scale?: number; opacity?: number }) {
  return (
    <>
      <circle cx={x} cy={y} r={16 * scale} fill="#FFFFFF" opacity={opacity} />
      <circle cx={x + 18 * scale} cy={y - 6 * scale} r={13 * scale} fill="#FFFFFF" opacity={opacity} />
      <circle cx={x + 34 * scale} cy={y + 2 * scale} r={11 * scale} fill="#FFFFFF" opacity={opacity} />
    </>
  );
}

function useFrameWidth() {
  const [w, setW] = useState(430);
  useEffect(() => {
    const measure = () => setW(Math.min(window.innerWidth, 430));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  return w;
}

/**
 * The red "sunburst" zone behind the home header and club card —
 * brand-red gradient, soft rays, ghost clouds and confetti sparkles,
 * finishing in a rounded curve into the cream page below.
 */
export function HomeHeroBackdrop() {
  const W = useFrameWidth();
  const height = 205; // no safe-area inset inside the phone frame
  const rays = rayPaths(W / 2, -70);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <LinearGradient colors={['#F31013', '#D40408']} style={{ position: 'absolute', inset: 0 }} />
      <svg
        width={W}
        height={height}
        viewBox={`0 0 ${W} ${height}`}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {rays.map((d, i) => (
          <path key={i} d={d} fill="#FFFFFF" opacity={0.055} />
        ))}

        {/* Confetti sparkles & dots */}
        <path d={sparklePath(W - 36, 26, 16)} fill="#FBD40D" opacity={0.95} />
        <path d={sparklePath(26, 64, 11)} fill="#FFFFFF" opacity={0.85} />
        <path d={sparklePath(W - 72, 96, 9)} fill="#FFFFFF" opacity={0.6} />
        <path d={sparklePath(38, 140, 13)} fill="#FBD40D" opacity={0.9} />
        <circle cx={W - 26} cy={132} r={3.5} fill="#FBD40D" opacity={0.9} />
        <circle cx={54} cy={22} r={3} fill="#FFFFFF" opacity={0.7} />
        <circle cx={W - 54} cy={170} r={3} fill="#FFFFFF" opacity={0.55} />

        {/* Ghost clouds, like the little clouds on the juice packs */}
        <Cloud x={-6} y={height - 64} scale={1.1} />
        <Cloud x={W - 62} y={height - 96} scale={0.9} />
      </svg>
    </div>
  );
}
