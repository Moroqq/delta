const { Stage, Sprite, useTime, Easing, interpolate } = window;

// ---- design tokens (Spatial Glass) ----
const ACCENT = '#F0E6D6';
const TXT = '#F2EFE8';
const FONT = "'Golos Text', sans-serif";
const NUM_FONT = "'Space Grotesk', 'Golos Text', sans-serif";

function clamp01(v) { return Math.max(0, Math.min(1, v)); }

// smooth fade window: 0 -> 1 -> 0 across [start,end] with `fade` s ramps
function segOpacity(t, start, end, fade) {
  if (t <= start - fade || t >= end + fade) return 0;
  if (t < start + fade) return clamp01((t - (start - fade)) / (fade * 2));
  if (t > end - fade) return clamp01(((end + fade) - t) / (fade * 2));
  return 1;
}

function Blobs() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <style>{`
        @keyframes promoBlobA { 0%,100% { transform: scale(1) translate(0,0); opacity: 0.8; } 50% { transform: scale(1.15) translate(20px,-28px); opacity: 1; } }
        @keyframes promoBlobB { 0%,100% { transform: scale(1.1) translate(0,0); opacity: 0.6; } 50% { transform: scale(0.95) translate(-28px,20px); opacity: 0.9; } }
        @keyframes promoBlobC { 0%,100% { transform: scale(1) translate(0,0); opacity: 0.55; } 50% { transform: scale(1.18) translate(16px,-20px); opacity: 0.85; } }
      `}</style>
      <div style={{ position: 'absolute', width: 900, height: 760, left: '50%', marginLeft: -450, bottom: -360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(246,202,138,0.55) 0%, rgba(246,202,138,0) 68%)', filter: 'blur(70px)', animation: 'promoBlobA 12s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 720, height: 720, right: -320, top: '18%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,196,138,0.40) 0%, rgba(240,196,138,0) 66%)', filter: 'blur(78px)', animation: 'promoBlobB 15s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 680, height: 680, left: -320, top: -140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,222,180,0.32) 0%, rgba(244,222,180,0) 66%)', filter: 'blur(78px)', animation: 'promoBlobC 18s ease-in-out infinite' }} />
    </div>
  );
}

function Glass({ style, children, glow }) {
  return (
    <div style={{
      background: 'rgba(48,42,34,0.34)',
      backdropFilter: 'blur(24px) saturate(1.4)',
      WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
      borderRadius: 26,
      boxShadow: glow
        ? 'inset 0 1px 0 rgba(255,243,219,0.42), inset 0 0 0 1px rgba(240,230,214,0.30), 0 0 30px -4px rgba(240,230,214,0.28), 0 30px 70px -26px rgba(0,0,0,0.5)'
        : 'inset 0 1px 0 rgba(255,243,219,0.28), inset 0 0 0 1px rgba(255,243,219,0.07), 0 26px 60px -24px rgba(0,0,0,0.42)',
      ...style,
    }}>{children}</div>
  );
}

// ---------- Screen: Тело ----------
function BodyScreen({ p }) {
  // p: 0..1 local progress since screen became active
  const num = Math.round(interpolate([0, 1], [61.4, 78.2], Easing.easeOutCubic)(clamp01(p * 1.6)));
  const drawLen = clamp01(p * 1.4);
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '86px 26px 0', boxSizing: 'border-box', fontFamily: FONT, color: TXT }}>
      <div style={{ fontSize: 30, fontWeight: 600 }}>Тело</div>
      <Glass glow style={{ padding: '22px 24px', marginTop: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: 1.4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Вес</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
          <span style={{ fontFamily: NUM_FONT, fontVariantNumeric: 'tabular-nums', fontSize: 72, fontWeight: 700, textShadow: '0 0 30px rgba(240,230,214,0.25)' }}>{num}</span>
          <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.55)' }}>кг</span>
        </div>
        <svg width="100%" height="180" viewBox="0 0 348 150" style={{ marginTop: 16, display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id="promoWG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F0E6D6" stopOpacity="0.2" />
              <stop offset="1" stopColor="#F0E6D6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="30" x2="348" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 5" />
          <line x1="0" y1="75" x2="348" y2="75" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 5" />
          <line x1="0" y1="120" x2="348" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 5" />
          <path d="M8,96 C60,88 90,70 116,74 C160,80 190,50 232,40 C270,32 310,22 342,18 L342,150 L8,150 Z" fill="url(#promoWG)" opacity={drawLen} />
          <path d="M8,96 C60,88 90,70 116,74 C160,80 190,50 232,40 C270,32 310,22 342,18" pathLength="600" strokeDasharray="600" strokeDashoffset={600 - 600 * drawLen} fill="none" stroke={ACCENT} strokeWidth="3" style={{ filter: 'drop-shadow(0 0 10px rgba(240,230,214,0.75))' }} />
        </svg>
      </Glass>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
        {[['Жир', '14.2', '%'], ['Мышцы', '38.6', 'кг']].map(([l, v, u], i) => (
          <Glass key={i} style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8, color: 'rgba(255,255,255,0.5)' }}>{l}</div>
            <div style={{ fontFamily: NUM_FONT, fontSize: 32, fontWeight: 600, marginTop: 8 }}>{v}<span style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)' }}> {u}</span></div>
          </Glass>
        ))}
      </div>
    </div>
  );
}

