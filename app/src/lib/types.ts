export type Tab = 'body' | 'diet' | 'train' | 'chat';
export type DietView = 'day' | 'plan';
export type TrainView = 'list' | 'active' | 'progress';
export type MetricId = 'w' | 'fat' | 'musc' | 'wat' | 'visc';
export type Goal = 'Сушка' | 'Набор массы';

export interface Dish {
  name: string;
  grams: number;
  cal: number;
  p: number;
  f: number;
  c: number;
}

export interface Meal {
  id: string;
  time: string;
  title: string;
  dishes: string;
  cal: number;
  p: number;
  f: number;
  c: number;
  items: Dish[];
}

export interface DayTask {
  id: string;
  label: string;
}

export interface SetSpec {
  /** плановый ввод по умолчанию, '' = ещё не сделан */
  w: string;
  r: string;
  /** прошлая тренировка */
  lw: number;
  lr: number;
}

export interface Exercise {
  name: string;
  equip: string;
  scheme: string;
  sets: SetSpec[];
  /** рабочий вес по неделям Н1–Н7 */
  hist: number[];
  best: string;
  bestDate: string;
  tonnage: string;
}

export interface InBodyMeasure {
  date: string;
  w: string;
  fat: string;
  musc: string;
  wat: string;
  visc: string;
  file: string;
}

export interface MetricDef {
  label: string;
  unit: string;
  dec: number;
  series: number[];
  delta: string;
  short: string;
  dir: 'up' | 'down';
  good: boolean;
}

export interface DietPlan {
  title: string;
  subtitle: string;
  targets: { cal: number; p: number; f: number; c: number };
  week: { day: string; menu: string }[];
  /** индекс текущего дня недели в week */
  currentDay: number;
}

export type ScheduleDay =
  | { kind: 'done'; title: string; stats: string }
  | { kind: 'today'; title: string }
  | { kind: 'rest'; title: string }
  | { kind: 'future'; title: string; count: string };

export interface WeekSchedule {
  week: number;
  days: ScheduleDay[];
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  attachment?: string;
}

export interface SetInput {
  w: string;
  r: string;
}

/** Изменяемое состояние дня — то, что сохраняется на бэкенд */
export interface DayState {
  eaten: Record<string, boolean>;
  done: Record<string, boolean>;
  sets: SetInput[][];
  goal: Goal;
}

/** Все данные пользователя, приходящие с бэкенда */
export interface UserData {
  meals: Meal[];
  tasks: DayTask[];
  metrics: Record<MetricId, MetricDef>;
  inbody: InBodyMeasure[];
  workout: Exercise[];
  workoutTitle: string;
  plan: DietPlan;
  schedule: WeekSchedule;
  dateLabel: string;
}
