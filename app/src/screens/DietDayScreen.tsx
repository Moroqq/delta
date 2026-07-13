import type { CSSProperties } from 'react';

import { CheckCircle } from '../components/CheckCircle';
import { Counter } from '../components/Counter';
import { buzz, fmtKbju } from '../lib/format';
import { useApp } from '../lib/store';
import {
  CARD_SHADOW,
  GLOW_SHADOW,
  SPRING,
  blur,
  cardIn,
  glassCard,
  heroCard,
  kicker,
  numStyle,
  primaryBtn,
  screenStyle,
} from '../lib/ui';

const CIRC = 389.6;

function MacroBar({ label, value, max, opacity, ready }: { label: string; value: number; max: number; opacity?: number; ready: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
        <span style={{ color: 'rgba(255,255,255,0.75)' }}>{label}</span>
        <span style={{ color: 'rgba(255,255,255,0.5)', ...numStyle }}>
          {value} / {max} г
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.28)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)' }}>
        <div
          style={{
            height: 6,
            borderRadius: 3,
            background: 'var(--fit-accent)',
            boxShadow: '0 0 8px rgba(240,230,214,0.55)',
            transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
            width: `${ready ? Math.min(100, (value / max) * 100) : 0}%`,
            opacity,
          }}
        />
      </div>
    </div>
  );
}