// ---------- Screen: Диета ----------
function DietScreen({ p }) {
  const pct = clamp01(p * 1.5);
  const R = 62, C = 2 * Math.PI * R;
  const kcal = Math.round(interpolate([0, 1], [0, 1480], Easing.easeOutCubic)(pct));
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '86px 26px 0', boxSizing: 'border-box', fontFamily: FONT, color: TXT }}>
      <div style={{ fontSize: 30, fontWeight: 600 }}>Диета</div>
      <Glass glow style={{ padding: '20px 22px', marginTop: 20, display: 'flex', alignItems: 'center', gap: 26 }}>
        <div style={{ position: 'relative', width: 168, height: 168, flex: 'none' }}>
          <svg width="168" height="168" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            <circle cx="70" cy="70" r={R} fill="none" stroke={ACCENT} strokeWidth="14" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C - C * pct * 0.76} opacity="0.22" transform="rotate(-90 70 70)" style={{ filter: 'blur(13px)' }} />
            <circle cx="70" cy="70" r={R} fill="none" stroke={ACCENT} strokeWidth="4.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C - C * pct * 0.76} transform="rotate(-90 70 70)" style={{ filter: 'drop-shadow(0 0 8px rgba(240,230,214,0.9))' }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
            <span style={{ fontFamily: NUM_FONT, fontSize: 34, fontWeight: 700 }}>{kcal}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>из 1 950 ккал</span>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[['Белки', 0.82], ['Жиры', 0.55], ['Углеводы', 0.35]].map(([l, f], i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)' }}>{l}</span>
              <div style={{ height: 9, borderRadius: 5, background: 'rgba(0,0,0,0.28)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)' }}>
                <div style={{ width: `${f * pct * 100}%`, height: '100%', borderRadius: 5, background: ACCENT, boxShadow: '0 0 10px rgba(240,230,214,0.7)' }} />
              </div>
            </div>
          ))}
        </div>
      </Glass>
      <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: 1.2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 22 }}>Приёмы пищи</div>
      {[['Завтрак', '08:20', 'Овсянка · яйца'], ['Обед', 'Сейчас', 'Курица с гречкой']].map(([t, time, d], i) => {
        const op = clamp01(p * 1.6 - i * 0.25);
        return (
          <Glass key={i} style={{ padding: '16px 18px', marginTop: 12, opacity: op, transform: `translateY(${(1 - op) * 14}px)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid rgba(255,243,219,0.35)', flex: 'none' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 17, fontWeight: 600 }}>{t}</span>
                  {time === 'Сейчас' && <span style={{ fontSize: 12, fontWeight: 600, color: '#1B1710', background: 'linear-gradient(180deg,#FAF2E2,#EBDCC2)', padding: '3px 10px', borderRadius: 999 }}>Сейчас</span>}
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{d}</div>
              </div>
            </div>
          </Glass>
        );
      })}
    </div>
  );
}

// ---------- Screen: Тренировка ----------
function WorkoutScreen({ p }) {
  const pct = clamp01(p * 1.5);
  const rows = [
    ['1', '52', '10'], ['2', '54', '10'], ['3', '56', '8'],
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '86px 26px 0', boxSizing: 'border-box', fontFamily: FONT, color: TXT }}>
      <div style={{ fontSize: 24, fontWeight: 600 }}>Тяга штанги в наклоне</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 15, color: 'rgba(255,255,255,0.55)' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT, boxShadow: '0 0 8px rgba(240,230,214,0.8)' }} />
        идёт 24 мин · подход 2 из 14
      </div>
      <Glass glow style={{ padding: '18px 20px', marginTop: 22 }}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Подходы</div>
        {rows.map(([n, w, r], i) => {
          const op = clamp01(pct * 1.8 - i * 0.3);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none', opacity: op, transform: `translateX(${(1 - op) * 16}px)` }}>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', width: 18 }}>{n}</span>
              <div style={{ background: 'rgba(0,0,0,0.25)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)', borderRadius: 10, padding: '10px 16px', fontFamily: NUM_FONT, fontSize: 20, fontWeight: 600 }}>{w}</div>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>кг ×</span>
              <div style={{ background: 'rgba(0,0,0,0.25)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)', borderRadius: 10, padding: '10px 14px', fontFamily: NUM_FONT, fontSize: 20, fontWeight: 600 }}>{r}</div>
              {i > 0 && <svg width="16" height="16" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2.5 6.5 6 10l3.5-3.5" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
          );
        })}
      </Glass>
      <div style={{ marginTop: 20, fontSize: 14, color: 'rgba(255,255,255,0.5)', opacity: clamp01(pct * 1.4 - 0.5) }}>прошлый раз: 50 кг × 10 — ИИ подсказывает вес</div>
    </div>
  );
}

// ---------- Screen: Чат ----------
function ChatScreen({ p }) {
  const msgs = [
    { me: false, text: 'Почему вес встал на месте?' },
    { me: true, text: 'За 2 недели выросла вода — сократите соль до 3 г/день и добавьте 20 г белка к завтраку.' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '86px 26px 0', boxSizing: 'border-box', fontFamily: FONT, color: TXT, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(240,230,214,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 rgba(255,243,219,0.26)' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: ACCENT, boxShadow: '0 0 10px rgba(240,230,214,0.9)' }} />
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 600 }}>Ассистент</div>
          <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)' }}>знает ваши замеры и цели</div>
        </div>
      </div>
      {msgs.map((m, i) => {
        const op = clamp01(p * 1.8 - i * 0.35);
        return (
          <div key={i} style={{ display: 'flex', justifyContent: m.me ? 'flex-end' : 'flex-start', opacity: op, transform: `translateY(${(1 - op) * 12}px)` }}>
            <div style={{
              maxWidth: '82%', fontSize: 15.5, lineHeight: 1.5, padding: '14px 17px',
              background: m.me ? 'rgba(240,230,214,0.13)' : 'rgba(46,40,33,0.34)',
              backdropFilter: 'blur(20px) saturate(1.4)',
              borderRadius: m.me ? '22px 22px 8px 22px' : '22px 22px 22px 8px',
              boxShadow: 'inset 0 1px 0 rgba(255,243,219,0.2)',
            }}>{m.text}</div>
          </div>
        );
      })}
      <div style={{ marginTop: 'auto', marginBottom: 24, opacity: clamp01(p * 1.5 - 0.8) }}>
        <Glass style={{ padding: '14px 18px', borderRadius: 999, display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>Спросите о питании…</Glass>
      </div>
    </div>
  );
}

const SEGMENTS = [
  { key: 'body', start: 3.5, end: 8.2, kicker: '01 · ТЕЛО', title: 'ИИ отслеживает\nкаждый показатель', C: BodyScreen },
  { key: 'diet', start: 8.2, end: 13.0, kicker: '02 · ДИЕТА', title: 'Персональный\nплан питания', C: DietScreen },
  { key: 'workout', start: 13.0, end: 18.0, kicker: '03 · ТРЕНИРОВКИ', title: 'Подсказки веса\nна каждый подход', C: WorkoutScreen },
  { key: 'chat', start: 18.0, end: 22.6, kicker: '04 · ИИ-ЧАТ', title: 'Спросите ИИ\nо чём угодно', C: ChatScreen },
];

function PhoneFrame({ t }) {
  const frameOp = clamp01((t - 2.7) / 0.6) * (1 - clamp01((t - 23.0) / 0.5));
  const riseY = interpolate([2.7, 3.3], [60, 0], Easing.easeOutCubic)(clamp01(t));
  return (
    <div style={{ position: 'absolute', left: '50%', top: 300, marginLeft: -220, width: 440, height: 900, opacity: frameOp, transform: `translateY(${t < 3.3 ? riseY : 0}px)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 56, background: '#0d0b08', boxShadow: '0 60px 120px -40px rgba(0,0,0,0.7), inset 0 0 0 2px rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', inset: 14, borderRadius: 44, overflow: 'hidden', background: 'linear-gradient(180deg,#221C15 0%,#171310 48%,#120F0A 100%)' }}>
        <Blobs />
        {SEGMENTS.map(seg => {
          const op = segOpacity(t, seg.start, seg.end, 0.4);
          if (op <= 0.001) return null;
          const p = clamp01((t - seg.start) / (seg.end - seg.start));
          const Comp = seg.C;
          return (
            <div key={seg.key} style={{ position: 'absolute', inset: 0, opacity: op }}>
              <Comp p={p} />
            </div>
          );
        })}
        <div style={{ position: 'absolute', left: '50%', top: 22, width: 130, height: 30, marginLeft: -65, borderRadius: 20, background: '#0d0b08' }} />
      </div>
    </div>
  );
}

function Captions({ t }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 150, textAlign: 'center' }}>
      {SEGMENTS.map(seg => {
        const op = segOpacity(t, seg.start, seg.end, 0.4);
        if (op <= 0.001) return null;
        return (
          <div key={seg.key} style={{ position: 'absolute', left: 0, right: 0, opacity: op, transform: `translateY(${(1 - op) * 10}px)` }}>
            <div style={{ fontFamily: NUM_FONT, fontSize: 22, fontWeight: 600, letterSpacing: 2, color: 'rgba(240,230,214,0.8)' }}>{seg.kicker}</div>
            <div style={{ fontFamily: FONT, fontSize: 44, fontWeight: 600, color: TXT, marginTop: 10, whiteSpace: 'pre-line', lineHeight: 1.25 }}>{seg.title}</div>
          </div>
        );
      })}
    </div>
  );
}

