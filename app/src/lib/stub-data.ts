import type {
  DayTask,
  DietPlan,
  Exercise,
  InBodyMeasure,
  Meal,
  MetricDef,
  MetricId,
  UserData,
  WeekSchedule,
} from './types';

// Демо-данные из дизайн-прототипа. В проде приходят с VPS (см. api.ts).

export const MEALS: Meal[] = [
  {
    id: 'b', time: '08:00', title: 'Завтрак',
    dishes: 'Овсянка с ягодами · омлет из 2 яиц',
    cal: 520, p: 34, f: 18, c: 52,
    items: [
      { name: 'Овсянка с ягодами и орехами', grams: 250, cal: 320, p: 12, f: 9, c: 48 },
      { name: 'Омлет из 2 яиц', grams: 120, cal: 200, p: 22, f: 9, c: 4 },
    ],
  },
  {
    id: 'l', time: '13:00', title: 'Обед',
    dishes: 'Куриная грудка с гречкой и овощами',
    cal: 610, p: 48, f: 14, c: 58,
    items: [
      { name: 'Куриная грудка на гриле', grams: 180, cal: 300, p: 40, f: 6, c: 0 },
      { name: 'Гречка с овощами', grams: 250, cal: 310, p: 8, f: 8, c: 58 },
    ],
  },
  {
    id: 's', time: '16:30', title: 'Перекус',
    dishes: 'Творог 5 % с мёдом и миндалём',
    cal: 280, p: 28, f: 8, c: 22,
    items: [
      { name: 'Творог 5 % с мёдом', grams: 200, cal: 230, p: 24, f: 6, c: 20 },
      { name: 'Миндаль', grams: 10, cal: 50, p: 4, f: 2, c: 2 },
    ],
  },
  {
    id: 'd', time: '19:30', title: 'Ужин',
    dishes: 'Запечённый лосось с брокколи',
    cal: 540, p: 42, f: 26, c: 18,
    items: [
      { name: 'Запечённый лосось', grams: 180, cal: 380, p: 36, f: 24, c: 0 },
      { name: 'Брокколи на пару', grams: 200, cal: 160, p: 6, f: 2, c: 18 },
    ],
  },
];

export const TASKS: DayTask[] = [
  { id: 't1', label: 'Выпить 2 л воды' },
  { id: 't2', label: 'Белок в каждом приёме пищи' },
  { id: 't3', label: 'Без сахара после 18:00' },
];

export const METRICS: Record<MetricId, MetricDef> = {
  w: { label: 'Текущий вес', unit: 'кг', dec: 1, series: [86.1, 85.5, 84.8, 84.2, 83.2, 82.4], delta: '0,6 кг · неделя', short: '0,6', dir: 'down', good: true },
  fat: { label: 'Жир', unit: '%', dec: 1, series: [21.4, 20.7, 19.8, 19.2, 18.6, 18.2], delta: '0,4 % · месяц', short: '0,4', dir: 'down', good: true },
  musc: { label: 'Мышцы', unit: 'кг', dec: 1, series: [36.2, 36.3, 36.4, 36.5, 36.7, 36.8], delta: '0,3 кг · месяц', short: '0,3', dir: 'up', good: true },
  wat: { label: 'Вода', unit: '%', dec: 1, series: [54.2, 54.4, 54.6, 54.7, 54.9, 55.1], delta: '0,2 % · месяц', short: '0,2', dir: 'up', good: false },
  visc: { label: 'Висц. жир', unit: 'ур.', dec: 0, series: [9, 9, 8, 8, 8, 7], delta: '1 ур. · месяц', short: '1', dir: 'down', good: true },
};

export const INBODY: InBodyMeasure[] = [
  { date: '3 февраля', w: '86,1', fat: '21,4', musc: '36,2', wat: '54,2', visc: '9', file: 'inbody_03-02.jpg' },
  { date: '14 апреля', w: '84,8', fat: '19,8', musc: '36,4', wat: '54,6', visc: '8', file: 'inbody_14-04.jpg' },
  { date: '8 июня', w: '83,2', fat: '18,6', musc: '36,7', wat: '54,9', visc: '8', file: 'inbody_08-06.jpg' },
  { date: '6 июля', w: '82,4', fat: '18,2', musc: '36,8', wat: '55,1', visc: '7', file: 'inbody_06-07.jpg' },
];

