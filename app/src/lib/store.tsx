import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { assistant } from './ai';
import { backend, defaultDayState } from './api';
import { buzz } from './format';
import type {
  ChatMessage,
  DayState,
  DietView,
  Goal,
  MetricId,
  Tab,
  TrainView,
  UserData,
} from './types';

interface AppStore {
  data: UserData;
  // навигация
  tab: Tab;
  setTab: (t: Tab) => void;
  ready: boolean;
  dietView: DietView;
  setDietView: (v: DietView) => void;
  trainView: TrainView;
  startWorkout: () => void;
  endWorkout: () => void;
  openProgress: (exIndex: number) => void;
  closeProgress: () => void;
  progressEx: number;
  // тело
  metric: MetricId;
  setMetric: (id: MetricId) => void;
  chartSeries: number[] | null;
  selPoint: number | null;
  setSelPoint: (i: number | null) => void;
  // диета
  eaten: Record<string, boolean>;
  toggleEaten: (id: string) => void;
  expanded: string | null;
  toggleExpanded: (id: string) => void;
  done: Record<string, boolean>;
  toggleDone: (id: string) => void;
  // тренировка
  sets: { w: string; r: string }[][];
  setSetValue: (ex: number, set: number, key: 'w' | 'r', value: string) => void;
  goal: Goal;
  setGoal: (g: Goal) => void;
  // таймер отдыха
  timerOpen: boolean;
  timerLeft: number;
  timerRun: boolean;
  openTimer: () => void;
  closeTimer: () => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  // чат
  messages: ChatMessage[];
  typing: boolean;
  sendMessage: (text: string) => void;
  resetChat: () => void;
}

const Ctx = createContext<AppStore | null>(null);

export function useApp(): AppStore {
  const s = useContext(Ctx);
  if (!s) throw new Error('useApp outside provider');
  return s;
}

