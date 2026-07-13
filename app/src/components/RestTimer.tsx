import { useApp } from '../lib/store';
import { blur, kicker, numStyle } from '../lib/ui';

const TIMER_TOTAL = 120;
const CIRC = 389.6;

/** Оверлей таймера отдыха */
export function RestTimer() {
  const { timerOpen, timerLeft, timerRun, closeTimer, toggleTimer, resetTimer } = useApp();
  if (!timerOpen) return null;

  const label = timerLeft <= 0 ? 'Ещё раз' : timerRun ? 'Пауза' : 'Продолжить';

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        onClick={closeTimer}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,9,7,0.55)',
          ...blur(8, 1.2),
          animation: 'fadeIn 0.25s ease-out',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: 270,
          background: 'rgba(48,42,34,0.55)',
          ...blur(30, 1.5),
          borderRadius: 32,
          padding: '22px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          boxShadow:
            'inset 0 1px 0 rgba(255,243,219,0.32), inset 0 0 0 1px rgba(255,243,219,0.08), 0 40px 90px -30px rgba(0,0,0,0.7)',
          animation: 'cardIn 0.35s ease-out',
        }}
      >
        <div style={kicker}>Отдых · 2 минуты</div>
        <div style={{ position: 'relative', width: 150, height: 150 }}>
          <svg width={150} height={150} viewBox="0 0 140 140" style={{ overflow: 'visible' }}>
            <circle cx={70} cy={70} r={62} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={3} />
            <circle
              cx={70}
              cy={70}
              r={62}
              fill="none"
              stroke="var(--fit-accent)"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeDasharray={`${((CIRC * timerLeft) / TIMER_TOTAL).toFixed(1)} 500`}
              transform="rotate(-90 70 70)"
              style={{ filter: 'drop-shadow(0 0 5px rgba(240,230,214,0.7))', transition: 'stroke-dasharray 1s linear' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ ...numStyle, fontSize: 36, fontWeight: 700 }}>
              {Math.floor(timerLeft / 60)}:{String(timerLeft % 60).padStart(2, '0')}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <div
            onClick={resetTimer}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '12px 0',
              borderRadius: 999,
              fontSize: 13.5,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.85)',
              background: 'rgba(255,255,255,0.07)',
              cursor: 'pointer',
              boxShadow: 'inset 0 0 0 1px rgba(255,243,219,0.1)',
              transition: 'transform 0.15s ease',
              userSelect: 'none',
            }}
          >
            Сначала
          </div>
          <div
            onClick={toggleTimer}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '12px 0',
              borderRadius: 999,
              fontSize: 13.5,
              fontWeight: 600,
              color: '#1B1710',
              background: 'linear-gradient(180deg,#F4EAD6,#F0E4CD)',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.18)',
              transition: 'transform 0.15s ease',
              userSelect: 'none',
            }}
          >
            {label}
          </div>
        </div>
        <div
          onClick={closeTimer}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width={11} height={11} viewBox="0 0 12 12" fill="none">
            <path d="M2.5 2.5 9.5 9.5M9.5 2.5 2.5 9.5" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