export function DietDayScreen() {
  const { data, ready, eaten, toggleEaten, expanded, toggleExpanded, done, toggleDone, setDietView } = useApp();
  const { meals, tasks, plan } = data;
  const t = plan.targets;

  const currentId = meals.find((m) => !eaten[m.id])?.id;
  let calSum = 0, pSum = 0, fSum = 0, cSum = 0;
  for (const m of meals) {
    if (eaten[m.id]) {
      calSum += m.cal; pSum += m.p; fSum += m.f; cSum += m.c;
    }
  }
  const tasksDone = tasks.filter((x) => done[x.id]).length;
  const ringDash = `${(ready ? CIRC * Math.min(1, calSum / t.cal) : 0).toFixed(1)} 500`;

  return (
    <div style={screenStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 22, fontWeight: 600 }}>Диета</div>
        <div
          onClick={() => setDietView('plan')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--fit-accent)',
            cursor: 'pointer',
            padding: '6px 0',
            textShadow: '0 0 14px rgba(240,230,214,0.4)',
            userSelect: 'none',
          }}
        >
          Мой план
          <svg width={13} height={13} viewBox="0 0 14 14" fill="none">
            <path d="M5 3.5 9 7l-4 3.5" stroke="var(--fit-accent)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Карточка КБЖУ */}
      <div style={{ ...heroCard(28), padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 20, ...cardIn(0.05) }}>
        <div style={{ position: 'relative', width: 132, height: 132, flex: 'none' }}>
          <svg width={132} height={132} viewBox="0 0 140 140" style={{ overflow: 'visible' }}>
            <circle cx={70} cy={70} r={62} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={3} />
            <circle
              cx={70} cy={70} r={62} fill="none"
              stroke="var(--fit-accent)" strokeWidth={12} strokeLinecap="round"
              strokeDasharray={ringDash} transform="rotate(-90 70 70)" opacity={0.22}
              style={{ filter: 'blur(11px)', transition: 'stroke-dasharray 0.7s cubic-bezier(0.22,1,0.36,1)' }}
            />
            <circle
              cx={70} cy={70} r={62} fill="none"
              stroke="var(--fit-accent)" strokeWidth={3.5} strokeLinecap="round"
              strokeDasharray={ringDash} transform="rotate(-90 70 70)"
              style={{ filter: 'drop-shadow(0 0 7px rgba(240,230,214,0.9))', transition: 'stroke-dasharray 0.7s cubic-bezier(0.22,1,0.36,1)' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <span style={{ ...numStyle, fontSize: 27, fontWeight: 700, lineHeight: 1 }}>
              <Counter value={ready ? calSum : 0} grouped dur={600} />
            </span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontVariantNumeric: 'tabular-nums' }}>
              из {t.cal.toLocaleString('ru-RU')} ккал
            </span>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <MacroBar label="Белки" value={pSum} max={t.p} ready={ready} />
          <MacroBar label="Жиры" value={fSum} max={t.f} opacity={0.65} ready={ready} />
          <MacroBar label="Углеводы" value={cSum} max={t.c} opacity={0.4} ready={ready} />
        </div>
      </div>

      <div style={{ ...kicker, marginTop: 4, animation: 'fadeIn 0.4s ease-out 0.15s both' }}>Приёмы пищи</div>

      {meals.map((m, i) => {
        const isEaten = !!eaten[m.id];
        const isCurrent = m.id === currentId;
        const isOpen = expanded === m.id;
        const cardStyle: CSSProperties = {
          background: 'rgba(46,40,33,0.30)',
          ...blur(24),
          borderRadius: 26,
          padding: '13px 15px',
          cursor: 'pointer',
          boxShadow: isCurrent ? GLOW_SHADOW : CARD_SHADOW,
          transform: isCurrent ? 'translateY(-2px)' : 'none',
          opacity: isEaten ? 0.55 : 1,
          transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
          ...cardIn(0.12 + i * 0.06),
        };
        return (
          <div key={m.id} style={cardStyle} onClick={() => toggleExpanded(m.id)}>
            <div style={{ display: 'flex', gap: 12 }}>
              <CheckCircle
                checked={isEaten}
                size={30}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEaten(m.id);
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{m.title}</span>
                  {isCurrent && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: '#1B1710',
                        background: 'linear-gradient(180deg,#FAF2E2,#EBDCC2)',
                        padding: '3px 9px',
                        borderRadius: 999,
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 0 14px rgba(240,230,214,0.4)',
                      }}
                    >
                      Сейчас
                    </span>
                  )}
                  <span style={{ flex: 1 }} />
                  <span
                    style={{
                      ...numStyle,
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: isCurrent ? 'var(--fit-accent)' : 'rgba(255,255,255,0.45)',
                      textShadow: isCurrent ? '0 0 12px rgba(240,230,214,0.45)' : 'none',
                    }}
                  >
                    {m.time}
                  </span>
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{ flex: 'none', transform: isOpen ? 'rotate(180deg)' : 'none', transition: `transform 0.3s ${SPRING}` }}
                  >
                    <path d="M3.5 5.5 7 9l3.5-3.5" stroke="rgba(255,255,255,0.4)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4, lineHeight: 1.4 }}>{m.dishes}</div>
                <div style={{ ...numStyle, fontSize: 12.5, color: 'rgba(255,255,255,0.5)', marginTop: 6, letterSpacing: 0.2 }}>
                  {fmtKbju(m.cal, m.p, m.f, m.c)}
                </div>
              </div>
            </div>
            {isOpen && (
              <div
                style={{
                  marginTop: 12,
                  marginLeft: 36,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  animation: 'expandIn 0.25s ease-out',
                }}
              >
                {m.items.map((dish) => (
                  <div key={dish.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.92)' }}>{dish.name}</div>
                      <div style={{ ...numStyle, fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>
                        {dish.grams} г · {fmtKbju(dish.cal, dish.p, dish.f, dish.c)}
                      </div>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        buzz();
                      }}
                      style={{
                        flex: 'none',
                        fontSize: 12,
                        fontWeight: 500,
                        color: 'var(--fit-accent)',
                        background: 'rgba(255,255,255,0.06)',
                        ...blur(8, 1),
                        borderRadius: 999,
                        padding: '6px 13px',
                        cursor: 'pointer',
                        boxShadow: 'inset 0 1px 0 rgba(255,243,219,0.22), inset 0 0 0 1px rgba(255,243,219,0.08)',
                        transition: 'transform 0.15s ease',
                        userSelect: 'none',
                      }}
                    >
                      заменить
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Задачи на день */}
      <div style={{ ...glassCard(22), padding: '12px 15px', ...cardIn(0.4) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 13.5, fontWeight: 600 }}>Задачи на день</span>
          <span style={{ fontSize: 11.5, color: 'var(--fit-accent)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
            {tasksDone} из {tasks.length}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 6 }}>
          {tasks.map((task) => {
            const isDone = !!done[task.id];
            return (
              <div key={task.id} onClick={() => toggleDone(task.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', cursor: 'pointer' }}>
                <CheckCircle checked={isDone} size={20} />
                <span style={{ fontSize: 13.5, color: isDone ? 'rgba(255,255,255,0.45)' : '#F2EFE8', transition: 'color 0.3s ease' }}>
                  {task.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Сканировать этикетку */}
      <div onClick={() => buzz()} style={{ ...primaryBtn, ...cardIn(0.46) }}>
        <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="#1B1710" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8.5c0-1.1.9-2 2-2h1.5l1.4-2h6.2l1.4 2H18a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8.5Z" />
          <circle cx={12} cy={12.5} r={3.4} />
        </svg>
        Сканировать этикетку
      </div>
    </div>
  );
}
