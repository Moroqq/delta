import { smoothPath } from '../lib/chart';
import { buzz } from '../lib/format';
import { useApp } from '../lib/store';
import type { MetricId } from '../lib/types';
import { SPRING, cardIn, glassCard, heroCard, kicker, numStyle, screenStyle } from '../lib/ui';
import { Counter } from '../components/Counter';

const IB_X = [8, 116, 232, 342];
const ALL_METRICS: MetricId[] = ['w', 'fat', 'musc', 'wat', 'visc'];

export function BodyScreen() {
  const { data, metric, setMetric, chartSeries, selPoint, setSelPoint } = useApp();
  const cfg = data.metrics[metric];
  const chart = smoothPath(chartSeries ?? cfg.series, 348, 20, 126);

  return (
    <div style={screenStyle}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 22, fontWeight: 600 }}>Тело</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{data.dateLabel}</div>
      </div>

      {/* Главная карточка метрики */}
      <div style={{ ...heroCard(28), padding: '16px 18px', ...cardIn(0.05) }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={kicker}>{cfg.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <span
                style={{
                  ...numStyle,
                  fontSize: 54,
                  fontWeight: 700,
                  lineHeight: 1,
                  textShadow: '0 0 24px rgba(240,230,214,0.2)',
                }}
              >
                <Counter key={metric} value={cfg.series[cfg.series.length - 1]} decimals={cfg.dec} dur={800} />
              </span>
              <span style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)' }}>{cfg.unit}</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: 'rgba(240,230,214,0.1)',
              borderRadius: 999,
              padding: '6px 12px',
              marginTop: 4,
              boxShadow: 'inset 0 1px 0 rgba(255,243,219,0.22)',
              animation: 'fadeIn 0.4s ease-out 0.5s both',
            }}
          >
            <svg
              width={11}
              height={11}
              viewBox="0 0 12 12"
              fill="none"
              style={{ transform: cfg.dir === 'up' ? 'rotate(180deg)' : 'none', display: 'block' }}
            >
              <path
                d="M6 2v8M2.5 6.5 6 10l3.5-3.5"
                stroke="var(--fit-accent)"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--fit-accent)', fontVariantNumeric: 'tabular-nums' }}>
              {cfg.delta}
            </span>
          </div>
        </div>

        <svg width="100%" height={150} viewBox="0 0 348 150" style={{ marginTop: 14, display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id="wg4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F0E6D6" stopOpacity="0.2" />
              <stop offset="1" stopColor="#F0E6D6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[30, 75, 120].map((y) => (
            <line key={y} x1={0} y1={y} x2={348} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 5" />
          ))}
          <path d={`${chart.d} L 348 150 L 0 150 Z`} fill="url(#wg4)" style={{ animation: 'fadeIn 0.5s ease-out 0.7s both' }} />
          <path
            d={chart.d}
            pathLength={600}
            strokeDasharray={600}
            fill="none"
            stroke="var(--fit-accent)"
            strokeWidth={2}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(240,230,214,0.75))',
              animation: 'drawLine 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both',
            }}
          />
          <g style={{ animation: 'fadeIn 0.4s ease-out 0.9s both' }}>
            {data.inbody.map((_, i) => {
              const cy = +chart.at(IB_X[i]).toFixed(1);
              const sel = selPoint === i;
              return (
                <g key={i}>
                  <circle
                    cx={IB_X[i]}
                    cy={cy}
                    r={sel ? 7 : 4.5}
                    style={{
                      fill: sel ? 'var(--fit-accent)' : '#151412',
                      stroke: 'var(--fit-accent)',
                      strokeWidth: 2.5,
                      transition: `r 0.25s ${SPRING}, fill 0.25s ease`,
                      filter: 'drop-shadow(0 0 7px rgba(240,230,214,0.8))',
                    }}
                  />
                  <circle
                    cx={IB_X[i]}
                    cy={cy}
                    r={16}
                    fill="rgba(0,0,0,0.01)"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      buzz();
                      setSelPoint(i);
                    }}
                  />
                </g>
              );
            })}
          </g>
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
          {['Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--fit-accent)',
              boxShadow: '0 0 8px rgba(240,230,214,0.8)',
              flex: 'none',
            }}
          />
          точки — дни с замером InBody, нажмите для деталей
        </div>
      </div>

      {/* Мини-карточки 2×2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {ALL_METRICS.filter((id) => id !== metric).map((id, i) => {
          const c = data.metrics[id];
          const last = c.series[c.series.length - 1];
          const spark = smoothPath(c.series, 62, 3, 19);
          return (
            <div
              key={id}
              onClick={() => setMetric(id)}
              style={{ ...glassCard(22), padding: '13px 15px', cursor: 'pointer', ...cardIn(0.14 + i * 0.06), transition: 'transform 0.15s ease' }}
            >
              <div style={{ fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                {c.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                <span style={{ ...numStyle, fontSize: 26, fontWeight: 600 }}>
                  {c.dec ? last.toFixed(c.dec).replace('.', ',') : String(last)}
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{c.unit}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: c.good ? 'var(--fit-accent)' : 'rgba(255,255,255,0.45)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {(c.dir === 'down' ? '▼ ' : '▲ ') + c.short}
                </span>
                <svg width={64} height={22} viewBox="0 0 64 22" fill="none">
                  <path d={spark.d} stroke="rgba(240,230,214,0.6)" strokeWidth={1.5} strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Кнопка добавления замера */}
      <div
        onClick={() => buzz()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          ...glassCard(999),
          padding: 15,
          fontSize: 14,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.9)',
          cursor: 'pointer',
          ...cardIn(0.38),
          transition: 'transform 0.15s ease',
          userSelect: 'none',
        }}
      >
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
        Добавить замер InBody
      </div>
    </div>
  );
}
