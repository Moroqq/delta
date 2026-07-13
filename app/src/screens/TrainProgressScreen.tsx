import { useEffect, useState } from 'react';

import { assistant } from '../lib/ai';
import { progressPath } from '../lib/chart';
import { ru } from '../lib/format';
import { useApp } from '../lib/store';
import { backBtn, cardIn, glassCard, heroCard, numStyle, screenStyle } from '../lib/ui';

export function TrainProgressScreen() {
  const { data, progressEx, closeProgress } = useApp();
  const ex = data.workout[progressEx];
  const { path, dots } = progressPath(ex.hist);
  const cur = ex.hist[ex.hist.length - 1];
  const delta = cur - ex.hist[0];

  const [tip, setTip] = useState('');
  useEffect(() => {
    let alive = true;
    void assistant.exerciseTip(progressEx).then((t) => alive && setTip(t));
    return () => {
      alive = false;
    };
  }, [progressEx]);

  return (
    <div style={screenStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div onClick={closeProgress} style={{ ...backBtn, transition: 'transform 0.15s ease' }}>
          <svg width={15} height={15} viewBox="0 0 14 14" fill="none">
            <path d="M9 3.5 5 7l4 3.5" stroke="rgba(255,255,255,0.85)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 19, fontWeight: 600 }}>{ex.name}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>прогресс рабочего веса · 7 недель</div>
        </div>
      </div>

      <div style={{ ...heroCard(28), padding: '16px 18px', ...cardIn(0.05) }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ ...numStyle, fontSize: 40, fontWeight: 700, lineHeight: 1, textShadow: '0 0 20px rgba(240,230,214,0.2)' }}>{ru(cur)}</span>
          <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)' }}>кг сейчас</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--fit-accent)', fontVariantNumeric: 'tabular-nums' }}>
            +{ru(delta)} кг за 7 недель
          </span>
        </div>
        <svg width="100%" height={150} viewBox="0 0 348 150" style={{ marginTop: 16, display: 'block', overflow: 'visible' }}>
          {[25, 72, 120].map((y) => (
            <line key={y} x1={0} y1={y} x2={348} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 5" />
          ))}
          <path
            d={path}
            pathLength={600}
            strokeDasharray={600}
            fill="none"
            stroke="var(--fit-accent)"
            strokeWidth={2}
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 0 8px rgba(240,230,214,0.75))', animation: 'drawLine 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both' }}
          />
          <path
            d={dots}
            stroke="var(--fit-accent)"
            strokeWidth={7}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 6px rgba(240,230,214,0.85))', animation: 'fadeIn 0.4s ease-out 0.8s both' }}
          />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
          {['Н1', 'Н2', 'Н3', 'Н4', 'Н5', 'Н6', 'Н7'].map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ ...glassCard(22), padding: '13px 15px', ...cardIn(0.14) }}>
          <div style={{ fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Лучший результат</div>
          <div style={{ ...numStyle, fontSize: 21, fontWeight: 600, marginTop: 8 }}>{ex.best}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{ex.bestDate}</div>
        </div>
        <div style={{ ...glassCard(22), padding: '13px 15px', ...cardIn(0.2) }}>
          <div style={{ fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Суммарный тоннаж</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
            <span style={{ ...numStyle, fontSize: 21, fontWeight: 600 }}>{ex.tonnage}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>кг</span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>за 7 недель</div>
        </div>
      </div>

      <div style={{ ...glassCard(22), padding: '13px 16px', ...cardIn(0.26) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--fit-accent)', boxShadow: '0 0 10px rgba(240,230,214,0.9)', flex: 'none' }} />
          <span style={{ fontSize: 13.5, fontWeight: 600 }}>Совет Виты</span>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.45, color: 'rgba(255,255,255,0.78)', marginTop: 8 }}>{tip}</div>
      </div>
    </div>
  );
}
