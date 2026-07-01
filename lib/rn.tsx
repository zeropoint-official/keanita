'use client';

// Thin shims that let us port React Native screens to the web with minimal
// changes: <View>/<Text>/<ScrollView>/<Pressable> keep RN semantics (flex
// column by default, numberOfLines truncation) but render plain HTML.

import { forwardRef, type CSSProperties, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Style = CSSProperties | (CSSProperties | undefined | false)[];

function flatten(style?: Style): CSSProperties {
  if (!style) return {};
  if (Array.isArray(style)) return Object.assign({}, ...style.filter(Boolean));
  return style;
}

interface ViewProps {
  children?: ReactNode;
  style?: Style;
  className?: string;
  onClick?: () => void;
}

/** RN View → div. RN defaults to a column flex box. */
export const View = forwardRef<HTMLDivElement, ViewProps>(function View(
  { children, style, className, onClick },
  ref,
) {
  return (
    <div
      ref={ref}
      className={className}
      onClick={onClick}
      style={{ display: 'flex', flexDirection: 'column', ...flatten(style) }}
    >
      {children}
    </div>
  );
});

interface TextProps {
  children?: ReactNode;
  style?: Style;
  className?: string;
  numberOfLines?: number;
  onClick?: () => void;
}

/** RN Text → span. Supports numberOfLines truncation. */
export function Text({ children, style, className, numberOfLines, onClick }: TextProps) {
  const clamp: CSSProperties =
    numberOfLines === 1
      ? { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
      : numberOfLines
        ? {
            display: '-webkit-box',
            WebkitLineClamp: numberOfLines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }
        : {};
  return (
    <span
      className={className}
      onClick={onClick}
      style={{ display: 'block', ...clamp, ...flatten(style) }}
    >
      {children}
    </span>
  );
}

interface ScrollViewProps {
  children?: ReactNode;
  horizontal?: boolean;
  style?: Style;
  contentContainerStyle?: CSSProperties;
  className?: string;
}

/** RN ScrollView → overflow container. */
export function ScrollView({
  children,
  horizontal,
  style,
  contentContainerStyle,
  className,
}: ScrollViewProps) {
  return (
    <div
      className={`no-scrollbar ${className ?? ''}`}
      style={{
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        overflowX: horizontal ? 'auto' : 'hidden',
        overflowY: horizontal ? 'hidden' : 'auto',
        WebkitOverflowScrolling: 'touch',
        ...flatten(style),
        ...contentContainerStyle,
      }}
    >
      {children}
    </div>
  );
}

interface PressableProps {
  children?: ReactNode;
  onPress?: () => void;
  style?: Style;
  className?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
}

/** RN Pressable with a subtle press-scale, like the app's AnimatedPress. */
export function Pressable({
  children,
  onPress,
  style,
  className,
  accessibilityLabel,
  disabled,
}: PressableProps) {
  return (
    <motion.div
      role="button"
      aria-label={accessibilityLabel}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      onClick={disabled ? undefined : onPress}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: disabled ? 'default' : 'pointer',
        WebkitTapHighlightColor: 'transparent',
        ...flatten(style),
      }}
    >
      {children}
    </motion.div>
  );
}

/** Alias kept so ported files can import AnimatedPress unchanged. */
export const AnimatedPress = Pressable;

interface ImgProps {
  src: string;
  style?: CSSProperties;
  contentFit?: 'cover' | 'contain' | 'fill';
  contentPosition?: string;
  alt?: string;
  className?: string;
}

/** expo-image → plain img with objectFit mapping. */
export function Img({ src, style, contentFit = 'cover', contentPosition, alt = '', className }: ImgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ objectFit: contentFit, objectPosition: contentPosition, display: 'block', ...style }}
    />
  );
}

interface GradientProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

/** expo-linear-gradient → CSS linear-gradient. */
export function LinearGradient({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  className,
  children,
}: GradientProps) {
  const angle = Math.round(
    (Math.atan2(end.x - start.x, start.y - end.y) * 180) / Math.PI,
  );
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `linear-gradient(${angle}deg, ${colors.join(', ')})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** No notches inside the phone frame preview; the frame owns safe areas. */
export function useSafeAreaInsets() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
