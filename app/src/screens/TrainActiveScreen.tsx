import { ru } from '../lib/format';
import { useApp } from '../lib/store';
import { backBtn, blur, cardIn, glassCard, grooveInput, numStyle, primaryBtn, screenStyle } from '../lib/ui';

export function TrainActiveScreen() {
  const { data, sets, setSetValue, endWorkout, openProgress, openTimer } = useApp();
  const { workout } = data;

  const setsDone = sets.flat().filter((s) => s.w !== '' && s.r !== '').length;
  const setsTotal = sets.flat().length;

  return (
    <div style={screenStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div onClick={endWorkout} style={{ ...backBtn, transition: 'transform 0.15s ease' }}>
          <svg width={15} height={15} viewBox="0 0 14 14" fill="none">
            <path d="M9 3.5 5 7l4 3.5" stroke="rgba(255,255,255,0.85)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 19, fontWeight: 600 }}>{data.workoutTitle}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--fit-accent)', boxShadow: '0 0 8px rgba(240,230,214,0.9)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontVariantNumeric: 'tabular-nums' }}>
              идёт 24 мин · подход {setsDone} из {setsTotal}
            </span>
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', animation: 'fadeIn 0.4s ease-out 0.1s both' }}>
        тап по упражнению — прогресс рабочего веса
      </div>

      {workout.map((ex, i) => (
        <div key={ex.name} style={{ ...glassCard(26), padding: '13px 16px', ...cardIn(0.08 + i * 0.07) }}>
          <div onClick={() => openProgress(i)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{ex.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{ex.equip}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
                <path d="M2.5 12.5 6 8l3 2.5 4.5-6" stroke="rgba(240,230,214,0.75)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width={13} height={13} viewBox="0 0 14 14" fill="none">
                <path d="M5 3.5 9 7l-4 3.5" stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
            {ex.sets.map((spec, j) => {
              const val = sets[i][j];
              const wNum = parseFloat(String(val.w).replace(',', '.'));
              const up = isFinite(wNum) && wNum > spec.lw;
              return (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ width: 14, fontSize: 11.5, color: 'rgba(255,255,255,0.35)', fontFamily: "'Space Grotesk','Golos Text',sans-serif" }}>
                    {j + 1}
                  </span>
                  <input
                    value={val.w}
                    onChange={(e) => setSetValue(i, j, 'w', e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    inputMode="decimal"
                    style={grooveInput(52)}
                  />
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>кг ×</span>
                  <input
                    value={val.r}
                    onChange={(e) => setSetValue(i, j, 'r', e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    inputMode="numeric"
                    style={grooveInput(38)}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      width: 14,
                      textAlign: 'center',
                      color: 'var(--fit-accent)',
                      opacity: up ? 1 : 0,
                      transition: 'opacity 0.25s ease',
                      filter: up ? 'drop-shadow(0 0 4px rgba(240,230,214,0.8))' : 'none',
                      flex: 'none',
                    }}
                  >
                    ▲
                  </span>
                  <span style={{ flex: 1 }} />
                  <span style={{ ...numStyle, fontSize: 11.5, color: 'rgba(255,255,255,0.36)', whiteSpace: 'nowrap' }}>
                    прошлый раз: {ru(spec.lw)} кг × {spec.lr}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ display: 'flex', alignItems: 'stretch', gap: 10, ...cardIn(0.4) }}>
        <div onClick={endWorkout} style={{ ...primaryBtn, flex: 1 }}>
          Завершить тренировку
        </div>
        <div
          onClick={openTimer}
          style={{
            width: 50,
            borderRadius: 999,
            background: 'rgba(46,40,33,0.34)',
            ...blur(20),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flex: 'none',
            boxShadow: 'inset 0 1px 0 rgba(255,243,219,0.3), inset 0 0 0 1px rgba(255,243,219,0.08)',
            transition: 'transform 0.15s ease',
          }}
        >
          <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <circle cx={12} cy={13.5} r={7} />
            <path d="M12 10.5v3.5l2.3 1.6M10 3h4M12 3v3.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
