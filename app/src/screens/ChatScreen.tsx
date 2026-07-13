import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { useApp } from '../lib/store';
import { blur } from '../lib/ui';

const CHIPS = ['Составь ужин на 600 ккал', 'Почему вес встал?', 'План на сегодня'];

const iconBtn: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flex: 'none',
};

function CameraIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x={3.5} y={4.5} width={17} height={15} rx={2.5} />
      <circle cx={9} cy={10} r={1.8} />
      <path d="M3.5 16.5 8.5 12l4 3.5 3.5-3 4.5 4" />
    </svg>
  );
}

function SendIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="#1B1710" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatInput({ compact, onSend }: { compact?: boolean; onSend: (text: string) => void }) {
  const [text, setText] = useState('');
  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };
  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 6 : 8,
        background: compact ? 'rgba(48,42,34,0.36)' : 'rgba(48,42,34,0.34)',
        ...blur(26),
        borderRadius: 999,
        padding: compact ? '6px 6px 6px 18px' : '8px 8px 8px 20px',
        boxShadow:
          'inset 0 1px 0 rgba(255,243,219,0.32), inset 0 0 0 1px rgba(255,243,219,0.08), 0 24px 56px -22px rgba(0,0,0,0.45)',
      }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
        placeholder="Спросите о питании…"
        style={{
          flex: 1,
          minWidth: 0,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontSize: 14,
          color: '#F2EFE8',
          fontFamily: 'inherit',
        }}
      />
      <div style={{ ...iconBtn, width: compact ? 34 : 36, height: compact ? 34 : 36 }}>
        <CameraIcon size={compact ? 17 : 18} />
      </div>
      {!compact && (
        <div style={iconBtn}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <rect x={9} y={3} width={6} height={11} rx={3} />
            <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
          </svg>
        </div>
      )}
      <div
        onClick={submit}
        style={{
          ...iconBtn,
          width: compact ? 38 : 40,
          height: compact ? 38 : 40,
          background: compact ? 'linear-gradient(180deg,#F4EAD6,#F0E4CD)' : 'linear-gradient(180deg,#FAF2E2,#EBDCC2)',
          boxShadow: compact
            ? '0 1px 2px rgba(0,0,0,0.18)'
            : 'inset 0 1px 0 rgba(255,255,255,0.8), 0 0 18px rgba(240,230,214,0.35)',
          transition: 'transform 0.15s ease',
        }}
      >
        <SendIcon size={compact ? 15 : 16} />
      </div>
    </div>
  );
}

const assistantBubble: CSSProperties = {
  maxWidth: '82%',
  alignSelf: 'flex-start',
  userSelect: 'text',
  WebkitUserSelect: 'text',
  background: 'rgba(48,42,34,0.34)',
  ...blur(24),
  borderRadius: '22px 22px 22px 8px',
  padding: '12px 15px',
  fontSize: 14,
  lineHeight: 1.45,
  boxShadow:
    'inset 0 1px 0 rgba(255,243,219,0.28), inset 0 0 0 1px rgba(255,243,219,0.07), 0 20px 48px -20px rgba(0,0,0,0.4)',
};

const userBubble: CSSProperties = {
  maxWidth: '82%',
  alignSelf: 'flex-end',
  userSelect: 'text',
  WebkitUserSelect: 'text',
  background: 'rgba(240,230,214,0.13)',
  ...blur(24),
  borderRadius: '22px 22px 8px 22px',
  padding: '12px 15px',
  fontSize: 14,
  lineHeight: 1.45,
  color: '#F7F2E8',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(240,230,214,0.1), 0 20px 48px -20px rgba(0,0,0,0.4)',
};

export function ChatScreen() {
  const { messages, typing, sendMessage, resetChat } = useApp();
  const started = messages.length > 0;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length, typing]);

  if (!started) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'screenIn 0.35s ease-out', position: 'relative' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 24px 90px', position: 'relative' }}>
          {/* луч света */}
          <div style={{ position: 'relative', width: '100%', height: 230, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', pointerEvents: 'none' }}>
            <div
              style={{
                position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)',
                width: 190, height: 230,
                background: 'radial-gradient(ellipse 42% 58% at 50% 42%, rgba(246,237,219,0.22), rgba(246,237,219,0) 70%)',
                filter: 'blur(8px)', animation: 'beamBreath 5s ease-in-out infinite',
              }}
            />
            <div
              style={{
                position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)',
                width: 2.5, height: 190,
                background: 'linear-gradient(180deg, rgba(246,237,219,0) 0%, rgba(246,237,219,0.95) 45%, rgba(246,237,219,0) 100%)',
                boxShadow: '0 0 22px 5px rgba(246,237,219,0.35)', animation: 'beamBreath 5s ease-in-out infinite',
              }}
            />
            <svg width={30} height={30} viewBox="0 0 24 24" fill="none" style={{ position: 'relative', marginBottom: 8, filter: 'drop-shadow(0 0 12px rgba(246,237,219,0.8))' }}>
              <path d="M12 2c.7 5 5 9.3 10 10-5 .7-9.3 5-10 10-.7-5-5-9.3-10-10 5-.7 9.3-5 10-10Z" fill="#F5ECDA" />
            </svg>
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, textAlign: 'center', textShadow: '0 0 30px rgba(246,237,219,0.3)' }}>Чем помочь?</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>Вита знает ваши замеры, питание и тренировки</div>

          <div style={{ width: '100%', marginTop: 22 }}>
            <ChatInput onSend={sendMessage} />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 16 }}>
            {CHIPS.map((chip) => (
              <span
                key={chip}
                onClick={() => sendMessage(chip)}
                style={{
                  fontSize: 12.5,
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(46,40,33,0.30)',
                  ...blur(20),
                  borderRadius: 999,
                  padding: '9px 15px',
                  cursor: 'pointer',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,243,219,0.26), inset 0 0 0 1px rgba(255,243,219,0.07), 0 12px 30px -12px rgba(0,0,0,0.4)',
                  transition: 'transform 0.15s ease',
                  userSelect: 'none',
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'screenIn 0.35s ease-out' }}>
      {/* шапка */}
      <div style={{ padding: 'calc(18px + var(--safe-top)) 20px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(240,230,214,0.1)',
            ...blur(16, 1),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 1px 0 rgba(255,243,219,0.28)',
          }}
        >
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--fit-accent)', boxShadow: '0 0 12px rgba(240,230,214,0.9)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 600 }}>Вита</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>знает ваши замеры и цели</div>
        </div>
        <div
          onClick={resetChat}
          style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(46,40,33,0.30)',
            ...blur(16, 1),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'inset 0 1px 0 rgba(255,243,219,0.26)',
            transition: 'transform 0.15s ease',
          }}
        >
          <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* сообщения */}
      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '6px 20px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
          <div key={m.id} style={{ ...(m.role === 'assistant' ? assistantBubble : userBubble), animation: 'cardIn 0.4s ease-out both', animationDelay: `${Math.min(i * 0.08, 0.24)}s` }}>
            {m.text}
          </div>
        ))}
        {typing && (
          <div style={{ ...assistantBubble, display: 'flex', gap: 5, padding: '15px 16px' }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.7)',
                  animation: `typingDot 1.2s ease-in-out ${i * 0.18}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* поле ввода */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px calc(88px + var(--safe-bottom))' }}>
        <ChatInput compact onSend={sendMessage} />
      </div>
    </div>
  );
}
