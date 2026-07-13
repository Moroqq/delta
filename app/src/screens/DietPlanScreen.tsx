import { useEffect, useState } from 'react';

import { assistant } from '../lib/ai';
import { buzz } from '../lib/format';
import { useApp } from '../lib/store';
import { blur, backBtn, cardIn, glassCard, numStyle, screenStyle, shinyBtn } from '../lib/ui';

export function DietPlanScreen() {
  const { data, setDietView } = useApp();
  const { plan } = data;
  const t = plan.targets;

  const [recs, setRecs] = useState<string[]>([]);
  const [rebuilding, setRebuilding] = useState(false);

  useEffect(() => {
    let alive = true;
    void assistant.planRecommendations().then((r) => alive && setRecs(r));
    return () => {
      alive = false;
    };
  }, []);

  const rebuild = () => {
    if (rebuilding) return;
    buzz();
    setRebuilding(true);
    void assistant.rebuildPlan().then((r) => {
      setRecs(r);
      setRebuilding(false);
    });
  };

  const colStyle = (accent = false) =>
    ({
      flex: accent ? undefined : 1,
      textAlign: 'center',
      padding: '4px 0',
    }) as const;

  return (
    <div style={screenStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div onClick={() => setDietView('day')} style={{ ...backBtn, transition: 'transform 0.15s ease' }}>
          <svg width={15} height={15} viewBox="0 0 14 14" fill="none">
            <path d="M9 3.5 5 7l4 3.5" stroke="rgba(255,255,255,0.85)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontSize: 19, fontWeight: 600 }}>Мой план питания</div>
      </div>

      {/* Карточка цели */}
      <div
        style={{
          background: 'rgba(48,42,34,0.36)',
          ...blur(26),
          borderRadius: 28,
          padding: '14px 18px',
          boxShadow:
            'inset 0 1px 0 rgba(255,243,219,0.34), inset 0 0 0 1px rgba(240,230,214,0.12), 0 24px 48px -16px rgba(0,0,0,0.55), 0 0 32px -8px rgba(240,230,214,0.15)',
          ...cardIn(0.05),
        }}
      >
        <div style={{ fontSize: 17, fontWeight: 600 }}>{plan.title}</div>
        <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{plan.subtitle}</div>
        <div style={{ display: 'flex', gap: 0, marginTop: 12 }}>
          <div style={{ ...colStyle(), flex: 1.4 }}>
            <div style={{ ...numStyle, fontSize: 17, fontWeight: 700 }}>{t.cal.toLocaleString('ru-RU')}</div>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>ккал</div>
          </div>
          <div style={{ ...colStyle(), flex: 1, borderLeft: '1px solid rgba(255,255,255,0.09)' }}>
            <div style={{ ...numStyle, fontSize: 17, fontWeight: 700, color: 'var(--fit-accent)', textShadow: '0 0 12px rgba(240,230,214,0.5)' }}>
              {t.p}
            </div>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>белки, г</div>
          </div>
          <div style={{ ...colStyle(), flex: 1, borderLeft: '1px solid rgba(255,255,255,0.09)' }}>
            <div style={{ ...numStyle, fontSize: 17, fontWeight: 700 }}>{t.f}</div>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>жиры, г</div>
          </div>
          <div style={{ ...colStyle(), flex: 1, borderLeft: '1px solid rgba(255,255,255,0.09)' }}>
            <div style={{ ...numStyle, fontSize: 17, fontWeight: 700 }}>{t.c}</div>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>углеводы, г</div>
          </div>
        </div>
      </div>

      {/* Меню на неделю */}
      <div style={{ ...glassCard(26), padding: '14px 18px', ...cardIn(0.12) }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Меню на неделю</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {plan.week.map((row, i) => {
            const active = i === plan.currentDay;
            return (
              <div
                key={row.day}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '8px 0',
                  borderBottom: i < plan.week.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    ...numStyle,
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: active ? 'var(--fit-accent)' : 'rgba(255,255,255,0.5)',
                    width: 26,
                    flex: 'none',
                    textShadow: active ? '0 0 10px rgba(240,230,214,0.45)' : 'none',
                  }}
                >
                  {row.day}
                </span>
                <span style={{ fontSize: 13, color: active ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.62)' }}>{row.menu}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Рекомендации ИИ */}
      <div style={{ ...glassCard(26), padding: '14px 18px', ...cardIn(0.19) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--fit-accent)', boxShadow: '0 0 10px rgba(240,230,214,0.9)' }} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>Советы Виты</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recs.map((r) => (
            <div key={r} style={{ fontSize: 13, lineHeight: 1.45, color: 'rgba(255,255,255,0.78)' }}>
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div onClick={rebuild} style={{ ...shinyBtn, opacity: rebuilding ? 0.7 : 1, ...cardIn(0.26) }}>
        <svg
          width={16}
          height={16}
          viewBox="0 0 16 16"
          fill="none"
          stroke="#1B1710"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={rebuilding ? { animation: 'spin 1s linear infinite' } : undefined}
        >
          <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v2.7h-2.7" />
        </svg>
        {rebuilding ? 'Пересобираю…' : 'Пересобрать план с ИИ'}
      </div>
    </div>
  );
}
