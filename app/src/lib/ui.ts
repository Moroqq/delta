import type { CSSProperties } from 'react';

// Дизайн-токены «Spatial Glass» (см. README хендоффа)

export const FONT_NUM = "'Space Grotesk','Golos Text',sans-serif";
export const SPRING = 'cubic-bezier(0.34,1.56,0.64,1)';
export const EASE_OUT_SOFT = 'cubic-bezier(0.22,1,0.36,1)';

export const numStyle: CSSProperties = {
  fontFamily: FONT_NUM,
  fontVariantNumeric: 'tabular-nums',
};

export const blur = (px: number, sat = 1.4): CSSProperties => ({
  backdropFilter: `blur(${px}px) saturate(${sat})`,
  WebkitBackdropFilter: `blur(${px}px) saturate(${sat})`,
});

/** обычная стеклянная карточка */
export const CARD_SHADOW =
  'inset 0 1px 0 rgba(255,243,219,0.28), inset 0 0 0 1px rgba(255,243,219,0.07), 0 26px 60px -24px rgba(0,0,0,0.42)';

/** главная (hero) карточка экрана */
export const HERO_SHADOW =
  'inset 0 1px 0 rgba(255,243,219,0.32), inset 0 0 0 1px rgba(255,243,219,0.08), 0 30px 70px -26px rgba(0,0,0,0.5)';

/** выделенная/активная карточка («Сейчас», «Сегодня») */
export const GLOW_SHADOW =
  'inset 0 1px 0 rgba(255,243,219,0.42), inset 0 0 0 1px rgba(240,230,214,0.30), 0 0 30px -4px rgba(240,230,214,0.28), 0 30px 70px -26px rgba(0,0,0,0.5)';

export const glassCard = (radius = 26): CSSProperties => ({
  background: 'rgba(46,40,33,0.30)',
  ...blur(22),
  borderRadius: radius,
  boxShadow: CARD_SHADOW,
});

export const heroCard = (radius = 28): CSSProperties => ({
  background: 'rgba(48,42,34,0.34)',
  ...blur(26),
  borderRadius: radius,
  boxShadow: HERO_SHADOW,
});

export const kicker: CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: 1.2,
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.5)',
};

export const screenStyle: CSSProperties = {
  height: '100%',
  overflow: 'auto',
  padding: 'calc(16px + var(--safe-top)) 18px calc(104px + var(--safe-bottom))',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  boxSizing: 'border-box',
  animation: 'screenIn 0.35s ease-out',
};

export const primaryBtn: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  background: 'linear-gradient(180deg,#F4EAD6,#F0E4CD)',
  color: '#1B1710',
  borderRadius: 999,
  padding: 15,
  fontSize: 14.5,
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 1px 2px rgba(0,0,0,0.18)',
  transition: 'transform 0.15s ease',
  userSelect: 'none',
};

/** «сияющая» CTA-кнопка */
export const shinyBtn: CSSProperties = {
  ...primaryBtn,
  gap: 8,
  background: 'linear-gradient(180deg,#FAF2E2,#EBDCC2)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.85), 0 0 28px rgba(240,230,214,0.28), 0 20px 44px -18px rgba(0,0,0,0.45)',
};

export const backBtn: CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: '50%',
  background: 'rgba(46,40,33,0.34)',
  ...blur(20),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flex: 'none',
  boxShadow:
    'inset 0 1px 0 rgba(255,243,219,0.3), inset 0 0 0 1px rgba(255,243,219,0.08), 0 16px 36px -14px rgba(0,0,0,0.42)',
};

export const cardIn = (delay: number): CSSProperties => ({
  animation: 'cardIn 0.4s ease-out both',
  animationDelay: `${delay.toFixed(2)}s`,
});

/** тёмный «канавочный» инпут */
export const grooveInput = (width: number): CSSProperties => ({
  width,
  background: 'rgba(0,0,0,0.25)',
  border: 'none',
  boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.35), inset 0 -1px 0 rgba(255,255,255,0.05)',
  borderRadius: 12,
  color: '#F2EFE8',
  ...numStyle,
  fontSize: 14,
  fontWeight: 600,
  textAlign: 'center',
  padding: '8px 4px',
  outline: 'none',
});
