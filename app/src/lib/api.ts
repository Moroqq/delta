import { USER_DATA, WORKOUT } from './stub-data';
import type { DayState, UserData } from './types';

/**
 * Слой данных. Сейчас — заглушка: демо-данные + localStorage.
 *
 * Когда появится VPS: реализовать HttpBackend с теми же методами
 * (fetch к `${VITE_API_URL}/...`) и поменять создание в createBackend().
 * UI ничего не знает о том, откуда приходят данные.
 */
export interface Backend {
  loadUserData(): Promise<UserData>;
  loadDayState(): Promise<DayState | null>;
  saveDayState(state: DayState): Promise<void>;
}

const DAY_STATE_KEY = 'ai-fitness:day-state:v1';

class LocalBackend implements Backend {
  async loadUserData(): Promise<UserData> {
    return USER_DATA;
  }

  async loadDayState(): Promise<DayState | null> {
    try {
      const raw = localStorage.getItem(DAY_STATE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as DayState;
      // сеты валидны, только если структура тренировки не поменялась
      const setsOk =
        Array.isArray(parsed.sets) &&
        parsed.sets.length === WORKOUT.length &&
        parsed.sets.every((s, i) => s.length === WORKOUT[i].sets.length);
      if (!setsOk) parsed.sets = defaultSets();
      return parsed;
    } catch {
      return null;
    }
  }

  async saveDayState(state: DayState): Promise<void> {
    localStorage.setItem(DAY_STATE_KEY, JSON.stringify(state));
  }
}

export function defaultSets() {
  return WORKOUT.map((ex) => ex.sets.map((s) => ({ w: s.w, r: s.r })));
}

export function defaultDayState(): DayState {
  return {
    eaten: { b: true, l: false, s: false, d: false },
    done: { t1: true, t2: true, t3: false },
    sets: defaultSets(),
    goal: 'Сушка',
  };
}

function createBackend(): Backend {
  return new LocalBackend();
}

export const backend = createBackend();
