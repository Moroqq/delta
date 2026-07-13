import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

/** 84.5 → «84,5» */
export const ru = (n: number | string) => String(n).replace('.', ',');

export const groupRu = (n: number) => Math.round(n).toLocaleString('ru-RU');

export const fmtKbju = (cal: number, p: number, f: number, c: number) =>
  `${cal} ккал · Б ${p} · Ж ${f} · У ${c}`;

/**
 * Тактильный отклик: в нативном приложении — Haptics (на iOS
 * navigator.vibrate не работает), в браузере — Vibration API.
 * Массив-паттерн — «сильный» сигнал (финиш таймера).
 */
export const buzz = (pattern: number | number[] = 8) => {
  if (Capacitor.isNativePlatform()) {
    if (Array.isArray(pattern)) void Haptics.notification({ type: NotificationType.Success });
    else void Haptics.impact({ style: ImpactStyle.Light });
    return;
  }
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(pattern);
};
