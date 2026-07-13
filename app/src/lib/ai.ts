import type { ChatMessage } from './types';

/**
 * Слой ИИ. Сейчас — заглушка с готовыми ответами и имитацией задержки.
 *
 * Когда появится API ИИ: реализовать HttpAssistant с теми же методами
 * (запрос к бэкенду на VPS, который ходит в LLM с контекстом пользователя)
 * и поменять создание в createAssistant().
 */
export interface Assistant {
  /** ответ в чате с учётом истории */
  reply(history: ChatMessage[], userText: string): Promise<string>;
  /** рекомендации на экране «Мой план» */
  planRecommendations(): Promise<string[]>;
  /** пересборка плана — возвращает новые рекомендации */
  rebuildPlan(): Promise<string[]>;
  /** совет по конкретному упражнению */
  exerciseTip(exerciseIndex: number): Promise<string>;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const CANNED: { match: RegExp; answer: string }[] = [
  {
    match: /вес.*(встал|стоит|не (падает|снижается))|плато/i,
    answer:
      'С 24 по 30 июня вода выросла на 0,8 % — это удержание жидкости, не жир. Средний тренд за месяц: −0,5 кг в неделю. Всё по плану.',
  },
  {
    match: /ужин.*600|600.*ужин/i,
    answer:
      'Ужин на 600 ккал: запечённая треска 220 г (200 ккал, 40 г белка), булгур 150 г (170 ккал), салат с оливковым маслом (230 ккал). Итого: Б 52 · Ж 18 · У 48.',
  },
  {
    match: /план на сегодня|что сегодня/i,
    answer:
      'Сегодня: спина + бицепс в 18:30, по питанию осталось 1 430 ккал — обед, перекус и ужин по плану. Не забудьте про 2 л воды, выпито пока мало.',
  },
  {
    match: /этикетк|состав|брать|стоит ли/i,
    answer:
      'Хороший состав: 22 г белка на 100 г, сахара всего 1,2 г. Впишется в сегодняшний остаток — берите.',
  },
  {
    match: /привет|здравствуй|добр/i,
    answer:
      'Доброе утро! Вес 82,4 кг — минус 0,6 за неделю, жир 18,2 %. Дефицит работает. Сегодня по плану спина + бицепс.',
  },
];

const FALLBACK =
  'Приняла! Пока я работаю в демо-режиме — когда подключат ИИ-API, отвечу с учётом ваших замеров, питания и тренировок.';

const RECOMMENDATIONS = [
  'Вода выросла на 0,8 % за две недели — сократите соль до 3 г в день.',
  'До целевого белка не хватает ~20 г — добавьте их в завтрак.',
  'В день тренировки перенесите углеводы из ужина в перекус.',
];

const REBUILT_RECOMMENDATIONS = [
  'Пересобрала меню: белок в завтраке увеличен до 40 г, соль ограничена.',
  'Углеводы в день тренировки смещены в перекус перед залом.',
  'Ужин облегчён на 120 ккал — компенсировано перекусом.',
];

const EXERCISE_TIPS = [
  'Вес растёт 2,5 кг каждые 2 недели — на следующей неделе попробуйте 60 кг на 8 повторов.',
  'Рост +12,5 кг за 7 недель — отличный темп. Следите за техникой на последних подходах.',
  'На третьем подходе повторы падают до 10 — добавьте 30 секунд отдыха между подходами.',
  'Вес держится 2 недели — попробуйте 18 кг на первом подходе, пока руки свежие.',
];

class StubAssistant implements Assistant {
  async reply(_history: ChatMessage[], userText: string): Promise<string> {
    await delay(900 + Math.random() * 700);
    const hit = CANNED.find((c) => c.match.test(userText));
    return hit ? hit.answer : FALLBACK;
  }

  async planRecommendations(): Promise<string[]> {
    return RECOMMENDATIONS;
  }

  async rebuildPlan(): Promise<string[]> {
    await delay(1400);
    return REBUILT_RECOMMENDATIONS;
  }

  async exerciseTip(exerciseIndex: number): Promise<string> {
    return EXERCISE_TIPS[exerciseIndex] ?? EXERCISE_TIPS[0];
  }
}

function createAssistant(): Assistant {
  return new StubAssistant();
}

export const assistant = createAssistant();