const TIMER_TOTAL = 120;
let msgId = 1;

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<UserData | null>(null);

  const [tab, setTabRaw] = useState<Tab>('diet');
  const [ready, setReady] = useState(false);
  const [dietView, setDietViewRaw] = useState<DietView>('day');
  const [trainView, setTrainView] = useState<TrainView>('list');
  const [progressEx, setProgressEx] = useState(0);

  const [metric, setMetricRaw] = useState<MetricId>('w');
  const [chartSeries, setChartSeries] = useState<number[] | null>(null);
  const [selPoint, setSelPoint] = useState<number | null>(null);

  const [day, setDay] = useState<DayState>(defaultDayState);
  const [expanded, setExpanded] = useState<string | null>('l');

  const [timerOpen, setTimerOpen] = useState(false);
  const [timerLeft, setTimerLeft] = useState(TIMER_TOTAL);
  const [timerRun, setTimerRun] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);

  const raf = useRef(0);
  const tick = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const loaded = useRef(false);

  // ── загрузка с «бэкенда» ──
  useEffect(() => {
    let alive = true;
    (async () => {
      const [ud, ds] = await Promise.all([backend.loadUserData(), backend.loadDayState()]);
      if (!alive) return;
      setData(ud);
      if (ds) setDay(ds);
      loaded.current = true;
    })();
    return () => {
      alive = false;
    };
  }, []);

  // ── сохранение состояния дня (дебаунс) ──
  useEffect(() => {
    if (!loaded.current) return;
    const t = setTimeout(() => void backend.saveDayState(day), 300);
    return () => clearTimeout(t);
  }, [day]);

  // ── вход экрана: анимации от нуля через ready ──
  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), 90);
    return () => clearTimeout(t);
  }, [tab]);

  const setTab = useCallback((t: Tab) => {
    setTabRaw((prev) => {
      if (t === prev) return prev;
      buzz();
      setDietViewRaw('day');
      setTrainView('list');
      setSelPoint(null);
      return t;
    });
  }, []);

  const setDietView = useCallback((v: DietView) => {
    buzz();
    setDietViewRaw(v);
  }, []);

  // ── переключение метрики с интерполяцией графика ──
  const setMetric = useCallback(
    (id: MetricId) => {
      if (!data || id === metric) return;
      buzz();
      const from = (chartSeries ?? data.metrics[metric].series).slice();
      const to = data.metrics[id].series;
      setMetricRaw(id);
      setSelPoint(null);
      cancelAnimationFrame(raf.current);
      const t0 = performance.now();
      const dur = 550;
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        if (p < 1) {
          setChartSeries(from.map((v, i) => v + (to[i] - v) * e));
          raf.current = requestAnimationFrame(step);
        } else {
          setChartSeries(null);
        }
      };
      raf.current = requestAnimationFrame(step);
    },
    [data, metric, chartSeries],
  );

  // ── диета ──
  const toggleEaten = useCallback((id: string) => {
    buzz();
    setDay((s) => ({ ...s, eaten: { ...s.eaten, [id]: !s.eaten[id] } }));
  }, []);

  const toggleDone = useCallback((id: string) => {
    buzz();
    setDay((s) => ({ ...s, done: { ...s.done, [id]: !s.done[id] } }));
  }, []);

  const toggleExpanded = useCallback((id: string) => {
    buzz();
    setExpanded((cur) => (cur === id ? null : id));
  }, []);

  // ── тренировка ──
  const startWorkout = useCallback(() => {
    buzz();
    setTrainView('active');
  }, []);

  const endWorkout = useCallback(() => {
    buzz();
    setTrainView('list');
  }, []);

  const openProgress = useCallback((exIndex: number) => {
    buzz();
    setProgressEx(exIndex);
    setTrainView('progress');
  }, []);

  const closeProgress = useCallback(() => {
    buzz();
    setTrainView('active');
  }, []);

  const setSetValue = useCallback((ex: number, set: number, key: 'w' | 'r', value: string) => {
    setDay((s) => {
      const sets = s.sets.map((a) => a.map((b) => ({ ...b })));
      sets[ex][set][key] = value;
      return { ...s, sets };
    });
  }, []);

  const setGoal = useCallback((g: Goal) => {
    buzz();
    setDay((s) => ({ ...s, goal: g }));
  }, []);

  // ── таймер отдыха ──
  const startTick = useCallback(() => {
    clearInterval(tick.current);
    tick.current = setInterval(() => {
      setTimerLeft((left) => {
        if (left <= 1) {
          clearInterval(tick.current);
          setTimerRun(false);
          buzz([60, 40, 60]);
          return 0;
        }
        return left - 1;
      });
    }, 1000);
  }, []);

  const openTimer = useCallback(() => {
    buzz();
    setTimerOpen(true);
    setTimerLeft(TIMER_TOTAL);
    setTimerRun(true);
    startTick();
  }, [startTick]);

  const closeTimer = useCallback(() => {
    buzz();
    clearInterval(tick.current);
    setTimerOpen(false);
    setTimerRun(false);
  }, []);

  const toggleTimer = useCallback(() => {
    buzz();
    if (timerLeft <= 0) {
      setTimerLeft(TIMER_TOTAL);
      setTimerRun(true);
      startTick();
      return;
    }
    if (timerRun) {
      clearInterval(tick.current);
      setTimerRun(false);
    } else {
      setTimerRun(true);
      startTick();
    }
  }, [timerLeft, timerRun, startTick]);

  const resetTimer = useCallback(() => {
    buzz();
    setTimerLeft(TIMER_TOTAL);
    setTimerRun(true);
    startTick();
  }, [startTick]);

  useEffect(
    () => () => {
      clearInterval(tick.current);
      cancelAnimationFrame(raf.current);
    },
    [],
  );

  // ── чат ──
  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    buzz();
    setMessages((m) => [...m, { id: msgId++, role: 'user', text: trimmed }]);
    setTyping(true);
    void assistant.reply([], trimmed).then((answer) => {
      setMessages((m) => [...m, { id: msgId++, role: 'assistant', text: answer }]);
      setTyping(false);
    });
  }, []);

  const resetChat = useCallback(() => {
    buzz();
    setMessages([]);
    setTyping(false);
  }, []);

  const value = useMemo<AppStore | null>(() => {
    if (!data) return null;
    return {
      data,
      tab, setTab, ready,
      dietView, setDietView,
      trainView, startWorkout, endWorkout, openProgress, closeProgress, progressEx,
      metric, setMetric, chartSeries, selPoint, setSelPoint,
      eaten: day.eaten, toggleEaten, expanded, toggleExpanded,
      done: day.done, toggleDone,
      sets: day.sets, setSetValue, goal: day.goal, setGoal,
      timerOpen, timerLeft, timerRun, openTimer, closeTimer, toggleTimer, resetTimer,
      messages, typing, sendMessage, resetChat,
    };
  }, [
    data, tab, setTab, ready, dietView, setDietView, trainView, startWorkout, endWorkout,
    openProgress, closeProgress, progressEx, metric, setMetric, chartSeries, selPoint,
    day, toggleEaten, expanded, toggleExpanded, toggleDone, setSetValue, setGoal,
    timerOpen, timerLeft, timerRun, openTimer, closeTimer, toggleTimer, resetTimer,
    messages, typing, sendMessage, resetChat,
  ]);

  if (!value) return null; // localStorage-бэкенд отвечает мгновенно, экран загрузки не нужен

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
