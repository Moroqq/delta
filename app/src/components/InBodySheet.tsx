import { useApp } from '../lib/store';
import { blur, kicker, numStyle } from '../lib/ui';

const cell = {
  background: 'rgba(255,255,255,0.045)',
  borderRadius: 16,
  padding: '10px 12px',
  boxShadow: 'inset 0 1px 0 rgba(255,243,219,0.14)',
} as const;

const cellLabel = {
  fontSize: 11,
  letterSpacing: 0.6,
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.5)',
} as const;

const cellValue = { ...numStyle, fontSize: 19, fontWeight: 600, marginTop: 4 } as const;

/** Bottom sheet с деталями замера InBody */
export function InBodySheet() {
  const { data, tab, selPoint, setSelPoint } = useApp();
  if (tab !== 'body' || selPoint == null) return null;
  const m = data.inbody[selPoint];

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40 }}>
      <div
        onClick={() => setSelPoint(null)}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          ...blur(4, 1),
          animation: 'fadeIn 0.25s ease-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 8,
          right: 8,
          bottom: 'calc(8px + var(--safe-bottom))',
          background: 'rgba(50,44,36,0.58)',
          ...blur(40, 1.5),
          borderRadius: 32,
          padding: '14px 20px 22px',
          boxShadow:
            'inset 0 1px 0 rgba(255,243,219,0.38), inset 0 0 0 1px rgba(255,243,219,0.09), 0 -20px 50px rgba(0,0,0,0.55)',
          animation: 'sheetUp 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)', margin: '0 auto 14px' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={kicker}>Замер InBody</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>{m.date}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
            <span style={{ ...numStyle, fontSize: 34, fontWeight: 700, lineHeight: 1, textShadow: '0 0 20px rgba(240,230,214,0.25)' }}>
              {m.w}
            </span>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>кг</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
          <div style={cell}>
            <div style={cellLabel}>Жир</div>
            <div style={cellValue}>{m.fat} %</div>
          </div>
          <div style={cell}>
            <div style={cellLabel}>Мышцы</div>
            <div style={cellValue}>{m.musc} кг</div>
          </div>
          <div style={cell}>
            <div style={cellLabel}>Вода</div>
            <div style={cellValue}>{m.wat} %</div>
          </div>
          <div style={cell}>
            <div style={cellLabel}>Висц. жир</div>
            <div style={cellValue}>{m.visc} ур.</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, ...cell, cursor: 'pointer' }}>
          <div
            style={{
              width: 52,
              height: 68,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.06)',
              flex: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              boxShadow: 'inset 0 1px 0 rgba(255,243,219,0.22)',
            }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <rect x={3.5} y={4.5} width={17} height={15} rx={2.5} />
              <circle cx={9} cy={10} r={1.8} />
              <path d="M3.5 16.5 8.5 12l4 3.5 3.5-3 4.5 4" />
            </svg>
            <span style={{ fontSize: 8, letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>InBody</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{m.file}</div>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>загруженный скриншот замера</div>
          </div>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
            <path d="M5 3.5 9 7l-4 3.5" stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
