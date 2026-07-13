import type { CSSProperties } from 'react';

import { useApp } from '../lib/store';
import { GLOW_SHADOW, blur, cardIn, glassCard, numStyle, primaryBtn, screenStyle } from '../lib/ui';

const segBase: CSSProperties = {
  flex: 1,
  textAlign: 'center',
  padding: '10px 0',
  borderRadius: 999,
  fontSize: 14,
  cursor: 'pointer',
  transition: 'background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease',
  userSelect: 'none',
};
const segOn: CSSProperties = {
  ...segBase,
  background: 'linear-gradient(180deg,#F4EAD6,#F0E4CD)',
  color: '#1B1710',
  fontWeight: 600,
  boxShadow: '0 1px 2px rgba(0,0,0,0.18)',
};
const segOff: CSSProperties = { ...segBase, color: 'rgba(255,255,255,0.6)', fontWeight: 500 };

export function TrainListScreen() {
  const { data, goal, setGoal, startWorkout } = useApp();
  const { schedule, workout } = data;
  const bulk = goal === 'Набор массы';
  let delay = 0.05;
  const next = () => (delay += 0.06);

  return (
    <div style={screenStyle}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 22, fontWeight: 600 }}>Тренировки</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Неделя {schedule.week}</div>
      </div>

      {/* Сегмент-переключатель цели */}
      <div
        style={{
          display: 'flex',
          background: 'rgba(42,37,30,0.30)',
          ...blur(24),
          borderRadius: 999,
          padding: 4,
          boxShadow: 'inset 0 1px 0 rgba(255,243,219,0.2), inset 0 0 0 1px rgba(255,243,219,0.07)',
          ...cardIn(delay),
        }}
      >
        <div onClick={() => setGoal('Набор массы')} style={bulk ? segOn : segOff}>
          Набор массы
        </div>
        <div onClick={() => setGoal('Сушка')} style={bulk ? segOff : segOn}>
          Сушка
        </div>
      </div>

      {schedule.days.map((day) => {
        if (day.kind === 'done') {
          return (
            <div key={day.title} style={{ ...glassCard(24), padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 14, ...cardIn(next()) }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'rgba(240,230,214,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 'none',
                  boxShadow: 'inset 0 1px 0 rgba(255,243,219,0.26)',
                }}
              >
                <svg width={15} height={15} viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7.5 5.5 10.5 11.5 3.5" stroke="var(--fit-accent)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{day.title}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>{day.stats}</div>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--fit-accent)',
                  background: 'rgba(240,230,214,0.1)',
                  padding: '5px 11px',
                  borderRadius: 999,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                Готово
              </span>
            </div>
          );
        }

        if (day.kind === 'today') {
          return (
            <div
              key={day.title}
              style={{
                background: 'rgba(46,40,33,0.30)',
                ...blur(30, 1.5),
                borderRadius: 30,
                padding: 18,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                boxShadow: GLOW_SHADOW,
                transform: 'translateY(-2px)',
                ...cardIn(next()),
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{day.title}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#1B1710',
                    background: 'linear-gradient(180deg,#F4EAD6,#F0E4CD)',
                    padding: '5px 11px',
                    borderRadius: 999,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                  }}
                >
                  Сегодня
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {workout.map((ex, i) => (
                  <div
                    key={ex.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 0',
                      borderBottom: i < workout.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14 }}>{ex.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{ex.equip}</div>
                    </div>
                    <span style={{ ...numStyle, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{ex.scheme}</span>
                  </div>
                ))}
              </div>
              <div onClick={startWorkout} style={{ ...primaryBtn, padding: 14 }}>
                Начать тренировку
              </div>
            </div>
          );
        }

        if (day.kind === 'rest') {
          return (
            <div
              key={day.title}
              style={{
                border: '1px dashed rgba(255,255,255,0.12)',
                borderRadius: 26,
                padding: '15px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                ...cardIn(next()),
              }}
            >
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>{day.title}</span>
              <svg width={15} height={15} viewBox="0 0 16 16" fill="none">
                <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7Z" stroke="rgba(255,255,255,0.3)" strokeWidth={1.3} strokeLinejoin="round" />
              </svg>
            </div>
          );
        }

        return (
          <div key={day.title} style={{ ...glassCard(24), padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...cardIn(next()) }}>
            <span style={{ fontSize: 15, fontWeight: 500 }}>{day.title}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)' }}>{day.count}</span>
              <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                <path d="M5 3.5 9 7l-4 3.5" stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
