/**
 * Сглаженная кривая (Catmull-Rom → Bezier) — формула из дизайн-прототипа.
 * Возвращает SVG-путь и функцию at(x) для позиционирования точек на кривой.
 */
export function smoothPath(series: number[], width: number, top: number, bottom: number) {
  const mn = Math.min(...series);
  const mx = Math.max(...series);
  const pad = (mx - mn) * 0.15 || 0.5;
  const lo = mn - pad;
  const hi = mx + pad;
  const sy = (v: number) => bottom - ((v - lo) / (hi - lo)) * (bottom - top);
  const P = series.map((v, i) => [(i * width) / (series.length - 1), sy(v)] as const);
  const n = P.length - 1;
  const S: [number, number][] = [];
  let d = `M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const a = P[Math.max(0, i - 1)];
    const b = P[i];
    const c = P[i + 1];
    const e2 = P[Math.min(n, i + 2)];
    const c1x = b[0] + (c[0] - a[0]) / 6;
    const c1y = b[1] + (c[1] - a[1]) / 6;
    const c2x = c[0] - (e2[0] - b[0]) / 6;
    const c2y = c[1] - (e2[1] - b[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
    for (let k = 0; k <= 24; k++) {
      const t = k / 24;
      const u = 1 - t;
      S.push([
        u * u * u * b[0] + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * c[0],
        u * u * u * b[1] + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * c[1],
      ]);
    }
  }
  const at = (x: number) => {
    let best = S[0];
    for (const q of S) if (Math.abs(q[0] - x) < Math.abs(best[0] - x)) best = q;
    return best[1];
  };
  return { d, at };
}

/** Ломаная по неделям для экрана прогресса упражнения */
export function progressPath(hist: number[]) {
  const mn = Math.min(...hist);
  const mx = Math.max(...hist);
  const X = (i: number) => (8 + i * (332 / (hist.length - 1))).toFixed(1);
  const Y = (v: number) => (122 - ((v - mn) / (mx - mn || 1)) * 97).toFixed(1);
  let path = `M${X(0)} ${Y(hist[0])}`;
  for (let i = 1; i < hist.length; i++) path += ` L${X(i)} ${Y(hist[i])}`;
  const dots = hist.map((v, i) => `M${X(i)} ${Y(v)} l0 0.01`).join(' ');
  return { path, dots };
}
