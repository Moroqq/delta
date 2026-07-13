import type { CSSProperties } from 'react';

const blobBase: CSSProperties = {
  position: 'absolute',
  borderRadius: '50%',
  // бесконечная transform-анимация большого размытого слоя — держим на GPU
  willChange: 'transform, opacity',
};

/** Атмосферный фон: 3 размытых пятна тёплого света */
export function Atmosphere() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div
        style={{
          ...blobBase,
          width: 540, height: 440, left: '50%', marginLeft: -270, bottom: -200,
          background: 'radial-gradient(circle, rgba(246,202,138,0.55) 0%, rgba(246,202,138,0) 68%)',
          filter: 'blur(38px)',
          animation: 'blobA 12s ease-in-out infinite',
        }}
      />
      <div
        style={{
          ...blobBase,
          width: 420, height: 420, right: -190, top: '22%',
          background: 'radial-gradient(circle, rgba(240,196,138,0.40) 0%, rgba(240,196,138,0) 66%)',
          filter: 'blur(42px)',
          animation: 'blobB 15s ease-in-out infinite',
        }}
      />
      <div
        style={{
          ...blobBase,
          width: 400, height: 400, left: -190, top: -70,
          background: 'radial-gradient(circle, rgba(244,222,180,0.32) 0%, rgba(244,222,180,0) 66%)',
          filter: 'blur(42px)',
          animation: 'blobC 18s ease-in-out infinite',
        }}
      />
    </div>
  );
}