export const WORKOUT: Exercise[] = [
  {
    name: 'Тяга верхнего блока', equip: 'Блочный тренажёр', scheme: '4×10',
    sets: [
      { w: '57,5', r: '10', lw: 55, lr: 10 },
      { w: '57,5', r: '10', lw: 55, lr: 10 },
      { w: '55', r: '12', lw: 55, lr: 12 },
      { w: '', r: '', lw: 52.5, lr: 12 },
    ],
    hist: [47.5, 50, 50, 52.5, 55, 55, 57.5],
    best: '57,5 кг × 10', bestDate: '30 июня', tonnage: '86 400',
  },
  {
    name: 'Тяга штанги в наклоне', equip: 'Штанга', scheme: '4×8',
    sets: [
      { w: '62,5', r: '8', lw: 60, lr: 8 },
      { w: '60', r: '8', lw: 60, lr: 8 },
      { w: '60', r: '8', lw: 60, lr: 8 },
      { w: '', r: '', lw: 57.5, lr: 10 },
    ],
    hist: [50, 52.5, 55, 55, 57.5, 60, 62.5],
    best: '62,5 кг × 8', bestDate: '30 июня', tonnage: '74 200',
  },
  {
    name: 'Тяга горизонтального блока', equip: 'Блочный тренажёр', scheme: '3×12',
    sets: [
      { w: '52,5', r: '12', lw: 50, lr: 12 },
      { w: '50', r: '12', lw: 50, lr: 12 },
      { w: '', r: '', lw: 50, lr: 10 },
    ],
    hist: [41, 43, 45, 45, 47.5, 50, 52.5],
    best: '52,5 кг × 12', bestDate: '30 июня', tonnage: '58 900',
  },
  {
    name: 'Сгибания на бицепс', equip: 'Гантели', scheme: '3×12',
    sets: [
      { w: '16', r: '12', lw: 16, lr: 12 },
      { w: '16', r: '12', lw: 16, lr: 10 },
      { w: '', r: '', lw: 14, lr: 12 },
    ],
    hist: [12, 12, 14, 14, 14, 16, 16],
    best: '16 кг × 12', bestDate: '30 июня', tonnage: '21 300',
  },
];

export const DIET_PLAN: DietPlan = {
  title: 'Сушка · дефицит 500 ккал',
  subtitle: 'целевые КБЖУ на день',
  targets: { cal: 1950, p: 150, f: 65, c: 150 },
  week: [
    { day: 'Пн', menu: 'Овсянка · курица с гречкой · лосось' },
    { day: 'Вт', menu: 'Омлет · индейка с рисом · треска' },
    { day: 'Ср', menu: 'Сырники · говядина с булгуром · творог' },
    { day: 'Чт', menu: 'Овсянка · курица с макаронами · судак' },
    { day: 'Пт', menu: 'Омлет · говядина с гречкой · креветки' },
    { day: 'Сб', menu: 'Сырники · индейка с киноа · лосось' },
    { day: 'Вс', menu: 'Свободный приём · разгрузка' },
  ],
  currentDay: 0,
};

export const WEEK_SCHEDULE: WeekSchedule = {
  week: 28,
  days: [
    { kind: 'done', title: 'Пн · Грудь + трицепс', stats: '47 мин · 6 упражнений · 12 340 кг' },
    { kind: 'today', title: 'Вт · Спина + бицепс' },
    { kind: 'rest', title: 'Ср · Отдых' },
    { kind: 'future', title: 'Чт · Ноги', count: '5 упражнений' },
    { kind: 'future', title: 'Пт · Плечи + руки', count: '6 упражнений' },
  ],
};

export const USER_DATA: UserData = {
  meals: MEALS,
  tasks: TASKS,
  metrics: METRICS,
  inbody: INBODY,
  workout: WORKOUT,
  workoutTitle: 'Спина + бицепс',
  plan: DIET_PLAN,
  schedule: WEEK_SCHEDULE,
  dateLabel: 'Пн, 6 июля',
};
