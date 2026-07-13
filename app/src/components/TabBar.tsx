import { useEffect, useState } from 'react';

import { useApp } from '../lib/store';
import type { Tab } from '../lib/types';
import { SPRING, blur } from '../lib/ui';

/** true, пока открыта экранная клавиатура (visualViewport заметно уже окна) */
function useKeyboardOpen() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => setOpen(window.innerHeight - vv.height > 150);
    vv.addEventListener('resize', onResize);
    return () => vv.removeEventListener('resize', onResize);
  }, []);
  return open;
}

const NAV: { id: Tab; label: string; d: string }[] = [
  { id: 'body', label: 'Тело', d: 'M12 11.5a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Zm-7.5 9.5c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6' },
  { id: 'diet', label: 'Диета', d: 'M12 3.5c.8 2.8 4.8 4.6 4.8 8.4a4.8 4.8 0 0 1-9.6 0c0-1.7.8-3 1.8-4.4.4 1.3 1.2 2 2.6 2.2-.8-2-.6-4.2.4-6.2Z' },
  { id: 'train', label: 'Тренировки', d: 'M7 7v10M17 7v10M3.5 10v4M20.5 10v4M7 12h10' },
  { id: 'chat', label: 'Вита', d: 'M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3.5 20l1.1-4.3a8.5 8.5 0 1 1 15.9-4.2Z' },
];

export function TabBar() {
  const { tab, setTab } = useApp();
  const keyboardOpen = useKeyboardOpen();
  if (keyboardOpen) return null; // не наезжать на поле ввода
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 'calc(16px + var(--safe-bottom))',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: 7,
        borderRadius: 999,
        background: 'rgba(44,39,32,0.40)',
        ...blur(32, 1.5),
        boxShadow:
          'inset 0 1px 0 rgba(255,243,219,0.32), inset 0 0 0 1px rgba(255,243,219,0.08), 0 26px 60px -20px rgba(0,0,0,0.55)',
        zIndex: 30,
      }}
    >
      {NAV.map((t) => {
        const active = t.id === tab;
        const color = active ? 'var(--fit-accent)' : 'rgba(255,255,255,0.42)';
        return (
          <div
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              width: 76,
              padding: '8px 0',
              borderRadius: 999,
              cursor: 'pointer',
              background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
              boxShadow: active ? 'inset 0 1px 0 rgba(255,243,219,0.22)' : 'none',
              transition: 'background 0.25s ease, transform 0.15s ease',
              userSelect: 'none',
            }}
          >
            <svg
              width={21}
              height={21}
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transition: 'stroke 0.2s',
                animation: active ? `tabPop 0.35s ${SPRING}` : 'none',
                filter: active ? 'drop-shadow(0 0 7px rgba(240,230,214,0.6))' : 'none',
              }}
            >
              <path d={t.d} />
            </svg>
            <span style={{ fontSize: 10, letterSpacing: 0.2, fontWeight: 500, color, transition: 'color 0.2s' }}>
              {t.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
