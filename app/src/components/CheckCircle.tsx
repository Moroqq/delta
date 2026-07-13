import type { CSSProperties, MouseEventHandler } from 'react';

import { SPRING } from '../lib/ui';

/** Круглый чекбокс с пружинной заливкой и «прорисовкой» галочки */
export function CheckCircle({
  checked,
  size,
  onClick,
}: {
  checked: boolean;
  size: number;
  onClick?: MouseEventHandler;
}) {
  const box: CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    border: `1.5px solid ${size >= 28 ? 'rgba(255,243,219,0.3)' : 'rgba(255,255,255,0.25)'}`,
    position: 'relative',
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.15s ease',
    cursor: onClick ? 'pointer' : undefined,
  };
  const fill: CSSProperties = {
    position: 'absolute',
    inset: -1.5,
    borderRadius: '50%',
    background: 'var(--fit-accent)',
    boxShadow: '0 0 10px rgba(240,230,214,0.5)',
    transform: checked ? 'scale(1)' : 'scale(0.4)',
    opacity: checked ? 1 : 0,
    transition: `transform 0.3s ${SPRING}, opacity 0.2s ease`,
  };
  const markSize = size >= 28 ? 13 : 10;
  return (
    <div style={box} onClick={onClick}>
      <div style={fill} />
      <svg width={markSize} height={markSize} viewBox="0 0 12 12" style={{ position: 'relative' }}>
        <path
          d="M2.5 6.5 5 9l4.5-6"
          pathLength={20}
          strokeDasharray={20}
          fill="none"
          stroke="#0B0C0A"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDashoffset: checked ? 0 : 20,
            transition: 'stroke-dashoffset 0.25s ease-out 0.08s',
          }}
        />
      </svg>
    </div>
  );
}