function IntroTitle({ t }) {
  const op = clamp01(t / 0.8) * (1 - clamp01((t - 2.6) / 0.6));
  const scale = interpolate([0, 0.8], [0.92, 1], Easing.easeOutCubic)(clamp01(t));
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: op, transform: `scale(${scale})` }}>
      <div style={{ fontFamily: FONT, fontSize: 64, fontWeight: 600, color: TXT, textShadow: '0 0 40px rgba(240,230,214,0.3)' }}>AI Fitness</div>
      <div style={{ fontFamily: FONT, fontSize: 24, color: 'rgba(255,255,255,0.6)', marginTop: 18 }}>Тренируйся. Питайся. Прогрессируй.</div>
    </div>
  );
}

function Outro({ t }) {
  const op = clamp01((t - 22.8) / 0.6);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: op, transform: `translateY(${(1 - op) * 20}px)` }}>
      <div style={{ fontFamily: FONT, fontSize: 52, fontWeight: 600, color: TXT, textShadow: '0 0 34px rgba(240,230,214,0.3)' }}>AI Fitness</div>
      <div style={{ fontFamily: FONT, fontSize: 22, color: 'rgba(255,255,255,0.6)', marginTop: 14 }}>Скачайте и начните сегодня</div>
      <div style={{
        marginTop: 30, background: 'linear-gradient(180deg,#FAF2E2,#EBDCC2)', color: '#1B1710', fontFamily: FONT,
        fontSize: 22, fontWeight: 600, padding: '18px 44px', borderRadius: 999,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.85), 0 0 34px rgba(240,230,214,0.32)',
      }}>Скачать приложение</div>
    </div>
  );
}

function Scene() {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #221C15 0%, #171310 48%, #120F0A 100%)', overflow: 'hidden' }}>
      <Blobs />
      <IntroTitle t={t} />
      <PhoneFrame t={t} />
      <Captions t={t} />
      <Outro t={t} />
    </div>
  );
}

function PromoVideo() {
  return (
    <Stage width={1080} height={1920} duration={24} background="#171310">
      <Sprite start={0} end={24} keepMounted>
        <Scene />
      </Sprite>
    </Stage>
  );
}

window.PromoVideo = PromoVideo;
