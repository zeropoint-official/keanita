'use client';

import { View, Text, AnimatedPress } from '@/lib/rn';
import { Fonts } from '@/constants/fonts';
import { IconSymbol, type IconSymbolName } from './icon-symbol';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: 'solid' | 'soft' | 'outline';
  color?: string;
  icon?: IconSymbolName;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function PrimaryButton({
  label,
  onPress,
  variant = 'solid',
  color = '#E84D3D',
  icon,
  disabled = false,
  loading = false,
  fullWidth = true,
}: Props) {
  const isSolid = variant === 'solid';
  const isOutline = variant === 'outline';

  const bg = isSolid ? color : isOutline ? 'transparent' : color + '1A';
  const fg = isSolid ? '#FFFFFF' : color;

  return (
    <AnimatedPress
      onPress={disabled || loading ? undefined : onPress}
      style={{ width: fullWidth ? '100%' : undefined, opacity: disabled ? 0.45 : 1 }}
    >
      <View
        style={{
          backgroundColor: bg,
          borderRadius: 16,
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 24,
          paddingRight: 24,
          border: isOutline ? `1.5px solid ${color}` : 'none',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <Text style={{ ...Fonts.bodyBold, color: fg, fontSize: 14 }}>Please wait…</Text>
        ) : (
          <>
            {icon ? (
              <View style={{ marginRight: 8 }}>
                <IconSymbol name={icon} size={18} color={fg} />
              </View>
            ) : null}
            <Text style={{ ...Fonts.bodyBold, color: fg, fontSize: 14 }}>{label}</Text>
          </>
        )}
      </View>
    </AnimatedPress>
  );
}
