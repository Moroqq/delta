import { useEffect, useRef, useState } from 'react';

/** Анимированный каунтер числа (ease-out cubic), формат ru */
export function Counter({
  value,
  decimals = 0,
  grouped = false,
  dur = 700,
}: {
  value: number;
  decimals?: number;
  grouped?: boolean;
  dur?: number;
}) {
  const [v, setV] = useState(0);
  const cur = useRef(0);

  useEffect(() => {
    const from = cur.current;
    const t0 = performance.now();
    let raf = 0;
    const tickFrame = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      const nv = from + (value - from) * e;
      cur.current = nv;
      setV(nv);
      if (p < 1) raf = requestAnimationFrame(tickFrame);
    };
    raf = requestAnimationFrame(tickFrame);
    return () => cancelAnimationFrame(raf);
  }, [value, dur]);

  if (decimals > 0) return <>{v.toFixed(decimals).replace('.', ',')}</>;
  return <>{grouped ? Math.round(v).toLocaleString('ru-RU') : String(Math.round(v))}</>;
}
